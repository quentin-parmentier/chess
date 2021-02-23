<template lang="">
    <div class=" cursor-pointer transform transition duration-300 h-full p-4 border-gray-50 border-solid border-2 rounded-2xl shadow-basic hover:-translate-y-3 hover:shadow-up">
      <div 
        :class=" 'bg-'+color+'piece bg-contain bg-no-repeat bg-center h-full '">
          
      </div>
    </div>
    
</template>
<script>
export default {
  props: {
    color: { 
      type: String,
      default: '',
      required: true
    },
      
  },
    
}
</script>