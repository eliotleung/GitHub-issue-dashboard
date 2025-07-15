import React, { Suspense } from 'react';
// Lazy load the IssuesDashboard template
const IssuesDashboard = React.lazy(() => import('./components/templates/IssuesDashboard'));

const App: React.FC = () => (
  <Suspense fallback={<div className="flex justify-center items-center h-screen text-blue-500 text-xl">Loading dashboard...</div>}>
    <IssuesDashboard />
  </Suspense>
);

export default App;
