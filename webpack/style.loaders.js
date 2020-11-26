const path = require('path');
const postcssNormalize = require('postcss-normalize');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const paths = require('./paths');

function _resolve(track) {
  return path.join(__dirname, '..', track);
}

module.exports = function() {
  const isEnvDevelopment = process.env.NODE_ENV === 'development';
  const isEnvProduction = process.env.NODE_ENV === 'production';
  const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
  const publicPath = isEnvProduction ? paths.servedPath : isEnvDevelopment && '/';

  const getStyleLoaders = (cssOption, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: publicPath === './' ? { publicPath: '../../' } : {}
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOption
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap,
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009'
              },
              stage: 3
            }),
            postcssNormalize(),
            require('postcss-px-to-viewport')({
              unitToConvert: 'px',
              viewportWidth: 375,
              unitPrecision: 3,
              propList: ['*'],
              viewportUnit: 'vw',
              fontViewportUnit: 'vw',
              selectorBlackList: [],
              minPixelValue: 1,
              mediaQuery: false,
              replace: true,
              exclude: /(\/|\\)(node_modules)(\/|\\)/
            })
            // require('postcss-px2rem')({ remUnit: 20 })
          ]
        }
      }
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: Object.assign(
          {},
          {
            sourceMap: isEnvProduction && shouldUseSourceMap
          },
          preProcessor === 'less-loader'
            ? {
                javascriptEnabled: true,
                modifyVars: {
                  'brand-primary': '#586fbc'
                }
              }
            : undefined
        )
      });
    }
    if (preProcessor === 'less-loader') {
      loaders.push({
        loader: 'sass-resources-loader',
        options: {
          resources: [_resolve('./src/styles/mainVars.less')]
        }
      });
    }
    return loaders;
  };
  return [
    {
      test: cssRegex,
      exclude: cssModuleRegex,
      use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: false
      }),
      sideEffects: true
    },
    {
      test: cssModuleRegex,
      use: getStyleLoaders({
        importLoaders: 2,
        sourceMap: shouldUseSourceMap,
        modules: {
          mode: 'local',
          localIdentName: '[local]--[hash:base64:5]'
        }
      })
    },
    {
      test: lessRegex,
      exclude: lessModuleRegex,
      use: getStyleLoaders(
        {
          sourceMap: false,
          importLoaders: 2
        },
        'less-loader'
      )
    },
    {
      test: lessModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
          sourceMap: false,
          modules: {
            mode: 'local',
            localIdentName: '[local]--[hash:base64:5]'
          }
        },
        'less-loader'
      )
    }
  ];
};
