import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import modules from './modules';

const getStore = () => {
  const store = new Vuex.Store({
    state: {
      count: 1
    },
    getters: {},
    mutations,
    actions,
    modules
  });
  return store;
};

export default getStore;
