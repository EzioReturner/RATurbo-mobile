import React from 'react';
import PanelHeader, { RAPanelHeaderProps } from './PanelHeader';
import './index.less';

interface RAPanelProps extends RAPanelHeaderProps {
  panelStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

class RAPanel extends React.Component<RAPanelProps> {
  static PanelHeader: typeof PanelHeader = PanelHeader;

  render() {
    const { panelStyle, bodyStyle, children, ...rest } = this.props;
    return (
      <div className="RAPanel" style={{ ...panelStyle }}>
        <PanelHeader {...{ ...rest }} />
        <div className="RAPanel-body" style={{ ...bodyStyle }}>
          {children}
        </div>
      </div>
    );
  }
}

export default RAPanel;
