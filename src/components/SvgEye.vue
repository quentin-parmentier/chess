<template lang="">

    <div class=" relative right-10 w-0 cursor-pointer" @click="() => this.show = !this.show" v-html="show ? openEye() : closeEye()">

    </div>
</template>
<script>
export default {
    methods: {
        openEye(){
            this.$emit('showPsw',true)
            return `
            <svg width="25" height="16" viewBox="0 0 388 213" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.71027 113.869C4.50772 113.097 5.54135 112.104 6.79474 110.915C10.064 107.813 14.8274 103.378 20.7934 98.0526C32.7283 87.4004 49.4616 73.2025 68.6626 59.0104C87.8713 44.8127 109.501 30.6569 131.232 20.0595C152.997 9.44516 174.665 2.5 194 2.5C213.335 2.5 235.003 9.44516 256.768 20.0595C278.499 30.6569 300.129 44.8127 319.337 59.0104C338.538 73.2025 355.272 87.4004 367.207 98.0526C373.173 103.378 377.936 107.813 381.205 110.915C382.459 112.104 383.492 113.097 384.29 113.869C383.511 114.523 382.522 115.347 381.336 116.324C378.068 119.018 373.305 122.869 367.34 127.493C355.406 136.742 338.674 149.071 319.473 161.396C300.265 173.725 278.63 186.022 256.889 195.229C235.119 204.449 213.407 210.5 194 210.5C174.593 210.5 152.881 204.449 131.111 195.229C109.37 186.022 87.7347 173.725 68.5271 161.396C49.326 149.071 32.5935 136.742 20.6603 127.493C14.695 122.869 9.93229 119.018 6.66377 116.324C5.47778 115.347 4.48864 114.523 3.71027 113.869Z" fill="white" stroke="black" stroke-width="15"/>
                <circle cx="194" cy="106" r="94" fill="#AFD7FD"/>
                <circle cx="194.5" cy="106.5" r="44.5" fill="black"/>
                <circle cx="177" cy="89" r="15" fill="white"/>
            </svg>
`
        },
        closeEye(){
            this.$emit('showPsw',false)
            return `<svg width="25" height="16" viewBox="0 0 388 255" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.71027 135.869C4.50772 135.097 5.54135 134.104 6.79474 132.915C10.064 129.813 14.8274 125.378 20.7934 120.053C32.7283 109.4 49.4616 95.2025 68.6626 81.0104C87.8713 66.8127 109.501 52.6569 131.232 42.0595C152.997 31.4452 174.665 24.5 194 24.5C213.335 24.5 235.003 31.4452 256.768 42.0595C278.499 52.6569 300.129 66.8127 319.337 81.0104C338.538 95.2025 355.272 109.4 367.207 120.053C373.173 125.378 377.936 129.813 381.205 132.915C382.459 134.104 383.492 135.097 384.29 135.869C383.511 136.523 382.522 137.347 381.336 138.324C378.068 141.018 373.305 144.869 367.34 149.493C355.406 158.742 338.674 171.071 319.473 183.396C300.265 195.725 278.63 208.022 256.889 217.229C235.119 226.449 213.407 232.5 194 232.5C174.593 232.5 152.881 226.449 131.111 217.229C109.37 208.022 87.7347 195.725 68.5271 183.396C49.326 171.071 32.5935 158.742 20.6603 149.493C14.695 144.869 9.93229 141.018 6.66377 138.324C5.47778 137.347 4.48864 136.523 3.71027 135.869Z" fill="white" stroke="black" stroke-width="15"/>
                <circle cx="194" cy="128" r="94" fill="#AFD7FD"/>
                <circle cx="194.5" cy="128.5" r="44.5" fill="black"/>
                <circle cx="176" cy="110" r="15" fill="white"/>
                <line x1="79.3033" y1="5.6967" x2="313.303" y2="239.697" stroke="black" stroke-width="15"/>
                <line x1="69.3033" y1="15.6967" x2="303.303" y2="249.697" stroke="white" stroke-width="15"/>
            </svg>`
        }
    },
    data () {
        return {
            show: this.defaultShow
        }
    },
    props: {
        defaultShow: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    emits: ['showPsw']
}
</script>