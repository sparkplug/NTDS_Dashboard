var React = require('react');
var Router = require('react-router');

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;
var _ = require('lodash');
var async = require('async');
var request = require('superagent');
require('superagent-as-promised')(request);
var moment = require("moment");
var Routes = require('./config/Routes.react');
window.moment=moment;
window.React = React; // export for http://fb.me/react-devtools
var injectTapEventPlugin = require("react-tap-event-plugin");
var fs = require("fs");

window.reductio = require('reductio');
window.crossfilter = require('crossfilter');



module.exports = {
    launch: function () {
        var self = window.app = this;
            
            
        window._=_;
        window.request = request;
       
        async.series([
           
            function (cb) {

            
                injectTapEventPlugin();


                Router
                    // Runs the router, similiar to the Router.run method. You can think of it as an
                    // initializer/constructor method.
                    .create({
                        routes: Routes,
                        scrollBehavior: Router.ScrollToTopBehavior
                    })
                    // This is our callback function, whenever the url changes it will be called again.
                    // Handler: The ReactComponent class that will be rendered
                    .run(function (Handler) {
                        React.render(<Handler/>, document.getElementById('app_container'));
                    });
                    
                    
                    



            },function(cb){
                CandidateStore.fetch();
                
            }
          
             
        ]);
      
        
        
         

    }

};

module.exports.launch();


