 'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/// old waY for AJAX CALL
const ajxRequest = new XMLHttpRequest();
ajxRequest.open('GET', 'https://restcountries.com/v3.1/name/TOGO');
ajxRequest.send();


const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} M</p>
            <p class="country__row"><span>🗣</span>${Object.values(
              data.languages
            ).join()}</p>
            <p class="country__row"><span>💰</span>${Object.keys(
              data.currencies
            )}</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

const getCoutryDataAndNeighbor = function (country) {

  // Ajax call country 1
  const ajxRequest = new XMLHttpRequest();
  ajxRequest.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  ajxRequest.send();
  
  ajxRequest.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // we use the '[]' to destructure the object 'data'
    console.log(data);

    // Render country 1
    renderCountry(data);

    // GET NEIGHBOUR COUNTRY 2
    const [neighbour] = data.borders;

    if (!neighbour) return;

    //Ajax call country 2;
    const ajxRequest2 = new XMLHttpRequest();
    ajxRequest2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    ajxRequest2.send();

    ajxRequest2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCoutryDataAndNeighbor('togo');

   

// const getCoutryData = function (country) {
//   getJson(`https://restcountries.com/v3.1/name//${country}`, 'Country not found')
//  // called json to read the response coming from the fetch
    
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders[0];
//       console.log(data);
      
//       if (!neighbor) throw new Error('No neighbour found.');

//       // country 2
//       return getJson(`https://restcountries.com/v3.1/alpha//${neighbor}`, 'Country not found' )
//     })
//     .then(data => renderCountry(data, 'neighbor'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`)
//       rederError(`Something went wrong 💥💥💥 ${err.message}. Try again!`)
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     })
// };


// //put the whole function into a click button
// btn.addEventListener('click', function () {
//   getCoutryDataAndNeighbor('neighbor');
// })

// getCoutryData('australia')




/////// New way of writing AJAX 

/* const getCoutryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name//${country}`) // fetch will return a  promise that need to be consum, ,then(callback that needs to execute as soon as the promise is fufilled) 
    .then(response => {
      // 


      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })  // called json to read the response coming from the fetch
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      if (!neighbor) return;

      // country 2
      return fetch(`https://restcountries.com/v3.1/name//${neighbor}`)
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbor'))
    .catch(err => {
      console.error(`${err} 💥💥💥`)
      rederError(`Something went wrong 💥💥💥 ${err.message}. Try again!`)
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
  })
};
//put the whole function into a click button
btn.addEventListener('click', function(){
  getCoutryData('togo');
}) */

/* handling Error created manually(wrong country name)
getCoutryData('france')

hANDLING THE FAILED CALL 
Error 1: country not found
Error 2: neighbor country does not exist 
first methode : callback fction that return alert when promise not fufilled see line 76 second fnction  */
