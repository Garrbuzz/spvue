<template>
	<section class="grid-12">
		<div class="register flex-hcenter-wrap">
			<div>
				<!-- {{loginV}} -->
				<fieldset>	
					<legend>Введите данные:</legend>
					<p class = "require">Адрес электронной почты (он же логин):</p>
					<input id="login" type="email"  placeholder="example@example.com" v-on:input="validemail">
					<p class = "require">Пароль:</p>
					<input id = "pass1" type="password" placeholder="пароль"  v-on:input="validpass">
					<p id="vp"></p>
					<p  class = "require">Пароль повторно:</p>
					<input id = "pass2" type="password" placeholder="пароль" v-on:input="validpass">
					<p >Имя:</p>
					<input  id = "name" type="text">
					<p >Фамилия:</p>
					<input  id = "surname" type="text">
					<p class = "require">Дата рождения:</p>
					<input  id = "birthday" type="date" v-on:input="validbirthdey">
					<p class = "require">Профессия:</p>
					<input  id = "profession" type="text">
					<p>Компания:</p>
					<input  id = "company" type="text">
					<p>Телефон:</p>
					<input  id = "phone" type="tel">
					<p class = "require">Пол:</p>
					<div>
					<input id="sex-m" type="radio" name="sex" value="male" v-on:input="validsex">Мужской<br>
					<input  id="sex-f" type="radio" name="sex" value="famale" v-on:input="validsex">Женский</div>
					<p>Skype:</p>
					<input  id="skype" type="text">
					<p>Telegram:</p>
					<input  id="telegram" type="text">
				</fieldset>
				
			</div>
			<div class="buttons">
				<div><button type="button" class="btn btn-success btn-login" v-on:click="sendData">Зарегистрироваться</button></div>
			</div>
			
		</div>
	</section>
</template>
<script>
	export default{
		data(){
			return{
				vallogin:false,
				valpass: false,
				valbirth: false,
				valprof:false,
				valsex:false
			}
		},
		computed: {
			resValid: function(){
				return this.valpass&&this.vallogin&&this.valsex&&this.valbirth&&this.valprof;
			}
		},		
		methods:{
			validpass(){
				let p = document.querySelector('#vp');
				if(document.querySelector('#pass1').value!=document.querySelector('#pass2').value){
						p.innerHTML = 'Пароли не совпадают';
					this.valpass = false;
				} else {
					if(document.querySelector('#pass1').value===''){
					this.valpass = false;
					document.querySelector('#vp').innerHTML = 'Пароль должен содержать хотя бы один символ';
					document.location.href = '#login';
					} else{
						p.innerHTML = '';
					this.valpass = true;
					}
				}
 			},
			validbirthdey(){
				this.valbirth = true;
			},
			validemail(){
				let email = document.querySelector('#login');
				if (!email.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
					email.classList.add('wrong');
					this.vallogin = false;
				}else{
					email.classList.remove('wrong');
					this.vallogin = true;
				}
			},
			validsex(){
				this.valsex = true;
			},
			sendData(){
				let fields = '';
				if(document.querySelector('#profession').value === ''){
					this.valprof = false;
				}else{this.valprof = true};
				
				
				if (!this.resValid){
					if (!this.valpass){
						fields += 'Пароль, '; 
					}
					if (!this.valprof){
						fields += 'Профессия, '; 
					}
					if(!this.valbirth){
						fields += 'День рождения, ';
					} 
					if(!this.vallogin){
						fields += 'Email, ';
					}	
					if(!this.valsex){
						fields += 'Пол';
					}
					alert('Не правильно заполнены поля ' + fields);
				} else{
					let body = new FormData();
					let url = 'http://sptraining/php/users_fields.php';
			        body.append("type","user_fields");
			        let userData = req(url, body);
					
					userData.login = document.querySelector('#login').value;
					userData.reg_date = new Date(); 
					userData.password = document.querySelector('#pass1').value;	
					userData.profession = document.querySelector('#profession').value;
					userData.date_of_birth = document.querySelector('#birthday').value;
					if (document.querySelector('#sex-m').cheked){
						userData.sex = document.querySelector('#sex-m').value;
					} else {
						userData.sex = document.querySelector('#sex-f').value;
					}
					body = new FormData();
					body = userData;
					console.log(body);


					
					
				}
				function req(url, body){
					let xhr = new XMLHttpRequest();
					xhr.withCredentials = true;
			        xhr.open('post', url, false);
			        
			        xhr.send(body);
			  	        if (xhr.status != 200) {
					          // обработать ошибку
					          console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
					        } else{
					        	return  JSON.parse(xhr.responseText);
					        	
					        	
					        }
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
	.wrong{
		color:red;
	}
	.register{
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
			padding:0.25em;
			width: 25em;
			
		}
		input[type="date"]{
				width:12em;
				text-align: center;
				color: #555;
		}
		input[type="radio"]{
				width:2em;
				margin-top: 0;
				padding-top: 0;

				
		}
		input[type="email"]:invalid{
			color: red;
		}
		p{
			margin:2em 0 0.5em 0;
		}
		#vp{
			color:red;
			font-size: 0.8em;
			padding:0;	
		}
	::-webkit-input-placeholder {color:#ddd;}
	::-moz-placeholder          {color:#ddd;}
	:-moz-placeholder           {color:#ddd;}
	:-ms-input-placeholder      {color:#ddd;}
		
	}
	p.require:before{
		content: "*";
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