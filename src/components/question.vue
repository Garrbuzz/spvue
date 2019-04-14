<template>
	<div>
		<h4>Вопрос {{numberOfQuestion}}</h4>
			<p>{{question}}</p>
			<button @click="getAnswer(answersVariants[0], 0)" id="a0">{{answersVariants[0]}}</button>
			<button @click="getAnswer(answersVariants[1], 1)" id="a1">{{answersVariants[1]}}</button>
			<button @click="getAnswer(answersVariants[2], 2)" id="a2">{{answersVariants[2]}}</button>
			<button @click="getAnswer(answersVariants[3], 3)" id="a3">{{answersVariants[3]}}</button>
			<button @click="getAnswer(answersVariants[4], 4)" id="a4">{{answersVariants[4]}}</button>
			
				<!-- <ul id = "listOfQuestions">
					<li  v-for="answersVariant in answersVariants">
						<input v-if="answersVariant!=answer" type="radio" name = "rage-answers" v-bind:value="answersVariant" v-on:input="getAnswer">
						<input  v-if="answersVariant==answer" 	type="radio" name = "rage-answers" v-bind:value="answersVariant"  v-on:input="getAnswer" checked>
							{{answersVariant}} 
					</li>
				</ul> -->
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
		props:['question', 'numberOfQuestion', 'answer', 'nextDisabled', 'backDisabled', 'numberOfQuestions' ],
		data(){
			return{
				answersVariants:['Не было', '1 раз','2 раза','3 раза','4 раза'],
				newAnswer:this.answer		
			}
		},
		methods:{
			next(){
				this.$emit('nextQuestion', this.newAnswer);
			},
			prev(){
			
				this.$emit('prevQuestion', this.newAnswer);
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