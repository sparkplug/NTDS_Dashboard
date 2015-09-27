const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const ImageStraighten = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageStraighten;