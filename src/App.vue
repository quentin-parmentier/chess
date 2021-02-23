<template>
  <router-view/>
</template>

<script>
import { provide } from 'vue'
import json from './ouvertures/ouvertures.json'
import {createOuvertures} from './store'
export default {
  created () {
    const {store,setOuvertures} = createOuvertures()
    provide('ouvertures',store)
    setOuvertures(json)
    console.log(store['ouvertures'])
  }
  
}
</script>
