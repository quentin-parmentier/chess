<template lang="">
<div class="relative">
	<div class="max-w-px800 m-auto min-h-fullvh">
		<div class="flex">
			<div class=" self-center w-24 ">
				<base-button label="Retour" prefixIcon="arrow_back" @click="$router.go(-1)" /> 
			</div>
			<div class=" self-center flex-1 pr-24">
				<h2 class="text-2xl font-bold text-center m-8"> 
					{{etude.name}}
				</h2>
			</div>
		</div>
		<div v-for="(variante,index) in etude['variantes']" :key="index" class="mb-4" > 
			<variante :variante="variante" />
		</div>

		<rounded-add @click="() => this.isAdding = true"/>
	</div>
	<add-variante :piece="this.id" :color="this.color" :id="etude._id" v-if="isAdding" :type="this.type" @enregistrer="() => newVariante()" />
</div>
	
	
</template>

<script>
	import Variante from '../components/Variante.vue'
	import BaseButton from '../components/BaseButton.vue'
	import RoundedAdd from '../components/RoundedAdd.vue'
	import AddVariante from '../components/AddVariante.vue'
export default {
	methods: {
      newVariante(){
        if(this.type == 'ouvertures'){
			this.etude = this.ouvertures?.[this.type]?.[this.color]?.[this.id]
		}else{
			this.etude['variantes'] =this.finales?.[this.type]?.[this.id]
			this.etude['name'] = `Les finales de ${this.id}s`
		}
		
        this.isAdding = false
      }
    },
	components: { Variante,BaseButton,RoundedAdd, AddVariante },
	created () {
		this.type = this.$route.params.type
		this.color = this.$route.params.color
		this.id = this.$route.params.id
		
		if(this.type == 'ouvertures'){
			this.etude = this.ouvertures?.[this.type]?.[this.color]?.[this.id]
		}else{
			this.etude['variantes'] = this.finales?.[this.type]?.[this.id]
			this.etude['name'] = `Les finales de ${this.id}s`
		}
		console.log(this.etude)
		
	},
	data () {
		return {
			etude : [],
			isAdding : false,
			type: "",
			color:"",
			id:""
		}
	},
	inject:['ouvertures','finales']
}
</script>