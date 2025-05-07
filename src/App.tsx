import React from 'react';
import SubscriptionContainer from './components/SubscriptionContainer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full animate-slideUp">
        <SubscriptionContainer />
      </div>
    </div>
  );
}

export default App;