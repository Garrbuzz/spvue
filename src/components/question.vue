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
			<button v-on:click="next"  id="next" class="butNext">Следующий вопрос</button>
			<button v-on:click="prev" id="prev" class="butPrev">Назад</button>		
		</div>	
		
				
	</div>			
</template>
<script>
	export default{
		mounted(){
			if(this.nextDisabled){
				document.querySelector('#next').disabled = true;
			} else {
				document.querySelector('#next').disabled = false;
			};
			if (this.backDisabled){
				document.querySelector('#prev').disabled = true;
			} else {
				document.querySelector('#prev').disabled = false;
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
					document.querySelector('#next').disabled = false;
				} else{
					document.querySelector('#next').disabled = true;
					this.$emit('endOfTest');
				}
				if (this.numberOfQuestion != 1){
					document.querySelector('#prev').disabled = false;
				}
				let id = '#a' + n;
				let but = document.querySelector(id);
				but.classList.add('active');
				console.log(but);
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
.question{
	position: relative;
	grid-column: 0/13;
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
.butNext{
	position: absolute;
	bottom: -4em;
	right: 2em;
}
.butPrev{
	position: absolute;
	bottom: -4em;
	left: 2em;
}
.but-answ{
	padding: 0.25em 1em;
	background:#fff;
	border-radius: 1em;
	border: 1px solid #4CAF50;
	outline:none;
	transition: border-color 0.3s linear;
}
.but-answ:hover{
	cursor: pointer;
	border-color:orange;
};

	
	
</style>