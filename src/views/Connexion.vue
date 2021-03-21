<template>
    <div class="max-w-2xl m-auto max-h-screen pb-12 flex flex-col">
        <!-- TOP : Grosse image  -->
        <div class="w-full flex-45">
            <svg-register />
        </div>
        <!-- CENTER : Texte qui donne envie  -->
        <div class="text-center max-w-md m-auto pb-4 px-3">
            <p class="titleRegister"> Apprenez. Révisez. Mémorisez. </p>
            <p class="h4 text-gray-600"> Rassemblez vos ouvertures et vos finales au même endroit pour améliorer vos échecs en utilisant l'explorateur lichess ou chess.com </p>
        </div>
        
        <!-- BOTTOM : CTA  -->
        <div class="flex justify-evenly">
            <base-button label="S'enregistrer" @click="() => signup = true" />
            <base-button label="Se connecter" @click="() => login = true" />
        </div>
        
    </div>

    <!-- Fenêtres modales pour connexion / inscription  -->
    <login v-if="login" @openSignup="() => {signup=true; login=false} " @closeModal="() => login = false" />
    <sign-up v-if="signup" @openLogin="() => {login=true; signup=false}" @closeModal="() => signup = false" />

</template>
<script>
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
import BaseButton from '../components/BaseButton.vue'
import SvgRegister from '../components/SvgRegister.vue'
    export default {
        data () {
            return {
                signup: false,
                login: false
            }
        },
        components: { SignUp, Login, BaseButton, SvgRegister },
        
    }
</script>
