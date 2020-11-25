import React from 'react';
import { Toast } from 'antd-mobile';
import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './index.less';

/**
 * 提示组件
 * @param {text} 提示文字
 * @param {type} toast类型
 * @param {duration} 存在时间
 */


const RAToast = (text: any, type: 'warning' | 'success', duration?: number) => {
  return Toast.info(
    <div className={`toast-info info-${type}`}>
      {type === 'success' ? (
        <CheckCircleOutlined className="toast-info-icon" />
      ) : (
        <InfoCircleOutlined className="toast-info-icon" />
      )}
      <span className="toast-info-text">{text}</span>
    </div>,
    duration || 2
  );
};

export default RAToast;
