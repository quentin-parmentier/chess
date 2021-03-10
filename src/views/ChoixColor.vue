<template>
    
    <div class="flex flex-col  min-h-screen">
      <div class="flex">
        <div class=" self-center w-1/4 text-center ">
          <router-link :to="{ name: 'Themes'}"> 
            <base-button label="Retour" prefixIcon="arrow_back" /> 
          </router-link>
        </div>
        <h1 class="h1 flex-1"> Les ouvertures </h1>
        <div class="w-1/4"></div>
      </div>
      <div class="flexcenter max-w-screen-lg w-full m-auto">
      <router-link class="bisquare" :to="{ name: 'Ouvertures', params: {color:'white'}}">
        <square-image img="whitepiece" />
      </router-link> 
      <router-link class="bisquare" :to="{ name: 'Ouvertures', params: {color:'black'}}">
        <square-image img="blackpiece" />
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
