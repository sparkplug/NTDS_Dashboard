let React = require('react/addons');
let PageWithNav = require('../page-with-nav');
let mui = require('material-ui');
let FullWidthSection = require('../../full-width-section');
let Header = require('../header');
let DistrictStore = require('../../../stores/DistrictStore');
let ReporterStore = require('../../../stores/ReporterStore');
let DiseaseStore = require('../../../stores/DiseaseStore');
let currentFilterStore = require('../../../stores/currentFilterStore');
let CandidateActions = require('../../../actions/CandidateActionCreators');
let validation = require('../../../utils/validation');
var Select = require('react-select');

var keyMirror = require('keymirror');
let  ENTER_KEY_CODE = 13;
let TAB_KEY_CODE= 9;
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
    Snackbar,
    DatePicker,
    RadioButtonGroup,
    RadioButton,
    Checkbox
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

let BiodataTests = React.createClass({

    mixins: [StyleResizable,StylePropable, React.addons.LinkedStateMixin],
    contextTypes: {
        muiTheme: React.PropTypes.object,
        router: React.PropTypes.func
    },




    getStateFromStores(){
    var other={};


    var id = this.context.router.getCurrentQuery().id;
    if (id){
        var cand = ReporterStore.get(id);
        if (cand === undefined){
            this.context.router.transitionTo("biodata_and_test");

        }else{
            candidate=cand;
            other= keyMirror(_.zipObject(candidate.other_languages.split(",")))
        }
    }

    var toret= {
        branches: DistrictStore.getBranchList(),
        branch: currentFilterStore.getCurrentBranch(),
        chp:  currentFilterStore.getCurrentCHP(),
        villages: currentFilterStore.getVillages(),
        districts:currentFilterStore.getDistricts(),
        subcounties:currentFilterStore.getSubcounties(),
        parishes:currentFilterStore.getParishes()


    };

    return  toret;
},


getInitialState()
{
    var candidate={
        ref_name:"",
        ref_mobile:"",
        ref_date:moment(new Date()).calendar("DD-MM-YYYYYY"),
        ref_title:"",
        date:moment(new Date()).calendar("DD-MM-YYYYYY"),
        name:"",
        total:0,
        gender:"",
        district:"",
        mobile:"",
        age:"",
        subcounty:"",
        division:'',
        village:"",
        parish:"",
        reading_comprehension:"",
        about_you:"",
        business_math:"",
        zone:"",
        ward:"",
        cell:"",
        physical_feature:"",
        can_speak_english:"",
        years_at_location:"",
        other_languages:"",
        worked_for_brac:"",
        brac_chp:"",
        education:"",
        branch_id:null,
        business_experience:"",
        group_membership:"",
        financial_accounts:"",
        qualify_for_training:"",
        invite_to_training:"",
        comfirmed_attendence:"",
        eligible_for_interview:"",
        interview_completed_by:0,
        interview_overall_motivation:0,
        interview_ability_to_work_with_communities:0,
        interview_mentality:0,
        interview_selling_skills:0,
        interview_interest_in_health:0,
        interview_ability_to_invest:0,
        interview_interpersonal_skills:0,
        interview_ability_to_commit:0,
        interview_score:0,
        interview_conditions_preventing_joining:"",
        interview_comments:"",
        comfirmed_training_attendence:"",
        post_interview_notes:"",
        comfirmed_training_attendence:"",
        invite_to_training:"",



    };
    var other={};


    var id = this.context.router.getCurrentQuery().id;
    if (id){
        var cand = ReporterStore.get(id);
        if (cand === undefined){
            this.context.router.transitionTo("biodata_and_test");

        }else{
            candidate=cand;
            other= keyMirror(_.zipObject(candidate.other_languages.split(",")))
        }
    }




    var toret= {

        districts:currentFilterStore.getDistricts(),
        subcounties:currentFilterStore.getSubcounties(),
        parishes:currentFilterStore.getParishes(),
        candidate:candidate,
        //error texts
        ref_name_error:"",
        ref_mobile_error:"",
        ref_date_error:"",
        name_error:"",
        gender_error:"",
        district_error:"",
        mobile_error:"",
        age_error:"",
        subcounty_error:"",
        division_error:'',
        village_error:"",
        parish_error:"",
        reading_comprehension_error:"",
        about_you_error:"",
        business_math_error:"",
        zone_error:"",
        ward_error:"",
        cell_error:"",
        physical_feature_error:"",
        can_speak_english_error:"",
        years_at_location_error:"",
        other_languages_error:"",
        worked_for_brac_error:"",
        brac_chp_error:"",
        education_error:"",
        business_experience_error:"",
        group_membership_error:"",
        financial_accounts_error:"",
        villages: currentFilterStore.getVillages(),
        districts:currentFilterStore.getDistricts(),
        subcounties:currentFilterStore.getSubcounties(),
        parishes:currentFilterStore.getParishes()

    };

    return  _.assign(other,toret,candidate);
}
,

componentWillMount () {
    LocationsStore.init();
    DistrictStore.init();
    DiseaseStore.init();

},

componentDidMount () {
    DistrictStore.addChangeListener(this._onChange);
    DiseaseStore.addChangeListener(this._onChange);
    currentFilterStore.addChangeListener(this._onChange);
    LocationsStore.addChangeListener(this._onChange);
},

componentWillUnmount () {
    DistrictStore.removeChangeListener(this._onChange);
    DiseaseStore.removeChangeListener(this._onChange);
    currentFilterStore.removeChangeListener(this._onChange);
    LocationsStore.removeChangeListener(this._onChange);
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
        group1: {
            width: '190%',
            float: 'left',
            marginBottom: 32
        },
        group11: {
            width: '190%',
            float: 'left',
            marginBottom: 32,
            marginLeft:'15'
        },
        group3: {
            float: 'left',
            marginBottom: 32
        },
        textfield: {
            marginTop: 24
        },
        bold: {
            marginTop: 24,
            fontWeight:"bolder"
        },
        textfield3: {
            marginTop: 24,
            marginLeft:6
        },
        textfield1: {
            marginTop: 24,
            width: '50%'
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
        hr:{
            width: '200%'

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
        subc:{
            marginTop:'60px',
            width: '100%',
            float: 'left',
            marginBottom: 32
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

render()
{

    let styles = this.getStyles();
    let Gender = [
        { payload: 'm', text: 'Male' },
        { payload: 'f', text: 'Female' },
    ];

    let GenderOpts=[
        { id: 'm', name: 'Male' },
        { id: 'f', name: 'Female' },


    ];

    let YesNo=[
        { id: 'y', name: 'Yes' },
        { id: 'n', name: 'No' },


    ];

    let languages=[
        {id:'lango',name:"Lango"},
        {id:'luganda',name:"Luganda"},
        {id:'luo',name:"Luo"},
        {id:'lusoga',name:"Lusoga"},
        {id:'swahili',name:"Swahili"},



    ];


    let education =[
        { id: 'Less than P7', name: 'Less than P7' },
        { id: 'P7', name: 'P7' },
        { id: 'S1', name: 'S1' },
        { id: 'S2', name: 'S2' },
        { id: 'S3', name: 'S3' },
        { id: 'S4', name: 'S4' },
        { id: 'S5', name: 'S5' },
        { id: 'S6', name: 'S6' },
        { id: 'Tertiary institution', name: 'Tertiary institution' },
    ];


    return (
        <div candidate={this.get_initial_candidate} ref="candidates">
<Card>

<CardTitle title="Community Health Promoter" subtitle="Candidate Bio-Data"/>

<div style={styles.group11}>
<SelectField
style={styles.textfield1}
floatingLabelText="Branch:"
valueLink={this.linkState('branch_id')}
valueMember="id"
displayMember="name"
ref="branch"
name="branch"
menuItems={DistrictStore.getOpts()} />
</div>




<form onSubmit={this._createCandidate}>
<CardText>


<div style={styles.group1}>

<TextField
hintText="Firstname Lastname"
ref="ref_name"
name="ref_name"
value={this.state.ref_name}
tabIndex={1}
required={true}
onChange={this._handleChange.bind(this,"ref_name")}
style={styles.textfield1}
floatingLabelText="Referral Name" />
</div>
<div style={styles.group1}>

<TextField
ref="ref_mobile"
name="ref_mobile"
value={this.state.ref_mobile}
tabIndex={2}
style={styles.textfield1}
errorText={this.state.ref_mobile_error}
onChange={this._handleChange.bind(this,"ref_mobile")}
floatingLabelText="Referral Mobile" />

</div>

<div style={styles.group1}>

<TextField
ref="ref_title"
name="ref_title"
required={true}
value={this.state.ref_title}
style={styles.textfield1}
tabIndex={3}
errorText={this.state.ref_title_error}
onChange={this._handleChange.bind(this,"ref_title")}
floatingLabelText="Referral Title" />






</div>



<div tabIndex={4} style={styles.group}>


<label >
VHT candidate?
</label>


<RadioButtonGroup  required={true} onChange={this._handleChange.bind(this,"vht_candidate")}  valueSelected={this.state.vht_candidate} className="controls" name="vht_candidate" >
<RadioButton
value="yes"
label="Yes"

className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
<RadioButton
value="no"
label="No"
className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
</RadioButtonGroup>

</div>




<div style={styles.group1}>

<TextField
ref="name"
name="name"
tabIndex={5}
required={true}
value={this.state.name}
style={styles.textfield1}
errorText={this.state.name_error}
onChange={this._handleChange.bind(this,"name")}
floatingLabelText="Candidate Name:" />




</div>

<div style={styles.group1} >


<TextField
ref="mobile"
name="mobile"
value={this.state.mobile}
tabIndex={6}
style={styles.textfield1}
errorText={this.state.mobile_error}
onChange={this._handleChange.bind(this,"mobile")}
floatingLabelText="Candidate Mobile No:" />
</div>



<div style={styles.group} tabIndex={7}>

<label >
Gender
</label>


<RadioButtonGroup  required={true}  onChange={this._handleChange.bind(this,"gender")} valueSelected={this.state.gender}  className="controls" name="gender" >
<RadioButton
value="m"
label="Male"

className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
<RadioButton
value="f"
label="Female"
className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
</RadioButtonGroup>


</div>


<div style={styles.group1} >
<TextField
ref="age"
name="age"
tabIndex={8}
style={styles.textfield1}
value={this.state.age}
errorText={this.state.age_error}
onChange={this._handleChange.bind(this,"age")}
floatingLabelText="Age:" />
</div>
<div style={styles.group1}  tabIndex={9}>

<SelectField
style={styles.textfield1}
floatingLabelText="District:"
onChange={this._handleChange.bind(this,"district")}
valueMember="id"
displayMember="name"
ref="district"
name="district"
value={this.state.district}
menuItems={this.state.districts} />
</div>

<div style={styles.group1}  tabIndex={10}>
<SelectField
style={styles.textfield1}
floatingLabelText="Subcounty:"
onChange={this._handleChange.bind(this,"subcounty")}
value={this.state.subcounty}
valueMember="id"
displayMember="name"
ref="subcounty"
name="subcounty"
menuItems={this.state.subcounties} />
</div>





<div style={styles.group1}  tabIndex={11}>

<SelectField
style={styles.textfield1}
floatingLabelText="Division/Parish/Ward"
onChange={this._handleChange.bind(this,"parish")}
valueMember="id"
displayMember="name"
value={this.state.parish}
ref="parish"
name="parish"
menuItems={this.state.parishes} />



</div>

<div style={styles.group1}  tabIndex={12}>

<SelectField
style={styles.textfield1}
floatingLabelText="Village/Zone/Cell"
onChange={this._handleChange.bind(this,"village")}
valueMember="id"
displayMember="name"
value={this.state.village}
ref="village"
name="village"
menuItems={this.state.villages} />



</div>




<div style={styles.group1}>


<TextField
style={styles.textfield1}
floatingLabelText="Describe any most recogonized physical feature nearer to your home:"
ref="physical_feature"
name="physical_feature"
value={this.state.physical_feature}
tabIndex={13}
errorText={this.state.physical_feature_error}
onChange={this._handleChange.bind(this,"physical_feature")}
hintText="e.g school,church/mosque,tree,hill,swamp,borehole etc" />

</div>



<div tabIndex={14}  style={styles.group}>


<label >
Can you Speak English?
</label>


<RadioButtonGroup  onChange={this._handleChange.bind(this,"can_speak_english")} valueSelected={this.state.can_speak_english}  className="controls" name="can_speak_english" >
<RadioButton
value="yes"
label="Yes"

className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
<RadioButton
value="no"
label="No"
className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
</RadioButtonGroup>



</div>
<div style={styles.group1}>



<TextField
ref="years_at_location"
name="years_at_location"
value={this.state.years_at_location}
style={styles.textfield1}
tabIndex={15}
errorText={this.state.years_at_location_error}
onChange={this._handleChange.bind(this,"years_at_location")}
floatingLabelText="Years at this location:"

/>
</div>





<div style={styles.group1} >
<label>
Other Languages you can read and speak:
    </label>


<Checkbox
name="lango"
value="Lango"
tabIndex={16}
value={this.state.lango}
checked={this.state.lango==="lango"?true:false}
onCheck={this._handleChange.bind(this,"other_languages")}
label="Lango"/>

<Checkbox
name="luganda"
value="luganda"
label="Luganda"
value={this.state.luganda}
checked={this.state.luganda==="luganda"?true:false}
onCheck={this._handleChange.bind(this,"other_languages")}
tabIndex={17}
/>

<Checkbox
name="luo"
value="luo"
label="Luo"
value={this.state.luo}
checked={this.state.luo==="luo"?true:false}
onCheck={this._handleChange.bind(this,"other_languages")}
tabIndex={18}
/>

<Checkbox
name="lusoga"
value="lusoga"
label="Lusoga"
checked={this.state.lusoga==="lusoga"?true:false}
value={this.state.lusoga}
onCheck={this._handleChange.bind(this,"other_languages")}
tabIndex={19}
/>

<Checkbox
name="swahili"
value="swahili"
label="Swahili"
value={this.state.swahili}
checked={this.state.swahili==="swahili"?true:false}
onCheck={this._handleChange.bind(this,"other_languages")}
tabIndex={20}
/>

</div>





<div tabIndex={21}  style={styles.group}>


<label >
Have you ever worked for BRAC?
    </label>


<RadioButtonGroup required={true}   onChange={this._handleChange.bind(this,"worked_for_brac")} valueSelected={this.state.worked_for_brac}   className="controls" name="worked_for_brac" >
<RadioButton
value="yes"
label="Yes"


className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
<RadioButton
value="no"
label="No"
className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
</RadioButtonGroup>

</div>





{ this.state.worked_for_brac==="yes" ?


<div tabIndex={22}  style={styles.group}>
<label >
As Brac CHP?
</label>


<RadioButtonGroup  onChange={this._handleChange.bind(this,"brac_chp")} valueSelected={this.state.brac_chp} className="controls" name="brac_chp" >
<RadioButton
value="yes"
label="Yes"

className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
<RadioButton
value="no"
label="No"
className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
</RadioButtonGroup>

</div>

: null }




<div tabIndex={23} style={styles.group1}>

<SelectField
style={styles.textfield1}
floatingLabelText="Highest Educational Attainment:"
valueMember="id"
onChange={this._handleChange.bind(this,"education")}
value={this.state.education}
displayMember="name"
ref="education"
name="education"
errorText={this.state.education_error}
menuItems={education} />

</div>







<div tabIndex={24}  style={styles.group}>


<label >
Previous health or business experience?:
</label>


<RadioButtonGroup   onChange={this._handleChange.bind(this,"business_experience")} valueSelected={this.state.business_experience}  className="controls" name="group_membership" >
<RadioButton
value="yes"
label="Yes"

className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
<RadioButton
value="no"
label="No"
className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
</RadioButtonGroup>

</div>


<div style={styles.group1}>
</div>




<div tabIndex={25}  style={styles.group}>


<label >
Community group memberships:
    </label>


<RadioButtonGroup   className="controls" onChange={this._handleChange.bind(this,"group_membership")} valueSelected={this.state.group_membership} name="group_membership" >
<RadioButton
value="yes"
label="Yes"

className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
<RadioButton
value="no"
label="No"
className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
</RadioButtonGroup>

</div>


<div style={styles.group1}>
</div>




<div tabIndex={26}  style={styles.group}>


<label >
Financial Accounts Held:
    </label>


<RadioButtonGroup  className="controls" onChange={this._handleChange.bind(this,"financial_accounts")} valueSelected={this.state.financial_accounts}  name="financial_accounts" >
<RadioButton
value="yes"
label="Yes"

className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
<RadioButton
value="no"
label="No"
className="checkbox"
style={{display:"inlineBlock",width:"40%",marginBottom:16}}/>
</RadioButtonGroup>

</div>


<div style={styles.group1}>

<TextField
style={styles.textfield1}
ref="date"
name="date"
tabIndex={27}
floatingLabelText="Date"
errorText={this.state.date_error}
onChange={this._handleChange.bind(this,"date")}
value={this.state.date}
required={true}
style={styles.textfield} />

<FontIcon  onClick={this._datePopup} className="glyphicon-calendar"/>
</div>

<DatePicker
hintText="Date"
name="date"
className="hidden"
ref="date_popup"
showYearSelector={true}
floatingLabelText="Date"
onChange={this._handleDateChange}
autoOk = {true}
style={{width:"0px",height:"0px",fontSize:"0" }}
mode="landscape"/>

<div style={styles.group1}>
<TextField
ref="business_math"
errorText={this.state.business_math_error}
onChange={this._handleChange.bind(this,"business_math")}
name="business_math"
value={this.state.business_math}
tabIndex={28}
style={styles.textfield1}
errorText={this.state.business_math_error}
floatingLabelText="Business Math:" />
</div>

<div style={styles.group1}>

<TextField
ref="reading_comprehension"
name="reading_comprehension"
style={styles.textfield1}
errorText={this.state.reading_comprehension_error}
onChange={this._handleChange.bind(this,"reading_comprehension")}
value={this.state.reading_comprehension}
tabIndex={29}

errorText={this.state.reading_comprehension_error}
floatingLabelText="Reading Comprehension:" />
</div>



<div style={styles.group1}>
<TextField
ref="about_you"
name="about_you"
tabIndex={30}
style={styles.textfield1}
value={this.state.about_you}
errorText={this.state.about_you_error}
onChange={this._handleChange.bind(this,"about_you")}
floatingLabelText="About You:" />
</div>

<div style={styles.group1}>
<TextField
ref="total"
name="total"
errorText={this.state.total_error}
value={this.state.candidate.total}
style={styles.textfield1}
disabled={true}
floatingLabelText="Total Score:" />


</div>





<div style={styles.group1}>
<RaisedButton tabIndex={31} disabled={this.state.disable_form} type="submit" label="Save Biodata" secondary={true} />


</div>


</CardText>
</form>

<Snackbar
ref="popup"
message={"Candidate"+this.state.candidate.name+" Saved"}
action=""
autoHideDuration={3000} />




</Card>
</div>



)
;

},
_datePopup(e){
    this.refs.date_popup.openDialog();
},
_refDatePopup(e){
    this.refs.ref_date_popup.openDialog();
},
_handleErrorInputChange(e)
{
    this.setState({
        errorText: e.target.value ? '' : 'This field is required.'
    });
},
_handleDateChange(nill,date){
    let candidate=this.state.candidate;
    candidate.date=moment(date).format("DD-MM-YYYY");
    this.setState({
            date: moment(date).format("DD-MM-YYYY"),
            date_error:"",
            candidate:candidate,
            disable_form:false
        }
    );
},
_handleRefDateChange(nill,date){
    let candidate=this.state.candidate;
    candidate.ref_date=moment(date).format("DD-MM-YYYY");
    this.setState({
            ref_date: moment(date).format("DD-MM-YYYY"),
            ref_date_error:"",
            disable_form:false,
            candidate:candidate,
        }
    );
}

,

_handleChange(name,e){
    e.preventDefault();
    let value = e.target.value;
    let candidate=this.state.candidate;


    switch(name) {



        case "ref_name":

            candidate=_.assign({},candidate,{ref_name:value})
            this.setState({candidate: candidate,
                ref_name:value,
                ref_name_error: value ? '' : 'This field is required.',
                disable_form: value ? false:true,


            });

            break;



        case "ref_title":

            candidate=_.assign({},candidate,{ref_title:value})
            this.setState({candidate: candidate,
                ref_title:value,
                ref_title_error: value ? '' : 'This field is required.',
                disable_form: value ? false:true,


            });

            break;



        case "ref_mobile":

            let isRefMobile =validation.isMobile(value) ;

            if(isRefMobile){
                candidate.ref_mobile=value;
            }
            this.setState({
                ref_mobile_error: isRefMobile ? '' : 'Invalid Mobile Number',
                disable_form: isRefMobile ? false:true,
                candidate: candidate,
                ref_mobile:value
            });



            break;


        case "date":
            let date=moment(value,["DD-MM-YYYYYY","DD-MM-YYYYYY"]);
            if (date.isValid()){
                candidate=_.assign({},candidate,{date:date.format("DD-MM-YYYY")})
            }
            this.setState({candidate: candidate,
                date:value,
                date_error: date.isValid() ? '' : 'Invalid Date',
                disable_form: date.isValid() ? false:true,

            });

            break;

        case "ref_date":
            let ref_date=moment(value,["DD-MM-YYYYYY","DD-MM-YYYYYY"]);
            if (ref_date.isValid()){
                candidate=_.assign({},candidate,{ref_date:ref_date.format("DD-MM-YYYY")})
            }
            this.setState({candidate: candidate,
                ref_date:value,
                ref_date_error: ref_date.isValid() ? '' : 'Invalid Date',
                disable_form: ref_date.isValid() ? false:true,

            });

            break;

        case "name":
            candidate=_.assign({},candidate,{name:value})
            this.setState({candidate: candidate,name:value});


            break;
        case "gender":
            candidate=_.assign({},candidate,{gender:value});
            this.setState({
                    candidate: candidate,

                    gender_error: value ? '' : 'This field is required.',
                    disable_form: value ? false : true,
                    gender:value
                }
            );
            break;
        case "district":
            candidate=_.assign({},candidate,{district:value});
            currentFilterStore.setCurrentDistrict(value);
            this.setState({candidate: candidate,
                district_error: value ? '' : 'This field is required.',
                disable_form: value ? false:true,
                district:value

            });
            break;
        case "mobile":


            let isMobile =validation.isMobile(value) ;
            candidate.mobile=isMobile? value:"";
            this.setState({
                mobile_error: isMobile ? '' : 'Invalid Mobile Number',
                disable_form: isMobile ? false:true,
                candidate: candidate,
                mobile:value
            });


            break;
        case "age":


            let isAge = !isNaN(parseFloat(value)) && isFinite(value)&&value>=15 && value<=70;
            candidate.age=isAge? value:"";
            this.setState({
                age_error: isAge ? '' : 'Age must be numeric and between 15 and 70.',
                disable_form: isAge ? false:true,
                candidate:candidate,
                age:value
            });


            break;
        case "subcounty":
            candidate=_.assign({},candidate,{subcounty:value})
            currentFilterStore.setCurrentSubcounty(value);
            this.setState({candidate: candidate,

                subcounty_error: value ? '' : 'This field is required.',
                disable_form: value ? false:true,
                subcounty:value
            });

            break;
        case "division":
            candidate=_.assign({},candidate,{division:value})
            this.setState({candidate: candidate,
                division_error: value ? '' : 'This field is required.',
                disable_form: value ? false:true,
                division:value
            });

            break;
        case "village":
            candidate=_.assign({},candidate,{village:value})
            this.setState({
                    candidate: candidate,
                    village_error: value ? '' : 'This field is required.',
                    disable_form: value ? false : true,
                    village:value
                }
            );

            break;
        case "parish":
            candidate=_.assign({},candidate,{parish:value});
            currentFilterStore.setCurrentParish(value);
            this.setState({
                    candidate: candidate,
                    parish_error: value ? '' : 'This field is required.',
                    disable_form: value ? false : true,
                    parish:value
                }
            );

            break;
        case "reading_comprehension":

            let isRC = !isNaN(parseFloat(value)) && isFinite(value)&&value>=0 && value<=12;
            candidate.reading_comprehension=parseInt(value)||0;
            candidate.total=isRC? (parseInt(this.state.candidate.about_you)|| 0)+(parseInt(this.state.candidate.business_math)|| 0)+(parseInt(value)|| 0):(parseInt(this.state.candidate.about_you)|| 0)+(parseInt(this.state.candidate.business_math)|| 0);

            this.setState({
                reading_comprehension_error: isRC ? '' : 'value must be numeric and less than 13 ',
                disable_form: isRC ? false:true,
                candidate:candidate,
                reading_comprehension:value
            });




            break;
        case "about_you":


            let isAY = !isNaN(parseFloat(value)) && isFinite(value)&&value>=0 && value<=22;

            candidate.about_you=parseInt(value)||0;
            candidate.total=isAY? (parseInt(this.state.candidate.reading_comprehension)|| 0)+(parseInt(this.state.candidate.business_math)|| 0)+(parseInt(value)|| 0):(parseInt(this.state.candidate.reading_comprehension)|| 0)+(parseInt(this.state.candidate.business_math)|| 0);
            this.setState({
                about_you_error: isAY ? '' : 'value must be numeric and less than 23 ',
                disable_form: isAY ? false:true,
                candidate:candidate,
                about_you:value
            });


            break;
        case "business_math":

            let isBM = !isNaN(parseFloat(value)) && isFinite(value)&&value>=0 && value<=16;
            candidate.business_math=parseInt(value)||0;
            candidate.total=isBM? (parseInt(this.state.candidate.about_you)|| 0)+(parseInt(this.state.candidate.reading_comprehension)|| 0)+(parseInt(value)|| 0):(parseInt(this.state.candidate.about_you)|| 0)+(parseInt(this.state.candidate.reading_comprehension)|| 0);
            this.setState({
                business_math_error: isBM ? '' : 'value must be numeric and less than 17 ',
                disable_form: isBM ? false:true,
                candidate:candidate,
                business_math:value

            });


            break;
        case "zone":
            candidate=_.assign({},candidate,{zone:value})
            this.setState({
                    candidate: candidate,
                    zone:value,
                    zone_error: value ? '' : 'This field is required.',
                    disable_form: value ? false : true
                }
            );

            break;
        case "ward":
            candidate=_.assign({},candidate,{ward:value})
            this.setState({
                    candidate: candidate,
                    ward:value,
                    ward_error: value ? '' : 'This field is required.',
                    disable_form: value ? false : true,
                }
            );

            break;
        case "cell":
            candidate=_.assign({},this.state.candidate,{cell:value})
            this.setState({candidate: candidate,
                    cell:value,
                    cell_error: value ? '' : 'This field is required.',
                    disable_form: value ? false:true}
            );

            break;
        case "physical_feature":
            candidate=_.assign({},candidate,{physical_feature:value})
            this.setState({
                    candidate: candidate,
                    physical_feature:value,
                    physical_feature_error: value ? '' : 'This field is required.',
                }
            );

            break;
        case "can_speak_english":
            candidate=_.assign({},candidate,{can_speak_english:value})
            this.setState({candidate: candidate,can_speak_english:value});

            break;
        case "years_at_location":

            let isLoc = !isNaN(parseFloat(value)) && isFinite(value)&&value>=0 && value<=69;
            candidate.years_at_location=isLoc? value:"";
            this.setState({
                years_at_location_error: isLoc ? '' : 'years at location must be numeric and between 0 and 70.',
                disable_form: isLoc ? false:true,
                candidate:candidate,
                years_at_location:value
            });

            break;
        case "other_languages":
            var val = e.target.value ==="on"?e.target.name:""


            switch(e.target.name){
                case "luo":
                    this.setState({luo:val})

                    break;
                case "swahili":
                    this.setState({swahili:val})
                    break;
                case "luganda":
                    this.setState({luganda:val})
                    break;
                case "lusoga":
                    this.setState({lusoga:val})
                    break;
                case "lango":
                    this.setState({lango:val})
                    break;
                default:
                    break;



            }
            var lang=_.filter([this.state.luo,this.state.luganda,this.state.lusoga,this.state.swahili,this.state.lango],function(k){return k}).toString()
            candidate=_.assign({},candidate,{other_languages:lang})
            this.setState({candidate: candidate,other_languages:lang});

            break;
        case "vht_candidate":
            candidate=_.assign({},candidate,{vht_candidate:value})
            this.setState({candidate: candidate,vht_candidate:value});

            break;
        case "worked_for_brac":
            candidate=_.assign({},candidate,{worked_for_brac:value})
            this.setState({candidate: candidate,worked_for_brac:value});

            break;
        case "brac_chp":
            candidate=_.assign({},candidate,{brac_chp:value})
            this.setState({candidate: candidate,brac_chp:value});

            break;
        case "education":
            candidate=_.assign({},candidate,{education:value})
            this.setState({candidate: candidate,education:value});


            break;
        case "business_experience":
            candidate=_.assign({},candidate,{business_experiencep:value})
            this.setState({candidate: candidate,business_experience:value});

            break;
        case "group_membership":
            candidate=_.assign({},candidate,{group_membership:value})
            this.setState({candidate: candidate,group_membership:value});

            break;
        case "financial_accounts":
            candidate=_.assign({},candidate,{financial_accounts:value})
            this.setState({candidate: candidate,financial_accounts:value});

            break;





        default:
        // do nothing
    }

},

_createCandidate(event){
    event.preventDefault();
    var id=this.context.router.getCurrentQuery().id;
    var candidate = this.state.candidate;
    candidate.branch_id= this.state.branch_id;
    candidate.other_languages=_.filter([this.state.luo,this.state.luganda,this.state.lusoga,this.state.swahili,this.state.lango],function(k){return k}).toString();


    if (id){

        CandidateActions.update(id,candidate);

    }else{
        CandidateActions.create(candidate);
    }

    currentFilterStore.resetStores();

    this.setState(this.getInitialState());
    this.refs.popup.show();
    this.forceUpdate();
    window.scrollTo(500, 0);




},

_scrollTop: function() {
    var elem = this.refs.candidates.getDOMNode();
    this.scrollHeight = elem.scrollHeight;
    this.scrollTop = elem.scrollTop;
},



_save: function() {
    this.props.onSave(this.state.value);
    this.setState({
        value: ''
    });
},

_onChange: function( event) {
    this.setState({
        value: event.target.value
    });
},



_handleSelectValueChange(name, e)
{
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
}
,
_onChange: function() {
    this.setState(this.getStateFromStores());
}});



module.exports = BiodataTests;