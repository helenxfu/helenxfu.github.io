window.addEventListener('load', () => {
  let long;
  let lat;


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/"
      const api = `${proxy}https://api.darksky.net/forecast/6cf5063e331a8b9a1a62d25dd0a516bf/${lat},${long}`;

      fetch(api).then(response => {
        return response.json();
      }).then(data => {
        console.log(data)
      })
    })


  } else {
    h1.textContent = "Not working b/c reasons"
  }
})