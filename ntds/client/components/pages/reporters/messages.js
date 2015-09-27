let React = require('react/addons');
let PageWithNav = require('../page-with-nav');
let mui = require('material-ui');
let FullWidthSection = require('../../full-width-section');
let FixedDataTable = require('fixed-data-table');
let moment = require("moment");
let jsonCSV =require("../../../utils/csv");
let Column = FixedDataTable.Column;
let PropTypes = React.PropTypes;
let Table = FixedDataTable.Table;
let DistrictStore = require('../../../stores/DistrictStore');
let ReporterStore = require('../../../stores/ReporterStore');
let MessageStore = require('../../../stores/MessageStore');
let currentFilterStore = require('../../../stores/currentFilterStore');

var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;
var ColumnGroup = FixedDataTable.ColumnGroup;
let LocationStore=require('../../../stores/LocationsStore');
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
    ToolbarSeparator,
    CardActions,
    DatePicker,
    Snackbar
    } = mui;

let { Colors, Typography ,Spacing} = Styles;
let extend = Utils.Extend;
let { StyleResizable,StylePropable } = Mixins;



var Select = require('react-select');
var FIXED_THRESHOLD = 680;
var MAX_HEIGHT = 800;
var TABLE_OFFSET = 100;
var HEADER_HEIGHT = 50;

let SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC',
};

let YesNo=[
    { id: 'y', name: 'Yes' },
    { id: 'n', name: 'No' },


];

let actions=[
    {id:'Invite',name:"Invite"},
    {id:'Waiting List',name:"Waiting List"},
    {id:'Out',name:"Out"},

];





let Candidates = React.createClass({
    propTypes: {
        onContentDimensionsChange: PropTypes.func,
        left: PropTypes.number,
        top: PropTypes.number,
    },


    mixins: [StyleResizable,StylePropable, React.addons.LinkedStateMixin],
    contextTypes: {
        muiTheme: React.PropTypes.object,
        router: React.PropTypes.func
    },
    _onContentHeightChange(contentHeight) {
    this.props.onContentDimensionsChange &&
    this.props.onContentDimensionsChange(
        contentHeight,
        Math.max(600, this.props.tableWidth)
    );
},

getStateFromStores(){
    var win = window;
    let minDate = new Date();
    let maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() -1);
    minDate.setHours(0,0,0,0);
    maxDate.setFullYear(maxDate.getFullYear() +1);
    maxDate.setHours(0,0,0,0);

    var widthOffset = win.innerWidth < 680 ? 0 : 240;
    var toret= {
        branch: false,
        rows: MessageStore.getAll(),
        reporter_filter:"",
        sortBy: 'date',
        sortDir: null,
        date_range:false,
        filteredRows: null,
        reporter_filter:false,
        scroll:0,
        fixed: false,
        direction:null,
        direction_filter:"0",
        date_filter:"0",
        filterBy: null,
        districts: currentFilterStore.getDistricts(),
        reporter_opts:ReporterStore.getOpts(),
        district:"0",
        tableWidth: win.innerWidth - widthOffset,
        tableHeight: win.innerHeight - 200,
        minDate: minDate,
        maxDate: maxDate,

    };
    toret.filteredRows=toret.rows;



    return toret;
},


getInitialState()
{
    return this.getStateFromStores();
}
,
componentWillMount () {
    ReporterStore.init();
    MessageStore.init();
    LocationStore.init();
    this._filterRowsBy();
},

componentDidMount () {
    ReporterStore.addChangeListener(this._onChange);
    currentFilterStore.addChangeListener(this._onChange);
    MessageStore.addChangeListener(this._onChange);
    LocationStore.addChangeListener(this._onChange);
    this.offsetWidth = this._getWindowWidth();
    this.offsetHeight = this.getDOMNode().offsetHeight;
    var win = window;

    var widthOffset = win.innerWidth < 680 ? 0 : 240;

    this.setState({
        renderPage: true,
        tableWidth: win.innerWidth - widthOffset,
        tableHeight: win.innerHeight - 200,
    });


    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);

    //this.setState({
    //fixed: this.offsetWidth <= FIXED_THRESHOLD,
    //});
},

