var React = require('react');
var Router = require('react-router');
var AppActionCreators = require('../../actions/AppActionCreators');

var Search = React.createClass({


  getInitialState: function () {
    return {

    };
  },
  componentDidMount: function() {
    AppActionCreators.appLoaded("search","Search","");

  },

  setStateOnAuth: function (loggedIn) {
    this.setState({

    });
  },

  componentWillMount: function () {

  },

  render: function () {

      return (<div>Search</div>);



  }
});

module.exports=Search;
