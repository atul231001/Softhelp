import DashboardLayout from '../../layouts/DashboardLayout';
import { useState } from 'react';
import { MapPin, IndianRupee, CheckCircle, Clock, AlertTriangle, FileText } from 'lucide-react';

const mockAcceptedJobs = [
    {
        id: "REQ-2026-1045",
        title: "Server PC not booting",
        postedBy: "Suresh Kumar",
        phone: "+91 87654 32109",
        location: "Balaghat",
        payment: 1500,
        status: "In Progress",
        date: "Today, 10:30 AM"
    },
    {
        id: "REQ-2026-0982",
        title: "Network Switch Installation",
        postedBy: "ABC Bank",
        phone: "+91 99887 76655",
        location: "Gondia",
        payment: 3200,
        status: "Completed",
        date: "Yesterday"
    }
];

const mockPostedJobs = [
    {
        id: "REQ-2026-1050",
        title: "CCTV Camera offline in branch",
        assignedTo: "Rahul Sharma",
        phone: "+91 98765 43210",
        location: "Seoni",
        payment: 800,
        status: "Assigned",
        date: "Today, 02:15 PM"
    },
    {
        id: "REQ-2026-1051",
        title: "Printer paper jam error",
        assignedTo: null,
        phone: "-",
        location: "Mandla",
        payment: 450,
        status: "Looking for Engineer",
        date: "Today, 03:00 PM"
    }
];

export default function MyJobs() {
    const [activeTab, setActiveTab] = useState('accepted'); // 'accepted' | 'posted'

    return (
        <DashboardLayout role="ENGINEER">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-indigo-600" /> My Jobs
                </h1>
                <p className="text-gray-500 mt-1">Manage jobs you are working on and jobs you have posted.</p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-xl w-full max-w-md mb-6">
                <button
                    onClick={() => setActiveTab('accepted')}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                        activeTab === 'accepted' 
                        ? 'bg-white text-indigo-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                    }`}
                >
                    Accepted Jobs ({mockAcceptedJobs.length})
                </button>
                <button
                    onClick={() => setActiveTab('posted')}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                        activeTab === 'posted' 
                        ? 'bg-white text-indigo-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                    }`}
                >
                    Posted Jobs ({mockPostedJobs.length})
                </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
                {activeTab === 'accepted' && (
                    mockAcceptedJobs.length > 0 ? mockAcceptedJobs.map(job => (
                        <div key={job.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 hover:border-indigo-200 transition-colors">
                            <div className="flex-1 w-full">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1
                                        ${job.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {job.status === 'Completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                        {job.status}
                                    </span>
                                    <span className="text-gray-400 text-sm">{job.date}</span>
                                    <span className="text-gray-300 text-xs ml-auto md:ml-0 font-mono">{job.id}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-600">
                                    <span className="font-medium text-gray-800">Client/Posted by: {job.postedBy}</span>
                                    <span>•</span>
                                    <span className="font-medium">{job.phone}</span>
                                    <span>•</span>
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded w-max mt-3 font-bold text-sm">
                                    <IndianRupee className="w-4 h-4" /> ₹{job.payment}
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                                {job.status === 'In Progress' && (
                                    <button className="flex-1 md:flex-none px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap">
                                        Mark Completed
                                    </button>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className="text-center p-12 bg-white rounded-2xl border border-gray-200 text-gray-500">
                            You haven't accepted any jobs yet.
                        </div>
                    )
                )}

                {activeTab === 'posted' && (
                    mockPostedJobs.length > 0 ? mockPostedJobs.map(job => (
                        <div key={job.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 hover:border-indigo-200 transition-colors">
                            <div className="flex-1 w-full">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1
                                        ${job.status === 'Assigned' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                                        {job.status === 'Assigned' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                                        {job.status}
                                    </span>
                                    <span className="text-gray-400 text-sm">{job.date}</span>
                                    <span className="text-gray-300 text-xs ml-auto md:ml-0 font-mono">{job.id}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-600">
                                    <span className="font-medium text-gray-800">
                                        {job.assignedTo ? `Assigned to: ${job.assignedTo}` : 'Waiting for engineer...'}
                                    </span>
                                    {job.assignedTo && (
                                        <>
                                            <span>•</span>
                                            <span className="font-medium">{job.phone}</span>
                                        </>
                                    )}
                                    <span>•</span>
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded w-max mt-3 font-bold text-sm">
                                    <IndianRupee className="w-4 h-4" /> ₹{job.payment} Offered
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                                <button className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap">
                                    View Details
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center p-12 bg-white rounded-2xl border border-gray-200 text-gray-500">
                            You haven't posted any jobs yet.
                        </div>
                    )
                )}
            </div>
        </DashboardLayout>
    );
}
