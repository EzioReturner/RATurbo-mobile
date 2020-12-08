const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const getServedPath = () => {
  switch (process.env.NODE_LUCKY_ENV) {
    case 'prod':
      break;
    case 'pre':
      break;
    case 'test2':
      break;
    case 'test':
      break;
    default:
      return 'http://localhost:8080/';
  }
};

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appDllManifest: resolveApp('webpack/dllManifest'),
  appBuildDist: resolveApp('app/public'),
  appBuildDll: resolveApp('webpack/dll'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.tsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  servedPath: getServedPath()
};
