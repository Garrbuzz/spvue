<template>
  <div id="cabinet">
    
    <Login v-if="state=='login'" @onLogin = "login" @onRegNeed = "registration"> </Login>
    <Cab v-else-if="state=='cabinet'" @onLogout = "logout" ></Cab>
    <Reg v-else="state=='registration'"></Reg>
  </div>
</template>

<script>
export default {
  // name: 'Cabinet',
  mounted() {
      let type = 'session';
      let xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open('post', 'http://sptraining//php/ses.php', false);
          
          let data = new FormData();
          data.append("type","isSession");
          xhr.send(data);
          if (xhr.status != 200) {
              console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
          } else {
            if (xhr.responseText=='true'){
              console.log('aaaa  '+ xhr.responseText); 
             
              this.state = 'cabinet';
            } else {
              console.log('bbbb  '+ xhr.responseText);
            }
            
      } 
  },
  data () {
    return {
      state: 'login'
    }
  },
  methods: {
    login(){
      this.state = 'cabinet';
    },
    registration(){
     
      this.state = 'registration';
    },
    logout(){
      this.state = 'login';
    }
  }
}  
  
</script>

<style lang="scss">
#cabinet {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
