<template>
  <div id="cabinet">
    
    <Login v-if="state=='login'" @onLogin = "toCabinet" @onRegNeed = "registration"> </Login>
    <Cab v-else-if="state=='cabinet'" @onLogout = "logout" @tests = "goToTests"></Cab>
    <Reg v-else-if="state=='registration'" @onLogout = "logout"></Reg>
    <Tests v-else-if="state=='tests'" @backToCab="toCabinet" @toTestsApp = 'toTestsApp'> </Tests>
    <TestsApp v-if ="state=='testsApp'" :currentTest="currentTest"  @tests = "goToTests"></TestsApp>  
    
  </div>
</template>

<script>
export default {


  mounted() {
      let type = 'session';
      let xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open('post', window.location.origin +'/php/ses.php', true);
          
          let data = new FormData();
          data.append("type","isSession");
          xhr.onreadystatechange =  () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              if (xhr.responseText=='true'){
                  this.state = 'cabinet';  
              }
            }
           } 
          xhr.send(data);
 
  },
  data () {
    return {
      state: 'login',
      currentTest: 'holmsRage'
    }
  },
  methods: {
    toCabinet(){
      this.state = 'cabinet';
    },
    registration(){
     
      this.state = 'registration';
    },
    logout(){
      this.state = 'login';
    },
    goToTests(){
      this.state = 'tests';
    },
    toTestsApp(status){
      this.currentTest = status;
      this.state = 'testsApp';
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
