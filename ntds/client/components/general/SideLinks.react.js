var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;

var SideLinks = React.createClass({
  render: function() {
    return (
        <div className="nav-bar-container">

            <div className="nav-menu">


                <ul className="sub">
                  <div className="hamburger">
                  <li className="menu-item"><Link to="home"><span className="ion-home"></span></Link></li>
                    <li className="menu-item"><Link to="chat"><span className="ion-chatbubbles"></span></Link></li>

                     <li className="menu-item"><Link to="todo"><span className="ion-android-checkbox-outline"></span></Link></li>
                       <li className="menu-item"><Link to="contacts"><span className="ion-person-stalker"></span></Link></li>
                         <li className="menu-item"><Link to="project_list"><span className="ion-android-apps"></span></Link></li>

                      <li className="menu-item"> <Link to="search" > <span className="ion-search"></span></Link></li>


                      </div>




                      <div className="nav-user">
  			<div className="user menu-item">
          <Link to="settings">  <span className="menu-item ion-settings"></span></Link>

  			</div>

  		</div>


                </ul>

                </div>

                <div className="nav-bar-border">

                </div>

                <div className="overlay-secondary"></div>


            </div>
    );
  }
});

module.exports=SideLinks;
