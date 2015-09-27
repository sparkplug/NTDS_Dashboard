

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

    create: function(candidate) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CANDIDATE_CREATE,
      candidate: candidate
    });
  },

 
  update: function(id, update) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CANDIDATE_UPDATE,
      id: id,
      update: update
    });
  },

    update_interview: function(id, update) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.CANDIDATE_UPDATE_INTERVIEW,
            id: id,
            update: update
        });
    },

  
  destroy: function(id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CANDIDATE_DESTROY,
      id: id
    });
  },

};
