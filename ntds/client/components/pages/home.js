let React = require('react');
let Router = require('react-router');
let { Mixins, RaisedButton, Styles } = require('material-ui');
let FullWidthSection = require('../full-width-section');
let TimeSeries = require('../viz/timeseries.react');

let { StylePropable, StyleResizable } = Mixins;
let { Colors, Spacing, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager().getCurrentTheme();
let mui = require('material-ui');

let HomePage = React.createClass({

  mixins: [StylePropable, StyleResizable],

  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    let style = {
      paddingTop: Spacing.desktopKeylineIncrement
    };

    return (
      <div style={style}>



    <FullWidthSection>


    <mui.Card initiallyExpanded={true}>
    <mui.CardHeader
    title="CHP Sales"
    subtitle="for all branches"
    avatar={<mui.Avatar style={{color:'red'}}>A</mui.Avatar>}
showExpandableButton={true}>
</mui.CardHeader>
<mui.CardText>
<TimeSeries/>
</mui.CardText>


</mui.Card>
</FullWidthSection>
</div>
    );
  },

  _getHomePageHero() {
    let styles = {
      root: {
        backgroundColor: Colors.cyan500,
        overflow: 'hidden'
      },
      svgLogo: {
        marginLeft: (window.innerWidth * 0.5) - 130 + 'px',
        width: '420px'
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: '575px'
      },
      label: {
        color: ThemeManager.palette.primary1Color,
      },
      githubStyle: {
        margin: '16px 32px 0px 8px'
      },
      demoStyle: {
        margin: '16px 32px 0px 32px'
      },
      h1: {
        color: Colors.darkWhite,
        fontWeight: Typography.fontWeightLight,
      },
      h2: {
        //.mui-font-style-title
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
      },
      nowrap: {
        whiteSpace: 'nowrap'
      },
      taglineWhenLarge: {
        marginTop: '32px'
      },
      h1WhenLarge: {
        fontSize: '56px'
      },
      h2WhenLarge: {
        //.mui-font-style-headline;
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px'
      }
    };

    styles.h2 = this.mergeStyles(styles.h1, styles.h2);

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.tagline = this.mergeStyles(styles.tagline, styles.taglineWhenLarge);
      styles.h1 = this.mergeStyles(styles.h1, styles.h1WhenLarge);
      styles.h2 = this.mergeStyles(styles.h2, styles.h2WhenLarge);
    }

    return (
      <FullWidthSection >
          <dash/>

      </FullWidthSection>
    );
  },

  _getHomePurpose() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200
      },
      content: {
        maxWidth: '700px',
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        color: Typography.textDarkBlack
      }
    };

    return (
      <FullWidthSection style={styles.root}  >
<dash/>
      </FullWidthSection>
    );
  },

  _getHomeFeatures() {
    let styles = {maxWidth: '906px'};
    return (
      <FullWidthSection useContent={true} contentStyle={styles}>
    <dash/>
      </FullWidthSection>
    );
  },

  _getHomeContribute() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200,
        textAlign: 'center'
      },
      h3: {
        margin: '0',
        padding: '0',
        fontWeight: Typography.fontWeightLight,
        fontSize: '22'
      },
      button: {
        marginTop: 32
      }
    };

    return (
      <FullWidthSection useContent={true} style={styles.root}>

      </FullWidthSection>
    );
  },

  _onDemoClick() {
    this.context.router.transitionTo('components');
  }
});

module.exports = HomePage;
