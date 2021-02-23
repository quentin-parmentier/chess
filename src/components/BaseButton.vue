<template>
    <div>
        <button 
        class=" shadow-md rounded-md font-bold p-2 focus:outline-none 
        transform transition duration-300 hover:-translate-y-0.5 hover:shadow-basic"
        :class="[(prefixIcon !== '' ? 'bg-no-repeat pl-9 bg-icon-left bg-'+prefixIcon : ''),
                color]"
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
  },
    
}
</script>