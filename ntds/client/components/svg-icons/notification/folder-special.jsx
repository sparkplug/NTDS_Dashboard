const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
let { SvgIcon } = require('material-ui');

const NotificationFolderSpecial = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6.42 12L10 15.9 6.42 18l.95-4.07-3.16-2.74 4.16-.36L10 7l1.63 3.84 4.16.36-3.16 2.74.95 4.06z"/>
      </SvgIcon>
    );
  }

});

module.exports = NotificationFolderSpecial;
