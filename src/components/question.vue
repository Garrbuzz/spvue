<template>
	<div>
		<h4>Вопрос {{numberOfQuestion}}</h4>
			<p>{{question}}</p>

				<span v-for="(answersVariant, index) in answersVariants">
					<button  v-if="answersVariant!=answer"  :id="'a' + index" @click="getAnswer(answersVariant, index)">{{answersVariant}}</button>
					<button  v-if="answersVariant==answer"  :id="'a' + index" @click="getAnswer(answersVariant, index)" class="active">{{answersVariant}}</button>
				</span>

				
			<div>
				<button v-on:click="next"  id="next">Следующий вопрос</button>
				<button v-on:click="prev" id="prev">Назад</button>
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
				for (let i = 0; i<5; i++){
					if (i != n){
						let id = '#a' + i;
						let but = document.querySelector(id);
						but.classList.remove('active');
					}
					this.newAnswer=newAnswer;
					this.$emit('getAnswer', this.newAnswer);
				}
			}			
		}
	}
	
</script>
<style lang="scss" scoped>
.active{
	background:green;
}

	
	
</style>