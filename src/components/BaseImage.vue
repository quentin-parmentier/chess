<template>
    <img :src="require('../assets/img/'+img)" :alt="img">
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