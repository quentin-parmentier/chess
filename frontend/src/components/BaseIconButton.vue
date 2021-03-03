<template>
    <div class="flex">
      <button 
      class="w-full bg-no-repeat bg-center bg-20 h-full py-4 focus:outline-none"
      :class="'bg-'+icon" />    
    </div>
</template>
<script>
export default {
  props: {
    icon:{
        type: String,
        default: '',
        required: false
    }
  },
    
}
</script>