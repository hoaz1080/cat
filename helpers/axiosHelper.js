import axios from "axios";
import tunnel from "tunnel";
import { exit } from "process";
import UserAgent from "user-agents";

// Generate a mobile User-Agent once and store it
const mobileUserAgent = new UserAgent({
  deviceCategory: "mobile",
}).toString();

// Debug function
const dd = (data) => {
  console.log(data);
  console.log("DEBUG");
  exit();
};

class AxiosHelpers {
  constructor(config = {}) {
    this.defaultUserAgent = mobileUserAgent;

    this.instance = axios.create({
      baseURL: config.baseURL || "",
      mode: "no-cors",
      headers: {
        ...config.headers,
        "User-Agent": config.userAgent || this.defaultUserAgent,
      },
      proxy: false,
    });

    if (config.proxy) {
      this.setProxy(config.proxy);
    }
  }

  setProxy(proxy) {
    const [host, port, username, password] = proxy.split(":");
    const proxyHost = host.toString();
    const proxyPort = parseInt(port, 10);
    const proxyAuth = `${username}:${password}`;

    let agent = tunnel.httpsOverHttp({
      proxy: {
        host: proxyHost,
        port: proxyPort,
        proxyAuth: `${proxyAuth}`,
      },
    });

    this.instance.defaults.httpsAgent = agent;
  }

  async get(url, config = {}) {
    const finalConfig = this.mergeConfig(config);
    return this.instance.get(url, finalConfig);
  }

  async post(url, data, config = {}) {
    const finalConfig = this.mergeConfig(config);
    return this.instance.post(url, data, finalConfig);
  }

  async put(url, data, config = {}) {
    const finalConfig = this.mergeConfig(config);
    return this.instance.put(url, data, finalConfig);
  }

  async patch(url, data, config = {}) {
    const finalConfig = this.mergeConfig(config);
    return this.instance.patch(url, data, finalConfig);
  }

  mergeConfig(config) {
    const finalConfig = { ...config };

    finalConfig.headers = {
      ...finalConfig.headers,
      "User-Agent": config.userAgent || this.defaultUserAgent,
    };

    if (config.proxy) {
      const [host, port, username, password] = config.proxy.split(":");
      const proxyHost = host.toString();
      const proxyPort = parseInt(port, 10);
      const proxyAuth = `${username}:${password}`;

      let agent = tunnel.httpsOverHttp({
        proxy: {
          host: proxyHost,
          port: proxyPort,
          proxyAuth: `${proxyAuth}`,
        },
      });

      finalConfig.proxy = false;
      finalConfig.httpsAgent = agent;
    }

    return finalConfig;
  }
}

export default AxiosHelpers;