componentWillUnmount () {
    ReporterStore.removeChangeListener(this._onChange);
    currentFilterStore.removeChangeListener(this._onChange);
    LocationStore.removeChangeListener(this._onChange);
    MessageStore.removeChangeListener(this._onChange);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
},
handleResize(event) {
    this.offsetWidth = this._getWindowWidth();
    this.offsetHeight = this.getDOMNode().offsetHeight;

    var win = window;

    var widthOffset = win.innerWidth < 680 ? 0 : 240;

    this.setState({
        renderPage: true,
        tableWidth: win.innerWidth - widthOffset,
        tableHeight: win.innerHeight - 200,
        fixed: this.offsetWidth <= FIXED_THRESHOLD,
    });
    this.forceUpdate();
},

handleScroll(event) {
    var scrollPos = window.scrollY;
    scrollPos = scrollPos < this.offsetHeight ? scrollPos : this.offsetHeight;
    this.setState({ scroll: Math.max(scrollPos, 0) });
},

_getWindowWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
},
_onChange: function() {
    this.setState(this.getStateFromStores());

},

_filterRowsBy(filterBy) {
    var district=this.state.district;
    let reporter_filter=this.state.reporter_filter;
    var minDate=this.state.minDate;
    var maxDate=this.state.maxDate;
    var date_range= this.state.date_range;
    var filterBy=filterBy||{};
    let direction=this.state.direction;



    if (_.isEmpty(this.state.rows)){
        return ;

    }else{
        var filteredRows=this.state.rows.slice();



        _.mixin({
            'findByValues': function(collection, property, values) {
                return _.filter(collection, function(item) {
                    return _.contains(values, item[property]);
                });
            }
        });

        switch(filterBy.name) {

            case "district":
                district=filterBy.value;
                if(district==="0"){
                    district=null;
                }

                break;
            case "minDate":
                minDate=filterBy.value;
                date_range=true;
                break
            case "maxDate":
                maxDate=filterBy.value;
                date_range=true;
                break;
            case "reporter_filter":
                let v =_.pluck(values,'value');
                if (v.length === 0){
                    reporter_filter=false
                }else{
                    reporter_filter=filterBy.value;
                }


                break;

            case "direction":
                direction=filterBy.value;
                if(direction==="0"){
                    direction=null;
                }
                break;
            default:
            // do nothing
        }


        if(district==="0"){
            district=null;
        }

        if (!_.isEmpty(reporter_filter))
        {
            filteredRows=_.findByValues(filteredRows, "identity", _.pluck(reporter_filter,"value"));
        }

        if(date_range&&minDate){
            filteredRows=_.filter(filteredRows, function(data){
                return new Date(data.date) >= minDate && new Date(data.date) <= maxDate
            });

        }


        if((district))
        {
            filteredRows=_.where(filteredRows,{district:district})
        }

        if(direction)
        {
            filteredRows=_.where(filteredRows,{direction:direction})
        }

        this.setState({
            filteredRows,
        });
    }


},
_onFilterChange(value,values) {
    var v =_.pluck(values,'value');
    if (v.length === 0)
    {
        this.setState({ reporter_filter: false });
    }else{



        this.setState({ reporter_filter:values});
    }

    this._filterRowsBy({name:"reporter_filter",value:values});
},
_districtFilter(e) {


    this.setState({ district: e.target.value });
    this._filterRowsBy({name:"district",value:e.target.value});

},


getStyles()

