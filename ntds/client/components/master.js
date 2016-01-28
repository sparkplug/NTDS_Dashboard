let React = require('react');
let Router = require('react-router');
let AppLeftNav = require('./app-left-nav');
let FullWidthSection = require('./full-width-section');
let mui = require('material-ui');
let { AppBar, AppCanvas, IconButton, Menu, Styles } = require('material-ui');

let RouteHandler = Router.RouteHandler;
let { Colors, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager();

var LVTheme = require("../utils/LVTheme");
var Select = require('react-select');









class Master extends React.Component {

  constructor() {
    super();
    this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
  }

  getChildContext() {
        ThemeManager.setTheme(LVTheme);

    return {

      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

    componentWillMount() {
        ThemeManager.setPalette({
            accent1Color: Colors.deepOrange500
        });
    }

  getStyles() {
    let darkWhite = Colors.darkWhite;
    return {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center'
      },
      a: {
        color: darkWhite
      },
        title:{
          fontSize:'18px'
        },
      p: {
        margin: '0 auto',
        padding: '0',
        color: Colors.lightWhite,
        maxWidth: '335px'
      },
      iconButton: {
        color: darkWhite
      },
        search:{
            width:'200px'
        }
    };
  }
  
  
  _logout() {
    window.open(this.state.logoutUrl);
  }


  render() {
    let styles = this.getStyles();
    let title =
      this.context.router.isActive('/diseases') ? 'Diseases Dashboard' :
          this.context.router.isActive('/districts') ? 'Districts Dashboard' :
              this.context.router.isActive('/reporters') ? 'Reporters Dashboard' :
      this.context.router.isActive('messages') ? 'Dashboard' : 'Dashboard';


    let logo=(
            <div>
        <IconButton>
        <img src="/static/img/logo.p" />
        </IconButton>

            </div>
    );
    return (
      <AppCanvas>

        <AppBar
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
          title={"RTI NTDS Dashboard"}
          zDepth={0}
          iconElementRight=<mui.FlatButton style={styles.title}  label={title} />/>

        <AppLeftNav ref="leftNav" />

        <RouteHandler />



      </AppCanvas>
    );
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }
}

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;
