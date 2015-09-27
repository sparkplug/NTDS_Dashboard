const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const DeviceSignalCellular2Bar = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M2 22h20V2z"/><path d="M14 10L2 22h12z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceSignalCellular2Bar;
