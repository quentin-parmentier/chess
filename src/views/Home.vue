<template>
    
    <div class="flex flex-col  h-screen">
      <div class="h-20 text-center font-bold text-3xl justify-center items-center flex"> Que voir ? </div>
      <div class="flex flex-1 max-w-screen-lg w-full m-auto">
      <router-link class="flex-1 py-12 px-4" :to="{ name: 'Finales' }">
        <square-image img="finale" />
      </router-link> 
      <router-link class="flex-1 py-12 px-4" :to="{ name: 'Color' }">
        <square-image img="ouverture" />
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
