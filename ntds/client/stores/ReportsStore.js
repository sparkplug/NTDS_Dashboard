var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'app_change';

var _app={};
var _header={};
var API ="/reports.json";
var _reports={};
var _initCalled = false;
var _ = require("lodash");
var reports=[];
var async = require('async');
var request = require('superagent');
require('superagent-as-promised')(request);

var ReportsStore = assign({}, EventEmitter.prototype, {

    init: function () {
        if (_initCalled)
            return;

        _initCalled = true;

        getJSON(API, function (err, res) {
            reports=res;
            res.forEach(function (report) {

                _reports[report.id] = report;


            });

            ReportsStore.emitChange();
        });
    },




    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getCurrent:function(){
        return _app;
    },

    getAll: function() {
        return _.values(_reports);
    },

    get: function(id) {
        return _reports[id];
    },
    getByDisease:function(){

    },
    getByDistrict:function(){

    },
    getByReporter:function(){

    },





    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getCurrent: function() {
        return _app;
    },
    setCurrent: function(header){
        _header=header;
    },




    destroy:function(id) {
        delete _reports[id];
    },
    getOpts:function(){
        var _report_opts=[];
        _.each(_reports,function(x){_report_opts.push({value:x.id, label:x.name})});

        return _report_opts;
    }





});

ReportsStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

        case ActionTypes.CANDIDATE_CREATE:
            var report = action.report
            ReportsStore.create(report);
            ReportsStore.emitChange();
            break;


        case ActionTypes.STORE_CREATED:

            ReportsStore.fetch();
            ReportsStore.init();
            ReportsStore.emitChange();
            break;



        case ActionTypes.CANDIDATE_UPDATE:
            ReportsStore.update(action.id,action.update);
            ReportsStore.emitChange();
            break;
        case ActionTypes.CANDIDATE_UPDATE_INTERVIEW:
            ReportsStore.update_interview(action.id,action.update);
            ReportsStore.emitChange();
            break;


        case ActionTypes.CANDIDATE_DESTROY:
            destroy(action.id);
            ReportsStore.emitChange();
            break;


        default:
        // do nothing
    }

});

function getJSON(url, cb) {
    var req = new XMLHttpRequest();
    req.onload = function () {
        if (req.status === 404) {
            cb(new Error('not found'));
        } else {
            cb(null, JSON.parse(req.response));
        }
    };
    req.open('GET', url);
    req.send();
}

function postJSON(url, obj, cb) {
    request
        .post(url)
        .send(obj)
        .set('Accept', 'application/json')
        .end(function(err, res){
            return cb(err,res);
        });
}

ReportsStore.setMaxListeners(0);
module.exports = ReportsStore;

