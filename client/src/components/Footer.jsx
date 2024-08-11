import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          
        </div>
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} ENT Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;