import React, { useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './index.less';

interface RAPaginationProps {
  total: number; // 总页数
  pageSize: number; // 一页行数
  current: number; // 当前页数
  onChange?: (current: number) => void;
}

const RAPagination: React.FC<RAPaginationProps> = props => {
  const { total, current, onChange, pageSize } = props;

  const totalPage = Math.ceil(total / pageSize);

  useEffect(() => {
    bindEvent();
  }, []);

  const bindEvent = () => {
    const bl = document.getElementById('RAPagination-button-left');
    const br = document.getElementById('RAPagination-button-right');

    bl?.addEventListener('touchstart', () => {
      bl.className = bl.className + ' touched';
    });

    bl?.addEventListener('touchend', () => {
      bl.className = bl.className.replace(' touched', '');
    });

    br?.addEventListener('touchstart', () => {
      br.className = br.className + ' touched';
    });

    br?.addEventListener('touchend', () => {
      br.className = br.className.replace(' touched', '');
    });
  };

  const handleChangePage = (page: number) => {
    onChange && onChange(page);
  };

  const LeftButton = (
    <div
      className={classnames('RAPagination-button-left', current === 1 && 'disabled')}
      id="RAPagination-button-left"
      onClick={() => current !== 1 && handleChangePage(current - 1)}
    >
      <LeftOutlined className="RAPagination-button-icon" />
      <span className="RAPagination-button-text">上一页</span>
    </div>
  );

  const RightButton = (
    <div
      className={classnames(
        'RAPagination-button-right',
        (current === totalPage || totalPage === 0) && 'disabled'
      )}
      id="RAPagination-button-right"
      onClick={() => current !== totalPage && totalPage !== 0 && handleChangePage(current + 1)}
    >
      <span className="RAPagination-button-text">下一页</span>
      <RightOutlined className="RAPagination-button-icon" />
    </div>
  );

  const PageList = (
    <div className="RAPagination-page-wrap">
      <span>{current}</span>
      <span>/{totalPage}</span>
    </div>
  );

  return (
    <div className="RAPagination">
      <div className="RAPagination-container">
        {LeftButton}
        {PageList}
        {RightButton}
      </div>
    </div>
  );
};

export default RAPagination;
