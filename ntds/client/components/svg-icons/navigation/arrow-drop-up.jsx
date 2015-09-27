const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const NavigationArrowDropUp = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 14l5-5 5 5z"/>
      </SvgIcon>
    );
  }

});

module.exports = NavigationArrowDropUp;
