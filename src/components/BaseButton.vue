<template>
    <div>
        <button 
        class="  font-bold p-2 focus:outline-none "
        :class="[(prefixIcon !== '' ? 'bg-no-repeat pl-9 bg-icon-left' : ''),
                color, 
                (!third ? 'shadow-md rounded-md transform transition duration-300 hover:-translate-y-0.5 hover:shadow-littleup' : '')]"
        :type="type"
        :style="prefixIcon !== '' ? `background-image: url('${prexif}')` : ''"
        >{{label}}</button>
    </div>
</template>
<script>
export default {
  data () {
    return {
      prexif: ""
    }
  },
  created () {
    if(this.prefixIcon)
    this.prexif = require('../assets/img/'+this.prefixIcon)
  },
  props: {
    label: { 
      type: String,
      default: '',
      required: true
    },
    prefixIcon: { 
      type: String,
      default: '',
      required: false
    },
    color: { 
      type: String,
      default: ' bg-blue-700 hover:bg-blue-800 text-white',
      required: false
    },
    type: { 
      type: String,
      default: '',
      required: false
    },
    third: {
      type: Boolean,
      default: false,
      required: false
    }
  },
    
}
</script>