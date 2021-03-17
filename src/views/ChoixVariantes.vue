<template lang="">
<div class="relative">
	<div class="max-w-px800 m-auto min-h-fullvh">
		<!-- TOP Bar des ouvertures -->
		<div class="flex">
			<div class=" self-center w-24 ">
				<base-button :third="true" color='btn-return' label="Retour" prefixIcon="arrow_back" @click="back()" /> 
			</div>
			<div class=" self-center flex-1 pr-24">
				<h2 class="h2"> 
					{{etude.name}}
				</h2>
			</div>
		</div>

		<!-- CENTER -->
		<!-- Variantes list  -->
		<div v-if="etude?.['variantes']?.length > 0">
			<div v-for="(variante,index) in etude['variantes']" :key="index" class="pb-4 px-3" > 
				<component-variante 
					:variante="objectify(variante)" 
					@enregistrer="() => newVariante()" 
					@edit="(varianteE) => startEdit(varianteE)" 
				/>
			</div>
		</div>
		<!-- SVG CTA create -->
		<div v-else class="h-full">
			<empty-V />
			<p class="text-gray-500 text-xl font-bold m-10 text-center">Vous n'avez pas encore ajouté de variante</p>
		</div>

	</div>
	<!-- Floating CTA Button to ADD variantes -->
	<rounded-add @click="() => this.isAdding = true"/>
	<!-- Composant pour ajouter/modifier des variantes -->
	<add-variante :editV="editVariante" v-if="isAdding || isEditing" @enregistrer="() => newVariante()" />
</div>
	
	
</template>

<script>
	import ComponentVariante from '../components/Variante.vue'
	import BaseButton from '../components/BaseButton.vue'
	import RoundedAdd from '../components/RoundedAdd.vue'
	import AddVariante from '../components/AddVariantes.vue'
	import EmptyV from '../components/EmptyV.vue'
	import Variante from '../classes/Variante'
	import Finale from '../classes/Finale'

export default {
	methods: {
		newVariante(){
			if(this.type == 'ouvertures'){
				this.etude = this.ouvertures?.[this.type]?.[this.color]?.[this.id]
			}else{
				this.etude['variantes'] = this.finales?.[this.type]?.[this.id]
				this.etude['name'] = `Les finales de ${this.id}s`
			}
			
			this.editVariante = this.objectify({})
			this.isAdding = false
			this.isEditing = false
		},
		back(){
			if(this.type == 'ouvertures'){
				this.$router.push({name:'Ouvertures',params:{color:this.color}})
			}else{
				this.$router.push({name:'Finales'})
			}
		},
		startEdit(varianteE){
			this.editVariante = varianteE
			this.isEditing = true
		},
		objectify(variante){
			if(this.type == 'ouvertures') return new Variante(variante,this.color,this.etude._id)
			else return new Finale(variante,this.color,this.id)
		}
    },
	components: { ComponentVariante,BaseButton,RoundedAdd, AddVariante, EmptyV },
	created () {
		this.type = this.$route.params.type
		this.color = this.$route.params.color
		this.id = this.$route.params.id
		
		if(this.type == 'ouvertures'){
			//Etude = finales ou ouverture
			this.etude = this.ouvertures?.[this.type]?.[this.color]?.[this.id]
			this.etude ?? this.$router.push({name:'Ouvertures',params:{color:this.color}})
			this.etude = this?.etude ?? []
		}else{
			this.etude['variantes'] = this.finales?.[this.type]?.[this.id]
			this.etude['name'] = `Les finales de ${this.id}s`
			this.etude['variantes'] ?? this.$router.push({name:'Finales'})
		}

		this.editVariante = this.objectify({})
		
	},
	data () {
		return {
			etude : [],
			isAdding : false,
			isEditing : false,
			type: "",
			color:"",
			id:"",
			editVariante: null
		}
	},
	inject:['ouvertures','finales']
}
</script>