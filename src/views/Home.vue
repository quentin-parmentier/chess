<template>
    
    <div class="flex flex-col min-h-screen">
      <h1 class="h1"> Que voir ? </h1>
      <div class="flex-1 flexcenter">
        <router-link class="bisquare" :to="{ name: 'Finales' }">
          <square-image img="finale" />
        </router-link> 
        <router-link class="bisquare" :to="{ name: 'Color' }">
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
