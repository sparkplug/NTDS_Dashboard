const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const AvSkipPrevious = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvSkipPrevious;
