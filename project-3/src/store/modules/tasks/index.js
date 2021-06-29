import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export default {
  state() {
    return {
      tasksList: [],
      isActive: 0,
      isFetching: false,
    }
  },
  getters,
  actions,
  mutations
}
