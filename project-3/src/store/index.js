import { createStore, createLogger } from 'vuex';
import taskModules from './modules/tasks';
import statusModule from './modules/status';

export default createStore({
  plugins: [createLogger()],
  modules: {
    taskModules,
    statusModule
  },
  state() {
    return {
      notification: false,
    }
  },
  getters: {
    notification(state) {
      return state.notification
    }
  },

  mutations: {
    notificationShow(state) {
      state.notification = true
    },

    notificationHide(state) {
      state.notification = false
    }
  }
});
