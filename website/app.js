/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "f3186f6a1daed9f0e8f7bbd83fa3ead7";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const generate = () => {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(zip).then((data) => {
    console.log(data);
    postData("http://localhost:3000/weather", {
      temperature: data.main.temp,
      date: newDate,
      userResponse: feelings,
    })
      // Function which updates UI
      .then(() => {
        console.log("updating UI ...");
        updateUI();
      });
  });
};
document.getElementById("generate").addEventListener("click", generate);

const postData = async (url, data) => {
  console.log("posting to server...");
  return await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const getWeather = async (zip) => {
  // const getTemperatureDemo = async (url)=>{
  const res = await fetch(baseUrl + zip + ",us" + "&APPID=" + apiKey);
  console.log(res);
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const updateUI = async () => {
  const request = await fetch("http://localhost:3000/weather");
  try {
    const data = await request.json();
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("temp").innerHTML = data.temperature + " degree";
    document.getElementById("content").innerHTML = data.userResponse;
  } catch (err) {
    console.error(err);
  }
};
