var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;

var About = require('../components/general/About.react');

var NotFound = require('../components/general/NotFound.react');



let DefaultRoute = Router.DefaultRoute;

// Here we define all our material-ui ReactComponents.
let Master = require('../components/master');
let Home = require('../components/pages/home');

let  reporters= require('../components/pages/reporters/reporters');
let  inactive= require('../components/pages/reporters/inactive');
let  new_reporter = require('../components/pages/reporters/new_reporter');
let  view_reporter = require('../components/pages/reporters/view_reporter');
let  messages= require('../components/pages/reporters/messages');
let  reporter_dashboard = require('../components/pages/reporters/reporter_dashboard');


let  districts= require('../components/pages/districts/districts');
let  view_district= require('../components/pages/districts/view_district');
let  district_dashboard = require('../components/pages/districts/district_dashboard');

let  diseases= require('../components/pages/diseases/diseases');
let  view_disease= require('../components/pages/diseases/view_disease');
let  disease_dashboard = require('../components/pages/diseases/disease_dashboard');









let Routes = (
    <Route name="root" path="/" handler={Master}>

            <Route name="home" handler={Home} />
            <Route name="about" handler={About} />

            <Route path='district_dashboard' handler={district_dashboard}>
                <Route path='view/:id' handler={view_district}/>
                <Route name='districts' handler={districts}/>
                <Redirect from="/districts" to="districts" />
            </Route>

            <Route path='disease_dashboard' handler={disease_dashboard}>
                     <Route name="disease_detail" path='view/:id' handler={view_disease}/>
                     <Route name='diseases' handler={diseases}/>
                     <Redirect from="/diseases" to="diseases" />
            </Route>


            <Route name='reporter_dashboard' handler={reporter_dashboard}>
                <Route path='view/:reporter_id' handler={view_reporter}/>
                <Route name='reporters' handler={reporters}/>
                <Route name='messages' handler={messages}/>
                <Route name='inactive' handler={inactive}/>
                <Redirect from="/reporters" to="reporters" />
            </Route>


            <Redirect from="/" to="messages" />

            <DefaultRoute handler={Home}/>
</Route>
);



module.exports=Routes;
