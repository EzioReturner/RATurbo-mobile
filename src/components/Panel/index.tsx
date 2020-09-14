import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import './index.less';

interface RAPanelProps {
  closeCallback: (data?: any) => void;
  title: React.ReactNode;
  titleExtra?: React.ReactNode;
  panelStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  hideCloseIcon?: boolean;
}

const RAPanel: React.FC<RAPanelProps> = props => {
  const {
    closeCallback,
    title,
    titleExtra,
    panelStyle,
    bodyStyle,
    hideCloseIcon,
    children
  } = props;

  return (
    <div className="RAPanel" style={{ ...panelStyle }}>
      <div className="RAPanel-title">
        {!hideCloseIcon && <LeftOutlined className="RAPanel-title-icon" onClick={closeCallback} />}
        <span className="RAPanel-title-text">{title}</span>
        {titleExtra}
      </div>
      <div className="RAPanel-body" style={{ ...bodyStyle }}>
        {children}
      </div>
    </div>
  );
};

export default RAPanel;
