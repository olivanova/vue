export default {
  state() {
    return {
      statusList: {
        active: 'Активен',
        pending: 'Выполняется',
        done: 'Завершен',
        cancelled: 'Отменен'
      },
    }
  },

  getters: {
    statusName(state) {
      return state.statusList
    }
  }
}
