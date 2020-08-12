import React from 'react';
import { PieChartOutlined } from '@ant-design/icons';

export const constantRouteConfig: { app: RouteRoot; user: RouteRoot } = {
  app: {
    path: '/',
    component: ['/skeleton/Main', 'notAnimate'],
    authority: ['admin', 'guest'],
    routes: []
  },
  user: {
    path: '/user',
    component: ['/skeleton/User', 'notAnimate'],
    routes: []
  }
};

export const asyncRouteConfig: RouteChild[] = [
  {
    path: '/',
    exact: true,
    redirect: '/dashboard',
    hideMenu: true
  },
  {
    name: 'dashboard',
    icon: <PieChartOutlined />,
    path: '/dashboard',
    component: ['/views/Dashboard', 'fadeRA'],
    loading: true
  }
];
