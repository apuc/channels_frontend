export default {
   creatableIntegrations: (state) => state.integrations_types.filter(el => el.user_can_create),
   allIntegrations: (state) => state.integrations_types,
};
