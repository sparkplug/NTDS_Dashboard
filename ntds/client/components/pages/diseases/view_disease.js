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
let ColumnGroup = FixedDataTable.ColumnGroup;

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

let { Colors, Typography,Spacing } = Styles;
let extend = Utils.Extend;
let { StyleResizable,StylePropable } = Mixins;

let DistrictStore = require('../../../stores/DistrictStore');
let ReporterStore = require('../../../stores/ReporterStore');
let DiseaseStore= require('../../../stores/DiseaseStore');
let currentFilterStore = require('../../../stores/currentFilterStore');

var Select = require('react-select');
var FIXED_THRESHOLD = 680;
var MAX_HEIGHT = 800;
var TABLE_OFFSET = 100;
var HEADER_HEIGHT = 50;

let SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC',
};




let Diseases = React.createClass({
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
    var disease = this.context.router.getCurrentParams().id;
    var diseases = DiseaseStore.getAll();
    if (disease){
        diseases = DistrictStore.filter({disease:disease});

    }
    var toret= {
        rows: diseases,
        disease:disease.toUpperCase(),
        sortBy: 'disease',
        sortDir: null,
        date_range:false,
        filteredRows: null,
        chp_filter:false,
        scroll:0,
        fixed: false,
        filterBy: null,
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
    DistrictStore.init();
    ReporterStore.init();
    DiseaseStore.init();
    this._filterRowsBy();
},

componentDidMount () {
    DistrictStore.addChangeListener(this._onChange);
    ReporterStore.addChangeListener(this._onChange);
    currentFilterStore.addChangeListener(this._onChange);
    DiseaseStore.addChangeListener(this._onChange);
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
componentDidUpdate(prevProps){
  let oldId=prevProps.params.id;
    let newId=this.props.params.id;
    if(oldId !== newId){
        var diseases = DistrictStore.filter({disease:newId});

        this.setState({rows:diseases,filteredRows:diseases,disease:newId.toUpperCase()});

    }
},

componentWillUnmount () {
    DistrictStore.removeChangeListener(this._onChange);
    ReporterStore.removeChangeListener(this._onChange);
    currentFilterStore.removeChangeListener(this._onChange);
    DiseaseStore.removeChangeListener(this._onChange);
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
    var branch=this.state.branch;
    var chp_filter=this.state.chp_filter;
    var minDate=this.state.minDate;
    var maxDate=this.state.maxDate;
    var date_range= this.state.date_range;
    var filterBy=filterBy||{};



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

            case "branch":
                branch=filterBy.value;
                break;
            case "minDate":
                minDate=filterBy.value;
                date_range=true;
                break
            case "maxDate":
                maxDate=filterBy.value;
                date_range=true;
                break;
            case "chp_filter":
                chp_filter=filterBy.value;
                break;

            default:
            // do nothing
        }




        if (!_.isEmpty(chp_filter))
        {
            filteredRows=_.findByValues(filteredRows, "chp_id", _.pluck(chp_filter,"value"));
        }

        if(date_range){
            filteredRows=_.filter(filteredRows, function(data){
                return new Date(data.created) >= minDate && new Date(data.created) <= maxDate
            });

        }

        if(branch>0)
        {
            filteredRows=_.where(filteredRows,{branch_id:branch})
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
        this.setState({ chp_filter: false });
    }else{



        this.setState({ chp_filter:values});
    }

    this._filterRowsBy({name:"chp_filter",value:values});
},
_branchFilter(name,e) {


    this.setState({ branch: e.target.value });
    this._filterRowsBy({name:"branch",value:e.target.value});

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
            chp_filter:false,
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
_renderCellDate(cellData){
    return (
        moment(cellData).calendar()
    );

},
_download(){
    this.refs.download.getDOMNode().click();
},
_downloadCSV(event){
    var contents=jsonCSV.JsonToCsv(this.state.filteredRows, "Diseases.csv", true);

    var URL = window.URL || window.webkitURL;
    var blob = new Blob([contents], {type: 'text/csv'});
    event.target.href = URL.createObjectURL(blob);
    event.target.download = 'pregnancies.csv';

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
render()
{

    let styles = this.getStyles();
    var menuItems=[];



    _.each(this.state.branches,function(branch){

        menuItems.push({route: '/branches/view/' + branch.name, text: branch.name})

    });


    var sortDirArrow = '';

    if (this.state.sortDir !== null){
        sortDirArrow = this.state.sortDir === SortTypes.DESC ? ' ↓' : ' ↑';
    }



    return (

        <Card initiallyExpanded={false}>
<CardTitle title={this.state.disease}  />
<Toolbar>

<ToolbarGroup key={1} float="right">
<ToolbarSeparator/>
<a ref="download" onClick={this._downloadCSV.bind(this)} href="javascript:void(0)">
</a>
<RaisedButton
onTouchTap={this._download}
secondry={true}
label="Download CSV" />


</ToolbarGroup>
</Toolbar>


<CardText>



</CardText>



<CardText expandable={false}>
<Table
rowHeight={50}
rowGetter={this._rowGetter}
rowsCount={this.state.filteredRows.length}
width={Spacing.desktopKeylineIncrement * 18}
height={this.state.tableHeight}
overflowX={"auto"}
overflowY={"auto"}
scrollLeft={0.5 * this.state.scroll}
scrollTop={2 * MAX_HEIGHT - 2 * this.state.scroll}



headerHeight={50}>

<Column
headerRenderer={this._renderHeader}
label={'Disease' + (this.state.sortBy === 'disease' ? sortDirArrow : '')}
width={100}
dataKey='disease'
fixed={true}
flexGrow={1}
/>

<Column
headerRenderer={this._renderHeader}
label={'District' + (this.state.sortBy === 'district' ? sortDirArrow : '')}
width={100}
dataKey='district'
fixed={true}
flexGrow={1}
/>
<Column
headerRenderer={this._renderHeader}
label={'Number Of Communities/Schools' + (this.state.sortBy === 'no_of_communities' ? sortDirArrow : '')}
width={200}
dataKey='no_of_communities'
fixed={true}
flexGrow={1}
/>
<Column
headerRenderer={this._renderHeader}
label={'Total' + (this.state.sortBy === 'total' ? sortDirArrow : '')}
width={60}
dataKey='total'
flexGrow={1}
/>


<Column
headerRenderer={this._renderHeader}
label={'Less Than 6 Months Male' + (this.state.sortBy === 'treated_lt_6_male' ? sortDirArrow : '')}
width={200}
dataKey='treated_lt_6_male'
flexGrow={1}
/>
<Column
headerRenderer={this._renderHeader}
label={'Less Than 6 Months Female' + (this.state.sortBy === 'treated_lt_6_female' ? sortDirArrow : '')}
width={200}
dataKey='treated_lt_6_female'
flexGrow={1}
/>



<Column
headerRenderer={this._renderHeader}
label={'6 Months to 4 Yrs Male' + (this.state.sortBy === 'treated_6_to_4_male' ? sortDirArrow : '')}
width={200}
dataKey='treated_6_to_4_male'
flexGrow={1}
/>
<Column
headerRenderer={this._renderHeader}
label={'6 Months to 4 Yrs Female' + (this.state.sortBy === 'treated_6_to_4_female' ? sortDirArrow : '')}
width={200}
dataKey='treated_6_to_4_female'
flexGrow={1}
/>

<Column
headerRenderer={this._renderHeader}
label={'4-14 Yrs Male' + (this.state.sortBy === 'treated_4_to_14_male' ? sortDirArrow : '')}
dataKey='treated_4_to_14_male'
width={200}
flexGrow={1}
/>

<Column
headerRenderer={this._renderHeader}
label={'4-14 Yrs Female' + (this.state.sortBy === 'treated_4_to_14_female' ? sortDirArrow : '')}
width={200}
dataKey='treated_4_to_14_female'
flexGrow={1}
/>
<Column
headerRenderer={this._renderHeader}
label={'Greater Than 14 Male' + (this.state.sortBy === 'treated_gt_14_male' ? sortDirArrow : '')}
width={200}
dataKey='treated_gt_14_male'
flexGrow={1}
/>
<Column
headerRenderer={this._renderHeader}
label={'Greater Than 14 Female' + (this.state.sortBy === 'treated_gt_14_female' ? sortDirArrow : '')}
width={200}
dataKey='treated_gt_14_female'
flexGrow={1}
/>



</Table>
</CardText>
</Card>


)
;

},

});


module.exports = Diseases;