<template>
    
    <div class="flex flex-col  h-screen">
      <div class="flex">
        <div class=" self-center w-1/4 text-center ">
          <router-link :to="{ name: 'Themes'}"> 
            <base-button label="Retour" prefixIcon="arrow_back" /> 
          </router-link>
        </div>
        <div class="p-8 text-center font-bold text-3xl self-center flex-1"> Les finales </div>
        <div class="w-1/4"></div>
      </div>
      <div class="flex flex-1 max-w-screen-lg w-full m-auto">
      <router-link class="flex-1 py-12 px-4" :to="{ name: 'Variantes', params: {color:'white',id:'pion',type:'finales'}}">
        <square-image img="pion" />
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
