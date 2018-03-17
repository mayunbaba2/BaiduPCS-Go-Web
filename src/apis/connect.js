import fetch from "@/utils/fetch";

const API_URL = "http://localhost:3000/";

export default {
  run(cmd, psw) {
    return fetch({
      url: API_URL,
      method: "post",
      data: {
        cmd,
        psw
      }
    });
  }
};
