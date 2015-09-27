const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const NavigationExpandMore = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
      </SvgIcon>
    );
  }

});

module.exports = NavigationExpandMore;
