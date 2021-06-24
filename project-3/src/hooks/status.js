import { useStore } from 'vuex';

export const useStatus = () => {
  const store = useStore();
  const statusName = (type) => store.getters.statusName[type];

  return statusName
}
