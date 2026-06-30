import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, Phone, Shield, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'guest' // Default role parameter
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await register(formData);

    if (result.success) {
      navigate('/'); // Redirect to home upon successful registration and token allocation
    } else {
      setError(result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Join <span className="text-[#FF385C]">WanderNest</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Discover places to stay or start hosting today
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <User className="h-5 w-5" />
              </span>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="pl-10 block w-full border border-gray-300 rounded-lg py-2 bg-gray-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent transition text-sm"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Mail className="h-5 w-5" />
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="pl-10 block w-full border border-gray-300 rounded-lg py-2 bg-gray-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent transition text-sm"
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Lock className="h-5 w-5" />
              </span>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="pl-10 block w-full border border-gray-300 rounded-lg py-2 bg-gray-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent transition text-sm"
                placeholder="Minimum 6 characters"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Phone className="h-5 w-5" />
              </span>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 block w-full border border-gray-300 rounded-lg py-2 bg-gray-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent transition text-sm"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          {/* Role Selection (Guest vs Host Cards) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I want to join as a:</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRoleSelect('guest')}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center transition gap-1 ${
                  formData.role === 'guest'
                    ? 'border-[#FF385C] bg-red-50/50 text-[#FF385C] font-semibold'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm">Guest</span>
                <span className="text-xs font-normal text-gray-500">I want to book stays</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('host')}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center transition gap-1 ${
                  formData.role === 'host'
                    ? 'border-[#FF385C] bg-red-50/50 text-[#FF385C] font-semibold'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm">Host</span>
                <span className="text-xs font-normal text-gray-500">I want to list properties</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-[#FF385C] hover:bg-[#E61E4D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF385C] transition disabled:opacity-70 disabled:cursor-not-allowed items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>

        {/* Redirect Footer Link */}
        <div className="text-center mt-2">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#FF385C] hover:underline">
              Log in here
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Register;