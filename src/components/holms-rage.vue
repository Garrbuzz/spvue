<template>
	<section class="grid-12">
		<div class="flex-hcenter-wrap title">
			<h1>Тест Холмса-Раге</h1>
		</div>

		<div class="flex-hcenter-wrap cont">
			<div class = "subtitle">
				<p>Постарайтесь вспомнить все события, случившиеся с вами в течение последнего года и ответьте на предложенные вопросы</p>
				<button v-on:click="start" id="start">Начать тест</button>
			</div>
			
			
			<div class="go-back" v-on:click="$emit('backToTests')">
				<span>&larr;</span>&nbsp;назад
			</div>
			
		</div>
		<div class = "test" id = "question">
				<Question v-if="state == 'question'" :question = 'question' :numberOfQuestion = 'i' :answer='answer' :nextDisabled='nextDisabled' :backDisabled='backDisabled' :numberOfQuestions='numberOfQuestions' @nextQuestion = 'nextQuestion' @prevQuestion='prevQuestion' @endOfTest='endOfTest' @getAnswer='getAnswer'></Question>
				<Q v-if="state == 'q'" @ok = 'ok'></Q>	
				
		</div>
		
		<button id="save" class="hide" v-on:click="result">Показать результат</button>
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
					state:'',
					n:'',
					holmse:{},
					question:'',
					answer:'',
					answers:[],
					currentQuestion:1,
					nextDisabled:true,
					backDisabled:true,
					numberOfQuestions:3,
					answersVariants:['Не было','1 раз','2 раза','3 раза','4 раза']

				}
			},
			methods:{
				 
				start(){
					let button = document.querySelector('#start');
					button.classList.add('hide');
					this.i = 1;
					this.qtitle = 'Вопрос';
					this.answers[this.i] = this.answer;
					this.question = this.holmse[this.i].question;
					this.state='question';
					

				},
				getAnswer(answer){
					this.answers[this.i] = answer;
					this.holmse[this.i].number=this.answersVariants.indexOf(answer);
				},
				nextQuestion(answer){
					if (this.i<this.numberOfQuestions){
						this.backDisabled = false;
						if (this.i<this.currentQuestion){
							this.nextDisabled = false;
						}
						if (this.i===this.currentQuestion){
							this.currentQuestion++;
							this.backDisabled = true;
							this.nextDisabled = true;
						} else {
							this.nextDisabled = false;
						}
						if (this.i === this.numberOfQuestions-1){
								this.nextDisabled = true;
							}
						
						this.i++;
						this.question = this.holmse[this.i].question;
						this.answer = this.answers[this.i];
						this.state='q';
						
					} else{
						this.nextDisabled = true;
					}
				},
				prevQuestion(answer){
				
					if (this.i>1){
						
						this.i--;
						
						if (this.i ===1){
							this.backDisabled = true;
						} else {
							this.backDisabled = false;
						}
						this.question = this.holmse[this.i].question;
						this.answer = this.answers[this.i];
						this.nextDisabled = false;
						this.state='q';
					} 
				},
				ok(){
					this.state='question';
				},
				endOfTest(){
					let button = document.querySelector('#save');
					button.classList.remove('hide');
				},
				result(){
					let res = 0;
					for (let i = 1; i<this.numberOfQuestions+1; i++){
						res = res + this.holmse[i].weight*this.holmse[i].number;
						console.log('i= ' + i + 'Проміжний результат: ' + res);
						
					}
					console.log('Результат тесту: ' + res);
					
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
.hide{
	display:none;
}		
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