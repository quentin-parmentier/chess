<template lang="">
    <div @click="() => this.$emit('enregistrer')" 
        class=" bg-gray-300 opacity-40 w-full h-full z-50 absolute top-0 left-0"></div>
    <div class="shadow-modal rounded-md fixed min-w-max top-1/2 left-1/2 mt-n214 ml-n143 bg-white opacity-100 z-50 p-5 animate-pop"> 
        <div class="text-center font-bold text-lg pb-5">Créer une nouvelle variante</div>
        <div class="space-y-2">
            <base-input :required="true" :isEditable="false" v-model:inputValue="variante.name" label="Nom de la variante" id="name-oppening" placeholder="c4 c5"></base-input>
            <base-input :isEditable="false" v-model:inputValue="variante.commentaire" label="Commentaire" id="name-oppening" placeholder="Ligne1 $ Ligne2"></base-input>
            <base-switch v-model:inputValue="variante.origine" label="Origine de la variante">
                {{variante.origine === true ? 'Lichess' : 'Chess.com'}}
            </base-switch>
            <base-input :isEditable="false" v-model:inputValue="variante.idEmbed" label="Id Embed" id="name-oppening" :placeholder="variante.origine ? 'gjqSTfa8/BIRjoEum' : '654321'"></base-input>
            
            <div class="flex">
                <base-button label="Enregistrer" class=" text-center p-3" @click="() => variante.id ? editVariante() : recVariante()" />
                <base-button label="Annuler" class=" text-center p-3 " color="border-red-400 border-solid border-2 text-red-400 hover:bg-red-400 hover:text-white" @click="() => this.$emit('enregistrer')" />
            </div>
        </div>
    </div>
</template>
<script>

import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseSwitch from '../components/BaseSwitch.vue'
import Variante from '../classes/Variante'
import Finale from '../classes/Finale'

const axios = require('axios');

export default {
    methods: {
        editVariante(){
            console.log(this.variante)
            this.variante.update(this.serv)
            .then((response) => {
                switch (true) {
                    case this.variante instanceof Variante:
                        this.setOuvertures(response.data.ouvertures)
                        break;
                    case this.variante instanceof Finale:
                        this.setFinales(response.data.finales)
                        break;
                }
                this.$emit('enregistrer')
            })
            .catch((error) => {
                console.log(error);
            }) 
        },
        recVariante(){
            console.log(this.variante)
            this.variante.add(this.serv)
            .then((response) => {
                switch (true) {
                    case this.variante instanceof Variante:
                        this.setOuvertures(response.data.ouvertures)
                        break;
                    case this.variante instanceof Finale:
                        this.setFinales(response.data.finales)
                        break;
                }
                this.$emit('enregistrer')
            })
            .catch((error) => {
                console.log(error);
            })
        },
        recFinales(){
            const origine = this.variante.origine ? 'lichess' : null
            axios.post(`${this.serv}/finales`,
                {
                    data: {
                        piece: this.piece,
                        name:this.name,
                        commentaire:this.commentaire,
                        idEmbed:this.idEmbed,
                        idOuverture:this.id,
                        origine:origine
                    },
                },
                {headers: {'Authorization': 'Bearer ' + this.token}}
            )
            .then( (response) => {
                this.setFinales(response.data.finales)
                this.$emit('enregistrer')
            })
            .catch((error) => {
                console.log(error);
            }) 
        },
        editFinale(){
            const origine = this.variante.origine ? 'lichess' : null
            axios.put(`${this.serv}/finales`,
                {
                    data: {
                        piece: this.piece,
                        name:this.name,
                        commentaire:this.commentaire,
                        idEmbed:this.idEmbed,
                        idOuverture:this.id,
                        idFinale: this.editV._id,
                        origine:origine
                    },
                },
                {headers: {'Authorization': 'Bearer ' + this.token}}
            )
            .then( (response) => {
                this.setFinales(response.data.finales)
                this.$emit('enregistrer')
            })
            .catch((error) => {
                console.log(error);
            }) 
        }
    },
    components: {BaseInput,BaseButton,BaseSwitch},
    data () {
        return {
            variante: this.editV
        }
    },
    props: {
        editV:{
            type: Object,
            default: null,
            required: false
        }
    },
    inject:['serv','setOuvertures', 'setFinales'],
    emits:['enregistrer']
    
    

}
</script>