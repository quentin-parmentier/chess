import { reactive, readonly } from 'vue'

export const createOuvertures = () => {
  const state = reactive({ouvertures : null})
  const setOuvertures = (ouverturesValues) => {state.ouvertures = ouverturesValues}
  
  return {setOuvertures, storeOuvertures : readonly(state)}
}

export const createFinales = () => {
  const state = reactive({finales : null})
  const setFinales = (finalesValues) => {state.finales = finalesValues}
  
  return {setFinales, storeFinales : readonly(state)}
}