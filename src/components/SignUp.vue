<template lang="">
    <!-- ALL : Voile qui empêche de cliquer en dessous  -->
    <div 
        @click="() => this.$emit('closeModal')" 
        class=" bg-gray-300 opacity-40 w-full h-full z-50 absolute top-0 left-0">
    </div>
    <div class="min-w-full shadow-modal rounded-md fixed left-0 bottom-0 bg-white opacity-100 z-50 p-5 animate-slide">
        <!-- TOP : Titre  -->
        <div class="text-center font-bold text-lg pb-5"> Créer mon compte</div>
        
        <!-- CENTER : Formulaire d'inscription  -->
        <div class="space-y-2 max-w-sm m-auto">
            <base-input autocomplete="username" :error="errors.pseudo" placeholder="MonSuperPseudo" :isEditable="false" v-model:inputValue="pseudo" label="Pseudo" @focusout="vPseudo"/>
            <base-input autocomplete="email" :error="errors.email" type="email" placeholder="MonSuper@email.com" :isEditable="false" v-model:inputValue="email" label="Email" @focusout="vEmail"/>
            <base-input 
                :error="errors.mdp" 
                placeholder="MonSuperMotDePasse" 
                :isEditable="false" 
                v-model:inputValue="mdp" 
                label="Mot de passe" 
                @focusout="vMdp"
                :type="showPsw ? '' : 'password'"
                autocomplete="new-password"
            >
                <svg-eye @showPsw="(show) => showPsw = show" />
            </base-input> 
            
            <base-button class="flex justify-evenly p-3" label="M'inscrire" @click="validation" />
        </div>
        <!-- BOTTOM : Swap pour connexion  -->
        <div class="flex items-center justify-center">
            <p class=" font-semibold">J'ai déjà un compte ! </p>
            <base-button 
                :third="true" 
                color="btn-return" 
                label="Je me connecte" 
                @click="this.$emit('openLogin')" />
        </div>
    </div>
</template>

<script>
    import BaseInput from '../components/BaseInput.vue'
    import BaseButton from '../components/BaseButton.vue'
    import SvgEye from '../components/SvgEye.vue'
    import {checkPseudo, checkMdp, checkEmail} from '../facades/AuthValidateurs'
    import {createUser} from '../facades/UserActions'

export default {
    methods: {
        validation(){
            let isOk = this.vPseudo() 
            isOk &= this.vMdp() 
            isOk &= this.vEmail()
            if(isOk) this.inscription()
        },
        vPseudo(){
            return checkPseudo(this.pseudo,this.errors)
        },
        vMdp(){
            return checkMdp(this.mdp,this.errors)
        },
        vEmail(){
            return checkEmail(this.email,this.errors)
        },
        inscription(){
            createUser(this.pseudo,this.email,this.mdp)
            .then(() => {
                //On showMsg('Utilisateur créé')
                //On se remet sur l'écran de connexion
                this.$emit('openLogin')
            })
        }
    },
    data () {
        return {
            pseudo:"",
            email:"",
            mdp:"",
            errors:{},
            showPsw:false
        }
    },
    components: { BaseInput, BaseButton, SvgEye },
    emits: ['closeModal','openLogin']
    
}
</script>
<style lang="">
    
</style>