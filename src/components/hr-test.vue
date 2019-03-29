<template>
	<div>
		{{question}}
	</div>
	
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
				holmse:{},
				question:''
			}	
		},
		methods:{
			start(){
				
			}
		}
	}	
</script>
<style lang = "scss" scoped>
	
</style>