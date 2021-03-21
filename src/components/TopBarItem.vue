<template>
    <div @mouseover="() => hover = true" @mouseout="hover = false" 
     class="flex-1 max-w-128 h-full text-xs sm:text-sm font-bold transform transition-colors duration-300"
    :class="[selected ? 'text-blue-700 text-sm border-blue-700 border-b-2 sm:text-base' : '',
             (hover && !selected) ? 'text-white bg-blue-700' : '']">
        <router-link class="h-full flex justify-center items-center" :to="{ name:to, params: params}">
            <div>
                <div 
                class=" bg-center h-6 bg-no-repeat bg-contain sm:hidden"
                :class="'bg-'+icon"></div>
                <div class=" pt-0.5">{{text}}</div>
            </div>
        </router-link>
    </div>
</template>
<script>

export default {
    methods: {
        isSelected(route){
            this.selected =  route.name == this.to || route.fullPath.indexOf(this.match?.toLowerCase()) != -1
        }
    },
    watch: {
        '$route' : function(newValue) {
            this.isSelected(newValue)
        },

    },
    data () {
        return {
            selected : this.isSelected(this.$route),
            hover : false
        }
    },
    props: {
        to: { 
            type: String,
            default: '',
            required: true
        },
        params: { 
            type: Object,
            default: () => {},
            required: false
        },
        text: { 
            type: String,
            default: '',
            required: true
        },
        icon: { 
            type: String,
            default: '',
            required: false
        },
        match: { 
            type: String,
            default: null,
            required: false
        },

    },
        
    }
</script>