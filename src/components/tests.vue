<template>
	<section class="grid-12">
		<div class="flex-hcenter-wrap title">
			<h1>Тесты</h1>
		</div>
		<div class="go-back" v-on:click="$emit('backToCab')">
			<span>&larr;</span>&nbsp;назад
		</div>
		<div class="cont flex-hcenter-wrap">
			<div class="list-of-tests">
				<p v-on:click="clickTest('holmsRage')">Тест Холмса-Раге</p>
				<p v-on:click="$emit('toTestsApp', status = 'profButnTeachers')">Опросник на определение уровня психического выгорания  (MBI)</p>
			</div>	
			
		</div>
	</section>
	

</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			clickTest(status){
				this.$emit('toTestsApp', status);
			}
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
	.cont{
		grid-column:1/13;
		
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
	.list-of-tests{
		margin: 2em 0;
	}
</style>