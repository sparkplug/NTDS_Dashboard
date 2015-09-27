const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const ImageLandscape = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageLandscape;
