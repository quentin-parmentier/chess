import { reactive, readonly } from 'vue'

export const createOuvertures = () => {
  const state = reactive({ouvertures : null})
  const setOuvertures = (ouverturesValues) => {state.ouvertures = ouverturesValues}
  
  return {setOuvertures, store : readonly(state)}
}