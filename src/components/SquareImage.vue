<template lang="">
    <div class="bg-white cursor-pointer transform transition duration-300 h-full p-4 rounded-2xl shadow-basic hover:-translate-y-3 hover:shadow-up max-w-md">
      <div 
        :class=" 'bg-'+img+' bg-contain bg-no-repeat bg-center h-full'"  :alt="img">  
      </div>
    </div>
    
</template>
<script>
export default {
  props: {
    img: { 
      type: String,
      default: '',
      required: true
    },
      
  },
    
}
</script>