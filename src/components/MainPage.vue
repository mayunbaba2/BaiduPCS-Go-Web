<template>
  <div>
    <div class="fileContainer">
      <el-button type="primary" size="mini" @click="back">Back</el-button>
      <div class="files" v-bind:key="file.fileName" v-for="file in files">
        <div v-if="file.isFile" @click="download(file.fileName)" class="file">
          <span class=" fa fa-file icon"></span>
          <span >{{file.fileName}}</span>
        </div>
        <div v-if="!file.isFile" @click="cd(file.fileName)" class="dir">
          <span class=" fa fa-folder-open icon"></span>
          <span>{{file.fileName}}</span>
        </div>
      </div>
    </div>
  <!-- <pre>
    {{msg}}
  </pre> -->
    <div class="actions">
      <input type="text" v-model="cmd">
      <button @click="run">Run</button>
      <input type="password" v-model="psw">
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import connect from "@/apis/connect";
import loading from "@/widges/loading";

export default {
  name: "MainPage",
  components: {
    loading
  },
  data() {
    return {
      msg: "",
      psw: "",
      files: [],
      cmd: "",
      isLoading: true
    };
  },
  created() {
    this.fetch("ls");
  },
  methods: {
    showFiles(data) {
      let temp = data.split("\n");
      temp.shift();
      temp.shift();
      temp.shift();
      temp.shift();
      temp.pop();
      temp.pop();
      temp.pop();
      this.files = temp.map(e => {
        const re = /\d{4}-\d{2}-\d{2} \d\d:\d\d:\d\d/;
        const fileName = e.split(re)[1].trim();
        const isFile = !fileName.endsWith("/");

        return {
          isFile,
          fileName
        };
      });
    },

    run() {
      if (this.cmd === "") {
        this.cmd = "ls";
      }
      this.fetch(this.cmd);
    },

    fetch(cmd) {
      if (cmd.split(" ")[0] !== "download") {
        this.isLoading = true;
      }
      connect
        .run(cmd, this.psw)
        .then(data => {
          if (data.data.method === "ls") {
            this.showFiles(data.data.data);
          }
          if (data.data.method === "cd" || data.data.method === "login") {
            this.fetch("ls");
          } else {
            this.isLoading = false;
          }
          if (data.data.method === "download") {
            this.$message({
              message: "文件下载成功" + name,
              type: "success"
            });
          }
          this.msg += data.data.data;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },

    download(name) {
      this.fetch("download " + name);
      this.$message({
        message: "正在下载文件" + name,
        type: "success"
      });
    },

    cd(name) {
      this.fetch("cd " + name);
    },

    back() {
      this.fetch("cd ..");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.fileContainer {
  width: 100%;
  border: 1px solid rgb(99, 99, 99);
  overflow: hidden;
  text-align: left;
  padding: 1em;

  .files {
    margin: 0 10px;
  }

  span {
    display: inline-block;
    list-style-type: none;
    margin: 4px;
    white-space: nowrap;
    cursor: pointer;
  }

  .file {
    color: rgb(27, 27, 41);
  }

  .dir {
    color: rgb(83, 82, 0);
  }
}
</style>
