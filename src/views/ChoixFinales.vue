<template>
    
  <div class="flex flex-col min-h-screen">
                              <!-- Titre et retour  -->
    <div class="flex">
      <div class=" self-center w-1/4 text-center ">
        <router-link :to="{ name: 'Themes'}"> 
          <base-button :third="true" color='btn-return' label="Retour" prefixIcon="arrow_back" /> 
        </router-link>
      </div>
      <h1 class="h1 flex-1"> Les finales </h1>
      <div class="w-1/4"></div>
    </div>

                            <!-- Toutes les finales  -->
    <div class="flexcenter flex-1">
      <router-link v-for="(finale,index) in finales" :key="index" class="smallsquare" :to="{ name: 'Variantes', params: {color:'white',id:finale,type:'finales'}}">
        <square-image :img="finale" />
      </router-link> 
    </div>
      
  </div>
  
</template>

<script>
import BaseButton from '../components/BaseButton.vue'
import SquareImage from '../components/SquareImage.vue'
import {finales} from '../constantes/finales'

export default {
  data () {
    return {
      finales
    }
  },
  components: {
    SquareImage,
    BaseButton
  }
}
</script>