{
    let borderColor = this.context.muiTheme.palette.borderColor;
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
        margin:{
            marginBottom:'9'
        },

        desc: {
            borderBottom: 'solid 1px ' + borderColor,
            paddingTop: '8px',
            paddingBottom: '40px',
            marginBottom: '24px',
            //mui-font-style-subhead-1
            fontSize: '15px',
            letterSpacing: '0',
            lineHeight: '24px',
            color: Typography.textDarkBlack
        },
        ol: {
            fontSize: '13px',
            paddingLeft: '48px'
        },
        componentInfo: {
            borderTop: 'solid 1px ' + borderColor,
            paddingTop: '24px',
            marginTop: '24px'
        },
        componentInfoWhenFirstChild: {
            borderTop: 'none',
            marginTop: '0',
            paddingTop: '0'
        },
        headline: {
            //headline
            fontSize: '24px',
            lineHeight: '32px',
            paddingTop: '16px',
            marginBottom: '12px',
            letterSpacing: '0',
            fontWeight: Typography.fontWeightNormal,
            color: Typography.textDarkBlack,
            paddingLeft: '10px'
        },
        root: {
            //.mui-font-style-subhead-1
            fontSize: '15px',
            letterSpacing: '0',
            fontWeight: Typography.fontWeightNormal,
            lineHeight: '24px',
            paddingTop: '3px',
            marginBottom: '13px',
            color: Typography.textDarkBlack,
            width: '100%'
        },
        table: {
            borderCollapse: 'collapse',
            borderSpacing: '0'
        },
        td: {
            padding: '16px 0',
            verticalAlign: 'top'
        },
        name: {
            position: 'absolute',
            fontWeight: Typography.fontWeightMedium
        },

        header: {
            paddingTop: '0'
        },
        card:{
            width: '100%'

        },
        gr2: {
            minWidth: '60%',
            maxWidth: '50%',
            marginTop: '-10px'

        },
        label:{
            color: '#000000 !important',
            fontWeight: '500 !important',
            marginBottom: '20px',
            margin: '0 9px',
            fontSize: '17px'




        },
        submit:{

            whiteSpace: 'pre',
            cursor: 'pointer',
            position: 'relative',
            textAlign: 'center',
            lineHeight: '24px',
            width: '50%',
            top: '0px',
            left: '0px',
            marginTop: '24px',
            marginRight: 'auto',
            marginLeft: 'auto',
            padding: '0px 8px'

        },
        sublabel:{
            margin: '0 9px',
        },
        filter:{
            marginLeft:'50'
        },

        body:{
            paddingTop: '0px'
        },

        descWhenMedium :{
            paddingTop: '16px'
        },
        tdWhenLarge: {
            padding: '32px 0'
        },
        nameWhenLarge: {
            minWidth: '128px'
        },
        descWhenLarge :{
            paddingTop: '32px'
        },
        descWhenLastChild: {
            borderBottom: 'none'
        }
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
        styles.group.width = '50%';
    }

    return styles;
}
,
_rowGetter(rowIndex) {
    if (_.isEmpty(this.state.rows)){
        return ;

    };

    return this.state.filteredRows[rowIndex];
},


_sortRowsBy(cellDataKey) {

    var sortDir = this.state.sortDir;
    var sortBy = cellDataKey;
    if (sortBy === this.state.sortBy) {
        sortDir = this.state.sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC;
    } else {
        sortDir = SortTypes.DESC;
    }

    var filteredRows = this.state.filteredRows.slice();
    filteredRows.sort((a, b) => {
        var sortVal = 0;
    if (a[sortBy] > b[sortBy]) {
        sortVal = 1;
    }
    if (a[sortBy] < b[sortBy]) {
        sortVal = -1;
    }

    if (sortDir === SortTypes.DESC) {
        sortVal = sortVal * -1;
    }

    return sortVal;
});

this.setState({
    filteredRows,
    sortBy,
    sortDir,
});
},
_clearFilters(){
    this.setState(
        {
            filteredRows:this.state.rows,
            branch: false,
            reporter_filter:false,
            date_range:false
        }
    )
    this.refs.snackbar.show();
},

_renderHeader(label, cellDataKey) {
    return (
        <a onClick={this._sortRowsBy.bind(null, cellDataKey)}>{label}</a>
);
},

