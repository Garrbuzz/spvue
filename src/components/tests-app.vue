<template>
	<div>
		<HolmsRage v-if="stateTest == 'holmsRage'"></HolmsRage>
		<ProfBurnTeachers v-if="stateTest == 'profButnTeachers'"></ProfBurnTeachers>
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
			
		}

	}
</script>		
<style lang="scss" scoped>
	$font:verdana;
	$colBlue:#0095a6;
	$colBlueBtnHover:#22a7c8;
	$colP1:#444;
// layout
	.grid-12{
		display:grid;
		grid-template-columns:  repeat(12, 1fr);
	}
	.title{
		grid-column:1/13;
	}
	.cont-left{
		grid-column:1/5;
		
		p{
			margin:0.5em 0 0.25em 4em;
			color:$colBlue;
		}
		p:hover{
			cursor: pointer;
			color: #fd9017;
		}
	}
	.cont-right{
		grid-column:5/13;
	}
	.flex-hcenter-wrap{
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
// end layout		
	h1{
		color:$colBlue;
	}
	
	.go-back{
		position: absolute;
		top:0.75em;
		left:2em;
		color: grey;
		span{
			font-size: 1.2em;
		}
	}
	.go-back:hover{
		color: $colBlue;
		cursor:pointer;
	}
</style>