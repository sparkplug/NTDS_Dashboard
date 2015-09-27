const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const ImageBrightness1 = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <circle cx="12" cy="12" r="10"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageBrightness1;
