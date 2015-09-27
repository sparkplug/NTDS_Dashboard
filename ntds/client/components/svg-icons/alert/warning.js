const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const AlertWarning = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
      </SvgIcon>
    );
  }

});

module.exports = AlertWarning;
