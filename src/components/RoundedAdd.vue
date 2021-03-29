<template lang="">

    <div 
      class=" fixed fab sm:top-vh80 sm:left-vw85 w-min rounded-full shadow-xl font-bold focus:outline-none duration-200 transform transition hover:-translate-y-0.5 hover:shadow-2xl" 
      @mouseover="() => this.isHoverAdd = true" 
      @mouseout="() => this.isHoverAdd = false">

        <svg :width="width" :height="width" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="250" cy="250" r="250" :fill="isHoverAdd ? '#2D62B9' : '#3B82F6'"/>
            <rect x="113" y="234" width="290" height="32" fill="white"/>
            <rect x="242" y="395" width="290" height="32" transform="rotate(-90 242 395)" fill="white"/>
        </svg>
    </div>
</template>
<script>
    export default {
  data () {
    return {
        isHoverAdd: false
    }
  },
        props: {
            width: {
                type: Number,
                default: 50,
                required: false
            }
        }, 
    }
</script>