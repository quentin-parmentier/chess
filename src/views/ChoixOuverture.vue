<template>
  <div class="relative">
    
    <div class="m-auto max-w-px800 min-h-fullvh">
      <!-- TOP Bar des ouvertures -->
      <div class="flex">
        <div class=" self-center w-24 ">
          <router-link :to="{ name: 'Color'}"> 
            <base-button class="px-3" label="Retour" prefixIcon="arrow_back" /> 
          </router-link>
        </div>
        <div class=" self-center flex-1">
          <h1 class="text-2xl font-bold text-center p-8"> Ouvertures {{color == 'white' ? 'blanches' : 'noires'}}</h1>
        </div>
        <div class=" self-center w-24 ">
          <router-link :to="{ name: 'Ouvertures', params:{color:color == 'white' ? 'black' : 'white'}}"> 
            <base-icon-button class="transition-transform duration-300 w-12 h-12 bg-white rounded-lg transform hover:rotate-45 pr-6" :icon="color == 'white' ? 'blackpiece' : 'whitepiece'" /> 
          </router-link>
        </div>
      </div>

      <!-- CENTER - List des ouvertures ou SVG pour inviter à ajouter -->
      <!-- Oppening list  -->
      <div v-if="oppenings.length > 0">
        <div class=" pb-3" v-for="(ouverture,index) in oppenings" :key="index" > 
          <ouverture :ouverture="ouverture" :color="color" :index="index" @edit="(ouvertureE) => startEdit(ouvertureE)" @enregistrer="() => refreshO()" />
        </div>
      </div>
      <!-- SVG CTA create -->
      <div v-else class="h-full">
         <empty-O />
         <p class="text-gray-400 text-xl font-bold m-10 text-center">Vous n'avez pas encore ajouté d'ouverture</p>
      </div>

    </div>

    <!-- Floating CTA Button to ADD ouverture -->
    <rounded-add @click="() => this.isAdding = true"/> 

    <!-- Composant pour ajouter/modifier des ouvertures -->
    <add-ouverture :editO="editOppening" v-if="isAdding || isEditing" @enregistrer="() => refreshO()" :color="color" />
  
  </div>
</template>

<script>
import Ouverture from '../components/Ouverture.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseIconButton from '../components/BaseIconButton.vue'
import RoundedAdd from '../components/RoundedAdd.vue'
import EmptyO from '../components/EmptyO.vue'
import AddOuverture from '../components/AddOuverture.vue'
export default {
    methods: {
      //Méthode pour refresh la liste d'ouverture après un POST ou un PUT ou un DELETE 
      refreshO(){
        this.oppenings = this?.ouvertures?.['ouvertures']?.[this.color]
        this.isAdding = false
        this.isEditing = false
        this.editOppening = null
      },
      //Affiche la fenêtre pour l'édition
      startEdit(ouvertureE){
        this.isEditing = true; 
        this.editOppening = ouvertureE
      }
    },

    components: { Ouverture, BaseButton, BaseIconButton, RoundedAdd, AddOuverture, EmptyO },
    created () {
      this.color = this.$route.params.color
      this.oppenings = this?.ouvertures?.['ouvertures']?.[this.color]
      this.oppenings ?? this.$router.push({name:'Color'})
      this.oppenings= this.oppenings ?? []
    },
    data () {
        return {
            oppenings : [],
            color: "",
            isHoverAdd:false,
            isAdding:false,
            isEditing:false,
            editOppening:null
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