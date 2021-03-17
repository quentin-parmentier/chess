<template lang="">
    <div @click="() => this.$emit('enregistrer')" 
        class=" bg-gray-300 opacity-40 w-full h-full z-50 absolute top-0 left-0"></div>
    <div class="shadow-modal rounded-md fixed min-w-max top-1/2 left-1/2 mt-n188 ml-n143 bg-white opacity-100 z-50 p-5 animate-pop"> 
        <div class="text-center font-bold text-lg pb-5">Créer une nouvelle ouverture</div>
        <div class="space-y-2">
            <base-input :required="true" :isEditable="false" v-model:inputValue="ouverture.name" label="Nom de l'ouverture" id="name-oppening" placeholder="Le système de Londres"></base-input>
            <base-input :isEditable="false" v-model:inputValue="ouverture.commentaire" label="Commentaire" id="name-oppening" placeholder="Une super ouverture pour débuter"></base-input>
            <base-input :isEditable="false" v-model:inputValue="ouverture.img" label="Url de l'image" id="name-oppening" placeholder="www.ma_super_image.com"></base-input>
            <div class="flex justify-evenly">
                <base-button label="Enregistrer" class=" text-center p-3" @click="() => editO.id ? edit() : rec()" />
                <base-button label="Annuler" class=" text-center p-3 " color="border-red-400 border-solid border-2 text-red-400 hover:bg-red-400 hover:text-white" @click="() => this.$emit('enregistrer')" />
            </div>
        </div>
    </div>
</template>
<script>

import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'

export default {
    methods: {
        rec(){
            this.ouverture.add()
            .then((datas) => {
                this.setOuvertures(datas.ouvertures)
                this.$emit('enregistrer')
            })
        },
        edit(){
            this.ouverture.update()
            .then((datas) => {
                this.setOuvertures(datas.ouvertures)
                this.$emit('enregistrer')
            })
        }
    },
    components: {BaseInput,BaseButton},
    data () {
        return {
            ouverture: this.editO
        }
    },
    props: {
        editO: { 
            type: Object,
            default: null,
            required: false
        }
    },
    inject:['setOuvertures'],
    emits:['enregistrer']
}
</script>