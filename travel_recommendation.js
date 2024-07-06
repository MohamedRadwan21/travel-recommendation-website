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
      if (keyword.includes("beach")) {
          data.beaches.forEach(beach => {
              createRecommendationElement(beach, resultsDiv);
          });
      } else if (keyword.includes("temple")) {
          data.temples.forEach(temple => {
              createRecommendationElement(temple, resultsDiv);
          });
      } else {
          data.countries.forEach(country => {
              country.cities.forEach(city => {
                  if (city.name.toLowerCase().includes(keyword)) {
                      createRecommendationElement(city, resultsDiv);
                  }
              });
          });
      }
  });
}

function createRecommendationElement(place, parentDiv) {
  const recommendationElement = document.createElement('div');
  recommendationElement.innerHTML = `
      <h3>${place.name}</h3>
      <p>${place.description}</p>
      <img src="${place.imageUrl}" alt="${place.name}">
  `;
  parentDiv.appendChild(recommendationElement);
}

function clearResults() {
  document.getElementById('results').innerHTML = '';
  document.getElementById('search').value = '';
}
