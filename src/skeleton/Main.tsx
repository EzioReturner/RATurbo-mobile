import React, { Suspense } from 'react';
import Authorized from '@components/Authorized';
import { useLocation } from 'react-router-dom';
import { getRouteAuthority } from '@utils/authorityTools';
import Loading from '@components/Loading';
import './main.less';
import { hot } from 'react-hot-loader';

interface MainSkeletonProps {
  route: RouteRoot;
}

const MainSkeleton: React.FC<MainSkeletonProps> = props => {
  let location = useLocation();

  const { route, children } = props;
  const routeAuthority: undefined | string | string[] = getRouteAuthority(
    location.pathname,
    route.routes
  );

  const Content = (
    <Authorized
      routeAuthority={routeAuthority}
      unidentified={
        <Suspense fallback={<Loading spinning />}>
          <div>403</div>
        </Suspense>
      }
    >
      <div className="RA-mobile-skeleton-view">{children}</div>
    </Authorized>
  );

  return <main className="RA-mobile-skeleton">{Content}</main>;
};

const MainSkeletonHot =
  process.env.NODE_ENV === 'development' ? hot(module)(MainSkeleton) : MainSkeleton;
export default MainSkeletonHot;
