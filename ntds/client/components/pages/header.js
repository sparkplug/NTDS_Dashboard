let React = require('react/addons');
let PageWithNav = require('./page-with-nav');
let DistrictStore = require('../../stores/DistrictStore');
let ReporterStore = require('../../stores/ReporterStore');
let currentFilterStore = require('../../stores/currentFilterStore');
let _ = require('lodash');
var Select = require('react-select');
var mui = require('material-ui');

let {
    ClearFix,
    FlatButton,
    FloatingActionButton,
    FontIcon,
    RaisedButton,
    Styles,
    Tab,
    Tabs,
    Utils,
    Mixins,
    SelectField,
    TextField,
    Paper,
    CardText,
    Card,
    CardHeader,
    Avatar,
    CardTitle,
    Toolbar,
    ToolbarGroup,
    DropDownMenu,
    ToolbarTitle,
    DropDownIcon,
    ToolbarSeparator
    } = mui;

let { Colors, Typography } = Styles;
let extend = Utils.Extend;
let { StyleResizable,StylePropable } = Mixins;

var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;


var AppHeader = React.createClass({
    mixins: [StyleResizable,StylePropable, React.addons.LinkedStateMixin],

    getDefaultProps:function(){
      return {
          path:"candidates"
      }  
    },
    getStateFromStores: function(){
        var toret= {
            branches: DistrictStore.getBranchList(),
            chps: ReporterStore.getselectOpts(),
            branch: currentFilterStore.getCurrentBranch(),
            chp:  currentFilterStore.getCurrentCHP(),
            chp_name:"",
            name:"",
            input_props:{required: true}
        };
       
       if  (_.isEmpty(currentFilterStore.getCurrentBranch())){
           
               toret.branch = toret.branches[0];

           
       }else{
           var chps=[];
           
            _.each(_.filter(ReporterStore.getAll(),{branch_id:toret.branch.id}),function(x){chps.push({value:x.id, label:x.surname})});
            toret.chps=chps;
       }
       ;

        return toret;
    },



    getInitialState: function () {
        return this.getStateFromStores();
    },

    componentWillMount: function () {
        DistrictStore.init();
        ReporterStore.init();
    },

    componentDidMount: function() {
        DistrictStore.addChangeListener(this._onChange);
        ReporterStore.addChangeListener(this._onChange);
        currentFilterStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        DistrictStore.removeChangeListener(this._onChange);
        ReporterStore.addChangeListener(this._onChange);
        currentFilterStore.addChangeListener(this._onChange);
    },
onLabelClick: function (data, event) {
    console.log(data, event);

},
componentWillReceiveProps:function(nextProps){
    
},

selectChange: function(data,event){
    currentFilterStore.setCurrentCHP(data);
     this.setState({input_props:{}});

},
    branchChange: function(e){
        currentFilterStore.setCurrentBranch(e.target.value);

    },


    getStyles: function()

{
    let styles = {
        group: {
            width: '100%',
            float: 'left',
            marginBottom: 32
            },
        gr: {
            width: '100%',
            float: 'left',
            marginBottom: 32
            },

        gr2: {
            minWidth: '60%',
            maxWidth: '50%',
            marginTop: '-10px'

},
        margin:{
            marginBottom:'9'
            }};

    return styles;

},

    render: function() {
        var menuItems=[];
        


        _.each(this.state.branches,function(branch){

            menuItems.push({route: '/branches/view/' + branch.name, text: branch.name})

        });

        let styles = this.getStyles();



        return (
            <Toolbar style={styles.margin}>
                <ToolbarGroup key={0} float="left">

<Select
onOptionLabelClick={this.onLabelClick}
className="chpselect"
value={this.state.name}
placeholder="Select the CHP"
inputProps={this.state.input_props}
options={this.state.chps}
style={styles.gr2}
onChange={this.selectChange} />
                </ToolbarGroup>
                
               <ToolbarGroup key={1} float="right"> 
               
               <Link to={this.props.path}>
                  <RaisedButton
          secondary={true}
          linkButton={true}
          style={{marginTop: "10"}}
          
          label="View Data" />
          </Link>
              </ToolbarGroup>  
                <ToolbarGroup key={2} float="right">

                <ToolbarSeparator/>
                 <DropDownMenu
                 valueMember="id"
                  displayMember="name"
                   onChange={this.branchChange}
                    value={this.state.branch.id}
                   menuItems={this.state.branches} />

                </ToolbarGroup>
            </Toolbar>
        );
    },
    _onChange: function() {
        this.setState(this.getStateFromStores());
    }


});

module.exports = AppHeader;