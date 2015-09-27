const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const AvVolumeMute = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvVolumeMute;
