// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

async function getWeatherAlerts(state) {
    const url = `https://api.weather.gov/alerts/active?area=${state}`;
    try { resetUI();
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather alerts');
        }
        const data = await response.json();
        displayAlerts(data);        
    }
    catch (error) {
        showError(error.message);
    }   
}

function displayAlerts(data) {
    const displayArea = document.getElementById('weather-alerts');
    const alerts = data.features;
    const summary = document.createElement('h3');
    summary.textContent = `Current Watches, warnings, and advisories for : ${alerts.length}`;
    displayArea.appendChild(summary);

const list = document.createElement('ul');
alerts.forEach(alert => {
    const listItem = document.createElement('li');
    listItem.textContent = alert.properties.headline;
    list.appendChild(listItem);
});
displayArea.appendChild(list);
}

function resetUI() {
  const displayArea = document.getElementById('weather-alerts');
  const errorDiv = document.getElementById('error-message');
  const inputField = document.getElementById('state-input');

  displayArea.innerHTML = ''; 
  errorDiv.textContent = '';  
  errorDiv.style.display = 'none'; 
  inputField.value = ''; 
}

function showError(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}
document.getElementById('fetch-alerts').addEventListener('click', () => {
    const stateAbbr = document.getElementById('state-input').value;
    getWeatherAlerts(stateAbbr);
});