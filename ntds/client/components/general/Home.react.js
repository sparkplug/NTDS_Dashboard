var React = require('react');
var Router = require('react-router');
var AppActionCreators = require('../../actions/AppActionCreators');
var Home = React.createClass({


  getInitialState: function () {
    return {

    };
  },

  componentDidMount: function() {
    AppActionCreators.appLoaded("home","Dashboard","");

  },

  componentWillMount: function () {

  },

  render: function () {

      return (<div>Home</div>);



  }
});

module.exports=Home;
