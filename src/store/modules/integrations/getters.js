export default {
   creatableIntegrations: (state) => state.integrations_types.filter(el => el.user_can_create),
   integrationsList: (state) => state.integrationsList,
   allIntegrations: (state) => state.integrations_types,
   integrationsTypes: (state, getters) => {
      const types = {};
      getters.integrationsList.forEach(integration => {
         types[integration.type.title] = integration.type.title;
      });
      return types;
   }
};
