import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard'; // Import the new page we made

function App() {
  return (
    <Layout>
      {/* Now we render the actual Dashboard instead of placeholder text */}
      <Dashboard />
    </Layout>
  );
}

export default App;