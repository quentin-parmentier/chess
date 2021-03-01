<template lang="">
    <router-link :to="{ name: 'Variantes', params: {id:index, color:color, type:'ouvertures'}}" @mouseover="() => this.isHover = true" @mouseout="() => this.isHover = false">
      <div class="h-28 flex rounded-md border-2 border-solid border-gray-400 shadow-basic">

        <div class=" h-full w-28">
          <img :src="ouverture.img" alt="" class="h-full object-cover">
        </div>
        <div class=" flex-1 pl-12 self-center">
          <div class=" font-bold text-xl text-gray-800">
            {{ouverture.name}}
          </div>
          <div class=" font-semibold text-sm text-gray-400 pl-4 mt-1">
            {{ouverture.commentaire}}
          </div>
        </div>
        <div class=" w-16">
          <rounded-arrow :hover="isHover"> </rounded-arrow>
        </div>
      </div>
    </router-link>
</template>
<script>

import RoundedArrow from './RoundedArrow.vue'
export default {
  components: { RoundedArrow },
  created () {
    console.log(this.svg)
  },
  data () {
    return {
      isHover: false
    }
  },
  props: {
    ouverture: { 
      type: Object,
      default: null,
      required: true
    },
    color: { 
      type: String,
      default: null,
      required: true
    },
    index: { 
      type: String,
      default: null,
      required: true
    },
      
  },
    
}
</script>
<style lang="">
    
</style>