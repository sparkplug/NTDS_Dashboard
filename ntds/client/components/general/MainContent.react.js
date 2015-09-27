var React = require('react');
var Router = require('react-router');
var Router = require('react-router');

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;



var MainContent = React.createClass(


    {


      render: function(){
        return(
            <div>
                <RouteHandler/>
            </div>

        )
      }
    }
);

module.exports= MainContent;
