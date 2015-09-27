var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'app_change';

var _app={};
var _header={};
var API ="locations.json";
var POST_URL="/prescreening_locations/";
var _locations={};
var _initCalled = false;
var _ = require("lodash");
var locations =[];
var async = require('async');
var request = require('superagent');
require('superagent-as-promised')(request);

var LocationsStore = assign({}, EventEmitter.prototype, {

    init: function () {
        if (_initCalled)
            return;

        _initCalled = true;

        getJSON(API, function (err, res) {
            locations=res;
            res.forEach(function (location) {

                _locations[location.parish_id] = location;
                
            });
           
            LocationsStore.emitChange();
        });
    },
    
    

    get_districts(){
        
        return _.uniq(_.pluck(_.flatten(_.values(_locations)),"district"))
        
    },
    getsubcounties(){
        return _.uniq(_.pluck(_.flatten(_.values(_locations)),"subcounty"))
    },
    getDistrictSubcounties(district){
        return _.uniq(_.pluck(_.where(_.flatten(_.values(_locations)),{"district":district}),"subcounty"))
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getCurrent:function(){
        return _app;
    },

    getAll: function() {
        return locations;
    },

    get: function(id) {
        return _locations[id];
    },


   

    getselectOpts: function(){

        return _location_opts;

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
    
     create: function(location) {
          locations=_.values(location)[0]
            
          var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
          location.branch_id=branch_id
         
          
          _locations[id] = location;
          locations.push(location);
          async.series([
            function(){ postJSON(URL, location ,function(err,res){}) },
           ]);
          
       },


       update:function(branch_id,updates) {
           var locs=_.values(updates)[0];
           var update = false;
           var URL=POST_URL+branch_id+"/"
            
            if (_locations[branch_id]){
                 URL=URL+"?update=true"
            }
            _locations[branch_id]= locs;
            locations= _.assign({}, locations, locs);
           
            
             async.series([
                function(){ postJSON(URL, locs ,function(err,res){}) },
           ]);
        },


        updateAll:function(updates) {
          for (var id in _todos) {
            update(id, updates);
          }
        },


        destroy:function(id) {
          delete _locations[id];
        },
      getOpts:function(){
          var _LOCATION_opts=[];
          _.each(_locations,function(x){_LOCATION_opts.push({value:x.id, label:x.name})});
          
          return _LOCATION_opts;
      }

   



});

LocationsStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

        case ActionTypes.UPDATE_LOCATIONS:
            var locations = action.json
            LocationsStore.update(action.branch_id,locations);
            
            LocationsStore.emitChange();
            break;
            
        case ActionTypes.STORE_CREATED:
            
            //LocationsStore.fetch();
            //LocationsStore.init();
            //LocationsStore.emitChange();
            break;

      

        case ActionTypes.LOCATION_UPDATE:
            LocationsStore.update(action.bra,action.update);
            LocationsStore.emitChange();
            break;

        case ActionTypes.LOCATION_DESTROY:
            destroy(action.id);
            LocationsStore.emitChange();
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

LocationsStore.setMaxListeners(0);
module.exports = LocationsStore;

