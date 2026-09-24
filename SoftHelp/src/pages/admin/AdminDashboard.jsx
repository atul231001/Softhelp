import DashboardLayout from '../../layouts/DashboardLayout';
import { Users, Briefcase, IndianRupee, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <DashboardLayout role="ADMIN">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Control Center</h1>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 shadow-sm">
            Last updated: Just now
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-blue-500">
          <div className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" /> Total Users
          </div>
          <div className="text-3xl font-bold text-gray-900">1,250</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-indigo-500">
          <div className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-500" /> Total Engineers
          </div>
          <div className="text-3xl font-bold text-gray-900">480</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-green-500">
          <div className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-green-500" /> Total Payments
          </div>
          <div className="text-3xl font-bold text-gray-900">₹45.8L</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-red-500">
          <div className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" /> Pending Approvals
          </div>
          <div className="text-3xl font-bold text-gray-900">18</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Pending Engineer Approvals</h2>
        <div className="bg-orange-50 border border-orange-100 text-orange-800 p-4 rounded-xl text-sm mb-4">
            You have 18 engineers waiting for KYC and profile verification.
        </div>
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Review Pending Profiles
        </button>
      </div>
    </DashboardLayout>
  );
}
