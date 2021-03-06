<template lang="">
    <div class=" cursor-pointer" v-on:click="() => showiFrame = !showiFrame">
        <div class="text-xl font-bold text-center py-4 bg-gray-500 text-gray-100">
          {{variante.name}}
        </div>
        <div class=" font-medium px-8 py-5 border-gray-500 border-solid border-2" :class="showiFrame?'border-b-0':''">
          <p v-for="(ligne,index) in variante.commentaire.split('$')" :key="index">
            {{ligne}}
          </p>
        </div>
        <iframe v-if="showiFrame" :id="variante.id" allowtransparency="true" 
        frameborder="0" 
        class="h-px425 w-full border-gray-500 border-solid border-2 border-t-0" 
        :src="variante.origine == undefined ? 'https://www.chess.com/emboard?id='+variante.id : 'https://lichess.org/study/embed/'+variante.id"></iframe>
    </div>
</template>
<script>
export default {
  data () {
    return {
      showiFrame : false
    }
  },
  props: {
    variante: { 
      type: Object,
      default: null,
      required: true
    },
    
  },
    
}
</script>