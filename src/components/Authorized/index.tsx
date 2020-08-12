import React from 'react';
import { inject, observer } from 'mobx-react';
import CheckPermission from './CheckPermission';
import UserStore from '@store/userStore';

interface AuthorizedProps {
  routeAuthority?: string[] | string | undefined;
  unidentified: React.ReactNode;
}

interface AuthorizedInjected extends AuthorizedProps {
  userStore: UserStore;
}

const Authorized: React.FC<AuthorizedProps> = props => {
  const {
    userStore: { authority }
  } = props as AuthorizedInjected;

  const { children, routeAuthority, unidentified } = props;
  const _children: React.ReactNode = typeof children === 'undefined' ? null : children;
  const currentAuthority: string | string[] = authority;

  const dom = CheckPermission(routeAuthority, currentAuthority, _children, unidentified);

  return <>{dom}</>;
};

export default inject('userStore')(observer(Authorized));
