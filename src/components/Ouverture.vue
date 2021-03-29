<template lang="">
    <!-- ALL : Contour de l'ouverture  -->
    <router-link :to="{ name: 'Variantes', params: {id:index, color:ouverture.color, type:'ouvertures'}}">
      <div class="flex bg-white rounded-md shadow-basic">
        <div class="flex-1" @mouseover="() => this.isHover = true" @mouseout="() => this.isHover = false">
          <div class="h-28 flex ">
            <!-- LEFT-CENTER : Informations en ligne  -->
            <div class=" h-full w-28">
              <img :src="ouverture.img || imgHolder " ref="img" :onerror="() => changeImg()" alt="Openning icon" class="h-full rounded-l-md object-cover">
            </div>
            <div class=" flex-1 pl-2 sm:pl-12 self-center break-all">
              <div class=" font-bold text-xl">
                {{ouverture.name}}
              </div>
              <div class=" font-semibold text-sm text-gray-400 pl-2 sm:pl-4 mt-1 break-all">
                {{ouverture.commentaire}}
              </div>
            </div>
            <div class=" hidden sm:block sm:w-16">
              <rounded-arrow :hover="isHover"> </rounded-arrow>
            </div>
          </div>
        </div>
        <!-- RIGHT : Bouttons d'action de l'ouverture  -->
        <div class=" w-12 flex flex-col py-3 justify-around" @click="(e) => e.preventDefault()">
          <base-icon-button 
            @click="(e) => deleteO(e)"
            icon="cross.svg"
            class="hover:rotate-90 transition duration-300 transform" 
          />
          <base-icon-button 
            @click="(e) => editO(e)"
            icon="edit.svg"
            class="hover:animate-write" 
          />
        </div>
      </div>
    </router-link>

    <!-- MODAL : Fenêtre pour supprimer mon ouverture  -->
    <div v-if="validationDelete">
      <div class="bg-gray-500 opacity-40 w-full h-full z-40 fixed top-0 left-0" @click="() => validationDelete = false"></div>
      <div class="fixed space-y-2 font-bold top-1/2 left-1/2 mt-n188 ml-n143 bg-white opacity-100 z-50 p-5 animate-pop">
        <h3 class="text-center">Confirmez-vous la suppression de l'ouverture :</h3>
        <p class="text-center font-medium">{{ouverture.name}}</p>
         <div class="flex justify-evenly">
            <base-button label="Supprimer" class=" text-center p-3 " color="border-red-400 border-solid border-2 text-red-400 hover:bg-red-400 hover:text-white" @click="() => sendDelete()" />
            <base-button label="Annuler" class=" text-center p-3" @click="() => validationDelete = false" />
          </div>
      </div>
    </div>
    
</template>
<script>

import RoundedArrow from './RoundedArrow.vue'
import BaseIconButton from '../components/BaseIconButton.vue'
import BaseButton from '../components/BaseButton.vue'

export default {

  methods: {
    editO(e){
      e.preventDefault();
      this.$emit('edit',this.ouverture)
    },
    deleteO(e){
      e.preventDefault();
      this.validationDelete = true
    },
    sendDelete(){
      this.ouverture.delete()
      .then((response) => {
        this.setOuvertures(response.ouvertures)
        this.validationDelete = false
        this.$emit('enregistrer')
      })
    },
    changeImg(){
      this.$refs.img.src = this.imgHolder
    }
  },
  components: { RoundedArrow,BaseIconButton,BaseButton },
  data () {
    return {
      isHover: false,
      validationDelete: false,
      imgHolder: 'https://via.placeholder.com/150?text=No img'
    }
  },
  props: {
    ouverture: { 
      type: Object,
      default: null,
      required: true
    },
    index: { 
      type: [String,Number],
      default: null,
      required: true
    },
      
  },
  emits:['edit','enregistrer'],
  inject:['setOuvertures']
    
}
</script>
<style lang="">
    
</style>