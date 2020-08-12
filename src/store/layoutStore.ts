import { observable, configure, action, computed } from 'mobx';
import NProgress from 'nprogress';
import { constantRouteConfig, asyncRouteConfig } from '@config/router.config';
import { userStore } from './userStore';
import intersection from 'lodash/intersection';

interface LoadingOptions {
  fixed?: boolean; // 只覆盖路由可视区域
  spinning: boolean; // 开启关闭遮罩
  text?: string | number | React.ReactNode; // 文案
}

configure({ enforceActions: 'observed' });
class LayoutStore {
  // 存放已经初始化完毕的页面
  @observable readyInitializers: Array<string> = [];

  // 开启的菜单
  @observable openMenus: Array<string> = [];

  // 路由数据
  @observable routeConfig: Array<RouteRoot> = [];

  // 全局spinning配置信息
  @observable loadingOptions: LoadingOptions = { spinning: false };

  constructor() {
    this.initMenu();
    this.initEvents();
  }

  @computed
  get authRedirect() {
    const [, app] = this.routeConfig;
    const appRoutes = app.routes;
    if (appRoutes) {
      let redirectPath = '';
      for (let index = 0; index < appRoutes.length; index++) {
        const { redirect, authority: routeAuthority, path } = appRoutes[index];
        if (redirect || path === '/') continue;
        const allowed = !routeAuthority || intersection(userStore.authority, routeAuthority);
        if (allowed) {
          redirectPath = path;
          break;
        }
      }
      return redirectPath;
    }
    return '';
  }

  initEvents() {}

  // 初始化菜单
  @action initMenu(): void {
    const { app, user } = constantRouteConfig;
    app.routes = asyncRouteConfig;
    this.routeConfig = [user, app];
  }

  // 动态设置路由方法
  @action setMenu(menu: Array<RouteRoot>): void {
    this.routeConfig = menu;
  }

  @action ctrlSpinning = (options: LoadingOptions) => {
    this.loadingOptions = options;
  };

  @action ctrlProgress = (type: boolean) => {
    type ? NProgress.start() : NProgress.done(true);
  };

  // 记录懒加载模块并开启loading
  @action addInitializer(initializer: string, loading: boolean = false): void {
    this.readyInitializers.push(initializer);
    loading && this.ctrlSpinning({ spinning: true });
    NProgress.start();
  }

  // 检查是否已加载过
  @action checkIsInitial(route: RouteChild): void {
    const { path, loading } = route;
    if (!this.readyInitializers.includes(path)) {
      this.addInitializer(path, loading);
    }
  }
}
export const layoutStore = new LayoutStore();
export default LayoutStore;
