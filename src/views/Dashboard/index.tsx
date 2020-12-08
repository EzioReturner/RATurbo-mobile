import React from 'react';
import { hot } from 'react-hot-loader';

const Dashboard: React.FC = () => {
  return <div>Dashboard</div>;
};

const DashboardHot = process.env.NODE_ENV === 'development' ? hot(module)(Dashboard) : Dashboard;

export default DashboardHot;
