<template lang="">
    <svg class="h-full m-auto" :width="width" :height="width" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="transition-colors duration-300" cx="250" cy="250" r="250" :fill="hover ? '#6B7280' :  '#FFFF'" />
        <path d="M398.314 261.314C404.562 255.065 404.562 244.935 398.314 238.686L296.49 136.863C290.242 130.615 280.111 130.615 273.863 136.863C267.615 143.111 267.615 153.242 273.863 159.49L364.373 250L273.863 340.51C267.615 346.758 267.615 356.889 273.863 363.137C280.111 369.385 290.242 369.385 296.49 363.137L398.314 261.314ZM113 266H387V234H113V266Z" 
        :fill="hover ? '#FFFF' : '#6B7280'"
        class="transition-colors duration-300"/>
    </svg>
</template>
<script>
    export default {
        props: {
            hover: { 
                type: Boolean,
                default: false,
                required: false
            },
            width: {
                type: Number,
                default: 50,
                required: false
            }
        }, 
    }
</script>