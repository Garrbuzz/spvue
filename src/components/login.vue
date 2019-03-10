<template>

	<section class="grid-12">
		<div class="login flex-hcenter-wrap">
			<div>
				<!-- {{loginV}} -->
				<fieldset>	
					<legend>&nbsp&nbspВойдите или зарегистрируйтесь&nbsp&nbsp</legend>
					<p>Адрес электронной почты:</p><input  id="login" type="text" placeholder="example@example.com">
					<p>Пароль:</p><input id="pass" type="password" placeholder="пароль">

				</fieldset>
				
			</div>
			<div class="buttons">
				<div id="wrong-login" class="wrong-login"></div>
				<div><button type="button" class="btn btn-success btn-login" v-on:click="login">Войти</button></div>
				<div><button type="button" class="btn btn-light btn-register">Зарегистрироваться</button></div>
			</div>
			
		</div>
	</section>
</template>

<script>
	export default{
		data(){
			return{
				loginV: false
			}
		},
		watch: {
			loginV: function(){
				this.$emit('onLogin');
			}
		},
		methods:{
			login(){

				let name = document.querySelector('#login');
				let pass = document.querySelector('#pass');
				let context = this;
				let type = 'login';
				
				name.onfocus = function(){
					name.classList.remove('wrong-login');
					name.value='';
					document.querySelector('#wrong-login').innerHTML='';
				}
				pass.onfocus = function(){
					pass.classList.remove('wrong-login');
					pass.value='';
					document.querySelector('#wrong-login').innerHTML='';
				}
				

				let xhr = new XMLHttpRequest();
					xhr.withCredentials = true;
			        xhr.open('post', 'http://sptraining/php/login.php', false);
			        var body = new FormData();
			        body.append("type","login");
			        body.append("name", encodeURIComponent(name.value));
			        body.append("pass", encodeURIComponent(pass.value));
			
			       
			        xhr.send(body);
			  	        if (xhr.status != 200) {
					          // обработать ошибку
					          console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
					        } else 
					        	if (xhr.responseText == 'true'){
					            	this.loginV = true;   	
					          } else{
					          console.log('response: ' + xhr.responseText);
					          name.classList.add('wrong-login');
					          pass.classList.add('wrong-login');
					          document.querySelector('#wrong-login').innerHTML = 'Не верное имя пользователя или пароль';
				}


			 	// fetch('http://sptraining/php/login.php', {method:"POST", headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" }, body: "type=" + type + "&name=" + encodeURIComponent(name.value) + "&pass=" + encodeURIComponent(pass.value)})  
				 //  .then(  
				 //    function(response) {  
				 //      if (response.status !== 200) {  
				 //        console.log('Looks like there was a problem. Status Code: ' +  
				 //          response.status);  
				 //        return;  
				 //      }

				 //      // Examine the text in the response
				        
				 //      response.json().then(function(dt) {  
				 //        if(dt){
				 //        	console.log(dt);
				 //           	context.loginV = true;

				 //        } else {
				 //        	name.classList.add('wrong-login');
				 //        	pass.classList.add('wrong-login');
				 //        	document.querySelector('#wrong-login').innerHTML = 'Не верное имя пользователя или пароль';
				 //        }
				 //      });  
				 //    }

				 //  ) 

				 //  .catch(function(err) {  
				 //    console.log('Fetch Error :-S', err);  
				 //  });

				  
				
				
			}
			
			
		}	
	}

	
</script>
<style lang="scss">
	$font:verdana;
	$colBlue:#0095a6;
	$colBlueBtnHover:#22a7c8;
	$colP1:#444;
		.login{
		margin: 1em 0;
		grid-column: 4/10;
		font-family: $font;
		fieldset{
			padding: 1em 5em 3em;
			color:$colBlue;
			border: 1px solid $colBlue;
			text-align: center;
		}
		input{
			border: 1px solid #ddd;
			border-radius: 3px;
			padding:0.5em;
			width: 25em;
		}
		p{
			margin:2em 0 0.5em 0;
		}
	::-webkit-input-placeholder {color:#ddd;}
	::-moz-placeholder          {color:#ddd;}
	:-moz-placeholder           {color:#ddd;}
	:-ms-input-placeholder      {color:#ddd;}
		
	}
	.buttons{
		margin:1.5em 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.btn-login{
		margin:1em 0
	}

	.wrong-login{
		color:red;
	}
</style>