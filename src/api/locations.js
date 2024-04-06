const fetchLocations = async () => {
  try {
    const response = await fetch(
      "https://geocode.maps.co/search?q=32A+Seriki&api_key=",
    );
    const data = await response.json();
    console.log(data);
    // return data
  } catch (error) {
    console.error(error);
  }
};
fetchLocations();
