async function fetchRecommendations() {
  const response = await fetch('travel_recommendation_api.json');
  const data = await response.json();
  return data;
}

function searchRecommendations() {
  const keyword = document.getElementById('search').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';  // Clear previous results

  fetchRecommendations().then(data => {
      let found = false;

      data.countries.forEach(country => {
          country.cities.forEach(city => {
              if (city.name.toLowerCase().includes(keyword)) {
                  found = true;
                  const cityElement = document.createElement('div');
                  cityElement.innerHTML = `
                      <h3>${city.name}</h3>
                      <p>${city.description}</p>
                      <img src="${city.imageUrl}" alt="${city.name}">
                  `;
                  resultsDiv.appendChild(cityElement);
              }
          });
      });

      data.temples.forEach(temple => {
          if (temple.name.toLowerCase().includes(keyword)) {
              found = true;
              const templeElement = document.createElement('div');
              templeElement.innerHTML = `
                  <h3>${temple.name}</h3>
                  <p>${temple.description}</p>
                  <img src="${temple.imageUrl}" alt="${temple.name}">
              `;
              resultsDiv.appendChild(templeElement);
          }
      });

      data.beaches.forEach(beach => {
          if (beach.name.toLowerCase().includes(keyword)) {
              found = true;
              const beachElement = document.createElement('div');
              beachElement.innerHTML = `
                  <h3>${beach.name}</h3>
                  <p>${beach.description}</p>
                  <img src="${beach.imageUrl}" alt="${beach.name}">
              `;
              resultsDiv.appendChild(beachElement);
          }
      });

      if (!found) {
          resultsDiv.innerHTML = '<p>No recommendations found for the provided keyword.</p>';
      }
  });
}

function clearResults() {
  document.getElementById('results').innerHTML = '';
  document.getElementById('search').value = '';
}
