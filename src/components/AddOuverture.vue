<template lang="">
    <div @click="() => this.$emit('enregistrer')" 
        class=" bg-gray-300 opacity-40 w-full h-full z-50 absolute top-0 left-0"></div>
    <div class="shadow-modal rounded-md fixed min-w-max top-1/2 left-1/2 mt-n188 ml-n143 bg-white opacity-100 z-50 p-5 animate-pop"> 
        <div class="text-center font-bold text-lg pb-5">Créer une nouvelle ouverture</div>
        <div class="space-y-2">
            <base-input :required="true" :isEditable="false" v-model:inputValue="name" label="Nom de l'ouverture" id="name-oppening" placeholder="Le système de Londres"></base-input>
            <base-input :isEditable="false" v-model:inputValue="commentaire" label="Commentaire" id="name-oppening" placeholder="Une super ouverture pour débuter"></base-input>
            <base-input :isEditable="false" v-model:inputValue="img" label="Url de l'image" id="name-oppening" placeholder="www.ma_super_image.com"></base-input>
            <div class="flex justify-evenly">
                <base-button label="Enregistrer" class=" text-center p-3" @click="() => editO ? edit() : rec()" />
                <base-button label="Annuler" class=" text-center p-3 " color="border-red-400 border-solid border-2 text-red-400 hover:bg-red-400 hover:text-white" @click="() => this.$emit('enregistrer')" />
            </div>
        </div>
    </div>
</template>
<script>

import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
const axios = require('axios');

export default {
    created () {
        this.token = localStorage.getItem('token')
        if(this.editO !== null){
            this.name = this.editO.name
            this.commentaire = this.editO.commentaire
            this.img = this.editO.img
        }
    },
    methods: {
        rec(){
            axios.post(`${this.serv}/ouvertures`,
                {
                    data: {
                        color: this.color,
                        name:this.name,
                        commentaire:this.commentaire,
                        img:this.img
                    },
                },
                {headers: {'Authorization': 'Bearer ' + this.token}}
            )
            .then( (response) => {
                this.setOuvertures(response.data.ouvertures)
                this.$emit('enregistrer')
            })
            .catch((error) => {
                console.log(error);
            })   
        },
        edit(){
            axios.put(`${this.serv}/ouvertures`,
                {
                    data: {
                        color: this.color,
                        name:this.name,
                        commentaire:this.commentaire,
                        img:this.img,
                        idOuverture:this.editO._id
                    },
                },
                {headers: {'Authorization': 'Bearer ' + this.token}}
            )
            .then( (response) => {
                this.setOuvertures(response.data.ouvertures)
                this.$emit('enregistrer')
            })
            .catch((error) => {
                console.log(error);
            }) 
        }
    },
    components: {BaseInput,BaseButton},
    data () {
        return {
            name : "",
            commentaire : "",
            img : "",
            token: ""
        }
    },
    props: {
        editO: { 
            type: Object,
            default: null,
            required: false
        },
        color: { 
            type: String,
            default: '',
            required: true
        }
    },
    inject:['serv','setOuvertures'],
    emits:['enregistrer']
    
    

}
</script>