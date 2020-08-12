import React from 'react';
import { hot } from 'react-hot-loader';

const MobileLayout: React.FC = props => {
  return <div style={{ height: '100%' }}>{props.children}</div>;
};

const Mobile = process.env.NODE_ENV === 'development' ? hot(module)(MobileLayout) : MobileLayout;
export default Mobile;
