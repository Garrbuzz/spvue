<template>
	<div>
		<h4>Вопрос {{numberOfQuestion}}</h4>
			<p>{{question}}</p>
			<div >
				<ul id = "listOfQuestions">
					<li  v-for="answersVariant in answersVariants">
						<input v-if="answersVariant!=answer" type="radio" name = "rage-answers" v-bind:value="answersVariant" v-on:input="getAnswer">
						<input  v-if="answersVariant==answer" 	type="radio" name = "rage-answers" v-bind:value="answersVariant"  v-on:input="getAnswer" checked>
							{{answersVariant}} 
					</li>
				</ul>
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
			getAnswer(){
				if (this.numberOfQuestion != this.numberOfQuestions){
					document.querySelector('#next').disabled = false;
				} else{
					document.querySelector('#next').disabled = true;
					this.$emit('endOfTest');
				}
				if (this.numberOfQuestion != 1){
					document.querySelector('#prev').disabled = false;
				}

				let answ = document.querySelectorAll('[name = "rage-answers"]');
				for (let i = 0; i<answ.length; i++){
					if (answ[i].checked){
						this.newAnswer=answ[i].value;
						
					}
				}
				
			}			
		}
	}
	
</script>
<style lang="scss">
	ul{
		display:flex;
		justify-content: space-around;
		list-style-type: none;
		li {
			display: inline-block;
		}
	}
	
	
</style>