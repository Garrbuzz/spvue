<template>
	<section class="grid-12">
		<div class="flex-hcenter-wrap title">
			<h1>Тест Проф вьігораниее учителей</h1>
		</div>
		<div class="flex-hcenter-wrap cont">
			<p>Инструкция к тесту</p>
			<div class="go-back" v-on:click="$emit('backToTests')">
				<span>&larr;</span>&nbsp;назад
			</div>
		</div>	
	</section>
	
</template>	
<script>
	export default{
		// mounted(){
		// 	let xhr = new XMLHttpRequest();
	 //        xhr.withCredentials = true;
	 //        xhr.open('post', window.location.origin + '/php/tests.php', true);
	 //        xhr.onreadystatechange =  () => {
	 //            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
	              	
	              		
	                	
	 //                	this.holmse = JSON.parse(xhr.responseText);
	 //                	this.t();
	              			
	 //            }
	 //        } 
	 //        xhr.send();

		// },
			data(){
				return{
					holmse:{}
				}
			},
			methods:{
				t(){
					console.log(this.holmse[22].question);
				}

			}
	}
</script>		
<style lang="scss" scoped="">
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
		grid-column:4/10;
		
		h2{
			color:#555;
			font-size: 1.75em;
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
	.subtitle{
		
		p{
			font-size: 1.25em;
		}
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
		cursor:pointer;
	};
</style>