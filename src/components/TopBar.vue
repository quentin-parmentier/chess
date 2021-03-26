<template>
    <div class="fixed min-w-full z-50 h-56 flex items-center justify-center shadow-md bg-white"> 
        <top-bar-item to="Themes" text='Accueil' icon='accueil.svg' />
        <top-bar-item to="Finales" text='Finales' icon='finale.svg' match="finales" />
        <top-bar-item to="Color" text='Ouvertures' icon='ouverture.svg' match="ouvertures" />
        <top-bar-item to="Profil" text='Profil' icon='profil.svg' />
    </div>
</template>
<script>
import TopBarItem from './TopBarItem.vue'
export default {
  components: { TopBarItem },
}
</script>