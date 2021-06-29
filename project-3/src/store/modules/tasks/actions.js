export default {
  async loadDatabase ({commit}) {
    try {
      commit('fetchStart')
      const responce = await fetch(`${process.env.VUE_APP_DATABASE_URL}/tasks.json`, {
        method: 'GET'
      })
      const database = await responce.json();
      if(!database){
        throw new Error('Задач нет')
      }
      const data = Object.keys(database).map( item => {
         return {
           databaseId: item,
           ...database[item]
         }
       })
      commit('saveData', data)
      commit('fetchEnd')
      commit('activeTask')
    } catch(e) {
      commit('fetchEnd')
      commit('notificationShow')
      throw new Error('Не удалось загрузить список задач')
    }
  },

  async loadTask ({commit}, databaseId) {
    try {
      commit('fetchStart')
      const responce = await fetch(`${process.env.VUE_APP_DATABASE_URL}/tasks/${databaseId}.json`, {
        method: 'GET'
      })
      const database = await responce.json();
      if(!database){
        throw new Error('Задач нет')
      }
      const data = {
        databaseId: databaseId,
        ...database
      }
      commit('saveData', data)
      commit('fetchEnd')
    } catch(e) {
      commit('fetchEnd')
      commit('notificationShow')
      throw new Error('Не удалось загрузить список задач')
    }
  },

  async createNewTask ({commit}, obj ) {
    try {
      const responce = await fetch (`${process.env.VUE_APP_DATABASE_URL}/tasks.json`, {
        method: 'POST',
        header: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      const database = await responce.json();
      commit('addedID', {databaseId: database.name, obj})
      commit('notificationHide')
    } catch (e) {
      console.warning(e)
    }
  },

  async updatedTasks(_, {databaseId, newStatus}) {
    try {
      await fetch(`${process.env.VUE_APP_DATABASE_URL}/tasks/${databaseId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus})
      })
    } catch(e) {
      console.warning(e)
    }
  },

  async delete({commit}, databaseId) {
    try {
      const responce = await fetch(`${process.env.VUE_APP_DATABASE_URL}/tasks/${databaseId}.json`, {
        method: "DELETE"
      })
      commit('delete', databaseId)
      commit('activeTask')
    } catch(e) {
      console.warning(e)
    }
  }
}
