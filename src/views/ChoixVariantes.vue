<template lang="">
	<div class="max-w-px800 m-auto">
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
	</div>
	
</template>

<script>
	import Variante from '../components/Variante.vue'
	import BaseButton from '../components/BaseButton.vue'
	import { inject } from 'vue'
export default {
  props: {
  },
	components: { Variante,BaseButton },
	created () {
		if(this.$route.params.type == 'ouvertures'){
			this.etude = inject('ouvertures')[this.$route.params.type][this.$route.params.color][this.$route.params.id]
		}else{
			this.etude['variantes'] = inject('finales')[this.$route.params.type][this.$route.params.id]
			this.etude['name'] = `Les finales de ${this.$route.params.id}s`
		}
	},
	data () {
		return {
			etude : []
		}
	},
}
</script>