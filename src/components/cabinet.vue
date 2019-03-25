<template>
	<section class="grid-12 cabinet">
	<div class="flex-hcenter-wrap title">
		<h1>Личный кабинет</h1>
	</div>
	<div class="cont-1">
	 	<div class="flex-hcenter-wrap">
		 	<table>
		 		<tr>
		 			<td class="td-left">Пользователь:</td>
		 			<td class="td-right">{{login}}</td>
		 		</tr>
		 		<tr>
		 			<td class="td-left">Дата регистрации:</td>
		 			<td class="td-right">{{reg_date}}</td>
		 		</tr>
		 		
		 	</table>
		</div>
		<div class="flex-hcenter-wrap cont-2">
			<button type="button" class="btn btn-light" v-on:click ="$emit('tests')">Тесты</button>
		</div>			
	</div>
	<div class="cont-right">
		<div class="cabinet-logout">
			<span>{{login}}&nbsp&nbsp&nbsp</span><button id="logout" v-on:click="logout">выйти</button>
		</div>
			
	</div>
	
</section>
</template>
<script>

export default{
	
	mounted(){
		var xhr = new XMLHttpRequest();
      	let body = new FormData();
      	body.append("type", encodeURIComponent('getinf')); 
      	  xhr.withCredentials = true; 
          xhr.open('post', window.location.origin + '/php/cabinet.php', false);
          xhr.send(body);
          if (xhr.status != 200) {
            console.log( xhr.status + ': ' + xhr.statusText ); 
          } else {
          		let userInfo = JSON.parse(xhr.responseText);
          		console.log(userInfo);
            	console.log(' регистрация:' + userInfo['reg_date']);
            	this.reg_date = userInfo['reg_date'];
            	this.login = userInfo['login'];
            	console.log('ім`я користувача: '  + userInfo['name']);
      	}
	},
	data(){
		return{
			login:'',
			reg_date:'',
			state:''
		}
	},
	methods:{
	    logout(){
	        let xhr = new XMLHttpRequest();
	      	let body = new FormData();
	      	body.append("type", encodeURIComponent('logout')); 
	      	  xhr.withCredentials = true; 
	          xhr.open('post', window.location.origin + '/php/logout.php', false);
	          xhr.send(body);
	          if (xhr.status != 200) {
	            // обработать ошибку
	            console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
	          } else {
	            	this.$emit('onLogout');
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
	.grid-12{
		display:grid;
		grid-template-columns:  repeat(12, 1fr);
	}
	.flex-hcenter-wrap{
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}


	.cabinet{
		.title{
			grid-column: 1/13;
			h1{
				font-family: $font;
				font-weight: 100;
				color:$colBlue;
				font-size: 1.8em;
			}
		}
		.cont-1{
			grid-column: 2/12;
			.td-left{
				width: 15em;
				padding: 0.5em 0	em;
				color:$colBlue;
				font-size:0.8em;
			}
			table{
				margin:1em 0;	
			}
			.td-right{
			color:$colBlue;
			}		
			
			
		}
		.cont-2{
			grid-column: 2/12;
			.btn-primary{
				margin: 2em 0 1em 0;
				background:$colBlue;
				border-color:$colBlue;
				padding: 0 2em;
				font-size: 1.5em;

			}
			.btn-primary:hover{
				background:$colBlueBtnHover;
				border-color:$colBlue;
			}
			.btn-light{
				color:$colBlue;
				margin: 1em 0;
				border-color:rgba(0, 149, 166, 0.3);
				padding: 0.2em 2em;
				font-size: 1.1em;
			}
		}
	}
	.cabinet-logout{
		position:absolute;
		right:1.5em;
		top:1em;
		button{
			border-radius: 0.2em;
			color:#fd9017;
			border: 1px solid #eaeaea;
			background: rgba(220, 220, 230, 0.5);
			padding:0.1em 1em;
			font-size: 0.8em;
		}

		button:hover{
			color:$colBlue;
			cursor: pointer;
			background: rgba(255,255,255,0.75);
		}	
		p{
			margin:.4em;
		}
		span{
			font-size: 0.8em;
			color:$colBlue;
		}

	}
</style>