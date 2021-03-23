<template>
<div>
<div class=" max-w-md m-auto min-h-fullvh flex flex-col space-y-2">
        <p class="h2"> Mes informations de compte </p>
        <base-input :disabled="true" :isEditable="false" label="Pseudo" :inputValue="user.pseudo" />
        <base-input :disabled="true" :isEditable="false" label="Email" :inputValue="user.mail" />
        <base-button :third="true" @click="() => pswChange = !pswChange"
        label="Changer mon mot de passe" color="btn-return ml-0 pl-0" />
        <div v-if="pswChange" class=" bg-gray-100 rounded space-y-1">
            <base-input :isEditable="false" label="Actuel" v-model:inputValue="user.pswActu" @focusout="vMdp" :error="errors.mdp" />
            <base-input :isEditable="false" label="Nouveau" v-model:inputValue="user.pswNew" @focusout="vIdentique" :error="errors.pswNew" />
            <base-input :isEditable="false" label="Confirmer" v-model:inputValue="user.pswConfirm" @focusout="vIdentique" :error="errors.pswConfirm" />
            <base-button class="flex justify-evenly py-1" label="Changer" @click="vChange"/>
        </div>
        <base-button :third="true" label="Me déconnecter" 
        color="text-red-500 ml-0 pl-0 hover:text-red-600" 
        @click="() => isDeconnecting = true"
        @annuler="() => isDeconnecting = false"/>
    </div>

    <!-- FENETRE MODAL POUR SUPPRIMER LA VARIANTE -->
  <div v-if="isDeconnecting">
    <div class="bg-gray-500 opacity-40 w-full h-full z-40 fixed top-0 left-0" @click="() => validationDelete = false"></div>
    <div class="rounded-md fixed space-y-2 font-bold top-1/2 left-1/2 mt-n188 ml-n174 bg-white opacity-100 z-50 p-5 animate-pop">
      <h3 class="text-center">Voulez-vous vraiment vous déconnecter :</h3>
        <div class="flex justify-evenly">
          <base-button label="Me déconnecter" class=" text-center p-3 " color="border-red-400 border-solid border-2 text-red-400 hover:bg-red-400 hover:text-white" @click="() => disconnect()" />
          <base-button label="Annuler" class=" text-center p-3" @click="() => isDeconnecting = false" />
        </div>
    </div>
  </div>
</div>
    
</template>
<script>
import BaseButton from '../components/BaseButton.vue'
import BaseInput from '../components/BaseInput.vue'
import {checkMdp, checkIdentique} from '../facades/AuthValidateurs'
import {getProfilUser,changePassword,disconnectUser} from '../facades/UserActions'

export default {
  props: {
  },
  created () {
    getProfilUser()
    .then((user) => {
        this.user.pseudo = user.pseudo
        this.user.mail = user.mail
    })
    
  },
  methods: {
    vMdp(){
        return checkMdp(this.user.pswActu,this.errors)
    },
    vIdentique(){
        return checkIdentique(this.user.pswNew,this.user.pswConfirm,this.errors)
    },
    vChange(){
        let isOk = this.vMdp()
        isOk &= this.vIdentique()
        isOk &= !this.wait
        if(isOk) this.wait = true
        if(isOk) this.changeMdp()
    },
    changeMdp(){
        changePassword(this.user)
        .finally(() => this.wait = false)
    },
    disconnect(){
        disconnectUser()
        .then(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            this.$router.push({ name: 'Connexion'})
        })
    }
  },
  data () {
    return {
        user: {pseudo:"", mail:"", pswActu:"", pswNew:"", pswConfirm:""},
        pswChange: false,
        errors: {},
        isDeconnecting: false,
        wait:false
    }
  },
  components: { BaseInput, BaseButton },
    
}
</script>