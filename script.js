// 福岡市の緯度・経度
const latitude = 33.5902;
const longitude = 130.4017;

// APIのURL
const apiUrl =
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FTokyo`;

// HTMLの要素を取得
const btn = document.getElementById('get-weather-btn');
const iconElem = document.getElementById('weather-icon');
const textElem = document.getElementById('weather-text');
const tempElem = document.getElementById('temperature');
const windElem = document.getElementById('wind');
const updatedElem = document.getElementById('updated');

// 天気コードとアイコンの対応
const weatherCodes = {
  0: { text: '快晴', icon: '☀️' },
  1: { text: '晴れ', icon: '🌤️' },
  2: { text: '一部曇り', icon: '⛅' },
  3: { text: '曇り', icon: '☁️' },
  45: { text: '霧', icon: '🌫️' },
  48: { text: '霧', icon: '🌫️' },
  51: { text: '小雨', icon: '🌧️' },
  53: { text: '小雨', icon: '🌧️' },
  55: { text: '小雨', icon: '🌧️' },
  61: { text: '雨', icon: '🌧️' },
  63: { text: '雨', icon: '🌧️' },
  65: { text: '大雨', icon: '🌧️' },
  71: { text: '雪', icon: '❄️' },
  73: { text: '雪', icon: '❄️' },
  75: { text: '大雪', icon: '❄️' },
  80: { text: 'にわか雨', icon: '🌦️' },
  81: { text: 'にわか雨', icon: '🌦️' },
  82: { text: '激しい雨', icon: '🌧️' },
  95: { text: '雷雨', icon: '⛈️' }
};

// 天気情報を取得
async function fetchWeather() {

  try {
    textElem.textContent = '読み込み中...';

    const response = await fetch(apiUrl);
    const data = await response.json();

    const current = data.current;

    const temp = current.temperature_2m;
    const code = current.weather_code;
    const wind = current.wind_speed_10m;

    const weatherInfo =
      weatherCodes[code] || {
        text: '不明',
        icon: '❓'
      };

    // 画面に表示
    iconElem.textContent = weatherInfo.icon;
    textElem.textContent = weatherInfo.text;
    tempElem.textContent = `${temp}℃`;
    windElem.textContent = wind;

    updatedElem.textContent =
      '更新時刻：' + current.time.replace('T', ' ');

  } catch (error) {
    textElem.textContent = '天気を取得できませんでした';
    console.error(error);
  }
}

// ボタンを押すと天気を更新
btn.addEventListener('click', fetchWeather);

// 最初に天気を取得
fetchWeather();