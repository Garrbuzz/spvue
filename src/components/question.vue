<template>
	<div class="question">
		<div class="title">
			<h4>Вопрос {{numberOfQuestion}}</h4>
		</div>
			<div class="title">
				<p>{{question}}</p>
			</div>
			<div class="ans">
				<span v-for="(answersVariant, index) in answersVariants">
					<button class="but-answ" v-if="answersVariant!=answer"  :id="'a' + index" @click="getAnswer(answersVariant, index)">{{answersVariant}}</button>
					<button  v-if="answersVariant==answer"  :id="'a' + index" @click="getAnswer(answersVariant, index)" class="but-answ active">{{answersVariant}}</button>
				</span>
				
			</div>
				
		<div>
			<button v-on:click="next"  id="next" class="butNext hide"> Следующий вопрос &rarr;</button>
			<button v-on:click="prev" id="prev" class="butPrev hide">&larr; Предыдущий вопрос</button>		
		</div>	
		
				
	</div>			
</template>
<script>
	export default{
		mounted(){
			if(this.nextDisabled){
				
			} else {
				
				document.querySelector('#next').classList.remove('hide');
			};
			if (this.backDisabled){
				document.querySelector('#prev').disabled = true;
			} else {
				
				document.querySelector('#prev').classList.remove('hide');
			}

		},
		props:['question', 'numberOfQuestion', 'answer', 'nextDisabled', 'backDisabled', 'numberOfQuestions'],
		data(){
			return{
				answersVariants:['Не было','1 раз','2 раза','3 раза','4 раза'],
				newAnswer:this.answer	
			}
		},
		methods:{
			next(){
				
				this.$emit('nextQuestion');

			},
			prev(){
				this.$emit('prevQuestion');
			},
			getAnswer(newAnswer, n){
				
				if (this.numberOfQuestion != this.numberOfQuestions){
					// document.querySelector('#next').disabled = false;
					document.querySelector('#next').classList.remove('hide');
				} else{
					document.querySelector('#next').disabled = true;
					this.$emit('endOfTest');
				}
				if (this.numberOfQuestion != 1){
					document.querySelector('#prev').disabled = false;
					document.querySelector('#prev').classList.remove('hide');
				}
				let id = '#a' + n;
				let but = document.querySelector(id);
				but.classList.add('active');
				
				for (let i = 0; i<5; i++){
					if (i != n){
						let id = '#a' + i;
						let but = document.querySelector(id);
						but.classList.remove('active');
					}
					
				}
				this.newAnswer=newAnswer;
				this.$emit('getAnswer', this.newAnswer);
			}			
		}
	}
	
</script>
<style lang="scss" scoped>
.hide{
	display:none;
}
.question{
	position: relative;
	grid-column: 0/13;
	padding:5em;
}
.active{
	color:orange;
}
.title{
	display: flex;
	justify-content: center;
	border-radius: 1em;
}
.ans{
	display: flex;
	justify-content: space-around;
}
.butNext, .butPrev{
	background: #eee;
	color:#0095a6;
	border: none;
	font-size: 0.8em;
	position: absolute;
	bottom: 2em;
	
}
.butNext:hover, .butPrev:hover{
	color:#22a7c8;
	cursor: pointer;
}

.butNext{
	right: 2em;
}
.butPrev{
	left: 2em;
}
.but-answ{
	padding: 0.25em 1em;
	background:#fff;
	border-radius: 1em;
	border: 1px solid #4CAF50;
	outline:none;
	transition: border-color 0.3s linear;
	margin:0 0.2em;
}
.but-answ:hover{
	cursor: pointer;
	border-color:orange;
};


	
	
</style>