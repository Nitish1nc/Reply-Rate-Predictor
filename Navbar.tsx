import React from 'react';

const NavLink = ({ children, hasDropdown = false }: { children: React.ReactNode, hasDropdown?: boolean }) => (
  <a href="#" className="flex items-center text-white text-sm font-medium hover:text-indigo-200 transition-colors">
    {children}
    {hasDropdown && (
      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    )}
  </a>
);

const Navbar: React.FC = () => {
  return (
    <nav className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <a href="#" className="flex items-center space-x-2">
            {/* Simple placeholder for Smartlead.ai logo */}
            <div className="w-8 h-8 bg-white/90 rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
            <span className="text-white text-xl font-bold">Smartlead.ai</span>
          </a>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink hasDropdown>Products</NavLink>
            <NavLink hasDropdown>Solutions</NavLink>
            <a href="#" className="text-white text-sm font-medium hover:text-indigo-200 transition-colors">Pricing</a>
            <a href="#" className="text-white text-sm font-medium hover:text-indigo-200 transition-colors">Integrations</a>
            <NavLink hasDropdown>Resources</NavLink>
            <NavLink hasDropdown>Tools</NavLink>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-white text-sm font-medium hover:text-indigo-200 transition-colors">Login</a>
          <a href="#" className="bg-teal-400 hover:bg-teal-500 text-white text-sm font-bold py-2 px-4 rounded-lg transition-all duration-200">
            Get started for Free
          </a>
        </div>
        <div className="md:hidden">
            {/* Mobile menu button can be added here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
