<template>
  <router-view class="text-gray-800 bg-gray-50" />
</template>

<script>
import { provide } from 'vue'

import {createOuvertures, createFinales} from './store'
import {getUser} from './facades/UserActions'
export default {
  created () {

    const {storeOuvertures,setOuvertures} = createOuvertures()
    provide('ouvertures',storeOuvertures)
    provide('setOuvertures',setOuvertures)
    
    const {storeFinales,setFinales} = createFinales()
    provide('finales',storeFinales)
    provide('setFinales',setFinales)

    //Si on est connecté, on va chercher nos ouvertures et nos finales, sinon on le fera à la connexion
    if(localStorage.getItem('token')){
      //On récupère ses infos
      getUser()
      .then((user) => {
        setOuvertures(user.ouvertures)
        setFinales(user.finales)
      })
    }
  }
}
</script>
