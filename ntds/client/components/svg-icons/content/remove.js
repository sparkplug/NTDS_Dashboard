const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const ContentRemove = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 13H5v-2h14v2z"/>
      </SvgIcon>
    );
  }

});

module.exports = ContentRemove;
