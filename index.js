// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

async function fetchWeatherAlerts(state) {
  const input = document.getElementById("state-input")
  const errorDiv = document.getElementById("error-message")

  try {
    const response = await fetch(weatherApi + state)
    const data = await response.json()

    displayAlerts(data)

    input.value = ""

  } catch (error) {
    errorDiv.textContent = error.message
    errorDiv.classList.remove("hidden")
  }
}

function displayAlerts(data) {

  const displayDiv = document.getElementById("alerts-display")
  const errorDiv = document.getElementById("error-message")

  displayDiv.innerHTML = ""
  errorDiv.textContent = ""
  errorDiv.classList.add("hidden")

  const alerts = data.features

  displayDiv.textContent = `Weather Alerts: ${alerts.length}`

  for (let alert of alerts) {
    const p = document.createElement("p")
    p.textContent = alert.properties.headline
    displayDiv.appendChild(p)
  }
}

document.getElementById("fetch-alerts").addEventListener("click", () => {
  const state = document.getElementById("state-input").value
  fetchWeatherAlerts(state)
})