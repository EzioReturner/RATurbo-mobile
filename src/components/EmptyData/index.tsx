import React from 'react';
import './index.less';

interface EmptyDataProps {
  propStyle?: React.CSSProperties;
}

const EmptyData: React.FC<EmptyDataProps> = props => {
  const { propStyle } = props;

  return (
    <div className="empty-data" style={{ ...propStyle }}>
      <div className="empty-svg"></div>
      <span className="empty-text">暂无数据</span>
    </div>
  );
};

export default EmptyData;