_renderName(cellData,cellDataKey,rowData){

    return (
        <Link to="/reporter_dashboar/view/6"  query={{id: rowData.id}}>{cellData}</Link>
);

},
_renderYesNo(cellData,cellDataKey,rowData){

    return (

        <div  >

        <SelectField
    onBlur={this._handleChange}
value={cellData}
errorText={this.state.can_speak_english_error}
valueMember="id"
displayMember="name"
menuItems={YesNo} />




</div>
);

},
_renderActions(cellData,cellDataKey,rowData){

    return (
        <SelectField
    onBlur={this._handleChange}
value={cellData}
errorText={this.state.can_speak_english_error}
valueMember="id"
displayMember="name"
menuItems={actions} />
);

},
_renderInterviewComments(cellData,cellDataKey,rowData){

    return (
        <TextField

    value={cellData}

    errorText={this.state.years_at_location_error}
onChange={this._handleChange}

/>
);

},
_download(){
    this.refs.download.getDOMNode().click();
},
_downloadCSV(event){
    var contents=jsonCSV.JsonToCsv(this.state.filteredRows);

    var URL = window.URL || window.webkitURL;
    var blob = new Blob([contents], {type: 'text/csv'});
    event.target.href = URL.createObjectURL(blob);
    event.target.download = 'candidates.csv';

},
_updateMinDate(nill, date) {
    this.setState({
        minDate: new Date(date),
        date_range:true
    });
    this._filterRowsBy({name:"minDate",value:date});
},

