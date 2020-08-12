import React from 'react';
import { Toast } from 'antd-mobile';
import { InfoCircleOutlined } from '@ant-design/icons';

const RAToast = (text: any, duration?: number) => {
  return Toast.info(
    <div className="limit-info">
      <InfoCircleOutlined className="limit-info-icon" />
      <span className="limit-info-text">{text}</span>
    </div>,
    duration || 2
  );
};

export default RAToast;
