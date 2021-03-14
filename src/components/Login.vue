<template lang="">
    <div @click="() => this.$emit('closeModal')" 
        class=" bg-gray-300 opacity-40 w-full h-full z-50 absolute top-0 left-0"></div>
    <div class="shadow-modal rounded-md fixed min-w-max top-1/2 left-1/2 mt-n168 ml-n122 bg-white opacity-100 z-50 p-5 animate-pop">
        <div class="text-center font-bold text-lg pb-5"> Connexion</div>
        <div class="space-y-2">
            <base-input :error="errors.pseudo" placeholder="MonSuperPseudo" :isEditable="false" v-model:inputValue="pseudo" label="Pseudo" @focusout="vPseudo"/>
            <base-input :error="errors.mdp" placeholder="MonSuperMotDePasse" :isEditable="false" v-model:inputValue="mdp" label="Mot de passe" @focusout="vMdp"/>
            
            <base-button class="flex justify-evenly p-3" label="Connexion" @click="validation" />
        </div>
    </div>
</template>

<script>
    import BaseInput from '../components/BaseInput.vue'
    import BaseButton from '../components/BaseButton.vue'
    import {checkPseudo, checkMdp} from '../fonctions/Validateurs'
    const axios = require('axios');

export default {
    methods: {
        vPseudo(){
            checkPseudo(this.pseudo,this.errors) 
        },
        vMdp(){
            checkMdp(this.mdp,this.errors)
        },
        validation(){
            let isOk = checkPseudo(this.pseudo,this.errors) 
            isOk &= checkMdp(this.mdp,this.errors)
            if(isOk) this.inscription()
        },
        inscription(){
            const token = localStorage.getItem('token')
            axios.post(`${this.auth}/login`,
            {
                data: {
                    pseudo: this.pseudo,
                    password:this.mdp
                },
            },
            {headers: {'Authorization': 'Bearer ' + token}})
            .then((response) => {
                //On init le token
                console.log(response)
                //localStorage.setItem('token',response.accessToken);
                //localStorage.setItem('refreshToken',response.refreshToken);
                //On showMsg('Connexion reussi')

                //On change de vue
            })
            .catch(() => {
                //On showMsg('error')
            })
        }
    },
    data () {
        return {
            pseudo:"",
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