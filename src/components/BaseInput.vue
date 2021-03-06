<template>
    <div>
        <p class="p-2" v-if="inputValue != undefined && inputValue != '' && !isEditing && isEditable" @dblclick="setEditTrue()"> {{renderValue(inputValue)}} {{suffixe}}</p>
        <div v-else>
            <label v-if="label != ''" class="pl-2 font-medium text-gray-700"> {{label}} </label>
            <div class="flex items-center px-1">
                <input 
                    ref="editableInput" 
                    class="w-full p-2 shadow-innerinput rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" 
                    :class="prefixIcon !== '' ? 'bg-no-repeat pl-9 bg-icon-left bg-'+prefixIcon : '' "
                    :value="inputValue"
                    :type="type"
                    @focus="isEditing = true" 
                    @input="$emit('update:inputValue', $event.target.value)" 
                    @blur="validateChange" 
                    @keydown.enter="validateChange"
                    @keydown.escape="validateChange"
                    :placeholder="this.placeholder" 
                    :required="this.required"
                /> 
                <p> {{suffixe}} </p>
            </div>
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
        }
    }
}

</script>