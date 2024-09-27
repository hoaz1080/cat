import fs from "fs";
import figlet from "figlet";

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function convertTimeRunAt(futureTime) {
  let hours = futureTime.getHours();
  let minutes = futureTime.getMinutes();
  let seconds = futureTime.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  console.log(`Run next at: ${hours}:${minutes}:${seconds}`);
}

export function timeRunAt(time) {
  let now = new Date();
  let futureTime = new Date(now.getTime() + time * 1000);
  return futureTime;
}

export async function countdown(seconds) {
  convertTimeRunAt(timeRunAt(seconds));
  console.log(await createFigletText("END CATS"));
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function getConfig() {
  try {
    const fileContent = fs.readFileSync("config.json", "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading or parsing file:", error);
  }
}

export function contentId(t, i) {
  return (t * i) % t;
}

export const sleep = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay * 1000));

export function getData(filename) {
  return fs
    .readFileSync(filename, "utf8")
    .toString()
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "");
}

export function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng tính từ 0
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
export const checkIP = async (axios) => {
  try {
    const rs = await axios.get("https://ipinfo.io/json");
    const ip = rs.data?.ip;
    const country = rs.data?.country;
    return { ip, country };
  } catch (err) {
    return null;
  }
};
export const getUserDataFromUrl = (encodedString) => {
  let decodedString = decodeURIComponent(encodedString);
  let userStartIndex = decodedString.indexOf("user=") + "user=".length;
  let userEndIndex = decodedString.indexOf("}", userStartIndex) + 1;
  let userJSON = decodedString.substring(userStartIndex, userEndIndex);

  let userObject = JSON.parse(userJSON);

  return userObject;
};

export const createFigletText = (text, font = "Small") => {
	return new Promise((resolve, reject) => {
	  figlet.text(text, { font }, (err, data) => {
		if (err) {
		  reject("Something went wrong...");
		} else {
		  resolve(data);
		}
	  });
	});
  };