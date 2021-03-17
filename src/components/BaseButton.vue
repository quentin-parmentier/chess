<template>
    <div>
        <button 
        class="  font-bold p-2 focus:outline-none "
        :class="[(prefixIcon !== '' ? 'bg-no-repeat pl-9 bg-icon-left bg-'+prefixIcon : ''),
                color, (!third ? 'shadow-md rounded-md transform transition duration-300 hover:-translate-y-0.5 hover:shadow-littleup' : '')]"
        :type="type"
        >{{label}}</button>
    </div>
</template>
<script>
export default {
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