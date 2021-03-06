<template>
    <div>
        <label v-if="label != ''" class="pl-2 font-medium text-gray-700"> {{label}} </label>
        <div class="grid" :class="hasSlot() ? 'grid-cols-2' : 'grid-cols-1 justify-center'">
            <label class="switch justify-self-end self-center">
                <input type="checkbox" :checked="inputValue" @input="$emit('update:inputValue', !inputValue)">
                <span class="absolute cursor-pointer bg-blue-600 slider round"></span>
            </label>
            <label v-if="hasSlot()" class="pl-2"><slot></slot></label>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    hasSlot(){
        return this.$slots.default
    }
  },
  props: {
    inputValue: { 
        type: Boolean,
        default: false,
        required: false
    }
    ,label: { 
        type: String,
        default: '',
        required: false
    }
  },
    
}
</script>
<style scoped>
    .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(248, 113, 113);
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 4px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: rgba(52, 211, 153);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px rgba(52, 211, 153);
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(16px);
        -ms-transform: translateX(16px);
        transform: translateX(16px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>