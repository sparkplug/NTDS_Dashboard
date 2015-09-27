var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require("lodash");

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'app_change';
var DiseaseStore = require("./DiseaseStore");
var ReporterStore = require("./ReporterStore");
var LocationStore = require("./LocationsStore");

var _branch=null;
var _chp={};
var _chps={};
var _district=null;
var _subcounty=null;
var _parish=null;
var async = require('async');
var currentFilterStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getCurrentCHP:function(){
        return _chp;
    },

    getCurrentBranch:function(){
        return _branch;
    },
    getCurrentChps:function(){
        return _chps;
    },


    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    setCurrentDistrict:function(name){
        _district=name;
        currentFilterStore.emitChange();

    },
    setCurrentSubcounty:function(name){
        _subcounty=name;
        currentFilterStore.emitChange();

    },
    resetStores:function(){
        var _district=null;
        var _subcounty=null;
        var _parish=null;

    },
    setCurrentParish:function(name){
        _parish=name;
        currentFilterStore.emitChange();

    },

    getDistricts(){


        return   _.sortBy(_.map(_.uniq(_.pluck(_.flatten(_.values(LocationStore.getAll())),"district")),function(v){return {id:v,name:v}}),"name");




},

getSubcounties(){
    if (_district){
        return _.union([{id:"0",name:"Filter By Subcounty"}],_.sortBy(_.map(_.uniq(_.pluck(_.where(_.flatten(_.values(LocationStore.getAll())),{"district":_district}),"subcounty")),function(v){return {id:v,name:v}}),"name"));
    }else{
        return _.union([{id:"0",name:"Filter By Subcounty"}],_.sortBy(_.map(_.uniq(_.pluck(_.flatten(_.values(LocationStore.getAll())),"subcounty")),function(v){return {id:v,name:v}}),"name"))
    }
},

getParishes(){
    if (_subcounty){
        return _.union([{id:"0",name:"Filter By Parish"}],_.sortBy(_.map(_.uniq(_.pluck(_.where(_.flatten(_.values(LocationStore.getAll())),{"subcounty":_subcounty}),"parish")),function(v){return {id:v,name:v}}),"name"));
    }
    else if(_district){
        return _.union([{id:"0",name:"Filter By Parish"}],_.sortBy(_.map(_.uniq(_.pluck(_.where(_.flatten(_.values(LocationStore.getAll())),{"district":_district}),"parish")),function(v){return {id:v,name:v}}),"name"));
    }
    else{
        return _.union([{id:"0",name:"Filter By Parish"}],_.sortBy(_.map(_.uniq(_.pluck(_.flatten(_.values(LocationStore.getAll())),"parish")),function(v){return {id:v,name:v}}),"name"));
    }



},



setCurrentBranch: function(branch_id){
    _branch=DiseaseStore.get(branch_id);
    _chps=_.filter(ReporterStore.getAll(),{branch_id:branch_id})
    currentFilterStore.emitChange();
},
setCurrentCHP: function(chp_id){
    _chp=ReporterStore.get(chp_id);
    currentFilterStore.emitChange();
}



});

currentFilterStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {


        default:
        // do nothing
    }

});
currentFilterStore.setMaxListeners(0);
module.exports = currentFilterStore;
