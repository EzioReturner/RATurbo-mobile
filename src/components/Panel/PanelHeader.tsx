import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './index.less';

export interface RAPanelHeaderProps {
  title: React.ReactNode;
  closeCallback?: (data?: any) => void;
  closeNode?: React.ReactNode;
  titleExtra?: React.ReactNode;
  titleStyle?: React.CSSProperties;
  titleClass?: string;
}

const PanelHeader: React.FC<RAPanelHeaderProps> = props => {
  const { closeCallback, title, titleExtra, closeNode, titleStyle, titleClass } = props;

  return (
    <div className={classnames('RAPanel-title', titleClass)} style={{ ...titleStyle }}>
      {closeNode || (
        <LeftOutlined
          className="RAPanel-title-icon"
          onClick={() => closeCallback && closeCallback()}
        />
      )}
      {typeof title === 'string' ? <span className="RAPanel-title-text">{title}</span> : title}
      {titleExtra}
    </div>
  );
};

export default PanelHeader;
