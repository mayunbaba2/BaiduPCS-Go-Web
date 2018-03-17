import fetch from "@/utils/fetch";

const API_URL = "http://localhost:3000/";

export default {
  run(cmd) {
    return fetch({
      url: API_URL,
      method: "post",
      data: {
        cmd,
        psw: "YourPassword"
      }
    });
  }
};
