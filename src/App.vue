<template>
  <router-view/>
</template>

<script>
import { provide } from 'vue'

import {createOuvertures, createFinales, server} from './store'
const axios = require('axios');
export default {
  created () {

    const {storeOuvertures,setOuvertures} = createOuvertures()
    provide('ouvertures',storeOuvertures)
    provide('setOuvertures',setOuvertures)
    
    const {storeFinales,setFinales} = createFinales()
    provide('finales',storeFinales)
    provide('setFinales',setFinales)

    const serv = server().serv
    const auth = server().auth
    provide('serv',serv)
    provide('auth',auth)
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzZXIiOiI2MDQxNWE3ZmYwN2Y1OTUyOTAxMmFlMTAiLCJpYXQiOjE2MTQ5OTE4NzcsImV4cCI6MTYxNjI4Nzg3N30.fvvtm89ktPD2OcunqkgkYkhVTjkBRM_1TInujn-5Lfc');
    axios.get(`${serv}/users`
    , {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
    )
    .then((response) => {

      const ouvertures = response.data.ouvertures ?? {white:{},black:{}}
      setOuvertures(ouvertures)
      const finales = response.data.finales ?? ({pion:{},tour:{}})
      setFinales(finales)

    })
    .catch( (error) => {
      // handle error
      console.log(error);
    })
  }
}
</script>
