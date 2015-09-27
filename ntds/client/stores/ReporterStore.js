var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'app_change';

var _app={};
var _header={};
var API ="/reports.json";
var _reporters={};
var _initCalled = false;
var _ = require("lodash");
var reporters=[];
var async = require('async');
var request = require('superagent');
require('superagent-as-promised')(request);

var ReporterStore = assign({}, EventEmitter.prototype, {

    init: function () {
        if (_initCalled)
            return;

        _initCalled = true;

        getJSON(API, function (err, res) {
            reporters=res;
            res.forEach(function (reporter) {


                _reporters[reporter.identity] = reporter;
            });

            ReporterStore.emitChange();
        });
    },





    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getCurrent:function(){
        return _app;
    },

    getAll: function() {
        return _.values(_reporters);
    },

    get: function(id) {
        return _reporters[id];
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
        delete _reporters[id];
    },
    getOpts:function(){
        var _reporter_opts=[];
        _.each(_reporters,function(x){_reporter_opts.push({value:x.identity, label:x.name})});

        return _reporter_opts;
    }





});

ReporterStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

        case ActionTypes.CANDIDATE_CREATE:
            var reporter = action.reporter
            ReporterStore.create(reporter);
            ReporterStore.emitChange();
            break;


        case ActionTypes.STORE_CREATED:

            ReporterStore.fetch();
            ReporterStore.init();
            ReporterStore.emitChange();
            break;



        case ActionTypes.CANDIDATE_UPDATE:
            ReporterStore.update(action.id,action.update);
            ReporterStore.emitChange();
            break;
        case ActionTypes.CANDIDATE_UPDATE_INTERVIEW:
            ReporterStore.update_interview(action.id,action.update);
            ReporterStore.emitChange();
            break;


        case ActionTypes.CANDIDATE_DESTROY:
            destroy(action.id);
            ReporterStore.emitChange();
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

ReporterStore.setMaxListeners(0);
module.exports = ReporterStore;

