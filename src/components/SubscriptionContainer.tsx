'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import SubscriptionForm from './Form/SubscriptionForm';

const SubscriptionContainer: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8 lg:p-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Mail size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Stay Updated
            </h2>
            <p className="text-gray-600 max-w-md">
              Subscribe to our newsletter for the latest updates, exclusive content, and special offers.
            </p>
          </div>
          
          <div className="flex justify-center">
            <SubscriptionForm />
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionContainer;