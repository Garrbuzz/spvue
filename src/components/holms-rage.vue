<template>
	<p>Инструкция к тесту</p>
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
	                	this.t();
	              			
	            }
	        } 
	        xhr.send();

		},
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
	
</style>