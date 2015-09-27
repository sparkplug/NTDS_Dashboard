

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

    store_created: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.STORE_CREATED

    });
  }

 
  

};
