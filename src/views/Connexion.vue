<template>
    <div class="min-h-screen">
        <div class="">
            
        </div>
        <div>
            <sign-up />
            <login />
        </div>
    </div>
</template>
<script>
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
    export default {
        components: { SignUp, Login },
        
    }
</script>
