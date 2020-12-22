import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import './index.less';

interface PullToRefreshProps {
  distance: number;
  propsStyle?: React.CSSProperties;
  indicator?: {
    deactivate?: React.ReactNode; // 未达到释放刷新高度时
    release?: React.ReactNode; // 达到释放刷新高度时
    finish?: React.ReactNode; // 回调函数执行结束后
    active?: React.ReactNode; // 达到触发高度释放时状态
  };
  refresh?: boolean;
  disabled?: boolean; // 手动禁用
  render: () => void;
  onRefresh?: () => void;
}

type Status = 'deactivate' | 'release' | 'finish' | 'active';

const PullToRefresh = forwardRef<any, PullToRefreshProps>((props, ref) => {
  const {
    distance: distanceToRefresh,
    propsStyle,
    indicator: prop_indicator,
    refresh,
    onRefresh,
    render,
    disabled
  } = props;
  const pullRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  const [indicator, setIndicator] = useState<StoreKeyValue>({
    deactivate: prop_indicator?.deactivate || '下拉可以刷新',
    release: prop_indicator?.release || <LoadingOutlined className="pull-to-refresh-icon" />,
    finish: prop_indicator?.finish || '完成刷新',
    active: prop_indicator?.active || '松开立即刷新'
  });

  const [status, setStauts] = useState<Status>('deactivate');

  useImperativeHandle(ref, () => ({
    pullRef: pullRef.current
  }));

  useEffect(() => {
    let startScreenY = 0;

    let screenY = 0;

    let translateScreenY = 0;

    let startScreenX = 0;

    // 锁定、阻止上滑时触发
    let lockPullRefresh = false;

    // 刷新就绪
    let readyToRefresh = false;

    const touchstart = (event: any) => {
      if (pullRef.current?.scrollTop !== 0 || disabled) {
        lockPullRefresh = true;
        return;
      } else {
        lockPullRefresh = false;
      }

      if (transitionRef.current) {
        transitionRef.current.style.transition = 'none';
      }

      const touchs = event.targetTouches[0];
      const { screenY: t_screenY, screenX: t_screenX } = touchs;
      startScreenX = t_screenX;
      screenY = startScreenY = t_screenY;

      translateScreenY = 0;
    };

    const caculateTranslateY = (dy: number): number => {
      if (Math.abs(translateScreenY) > 100) {
        return 0;
      }

      const ratio = Math.abs(screenY - startScreenY) / window.screen.height;

      dy *= (1 - ratio) * 0.6;

      return dy;
    };

    const setTranslate = (num: number) => {
      if (transitionRef.current) {
        transitionRef.current.style.transform = `translate3d(0, ${num}px, 0)`;
      }
    };

    const touchmove = (event: any) => {
      const touchs = event.targetTouches[0];
      const { screenY: t_screenY, screenX: t_screenX } = touchs;
      const _diff = Math.round(t_screenY - screenY);

      // 横向滑动不处理
      if (Math.abs(t_screenX - startScreenX) > 20 * window.devicePixelRatio) {
        return;
      }

      if (t_screenY < startScreenY || lockPullRefresh || startScreenY === 0) {
        return;
      }

      event.preventDefault();

      screenY = t_screenY;
      translateScreenY += caculateTranslateY(_diff);

      setTranslate(translateScreenY);

      if (Math.abs(translateScreenY) >= distanceToRefresh) {
        setStauts('active');
        readyToRefresh = true;
      } else {
        readyToRefresh = false;
        setStauts('deactivate');
      }
    };

    const touchend = () => {
      if (lockPullRefresh) return;

      startScreenY = 0;
      if (transitionRef.current) {
        transitionRef.current.style.transition = 'transform 0.3s';
      }
      if (readyToRefresh) {
        onRefresh && onRefresh();
        if (refresh === undefined) {
          release();
          let timer: any = setTimeout(() => {
            reset();
            timer = null;
          }, 1500);
        }
      } else {
        setTranslate(0);
      }
    };

    const reset = () => {
      if (transitionRef.current && pullRef.current) {
        pullRef.current.style.overflow = 'auto';
        transitionRef.current.style.transform = `translate3d(0, 0, 0)`;
      }
      readyToRefresh = false;
      setStauts('finish');
    };

    const release = () => {
      setStauts('release');
      pullRef.current && (pullRef.current.style.overflow = 'hidden');
    };

    if (refresh !== undefined) {
      if (refresh) {
        release();
      } else {
        reset();
      }
    }

    if (pullRef.current) {
      pullRef.current.addEventListener('touchstart', touchstart);
      pullRef.current.addEventListener('touchmove', touchmove);
      pullRef.current.addEventListener('touchend', touchend);
    }

    const clean = () => {
      if (pullRef.current) {
        pullRef.current.removeEventListener('touchstart', touchstart);
        pullRef.current.removeEventListener('touchmove', touchmove);
        /* eslint-disable-next-line */
        pullRef.current.removeEventListener('touchend', touchend);
      }
    };

    return clean;
  }, [distanceToRefresh, onRefresh, refresh, disabled]);

  return (
    <section className="pull-to-refresh" ref={pullRef} style={{ ...propsStyle }}>
      <div id="translateY"></div>
      <div className="pull-to-refresh-transition" ref={transitionRef}>
        <div className="pull-to-refresh-text">{indicator[status]}</div>
        {render()}
      </div>
    </section>
  );
});

export default PullToRefresh;
