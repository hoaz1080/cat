import { green, yellow, red, blue, cyan } from "console-log-colors";
import { randomInt, sleep } from "../utils.js";

class NTDuc {
  constructor(stt, axiosInstance) {
    this.stt = stt;
    this.axios = axiosInstance;
    this.url = "https://api.catshouse.club";
  }

  createUser = async (ref_code) => {
    try {
      const headers = {};
      const response = await this.axios.post(
        `${this.url}/user/create?referral_code=${ref_code}`,
        {},
        {
          headers: headers,
        }
      );
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data;
      }
    } catch (e) {
      if (
        e.response &&
        e.response.data &&
        e.response.data.message.includes("already exist")
      ) {
        this.log("Tài khoản đã được đăng ký", "warning");
        return null;
      } else {
        this.log(`Lỗi khi tạo user: ${e.message}`, "warning");
        return null;
      }
    }
  };

  getUserInfo = async () => {
    try {
      const headers = {};
      const response = await this.axios.get(`${this.url}/user`, {
        headers: headers,
      });
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data;
      }
    } catch (e) {
      this.log(`Lỗi info, vui lòng thử lại sau`, "warning");
      return null;
    }
  };
  getTasks = async () => {
    try {
      const headers = {};
      const response = await this.axios.get(
        `${this.url}/tasks/user?group=cats`,
        {
          headers: headers,
        }
      );
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data;
      }
    } catch (e) {
      this.log(`Lỗi getTasks, vui lòng thử lại sau`, "warning");
      return null;
    }
  };
  completedTask = async (id) => {
    try {
      const payload = {};
      const headers = {};
      const response = await this.axios.post(
        `${this.url}/tasks/${id}/complete`,
        payload,
        {
          headers: headers,
        }
      );
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data;
      }
    } catch (e) {
      this.log(`Lỗi completedTask, vui lòng thử lại sau`, "warning");

      return null;
    }
  };
  getTotalReferents = async (id) => {
    try {
      const headers = {};
      const response = await this.axios.get(`${this.url}/user/referents`, {
        headers: headers,
      });
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data;
      }
    } catch (e) {
      this.log(`Lỗi getTotalReferents, vui lòng thử lại sau`, "warning");

      return null;
    }
  };
  avatar = async () => {
    try {
      const headers = {};
      const response = await this.axios.get(`${this.url}/user/avatar`, {
        headers: headers,
      });
      if (response && (response.status === 200 || response.status === 201)) {
        return response.data;
      }
    } catch (e) {
      this.log(`Lỗi avatar, vui lòng thử lại sau`, "warning");

      return null;
    }
  };
  upAvatar = async (formData) => {
    try {
      const headers = { "Content-Type": "multipart/form-data;" };
      const response = await this.axios.post(
        `${this.url}/user/avatar/upgrade`,
        formData,
        {
          headers: headers,
        }
      );

      if (response && (response.status === 200 || response.status === 201)) {
        return response.data;
      }
    } catch (e) {
      this.log(`Lỗi upAvatar, vui lòng thử lại sau`, "warning");

      return null;
    }
  };
  convertTime = (timestamp) => {
    const now = timestamp ? new Date(timestamp) : new Date(); // Multiply by 1000 if timestamp is in seconds
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };
  log = (message, type = "info") => {
    const timestamp = this.convertTime();
    let logMessage = `[${timestamp}] [*] Account ${this.stt} | ${message}`;

    switch (type) {
      case "warning":
        console.log(yellow.bold(logMessage));
        break;
      case "success":
        console.log(green.bold(logMessage));
        break;
      case "error":
        console.log(red.bold(logMessage));
        break;
      case "already":
        console.log(blue.bold(logMessage));
        break;
      case "start":
        console.log(cyan.bold(logMessage));
        break;
      default:
        console.log(green.bold(logMessage));
        break;
    }
  };
}

export default NTDuc;
