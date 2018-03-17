<template>
  <div>
    <div class="fileContainer">
      <button @click="back">Back</button>
      <div class="files" v-bind:key="file.fileName" v-for="file in files">
        <span v-if="file.isFile" @click="download(file.fileName)" class="file">{{file.fileName}}</span>
        <span v-if="!file.isFile" @click="cd(file.fileName)" class="dir">{{file.fileName}}</span>
      </div>
    </div>

    <div class="actions">
      <input type="text" v-model="cmd">
      <button @click="run">Run</button>
    </div>
  </div>
</template>

<script>

import connect from '@/apis/connect'

export default {
  name: 'MainPage',
  data () {
    return {
      msg: '',
      files: [],
      cmd: '',
      isLoading: false,
    }
  },
  created(){
    this.fetch('ls');
  },
  methods: {
      showFiles(data){
        let temp = data.split('\n');
        temp.shift();
        temp.shift();
        temp.shift();
        temp.shift();
        temp.pop();
        temp.pop();
        temp.pop();
        console.log(temp)
        this.files = temp.map(e=>{
          const fileName = e.slice(45).trim();
          const isFile = !fileName.endsWith('/');

          return {
            isFile,
            fileName
          }
        });
      },

      run(){
        if(this.cmd===''){
          this.cmd = 'ls';
        }
        this.fetch(this.cmd)
      },

      fetch(cmd){
        connect.run(cmd)
          .then(data=>{
            if(data.data.method === 'ls'){
              this.showFiles(data.data.data)
            }
            if(data.data.method === 'cd'){
              this.fetch('ls');
            }
            this.msg += data.data.data;
          })
      },

      download(name){
        this.fetch('download ' + name);
      },


      cd(name) {
        this.fetch('cd ' + name);
      },

      back(){
        this.fetch('cd ..');
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.fileContainer{
  width: 100%;
  border: 1px solid red;
  overflow: hidden;
  text-align: left;

  span {
    display: inline-block;
    list-style-type: none;
    margin: 4px;
    white-space: nowrap;
    cursor: pointer;

    &.file{

    }
  }
}

.logs{
  width: 40%;
  display: inline-block;
  border: 1px solid red;
}


</style>
