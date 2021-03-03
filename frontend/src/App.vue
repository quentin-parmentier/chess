<template>
  <router-view/>
</template>

<script>
import { provide } from 'vue'

import jsonOuverture from './ouvertures/ouvertures.json'
import jsonFinales from './ouvertures/finales.json'
import {createOuvertures, createFinales} from './store'
export default {
  created () {
    const {storeOuvertures,setOuvertures} = createOuvertures()
    provide('ouvertures',storeOuvertures)
    setOuvertures(jsonOuverture)
    const {storeFinales,setFinales} = createFinales()
    provide('finales',storeFinales)
    setFinales(jsonFinales)
  }
}
</script>
