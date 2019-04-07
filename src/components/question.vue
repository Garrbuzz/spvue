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
				<button v-on:click="next">Следующий вопрос</button>
				<button v-on:click="prev">Назад</button>
				</div>
	</div>			
</template>
<script>
	export default{
		props:['question', 'numberOfQuestion', 'answer' ],
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
				console.log('current answer: ' + this.answer);
				this.$emit('prevQuestion', this.newAnswer);

			},
			getAnswer(){
				let answ = document.querySelectorAll('[name = "rage-answers"]');
				for (let i = 0; i<answ.length; i++){
					if (answ[i].checked){
						this.newAnswer=answ[i].value;
						console.log('newAnswer' 
							+ this.newAnswer);
					}
				}
				
			}			
		}
	}
	
</script>
<sstyle lang="scss" >
	
</sstyle>