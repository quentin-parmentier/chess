<template lang="">
  <div class="cursor-pointer shadow-basic rounded-md" v-on:click="() => showiFrame = !showiFrame">
    
                              <!-- Partie haute de la variante  -->
    <div class="flex">
      <div class=" rounded-tl-md flex-1 text-xl font-bold text-center py-4 bg-gray-500 text-gray-100">
        {{variante.name}}
      </div>
                          <!-- Boutons d'action de notre variante  -->
      <div class="rounded-tr-md w-16 flex py-3 justify-around bg-gray-500" @click="(e) => e.preventDefault()">
          <base-icon-button 
            @click="(e) => deleteV(e)"
            icon="cross"
            class="hover:rotate-90 transition duration-300 transform" 
          />
          <base-icon-button 
            @click="(e) => editV(e)"
            icon="edit"
            class="hover:animate-write" 
          />
      </div>
    </div>
                              <!-- Partie des commentaires -->
      <div class=" font-medium px-8 py-5" :class="showiFrame?'border-b-0':''">
        <p v-for="(ligne,index) in variante.commentaire.split('$')" :key="index">
          {{ligne}}
        </p>
      </div>
                    <!-- Partie avec l'échiquier qui se montre et cache -->
      <div>
        <iframe v-if="showiFrame" :id="variante.id" allowtransparency="true" 
        frameborder="0" 
        class="h-px425 w-full rounded-b-md" 
        :src="variante.origine == undefined ? 'https://www.chess.com/emboard?id='+variante.id : 'https://lichess.org/study/embed/'+variante.id"></iframe>
      </div>
  </div>
                    <!-- FENETRE MODAL POUR SUPPRIMER LA VARIANTE -->
  <div v-if="validationDelete">
    <div class="bg-gray-500 opacity-40 w-full h-full z-40 absolute top-0 left-0" @click="() => validationDelete = false"></div>
    <div class="rounded-md fixed space-y-2 font-bold top-1/2 left-1/2 mt-n188 ml-n143 bg-white opacity-100 z-50 p-5 animate-pop">
      <h3 class="text-center">Confirmez-vous la suppression de la variante :</h3>
      <p class="text-center font-medium">{{variante.name}}</p>
        <div class="flex justify-evenly">
          <base-button label="Supprimer" class=" text-center p-3 " color="border-red-400 border-solid border-2 text-red-400 hover:bg-red-400 hover:text-white" @click="() => sendDelete()" />
          <base-button label="Annuler" class=" text-center p-3" @click="() => validationDelete = false" />
        </div>
    </div>
  </div>

</template>
<script>

import BaseIconButton from '../components/BaseIconButton.vue'
import BaseButton from '../components/BaseButton.vue'
import Variante from '../classes/Variante'
import Finale from '../classes/Finale'
export default {
  methods: {
    editV(e){
      e.preventDefault();
      e.stopPropagation();
      this.$emit('edit',this.variante)
    },
    deleteV(e){
      e.preventDefault();
      e.stopPropagation();
      this.validationDelete = true
    },
    sendDelete(){
      this.variante.delete()
      .then((datas) => {

        switch (true) {
          case this.variante instanceof Variante:
            this.setOuvertures(datas.ouvertures)
            break;
          case this.variante instanceof Finale:
            this.setFinales(datas.finales)
            break;
        }

        this.validationDelete = false
        this.$emit('enregistrer')
      })

    }
  },
  data () {
    return {
      showiFrame : false,
      validationDelete: false,
      token: null
    }
  },
  props: {
    variante: { 
      type: Object,
      default: null,
      required: true
    }
  },
  components : {BaseIconButton,BaseButton},
  emits: ['edit','enregistrer'],
  inject: ['setOuvertures','setFinales']
    
}
</script>