<template>
	<section class="grid-12 rage">
		<div class="flex-hcenter-wrap title">
			<h1>Тест Холмса-Раге</h1>
		</div>

		<div class="flex-hcenter-wrap cont">
			<div class = "subtitle">
				<p>Постарайтесь вспомнить все события, случившиеся с вами в течение последнего года и ответьте на предложенные вопросы</p>
				<div class="flex-hcenter-wrap begin">
					<button class="beginTest" v-on:click="start" id="start">Начать тест</button>
				</div>
				
			</div>
			
			

			
		</div>
		<div class = "test testsArea" id = "question">
				<Question v-if="state == 'question'" :question = 'question' :numberOfQuestion = 'i' :answer='answer' :nextDisabled='nextDisabled' :backDisabled='backDisabled' :numberOfQuestions='numberOfQuestions' @nextQuestion='nextQuestion' @prevQuestion='prevQuestion' @endOfTest='endOfTest' @getAnswer='getAnswer'></Question>
				<Q v-if="state == 'q'" @ok = 'ok'></Q>	
				
		</div>
		<div class="progress flex-hcenter-wrap cont hide">
			<progress id="progress" value="0" max="43">
					
			</progress>
			
		</div>
		<div class="res hide" id = "divRes">
			<p>Результат:  {{resTest}}</p>	
			 	
		</div>
		<div class="res hide" id = "save">
			<button id="saveResult" class="beginTest" v-on:click = "saveResult">Сохранить результат </button>	
			 	
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
		watch:{

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
					numberOfQuestions:43,
					answersVariants:['Не было','1 раз','2 раза','3 раза','4 раза'],
					resTest:0

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
					document.querySelector('.progress').classList.remove('hide');
					document.querySelector('#divRes').classList.remove('hide');
					this.answers[this.i] = answer;
					this.holmse[this.i].number=this.answersVariants.indexOf(answer);
					if (this.currentQuestion === this.numberOfQuestions){
						document.querySelector('#save').classList.remove('hide');

						this.result();

					} else {
						this.result();
						this.nextQuestion(answer);
					}

				},
				nextQuestion(answer){
					if (this.i<this.numberOfQuestions){
						this.backDisabled = false;
						if (this.i<this.currentQuestion){
							this.nextDisabled = false;
						}
						if (this.i===this.currentQuestion){
							this.changeProgress(this.currentQuestion)
							this.currentQuestion++;
							this.backDisabled = true;
							this.nextDisabled = true;
						} else {
							this.nextDisabled = false;
						}
						if (this.i === this.numberOfQuestions - 1){
								this.nextDisabled = true;
								
								
							}
						console.log(this.currentQuestion);
						;
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
				changeProgress(prog){
					document.querySelector('#progress').value = prog;
				},
				ok(){
					this.state='question';
				},
				endOfTest(){
					this.changeProgress(this.currentQuestion);
					this.result();
				},
				result(){
					
					let res = 0;
					for (let i = 1; i<this.numberOfQuestions+1; i++){
						res = res + this.holmse[i].weight*this.holmse[i].number;
						console.log('i= ' + i + 'Проміжний результат: ' + res);
					}
					this.resTest = res;
					console.log('Результат тесту: ' + res);
				},
				saveResult(){
					
					var xhr = new XMLHttpRequest();
			      	let body = new FormData();
			      	body.append("testName", 'holmsRage'); 
			      	body.append("testRes", this.resTest); 
			       	xhr.withCredentials = true; 
			        xhr.open('post', window.location.origin + '/php/saveresult.php', false);
			        xhr.send(body);
			        if (xhr.status != 200) {
			        	
			        } else {
			          	let res = JSON.parse(xhr.responseText);
			          	console.log('res: ' + res);
			            	
			            alert('Результ теста : ' + this.resTest + '.  Результ успешно сохранен');
			            this.$emit('backToTests');
			      	}
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
	.rage{
		margin-top: 2em;
	}
	.cont, .res{
		grid-column:1/13;
		
		h2{
			color:#555;
			font-size: 1.75em;
		}
		
	}
	.res{
		display:flex;
		justify-content: center;
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
			padding-left:3em;
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
		// height: 10em;
	}
.begin{
	margin-top: 2.5em;
}	

.progress{
	height: 3em;
}
progress {
  width: 100%;
    height: 3em; 
    background: #bbb; 
  
}
 
progress::-webkit-progress-bar {
  background: #bbb;
  height: 80px;
}
 
progress::-webkit-progress-value {
  background: $colBlue;
  color:yellow;
  height: 3em;
}

 
progress::-moz-progress-bar {
  background: #bbb;
 
}
.beginTest{
	border-radius: 1em;
	background: $colBlue;
	color:#fff;
	font-size: 1.5em;
	padding: 0.25em 2em;
	border:none;
	box-shadow: none;
	transition: color 0.3s linear, background 0.3s linear;
}
.beginTest:hover{
	cursor:pointer;
	background: #7D9C3E;
	color: yellow;	
	
}
#divRes{
	p{
		color:$colBlue;
		font-size: 1.5em;
		margin:1em 0;
	}
}

</style>