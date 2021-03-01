<template lang="">
    <div class=" cursor-pointer transform transition duration-300 h-full p-4 border-gray-50 border-solid border-2 rounded-2xl shadow-basic hover:-translate-y-3 hover:shadow-up max-w-md">
      <div 
        :class=" 'bg-'+img+' bg-contain bg-no-repeat bg-center h-full'">  
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