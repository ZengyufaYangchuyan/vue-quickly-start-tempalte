let moduleA = {
  /**
   * 命名空间
   * @description 在使用模块时，请使用命名空间
   */
  namespaced: true,
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) {
      // 这里的 “state” 对象是模块的局部状态
      state.count++;
    }
  },
  getters: {
    sumWithRootCount (state, getters, rootState, rootGetters) {
      getters.someOtherGetter; // -> 'foo/someOtherGetter'
      rootGetters.someOtherGetter; // -> 'someOtherGetter
      return state.count + rootState.count;
    },
    someOtherGetter: state => {
      return state;
    }
  },
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment');
      }
    }
  }
};

export default moduleA;
