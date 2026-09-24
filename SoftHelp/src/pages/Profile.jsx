import DashboardLayout from '../layouts/DashboardLayout';
import { User, Mail, Phone, MapPin, Shield, Edit2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const localUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Edit Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
      name: '',
      phone: '',
      address: '',
      city: '',
      pincode: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
        
        // Populate edit form
        const rawAddress = res.data.engineerDetails?.address || "";
        const addrParts = rawAddress.split(",").map(s => s.trim());
        setFormData({
            name: res.data.name || "",
            phone: res.data.phone || "",
            address: addrParts.length > 2 ? addrParts.slice(0, -2).join(", ") : rawAddress,
            city: addrParts.length >= 2 ? addrParts[addrParts.length - 2] : "",
            pincode: addrParts.length >= 1 ? addrParts[addrParts.length - 1] : ""
        });
    } catch (err) {
        console.error("Failed to fetch profile", err);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
      e.preventDefault();
      setIsSaving(true);
      try {
          const token = localStorage.getItem('token');
          await axios.put('http://localhost:5001/api/users/profile', formData, {
              headers: { Authorization: `Bearer ${token}` }
          });
          
          // Re-fetch profile to get updated geocoded address
          await fetchProfile();
          setIsEditing(false);
          alert("Profile updated successfully!");
      } catch (err) {
          console.error("Failed to update profile", err);
          alert("Error updating profile");
      } finally {
          setIsSaving(false);
      }
  };

  if (isLoading) {
      return (
        <DashboardLayout role={localUser.role || 'OFFICE'}>
            <div className="flex items-center justify-center h-64 text-gray-500">Loading profile...</div>
        </DashboardLayout>
      );
  }

  return (
    <DashboardLayout role={profile?.role || localUser.role || 'OFFICE'}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            
            <div className="px-8 pb-8 relative">
                {/* Profile Picture */}
                <div className="absolute -top-16 left-8 h-32 w-32 rounded-full bg-white p-2">
                    <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-5xl font-bold border border-blue-200">
                        {profile?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end pt-4 mb-8">
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                    </button>
                </div>

                {/* Profile Details */}
                <div className="mt-2">
                    <h2 className="text-3xl font-bold text-gray-900">{profile?.name || 'User Name'}</h2>
                    <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                        <Shield className="w-4 h-4 text-blue-500" />
                        {profile?.role === 'ENGINEER' ? 'IT Support Engineer' : 'Office User'} 
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-2">Verified</span>
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                            <Mail className="w-4 h-4" /> Email Address
                        </div>
                        <div className="font-semibold text-gray-900">{profile?.email || 'email@example.com'}</div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                            <Phone className="w-4 h-4" /> Phone Number
                        </div>
                        <div className="font-semibold text-gray-900">{profile?.phone || 'Not Specified'}</div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-2">
                        <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4" /> Location/Address
                        </div>
                        <div className="font-semibold text-gray-900">
                            {profile?.role === 'ENGINEER' 
                                ? (profile.engineerDetails?.address || 'Not specified (Update your service area)') 
                                : 'Office Location Not Set'}
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                      <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                      <button onClick={() => setIsEditing(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
                          <X className="w-5 h-5" />
                      </button>
                  </div>
                  
                  <div className="p-6">
                      <form id="edit-profile-form" onSubmit={handleUpdateProfile} className="space-y-4">
                          <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                              <input 
                                  type="text" 
                                  required
                                  value={formData.name}
                                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                              <input 
                                  type="text" 
                                  required
                                  value={formData.phone}
                                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                              />
                          </div>
                          
                          {profile?.role === 'ENGINEER' && (
                              <>
                                  <div className="pt-4 border-t border-gray-100">
                                      <h3 className="text-sm font-bold text-gray-900 mb-4">Location Details</h3>
                                      <div className="grid grid-cols-2 gap-4 mb-4">
                                          <div>
                                              <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                                              <input 
                                                  type="text" 
                                                  required
                                                  value={formData.city}
                                                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                              />
                                          </div>
                                          <div>
                                              <label className="block text-sm font-semibold text-gray-700 mb-1">Pincode</label>
                                              <input 
                                                  type="text" 
                                                  required
                                                  value={formData.pincode}
                                                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                              />
                                          </div>
                                      </div>
                                      <div>
                                          <label className="block text-sm font-semibold text-gray-700 mb-1">Address / Area</label>
                                          <input 
                                              type="text" 
                                              required
                                              value={formData.address}
                                              onChange={(e) => setFormData({...formData, address: e.target.value})}
                                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                          />
                                      </div>
                                  </div>
                              </>
                          )}
                      </form>
                  </div>
                  
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                      <button 
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-5 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                      >
                          Cancel
                      </button>
                      <button 
                          form="edit-profile-form"
                          type="submit"
                          disabled={isSaving}
                          className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50"
                      >
                          {isSaving ? "Saving..." : "Save Changes"}
                      </button>
                  </div>
              </div>
          </div>
      )}
    </DashboardLayout>
  );
}
