### Simple Country Info App
A simple web app that fetches and displays information about a country and its neighbor using the REST Countries API.

# Usage
1. Open index.html in your browser.
2. Click the "Get Country Info" button to fetch and display information about a default country (in this case, Togo).
3. Explore the displayed information, including the country's name, region, population, official languages, and currencies.
# Code Overview
# AJAX Call for Country Information

    const ajxRequest = new XMLHttpRequest();
    ajxRequest.open('GET', 'https://restcountries.com/v3.1/name/TOGO');
    ajxRequest.send();

    ajxRequest.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);
    });
# Rendering Country Information
javascript
Copy code
    const renderCountry = function (data, className = '') {
    // ... (HTML template for displaying country information)
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
    };
# Fetching and Rendering Neighbor Country

Copy code
    const getCoutryDataAndNeighbor = function (country) {
    // ... (AJAX call for the first country)

    ajxRequest.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    // Get the neighbor country code
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call for the neighbor country
    const ajxRequest2 = new XMLHttpRequest();
    ajxRequest2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    ajxRequest2.send();

    ajxRequest2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });

    });
    };

    getCoutryDataAndNeighbor('togo');
