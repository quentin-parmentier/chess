<template>
    
    <div class="flex flex-col  h-screen">
      <div class="h-20 text-center font-bold text-3xl justify-center items-center flex"> Les ouvertures </div>
      <div class="flex flex-1 max-w-screen-lg w-full m-auto">
        <router-link class="flex-1 py-12 px-4" :to="{ name: 'Color', params: {color:'white'}}">
        <square-image color="white" />
      </router-link> 
      <router-link class="flex-1 py-12 px-4" :to="{ name: 'Color', params: {color:'black'}}">
        <square-image color="black" />
      </router-link>
      </div>
       
    </div>
  
</template>

<script>
import SquareImage from '../components/SquareImage.vue'

export default {
  components: {
    SquareImage
  }
}
</script>
