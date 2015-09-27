const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const DeviceSignalCellular4Bar = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M2 22h20V2z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceSignalCellular4Bar;
