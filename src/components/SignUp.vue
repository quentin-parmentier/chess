<template lang="">
    <div @click="() => this.$emit('closeModal')" 
        class=" bg-gray-300 opacity-40 w-full h-full z-50 absolute top-0 left-0"></div>
    <div class="shadow-modal rounded-md fixed min-w-max top-1/2 left-1/2 mt-n214 ml-n122 bg-white opacity-100 z-50 p-5 animate-pop">
        <div class="text-center font-bold text-lg pb-5"> Créer votre compte</div>
        <div class="space-y-2">
            <base-input :error="errors.pseudo" placeholder="MonSuperPseudo" :isEditable="false" v-model:inputValue="pseudo" label="Pseudo" @focusout="vPseudo"/>
            <base-input :error="errors.email" placeholder="MonSuper@email.com" :isEditable="false" v-model:inputValue="email" label="Email" @focusout="vEmail"/>
            <base-input :error="errors.mdp" placeholder="MonSuperMotDePasse" :isEditable="false" v-model:inputValue="mdp" label="Mot de passe" @focusout="vMdp"/>
            
            <base-button class="flex justify-evenly p-3" label="Inscription" @click="validation" />
        </div>
    </div>
</template>

<script>
    import BaseInput from '../components/BaseInput.vue'
    import BaseButton from '../components/BaseButton.vue'
    import {checkPseudo, checkMdp, checkEmail} from '../fonctions/Validateurs'
    const axios = require('axios');

export default {
    methods: {
        validation(){
            let isOk = checkPseudo(this.pseudo,this.errors) 
            isOk &= checkMdp(this.mdp,this.errors) 
            isOk &= checkEmail(this.email,this.errors)
            if(isOk) this.inscription()
        },
        vPseudo(){
            checkPseudo(this.pseudo,this.errors)
        },
        vMdp(){
            checkMdp(this.mdp,this.errors)
        },
        vEmail(){
            checkEmail(this.email,this.errors)
        },
        inscription(){
            const token = localStorage.getItem('token')
            axios.post(`${this.auth}/signup`,
            {
                data: {
                    pseudo: this.pseudo,
                    mail:this.email,
                    password:this.mdp
                },
            },
            {headers: {'Authorization': 'Bearer ' + token}})
            .then(() => {
                //On se remet sur l'écran de connexion
                //On showMsg('Utilisateur créé')
            })
            .catch(() => {
                //On showMsg('error')
            })
        }
    },
    data () {
        return {
            pseudo:"",
            email:"",
            mdp:"",
            errors:{}
        }
    },
    components: { BaseInput, BaseButton },
    inject: ['auth'],
    emits: ['closeModal']
    
}
</script>
<style lang="">
    
</style>