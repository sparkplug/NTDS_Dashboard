const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const AvSkipNext = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvSkipNext;
