

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

    create_biodata: function(chpcode,candidate) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.BIODATA_CREATE,
      candidate: candidate,
      chpcode: chpcode
    });
  },

 
  update_biodata: function(id, update) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.BIODATA_UPDATE,
      id: id,
      update: update
    });
  },

  
  destroy_bodata: function(id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.BIODATA_DESTROY,
      id: id
    });
  },
  
  create_certification: function(chpcode,candidate) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CERTIFICATION_CREATE,
      candidate: candidate,
       chpcode: chpcode
    });
  },

 
  update_certification: function(id, update) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CERTIFICATION_UPDATE,
      id: id,
      update: update
    });
  },

  
  destroy_certification: function(id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CERTIFICATION_DESTROY,
      id: id
    });
  },
  
  
  create_agreement: function(chpcode,candidate) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.AGREEMENT_CREATE,
      candidate: candidate,
      chpcode:chpcode
    });
  },

 
  update_agreement: function(id, update) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.AGREEMENT_UPDATE,
      id: id,
      update: update
    });
  },

  
  destroy_agreement: function(id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.AGREEMENT_DESTROY,
      id: id
    });
  },
  
  create_treatments_survey: function(chpcode,candidate) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TREATMENTS_SURVEY_CREATE,
      candidate: candidate,
      chpcode:chpcode
    });
  },

 
  update_treatments_survey: function(id, update) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TREATMENTS_SURVEY_UPDATE,
      id: id,
      update: update
    });
  },

  
  destroy_treatments_survey: function(id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TREATMENTS_SURVEY_DESTROY,
      id: id
    });
  },
  
  create_pregnancy_survey: function(chpcode,candidate) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PREGNANCY_SURVEY_CREATE,
      candidate: candidate,
      chpcode:chpcode
    });
  },

 
  update_pregnancy_survey: function(id, update) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PREGNANCY_SURVEY_UPDATE,
      id: id,
      update: update
    });
  },

  
  destroy_pregnancy_survey: function(id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PREGNANCY_SURVEY_DESTROY,
      id: id
    });
  },
  
  create_newborn_survey: function(chpcode,candidate) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.NEWBORN_SURVEY_CREATE,
      candidate: candidate,
      chpcode:chpcode
    });
  },

 
  update_newborn_survey: function(id, update) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.NEWBORN_SURVEY_UPDATE,
      id: id,
      update: update
    });
  },

  
  destroy_newborn_survey: function(id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.NEWBORN_SURVEY_DESTROY,
      id: id
    });
  },
  
  create_performance_review: function(chpcode,pr) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PERFORMANCE_REVIEW_CREATE,
      pr: pr,
      chpcode:chpcode
    });
  },

 
  update_performance_review: function(id, update) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PERFORMANCE_UPDATE,
      id: id,
      update: update
    });
  },

  
  destroy_performance_review: function(id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PERFORMANCE_DESTROY,
      id: id
    });
  },
  
  
     update_locations: function(branch_id,json) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_LOCATIONS,
      json: json,
      branch_id:branch_id
      
    });
  },
  


};
