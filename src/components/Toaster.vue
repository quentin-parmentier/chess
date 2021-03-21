<template>
    <div class="fixed top-0 z-50" :class="classes">
        {{message}}
    </div>
</template>
<script>
export default {
  methods: {
    info(msg){
        this.show(msg)
    },
    error(msg){
        this.show(msg)
    },
    warn(msg){
        this.show(msg)
    },
    show(msg){
        this.message = msg
    }
  },
  data () {
    return {
        message: 'MESSAGE',
        classes: ''
    }
  },
    
}
</script>