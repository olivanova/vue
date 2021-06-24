export default {
  getList(state){
    if(state.filter) {
      console.log('state.filter', state.filter)
      return state.tasksList.filter(item => item.status === state.filter)
    }
    return state.tasksList
  },

  isFetching(state) {
    return state.isFetching
  },

  isFiltered(state) {
    return state.filter
  },

  activeTask(state) {
    return state.isActive
  },

  tasksList(state) {
    if(state.tasksList.length > 1) {
      const sortTaskList = state.tasksList.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateA - dateB
      })
      return sortTaskList
    } else {
      return state.tasksList
    }
  }
}
