import User from "../models/User.js";
import EngineerProfile from "../models/EngineerProfile.js";
import fetch from "node-fetch";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        let profileData = { ...user.toObject() };

        if (user.role === "ENGINEER") {
            const engProfile = await EngineerProfile.findOne({ user: user._id });
            if (engProfile) {
                profileData.engineerDetails = engProfile;
            }
        }

        res.status(200).json(profileData);
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, city, pincode } = req.body;
        
        // Update base user details
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (name) user.name = name;
        if (phone) user.phone = phone;
        await user.save();

        let updatedProfile = { ...user.toObject() };

        // Update Engineer specific details
        if (user.role === "ENGINEER" && (address || city || pincode)) {
            let engProfile = await EngineerProfile.findOne({ user: user._id });
            if (engProfile) {
                const fullAddress = `${address}, ${city}, ${pincode}`;
                engProfile.address = fullAddress;

                // Geocode new address
                try {
                    const query = encodeURIComponent(`${fullAddress}, India`);
                    const geocodeRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`, {
                        headers: { 'User-Agent': 'DistrictFixApp/1.0' }
                    });
                    const data = await geocodeRes.json();
                    if (data && data.length > 0) {
                        engProfile.location = {
                            type: "Point",
                            coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)]
                        };
                    }
                } catch(err) {
                    console.error("Geocoding failed during update:", err);
                }

                await engProfile.save();
                updatedProfile.engineerDetails = engProfile;
            }
        }

        res.status(200).json({ message: "Profile updated successfully", profile: updatedProfile });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
