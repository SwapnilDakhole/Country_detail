let container = document.querySelector('.container');
let searchInput = document.querySelector(".search-box input[type='text']");
let result = document.querySelector('.result');
container.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = searchInput.value;
  let finalURL = `https://restcountries.com/v3.1/name/${input}?fullText=true`;
  fetch(finalURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('something went wrong');
      }
    })
    .then((data) => {
        console.log(data[0]);
      //   console.log(data[0].capital);
      //   console.log(data[0].continents);
      //   console.log(data[0].flags.svg);
      //   console.log(data[0].languages);
      //   console.log(data[0].population);
      //   console.log(data[0].region);
      //   console.log(data[0].name.common);

      result.innerHTML = `
        <div class="wrapper">
          <img src="${data[0].flags.svg}" alt="no_img" class="flag" />
          <h2 class="heading-2">${data[0].name.common}</h2>
          <div class="wrapper">
            <h4>Capital: </h4>
            <span>${data[0].capital}</span>
          </div>
          <div class="wrapper">
            <h4>continents: </h4>
            <span>${data[0].continents}</span>
            </div>
          <div class="wrapper">
            <h4>population: </h4>
            <span>${data[0].population}</span>
            </div>
            <div class="wrapper">
            <h4>languages:</h4>
            <span> ${Object.values(data[0].languages)
              .toString()
              .split(',')
              .join(', ')}
            </span>
            </div>
            <div class="wrapper">
            <h4>currency:</h4>
            <span> ${
              data[0].currencies[Object.keys(data[0].currencies)].name
            } - ${Object.keys(data[0].currencies)[0]}
            </span>
            </div>
        </div>
        
    `;
    })
    .catch(() => {
      if (input.length === 0) {
        result.innerHTML = `
            <h3 class="error">Please first enter any county name!!!</h3>
          `;
      } else {
        result.innerHTML = `<h3 class='error'>Please enter valid county name!!!</h3>`;
      }
    });

  searchInput.value = '';
});
