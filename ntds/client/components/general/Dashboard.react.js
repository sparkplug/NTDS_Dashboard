var React = require('react');
var Router = require('react-router');
var SideLinks = require('./SideLinks.react');
var Header = require('./Header.react');
var MainContent = require('./MainContent.react');
var Dashboard = React.createClass({

  render: function () {
    return (
        <div>
          <SideLinks/>
          <Header/>
            <MainContent/>

        </div>


    );
  }
});

module.exports=Dashboard;
