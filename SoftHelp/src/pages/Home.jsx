import { Shield, Clock, MapPin, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block py-1 px-4 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6 border border-blue-100 uppercase tracking-wider">
              India's #1 B2B IT Service Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
              Get Your Office IT Fixed <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Instantly</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Connect with verified nearby IT support engineers. Fast, reliable, and secure problem resolution for your district and office.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-xl shadow-blue-200/50 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                <Zap className="w-5 h-5" />
                Book an Engineer Now
              </Link>
              <Link to="/how-it-works" className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center shadow-sm hover:shadow transform hover:-translate-y-1">
                Learn How It Works
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-500">
                <div>
                    <div className="text-4xl font-bold mb-2">50+</div>
                    <div className="text-blue-100 font-medium">Districts Covered</div>
                </div>
                <div>
                    <div className="text-4xl font-bold mb-2">1,200+</div>
                    <div className="text-blue-100 font-medium">Verified Engineers</div>
                </div>
                <div>
                    <div className="text-4xl font-bold mb-2">15k+</div>
                    <div className="text-blue-100 font-medium">Issues Resolved</div>
                </div>
                <div>
                    <div className="text-4xl font-bold mb-2">4.8/5</div>
                    <div className="text-blue-100 font-medium">Average Rating</div>
                </div>
            </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose DistrictFix?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Built for professional offices that demand minimal downtime and verified technical support.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<MapPin className="w-8 h-8 text-blue-600" />}
            title="Nearby Engineers"
            desc="Our smart algorithm finds the closest available IT experts using GPS technology to ensure the fastest response time."
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-indigo-600" />}
            title="Verified Professionals"
            desc="Every engineer goes through a strict KYC and admin verification process before they can accept any service requests."
          />
          <FeatureCard 
            icon={<Clock className="w-8 h-8 text-blue-600" />}
            title="Real-time Tracking"
            desc="Track your engineer's arrival, view job status updates in real-time, and securely release payments upon completion."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
