<template>
    <div class="flex w-full">
      <button 
      class="w-full bg-no-repeat bg-center bg-20 h-full py-4 focus:outline-none"
      :style="icon !== '' ? `background-image: url('${iconB}')` : ''"
      :alt="icon" />    
    </div>
</template>
<script>
export default {
  data () {
    return {
      iconB: ""
    }
  },
  created () {
    this.iconB = require('../assets/img/'+this.icon)
  },
  watch: {
    icon : function(){
      this.iconB = require('../assets/img/'+this.icon)
    }
  },

  props: {
    icon:{
        type: String,
        default: '',
        required: false
    }
  },
    
}
</script>