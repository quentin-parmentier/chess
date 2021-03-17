<template>
    <div>
        <p class="p-2" v-if="inputValue != undefined && inputValue != '' && !isEditing && isEditable" @dblclick="setEditTrue()"> {{renderValue(inputValue)}} {{suffixe}}</p>
        <div v-else>
            <label v-if="label != ''" class="pl-2 font-medium text-gray-700"> {{label}} </label>
            <div class="flex items-center px-1">
                <input 
                    ref="editableInput" 
                    class="w-full p-2 shadow-innerinput rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" 
                    :class="classes()"
                    :value="inputValue"
                    :type="type"
                    @focus="isEditing = true" 
                    @input="$emit('update:inputValue', $event.target.value)" 
                    @blur="validateChange" 
                    @keydown.enter="validateChange"
                    @keydown.escape="validateChange"
                    :placeholder="this.placeholder" 
                    :required="this.required"
                    :autocomplete="this.autocomplete"
                />
                <p> {{suffixe}} </p>
                <slot> </slot>
            </div>
            <p 
                class="px-2 text-red-600 font-semibold text-sm"
                v-if="error"
            > {{error}} </p>
        </div>
       
    </div>
</template>

<script>

export default {
  updated () {
    if(this.isEditing) this.$refs.editableInput.focus()
  },
  methods: {
    setEditTrue(){
        this.isEditing = true
    },
    renderValue(inputValue){
        if(this.type === 'date'){
            return new Date(inputValue).toLocaleDateString('fr-FR')
        }
        return inputValue
    },
    validateChange(){
        this.isEditing = false
        this.$emit('change:inputValue')
    },
    classes(){
        let css = ""
        css = this.prefixIcon !== '' ? 'bg-no-repeat pl-9 bg-icon-left bg-'+this.prefixIcon : ''
        css += this.error ? ' ring-2 ring-inset ring-red-500' : ''
        return css
    }
  },
  data () {
    return {
        isEditing:false
    }
  },
    props: {
        placeholder: { 
            type: String,
            default: '',
            required: false
        },
        inputValue: { 
            type: [String,Number,Date],
            default: undefined,
            required: false
        },
        type: { 
            type: String,
            default: 'text',
            required: false
        },
        suffixe: { 
            type: String,
            default: '',
            required: false
        },
        isEditable:{
            type: Boolean,
            default: true,
            required: false
        },
        prefixIcon:{
            type: String,
            default: '',
            required: false
        },
        label:{
            type: String,
            default: '',
            required: false
        },
        required:{
            type: Boolean,
            default: false,
            required: false
        },
        error:{
            type:String,
            default: "",
            required: false
        },
        autocomplete:{
            type: String,
            default: "on",
            required: false
        }
    }
}

</script>