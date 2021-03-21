<template>
  <div class="min-h-fullvh text-gray-800 bg-gray-50">
    <top-bar class="bottom-0 sm:top-0" />
    <router-view class="pb-56 sm:pt-56 sm:pb-0" />
  </div>
</template>

<script>
import { provide } from 'vue'

import {createOuvertures, createFinales} from './store'
import {getUser} from './facades/UserActions'
import TopBar from './components/TopBar.vue'
export default {
  components: { TopBar },
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
