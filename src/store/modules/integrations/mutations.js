export default {
  'SET_INTEGRATION_TYPES':(state,payload) =>{
    state.integrations_types = payload;
  },
  
  'ADD_INTEGRATION_TO_TYPE':(state,integration) =>{
     let type = state.integrations_types.find(type => type.id == integration.type.id);
     type.integrations.push(integration);
  },
};
