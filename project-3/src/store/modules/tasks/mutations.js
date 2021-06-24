export default {
  activeTask(state) {
    let taskCount = 0
    const active = state.tasksList.map(item => {
      if(item.status === 'active' || item.status === 'pending') {
        taskCount ++
      }
    })
    state.isActive = taskCount
    return state.isActive
  },

  resetFilter(state) {
    state.filter = null
  },

  setStatus(state, payload) {
    const array = state.tasksList.find( item => {
      if(String(item.databaseId) === payload.databaseId) {
        item.status = payload.newStatus
      }
    })
  },

  fetchStart(state) {
    state.isFetching = true
  },

  fetchEnd(state) {
    state.isFetching = false
  },

  addedID(state, {obj, databaseId}) {
    state.tasksList.push({
      ...obj,
      databaseId
    });
  },

  saveData(state, payload) {
    state.tasksList = payload
  },

  delete(state, payload) {
    state.tasksList = state.tasksList.filter(item => item.databaseId !== payload)
  },

  count(state) {
    state.count++
    console.log('state.count: ', state.count)
  }
}
