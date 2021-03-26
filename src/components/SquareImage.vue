<template lang="">
    <div class="bg-white cursor-pointer transform transition duration-300 h-full p-4 rounded-2xl shadow-basic hover:-translate-y-3 hover:shadow-up max-w-md">
      <div 
        :class=" 'bg-contain bg-no-repeat bg-center h-full'"  
        :style="img !== '' ? `background-image: url('${squareImg}')` : ''"
        :alt="img">  
      </div>
    </div>
    
</template>
<script>
export default {
  data () {
    return {
      squareImg: ""
    }
  },
  created () {
    this.squareImg = require('../assets/img/'+this.img)
  },
  props: {
    img: { 
      type: String,
      default: '',
      required: true
    },
      
  },
    
}
</script>