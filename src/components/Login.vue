<template lang="">
    <div @click="() => this.$emit('closeModal')" 
        class=" bg-gray-300 opacity-40 w-full h-full z-50 absolute top-0 left-0"></div>
    <div class="min-w-full shadow-modal rounded-md fixed left-0 bottom-0 bg-white opacity-100 z-50 p-5 animate-slide">
        <div class="text-center font-bold text-lg pb-5"> Se connecter </div>
            <div class="space-y-2 max-w-sm m-auto">
                <base-input autocomplete="username" :error="errors.pseudo" placeholder="MonSuperPseudo" :isEditable="false" v-model:inputValue="pseudo" label="Pseudo" @focusout="vPseudo"/>
                <base-input 
                    autocomplete="current-password" 
                    :error="errors.mdp" 
                    placeholder="MonSuperMotDePasse" 
                    :isEditable="false" 
                    v-model:inputValue="mdp" 
                    label="Mot de passe" 
                    @focusout="vMdp"
                    :type="showPsw ? '' : 'password'"
                >
                    <svg-eye @showPsw="(show) => showPsw = show" />
                </base-input>

                <base-button class="flex justify-evenly p-3" label="Me connecter" @click="validation" />
            </div>

            <div class="flex items-center justify-center">
                <p class=" font-semibold">Je n'ai pas encore de compte ! </p>
                <base-button 
                    :third="true" 
                    color=" shadow-none text-blue-700 transform-none" 
                    label="Je m'inscris" 
                    @click="this.$emit('openSignup')"
                />
            </div>
        <div>
            
        </div>
    </div>
</template>

<script>
    import BaseInput from '../components/BaseInput.vue'
    import BaseButton from '../components/BaseButton.vue'
    import {checkPseudo, checkMdp} from '../facades/AuthValidateurs'
    import SvgEye from '../components/SvgEye.vue'
    import {connectUser,getUser} from '../facades/UserActions'

export default {
    methods: {
        vPseudo(){
            return checkPseudo(this.pseudo,this.errors) 
        },
        vMdp(){
            return checkMdp(this.mdp,this.errors)
        },
        validation(){
            let isOk = this.vPseudo() 
            isOk &= this.vMdp()
            if(isOk) this.connexion()
        },
        connexion(){
            //On connecte notre utilisateur
            connectUser(this.pseudo,this.mdp)
            .then(() => {
                
                //Une fois connecté on récupère ses infos
                getUser()
                .then((user) => {
                    this.setOuvertures(user.ouvertures)
                    this.setFinales(user.finales)

                    //On change de vue
                    this.$router.push({name:'Themes'})
                })
            })
        }
    },
    data () {
        return {
            pseudo:"",
            mdp:"",
            errors:{},
            showPsw: false
        }
    },
    components: { BaseInput, BaseButton, SvgEye },
    inject: ['setOuvertures','setFinales'],
    emits: ['closeModal','openSignup']
    
}
</script>
<style lang="">
    
</style>