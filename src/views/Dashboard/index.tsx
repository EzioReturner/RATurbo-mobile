import React, { useRef, useState, useEffect, useMemo } from 'react';

const Dashboard: React.FC = () => {
 return  <div>Dashboard</div>
};

const DashboardHot =
  process.env.NODE_ENV === 'development' ? hot(module)(observer(Dashboard)) : observer(Dashboard);

export default DashboardHot;
