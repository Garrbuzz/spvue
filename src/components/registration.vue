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
					<p  class = "require">Повторите пароль:</p>
					<input id = "pass2" type="password" placeholder="пароль" v-on:input="validpass">
					<p class = "require">Дата рождения:</p>
					<input  id = "birthday" type="date" v-on:input="validbirthdey">
					<p>Профессия:</p>
					<input  id = "profession" type="text">
					<p>Компания:</p>
					<input  id = "company" type="text">
					<p>Телефон:</p>
					<input  id = "phone" type="tel">
					<p class = "require">Пол:</p>
					<p id="sex"><input type="radio" name="sex" value="male" v-on:input="validsex">Мужской<br>
					<input  type="radio" name="sex" value="famale" v-on:input="validsex">Женский</p>
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
				valpass: false,
				valbirth: false,
				vallogin:false,
				valsex:false
			}
		},
		computed: {
			resValid: function(){
				return this.valpass&&this.vallogin&&this.valsex&&this.valbirth;
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
				if (!this.resValid){
					
					if (!this.valpass){
						fields += 'Пароль, '; 
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
					alert('thats good!');
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