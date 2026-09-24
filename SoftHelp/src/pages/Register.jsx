import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { role: 'OFFICE' }
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      // Send register request to backend
      const response = await axios.post('http://localhost:5001/api/auth/register', data);
      
      setSuccessMsg(response.data.message);
      // Wait a bit, then redirect to login
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          {errorMsg && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm text-center border border-red-200">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 bg-green-50 text-green-600 p-3 rounded-md text-sm text-center border border-green-200">
              {successMsg}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1">
                <input 
                  type="text" 
                  {...register("name", { required: true })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                />
                {errors.name && <span className="text-red-500 text-xs">Full Name is required</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input 
                  type="email" 
                  {...register("email", { required: true })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                />
                {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="mt-1">
                <input 
                  type="text" 
                  {...register("phone", { required: true })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                />
                {errors.phone && <span className="text-red-500 text-xs">Phone is required</span>}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <div className="mt-1">
                <select 
                  {...register("role")}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                >
                  <option value="OFFICE">Office User (Customer)</option>
                  <option value="ENGINEER">IT Support Engineer</option>
                </select>
              </div>
            </div>

            {selectedRole === "ENGINEER" && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                    <h3 className="text-sm font-bold text-gray-700">Engineer Location Details</h3>
                    <p className="text-xs text-gray-500">We need this to assign you nearby jobs.</p>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input 
                            type="text" 
                            {...register("city", { required: selectedRole === "ENGINEER" })}
                            placeholder="e.g. Balaghat"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                        />
                        {errors.city && <span className="text-red-500 text-xs">City is required</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pincode</label>
                        <input 
                            type="text" 
                            {...register("pincode", { required: selectedRole === "ENGINEER" })}
                            placeholder="e.g. 481001"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                        />
                        {errors.pincode && <span className="text-red-500 text-xs">Pincode is required</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Address</label>
                        <textarea 
                            rows="2"
                            {...register("address", { required: selectedRole === "ENGINEER" })}
                            placeholder="e.g. Ward No 5, Near Main Market"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                        ></textarea>
                        {errors.address && <span className="text-red-500 text-xs">Address is required</span>}
                    </div>
                </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input 
                  type="password" 
                  {...register("password", { required: true, minLength: 6 })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                />
                {errors.password && <span className="text-red-500 text-xs">Password must be at least 6 characters</span>}
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
