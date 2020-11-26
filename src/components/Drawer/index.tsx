import React from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import './drawer.less';

/**
 * 抽屉组件
 * @param {open} 开启抽屉
 * @param {openChange} 调整开启函数
 * @param {direction} 抽屉出现方向
 * @param {wrapperStyle} 容器样式
 * @param {maskStyle} 遮罩样式
 * @param {drawerStyle} 抽屉样式
 */

interface RADrawerProps {
  open: boolean;
  openChange: (open: boolean) => void;
  direction?: 'up' | 'left' | 'down' | 'right';
  wrapperStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  drawerStyle?: React.CSSProperties;
}

const RADrawer: React.FC<RADrawerProps> = props => {
  const { open, children, openChange, wrapperStyle, maskStyle, drawerStyle, direction } = props;

  let _direction = direction || 'up';

  return ReactDOM.createPortal(
    <div
      className={classnames(
        'RA-drawer',
        open && 'RA-drawer-opened',
        `RA-drawer-direction-${_direction}`
      )}
      style={{ ...drawerStyle }}
    >
      <div
        className="RA-drawer-mask"
        style={{ ...maskStyle }}
        onClick={() => {
          openChange(false);
        }}
      ></div>
      <div className="RA-drawer-wrapper" style={{ ...wrapperStyle }}>
        {children}
      </div>
    </div>,
    document.getElementsByTagName('body')[0]
  );
};

export default RADrawer;
