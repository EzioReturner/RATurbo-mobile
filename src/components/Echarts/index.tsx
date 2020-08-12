import React, { Component } from 'react';
import echarts from './lib';
import { bind, clear } from 'size-sensor';

interface EchartProps {
  option: StoreKeyValue[] | StoreKeyValue;
  theme?: string;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

class EchartsReact extends Component<EchartProps> {
  public echartsDOM: any;

  initChart() {
    const chartObj = this.renderChart();
    bind(this.echartsDOM, () => {
      chartObj.resize();
    });
  }

  componentDidUpdate() {
    this.renderChart();
  }

  getInstance() {
    return (
      echarts.getInstanceByDom(this.echartsDOM) || echarts.init(this.echartsDOM, 'compassMobile')
    );
  }

  componentDidMount() {
    this.initChart();
  }

  componentWillUnmount() {
    this.dispose();
  }

  dispose() {
    clear(this.echartsDOM);
    this.echartsDOM && echarts.dispose(this.echartsDOM);
  }

  renderChart() {
    const chartObj = this.getInstance();
    let { option } = this.props;
    const { notMerge, lazyUpdate } = this.props;
    const _option: Object[] = Array.isArray(option) ? option : [option];
    _option.forEach(op => chartObj.setOption(op || {}, notMerge || false, lazyUpdate || false));
    return chartObj;
  }

  render() {
    const { style, className } = this.props;
    const domStyle = {
      height: '280px',
      ...style
    };
    return (
      <div
        style={domStyle}
        className={`echarts-react ${className || ''}`}
        ref={e => {
          this.echartsDOM = e;
        }}
      />
    );
  }
}

export default EchartsReact;
