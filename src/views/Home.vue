<template>
    
    <div class="flex flex-col min-h-screen">
      <!-- TOP : Titre  -->
      <h1 class="h1"> Finales ou Ouvertures ? </h1>
      <!-- CENTER : Différentes parties de l'application  -->
      <div class="flex-1 flexcenter">
        <router-link class="bisquare" :to="{ name: 'Finales' }">
          <square-image img="finale.svg" />
        </router-link> 
        <router-link class="bisquare" :to="{ name: 'Color' }">
          <square-image img="ouverture.svg" />
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
