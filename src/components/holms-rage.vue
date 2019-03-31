<template>
	<section class="grid-12">
		<div class="flex-hcenter-wrap title">
			<h1>Тест Холмса-Раге</h1>
		</div>

		<div class="flex-hcenter-wrap cont">
			<div class = "subtitle">
				<p>Постарайтесь вспомнить все события, случившиеся с вами в течение последнего года и ответьте на предложенные вопросы</p>
				<button v-on:click="runTest">Начать тест</button>
			</div>
			
			
			<div class="go-back" v-on:click="$emit('backToTests')">
				<span>&larr;</span>&nbsp;назад
			</div>
			
		</div>
		<div class = "test" id = "question">
				<h4>{{qtitle}} {{n}}</h4>
				<p>{{question}}</p>
				<div>
					<ul>
						<li v-for="answer in answers"><input type="radio" >{{answer}}</li>
						
					</ul>
				</div>
				
		</div>
		
		
	</section>
	
</template>	
<script>
	export default{
		mounted(){
			let xhr = new XMLHttpRequest();
	        xhr.withCredentials = true;
	        xhr.open('post', window.location.origin + '/php/tests.php', true);
	        xhr.onreadystatechange =  () => {
	            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
	                	this.holmse = JSON.parse(xhr.responseText);
	            }
	        } 
	        xhr.send();

		},
			data(){
				return{
					i:0,
					qtitle:'',
					n:'',
					holmse:{},
					question:'',
					answers:['Не было', '1 раз','2 раза','3 раза','4 раза']
				}
			},
			methods:{
				t(){
					console.log(this.holmse[22].question);
				}, 
				runTest(){
					
					let i = 1;
					this.qtitle = 'Вопрос';
					this.n = i;
					this.question = this.holmse[i].question
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
	.test{
		margin:2em 0;
		grid-column:3/11;
		background:#eee;
		height: 10em;
	}
</style>