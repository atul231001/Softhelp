import User from "../models/User.js";
import EngineerProfile from "../models/EngineerProfile.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Temporary in-memory store for OTPs (In production, use Redis or DB)
const otpStore = new Map(); 

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Validate input
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      isVerified: true, // TODO: Set to false once OTP UI is built
    });

    await newUser.save();

    // If role is ENGINEER, also create an EngineerProfile
    if (role === "ENGINEER") {
      const { city, pincode, address } = req.body;
      let coordinates = [0, 0]; // Default

      // Attempt to geocode using Nominatim OpenStreetMap API
      if (city && pincode && address) {
          try {
              const query = encodeURIComponent(`${address}, ${city}, ${pincode}, India`);
              const geocodeRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`, {
                  headers: { 'User-Agent': 'DistrictFixApp/1.0' }
              });
              const data = await geocodeRes.json();
              if (data && data.length > 0) {
                  coordinates = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
              } else {
                  console.warn("Geocoding returned no results for:", query);
              }
          } catch(err) {
              console.error("Geocoding failed:", err);
          }
      }

      const newEngineerProfile = new EngineerProfile({
        user: newUser._id,
        experienceYears: req.body.experienceYears || 0,
        address: `${address}, ${city}, ${pincode}`,
        location: {
            type: "Point",
            coordinates: coordinates
        }
      });
      await newEngineerProfile.save();
    }

    // Generate Mock OTP
    const otp = "123456"; // Mock OTP for development
    otpStore.set(email, otp);
    console.log(`Mock OTP for ${email} is ${otp}`);

    res.status(201).json({
      message: "User registered successfully. Please verify OTP sent to your email.",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedOtp = otpStore.get(email);
    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.isVerified = true;
    await user.save();

    otpStore.delete(email); // Clear OTP

    res.status(200).json({ message: "Email verified successfully. You can now login." });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Server error during verification." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email first." });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Your account is disabled. Contact admin." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "fallback_secret_for_development",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};
