<template>
    
    <div class="flex flex-col min-h-screen">
                      <!-- Titre et retour  -->
      <div class="flex">
        <div class=" self-center w-1/4 text-center ">
          <router-link :to="{ name: 'Themes'}"> 
            <base-button :third="true" color='btn-return' label="Retour" prefixIcon="arrow_back.svg" /> 
          </router-link>
        </div>
        <h1 class="h1 flex-1"> Les ouvertures </h1>
        <div class="w-1/4"></div>
      </div>
                    <!-- Choix de couleur  -->
      <div class="flexcenter max-w-screen-lg w-full m-auto">
      <router-link class="bisquare" :to="{ name: 'Ouvertures', params: {color:'white'}}">
        <square-image img="white.svg" />
      </router-link> 
      <router-link class="bisquare" :to="{ name: 'Ouvertures', params: {color:'black'}}">
        <square-image img="black.svg" />
      </router-link>
      </div>
       
    </div>
  
</template>

<script>
import BaseButton from '../components/BaseButton.vue'
import SquareImage from '../components/SquareImage.vue'

export default {
  components: {
    SquareImage,
    BaseButton
  }
}
</script>
