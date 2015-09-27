

var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
 
      CANDIDATE_CREATE: null,
      CANDIDATE_INTERVIEW: null,
      CANDIDATE_DESTROY: null,
      CANDIDATE_UPDATE: null,
      RECEIVE_RAW_CANDIDATES:null,
      CANDIDATE_UPDATE_INTERVIEW:null,
      
      BIODATA_CREATE: null,
      BIODATA_INTERVIEW: null,
      BIODATA_DESTROY: null,
      BIODATA_UPDATE: null,
      
      LOCATION_CREATE: null,

      LOCATION_DESTROY: null,
      LOCATION_UPDATE: null,
      
      
      STORE_CREATED:null,
      
      CERTIFICATION_CREATE: null,
      CERTIFICATION_INTERVIEW: null,
      CERTIFICATION_DESTROY: null,
      CERTIFICATION_UPDATE: null,
      
      AGREEMENT_CREATE: null,
      AGREEMENT_INTERVIEW: null,
      AGREEMENT_DESTROY: null,
      AGREEMENT_UPDATE: null,
      
      QUESTIONAIRE_CREATE: null,
      QUESTIONAIRE_INTERVIEW: null,
      QUESTIONAIRE_DESTROY: null,
      QUESTIONAIRE_UPDATE: null,
      
      PERFORMANCE_REVIEW_CREATE: null,
      PERFORMANCE_REVIEW_INTERVIEW: null,
      PERFORMANCE_REVIEW_DESTROY: null,
      PERFORMANCE_REVIEW_UPDATE: null,
      
      TREATMENTS_SURVEY_UPDATE:null,
      TREATMENTS_SURVEY_CREATE:null,
      TREATMENTS_SURVEY_DESTROY:null,
      
      PREGNANCY_SURVEY_UPDATE:null,
      PREGNANCY_SURVEY_CREATE:null,
      PREGNANCY_SURVEY_DESTROY:null,
      
      NEWBORN_SURVEY_UPDATE:null,
      NEWBORN_SURVEY_CREATE:null,
      NEWBORN_SURVEY_DESTROY:null,
      
      
      UPDATE_LOCATIONS:null,
      
    
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
