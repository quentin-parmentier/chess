<template>
  <router-view/>
</template>

<script>
import { provide } from 'vue'

import jsonOuverture from './ouvertures/ouvertures.json'
import jsonFinales from './ouvertures/finales.json'
import {createOuvertures, createFinales, server} from './store'
const axios = require('axios');
export default {
  created () {
    const {storeOuvertures,setOuvertures} = createOuvertures()
    provide('ouvertures',storeOuvertures)
    setOuvertures(jsonOuverture)
    const {storeFinales,setFinales} = createFinales()
    provide('finales',storeFinales)
    setFinales(jsonFinales)
    const urlserv = server().urlserv
    provide('urlserv',urlserv)

    axios.get(urlserv)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
}
</script>
