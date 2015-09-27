const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const ActionChangeHistory = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionChangeHistory;
