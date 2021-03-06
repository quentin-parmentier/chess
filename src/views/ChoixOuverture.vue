<template>
<div class="relative">
  <div class="m-auto max-w-px800 min-h-fullvh">
    <div class="flex">
      <div class=" self-center w-24 ">
        <router-link :to="{ name: 'Color'}"> 
          <base-button label="Retour" prefixIcon="arrow_back" /> 
        </router-link>
      </div>
      <div class=" self-center flex-1">
        <h1 class="text-2xl font-bold text-center p-8"> Mes ouvertures avec les {{color == 'white' ? 'blancs' : 'noirs'}}</h1>
      </div>
      <div class=" self-center w-24 ">
        <router-link :to="{ name: 'Ouvertures', params:{color:color == 'white' ? 'black' : 'white'}}"> 
          <base-icon-button class="transition-transform duration-300 w-12 h-12 bg-white rounded-lg transform hover:rotate-45 " :icon="color == 'white' ? 'blackpiece' : 'whitepiece'" /> 
        </router-link>
      </div>
    </div>
    <div class=" mb-3" v-for="(ouverture,index) in oppenings" :key="index" > 
       <ouverture :ouverture="ouverture" :color="color" :index="index" />
    </div>
    <rounded-add @click="() => this.isAdding = true"/> 
    
  </div>
  <add-ouverture v-if="isAdding" @enregistrer="() => newOppening()" :color="color" />
</div>
</template>

<script>
import Ouverture from '../components/Ouverture.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseIconButton from '../components/BaseIconButton.vue'
import RoundedAdd from '../components/RoundedAdd.vue'
import AddOuverture from '../components/AddOuverture.vue'
export default {
    methods: {
      newOppening(){
        this.oppenings = this?.ouvertures?.['ouvertures']?.[this.color]
        this.isAdding = false
      }
    },

    components: { Ouverture, BaseButton, BaseIconButton, RoundedAdd, AddOuverture },
    created () {
      this.color = this.$route.params.color
      this.oppenings = this?.ouvertures?.['ouvertures']?.[this.color]
    },
    data () {
        return {
            oppenings : [],
            color: "",
            isHoverAdd:false,
            isAdding:false
        }
    },
    inject:['ouvertures'],
    watch : {
      $route(to) {
        this.color = to.params.color
        this.oppenings = this?.ouvertures?.['ouvertures']?.[this.color]
      }
    }
}
</script>
<style lang="">
    
</style>