_updateMaxDate(nill, date) {
    this.setState({
        maxDate: new Date(date),
        date_range:true
    });
    this._filterRowsBy({name:"maxDate",value:date});
},
_directionFilter(e){
    var direction= e.target.value;
    if(direction==="0"){
        direction=null;
    }
    this.setState({direction: direction });
    this._filterRowsBy({name:"direction",value:direction});

},
_renderCellDate(cellData){
    return (
        moment(cellData).calendar()
    );

},
_dateFilter(e){
    var day=86465753;
    var min_date=null;
    var today = moment(new Date());
    var date_range=true;

    switch(e.target.value){
        case "0":
            date_range=false;


            break;
        case "1":
            min_date=new Date(today.diff(day));

            break;
        case "2":
            min_date=new Date(today.diff(day*7));
            break

        case "3":
            min_date=new Date(today.diff(day*30));

            break;

        case "4":
            min_date=new Date(today.diff(day*120));
            break

        case "5":
            min_date=new Date(today.diff(day*365));
            break

        default:
            this.setState({

                date_range:false
            });





    }

    this.setState({
        minDate: min_date,
        date_range:date_range
    });
    this._filterRowsBy({name:"minDate",value:min_date});

},
render()
{

    let styles = this.getStyles();
    let directionFilters=[{id:"0",name:"Filter By Status"},{id:"O",name:"Outgoing"},{id:"I",name:"Incoming"}];

    let dateFilters=[{id:"0",name:"Filter By Date"},{id:"1",name:"View Today"},{id:"2",name:"View This Week"},{id:"3",name:"View This Month"},{id:"4",name:"View This Quarter"},{id:"5",name:"View This Year"}];
    let districtFilters=[{id:"0",name:"Filter By District"},{id:"Kubuku",name:"Kubuku"},{id:"Yumbe",name:"Yumbe"}]



    var sortDirArrow = '';

    if (this.state.sortDir !== null){
        sortDirArrow = this.state.sortDir === SortTypes.DESC ? ' ↓' : ' ↑';
    }

    let keys = _.keys(_.first(this.state.filteredRows));

    let columns=keys.map(function(key){
        return(

            <Column
        headerRenderer={this._renderHeader}
    label={key.toUpperCase() + (this.state.sortBy === key ? sortDirArrow : '')}
width={150}
dataKey={key}
flexGrow={1}

/>

)
},this);




return (

    <Card initiallyExpanded={false}>

<CardTitle title="Messages"  subtitle={this.state.filteredRows.length + " "+"messages"}/>
<Toolbar>

<ToolbarGroup key={1} float="left">

<DropDownMenu
valueMember="id"
displayMember="name"
onChange={this._districtFilter}
value={this.state.district}
menuItems={districtFilters} />

</ToolbarGroup>
<ToolbarGroup key={2} float="left">
<ToolbarSeparator/>
<DropDownMenu
valueMember="id"
displayMember="name"
onChange={this._directionFilter}
value={this.state.direction_filter}
menuItems={directionFilters} />
</ToolbarGroup>




<ToolbarGroup key={3} float="left">
<ToolbarSeparator/>
<DropDownMenu
valueMember="id"
displayMember="name"
onChange={this._dateFilter}
value={this.state.date_filter}
menuItems={dateFilters} />

</ToolbarGroup>


<ToolbarGroup key={4} float="right">
<ToolbarSeparator/>
<a ref="download" onClick={this._downloadCSV.bind(this)} href="javascript:void(0)">
</a>
<RaisedButton
onTouchTap={this._download}
secondry={true}
label="Download CSV" />


</ToolbarGroup>
</Toolbar>








<CardText expandable={false}>
<div style={{marginBottom:"50"}}>
<Select
className="chpselect_data"
placeholder="Select the Reporter(s)"

multi={true}
options={this.state.reporter_opts}
style={styles.gr2}
value={this.state.reporter_filter}
onChange={this._onFilterChange} />
</div>
<Table
rowHeight={50}
groupHeaderHeight={50}
rowGetter={this._rowGetter}
rowsCount={this.state.filteredRows.length}
width={Spacing.desktopKeylineIncrement * 18}
height={this.state.tableHeight}
overflowX={"auto"}
overflowY={"auto"}
scrollLeft={0.5 * this.state.scroll}
scrollTop={2 * MAX_HEIGHT - 2 * this.state.scroll}
headerHeight={50}>



<ColumnGroup
fixed={true}
label="Message">
<Column
headerRenderer={this._renderHeader}
label={"Text" + (this.state.sortBy === "text" ? sortDirArrow : '')}
width={300}
dataKey={"text"}
flexGrow={1}
    fixed={true}
/>
    <Column
headerRenderer={this._renderHeader}
label={"Date" + (this.state.sortBy === "date" ? sortDirArrow : '')}
width={300}
dataKey={"date"}
flexGrow={1}
fixed={true}
cellRenderer={this._renderCellDate}
/>
<Column
headerRenderer={this._renderHeader}
label={"Direction" + (this.state.sortBy === "direction" ? sortDirArrow : '')}
width={200}
dataKey={"direction"}
flexGrow={1}
/>


    </ColumnGroup>



<ColumnGroup

label="Reporter">
<Column
headerRenderer={this._renderHeader}
label={"Name" + (this.state.sortBy === "name" ? sortDirArrow : '')}
width={200}
dataKey={"name"}
flexGrow={1}

/>
<Column
headerRenderer={this._renderHeader}
label={"Mobile" + (this.state.sortBy === "identity" ? sortDirArrow : '')}
width={200}

dataKey={"identity"}
flexGrow={1}
/>

<Column
headerRenderer={this._renderHeader}
label={"District" + (this.state.sortBy === "district" ? sortDirArrow : '')}
width={200}
dataKey={"district"}
flexGrow={1}

/>

<Column
headerRenderer={this._renderHeader}
label={"Subcounty" + (this.state.sortBy === "subcounty" ? sortDirArrow : '')}
width={200}
dataKey={"subcounty"}
flexGrow={1}

/>

<Column
headerRenderer={this._renderHeader}
label={"Parish" + (this.state.sortBy === "parish" ? sortDirArrow : '')}
width={200}
dataKey={"parish"}
flexGrow={1}
/>





</ColumnGroup>


</Table>

</CardText>
</Card>


)
;

},

});


module.exports = Candidates;