import create from 'zustand'

const updateFlow = (flows, flow) => {
  return flows.map ((item) => {
    if (item.id === flow.id){
      return flow;
    }
    return item;
  })
}

const removeFlow = (flows, id) => {
  return flows.filter((flow) => flow.id !== id);
};

const useStore = create(set => ({
  flows: [],
  isLoading: true,
  setFlows: (flows, isLoading) =>
    set((state) => ({
      ...state,
      flows,
      isLoading,
  })),

  addFlow: (flow) => {
    set((state) => ({
      ...state,
      flows: [...state.flows, flow],
    }));
  },

  editFlow: (flow) => {
    set((state) => ({
      ...state,
      flows: updateFlow(state.flows,flow),
    }))
  },

  remove: (id) =>
    set((state) => ({
      ...state,
      flows: removeFlow(state.flows, id),
    })),
}))

export default useStore;