import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import './index.less';

interface RAPanelProps {
  closeCallback: (data?: any) => void;
  title: React.ReactNode;
  titleExtra?: React.ReactNode;
}

const RAPanel: React.FC<RAPanelProps> = props => {
  const { closeCallback, title, titleExtra, children } = props;

  return (
    <div className="RAPanel">
      <div className="RAPanel-title">
        <LeftOutlined className="RAPanel-title-icon" onClick={closeCallback} />
        <span className="RAPanel-title-text">{title}</span>
        {titleExtra}
      </div>
      <div className="RAPanel-body">{children}</div>
    </div>
  );
};

export default RAPanel;
