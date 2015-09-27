var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'app_change';

var _app={};
var _header={};
var API ="/districts_report.json";
var _districts={};
var _initCalled = false;
var _chp_opts=[];
var _ = require("lodash");
var districts=[];
var async = require('async');
var DistrictStore = assign({}, EventEmitter.prototype, {


    init: function () {
        if (_initCalled)
            return;

        _initCalled = true;
        //app.storage.app.get("chps")
        async.series([function()
        {
            getJSON(API, function (err, res) {
                districts=res;
                res.forEach(function (hh) {



                    _districts[hh.id] = hh;




                });
                DistrictStore.emitChange();

            });}]);


    }
    ,

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getCurrent:function(){
        return _app;
    },

    getAll: function() {
        return districts;
    },

    get: function(id) {
        return _districts[id];
    },




    getselectOpts: function(){

        return _chp_opts;

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
    filter:function(filter){
        return _.where(districts,filter)
    }





});

DistrictStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {



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
    var req = new XMLHttpRequest();
    req.onload = function () {
        cb(JSON.parse(req.response));
    };
    req.open('POST', url);
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    req.send(JSON.stringify(obj));
}

DistrictStore.setMaxListeners(0);
module.exports = DistrictStore;
