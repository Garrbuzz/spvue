<template>
	<div>
		<HolmsRage v-if="stateTest == 'holmsRage'" @backToTests = "backToTests"></HolmsRage>
		<ProfBurnTeachers v-if="stateTest == 'profButnTeachers'" @backToTests = "backToTests"></ProfBurnTeachers>
	</div>

	

</template>
<script>
	import HolmsRage from '../components/holms-rage.vue';
	import ProfBurnTeachers from '../components/profburnteachers.vue';
	export default{
		props:['currentTest'],
		methods:{
			
		},
		components:{
			'HolmsRage':HolmsRage,
			'ProfBurnTeachers':ProfBurnTeachers
		},
		data(){
			return{
				stateTest:this.currentTest
			}
			

		},
		methods:{
			backToTests(){
				this.$emit('tests');
			}
			
		}

	}
</script>		
<style lang="scss" scoped>

</style>