const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const ContentForward = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 8V4l8 8-8 8v-4H4V8z"/>
      </SvgIcon>
    );
  }

});

module.exports = ContentForward;
