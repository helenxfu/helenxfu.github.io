window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description')
  let temperatureDegree = document.querySelector('.temperature-degree')
  let locationTimezone = document.querySelector('.location-timezone')
  let temperatureSection = document.querySelector('.temperature')
  const temperatureSpan = document.querySelector('.temperature span')
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/"
      // api key no longer works
      const api = `${proxy}https://api.darksky.net/forecast/6cf5063e331a8b9a1a62d25dd0a516bf/${lat},${long}`;

      fetch(api).then(response => {
        return response.json();
      }).then(data => {
        console.log(data)
        const { temperature, summary, icon } = data.currently
        temperatureDegree.textContent = temperature
        temperatureDescription.textContent = summary
        locationTimezone.textContent = data.timezone

        let celcius = (temperature - 32) * (5 / 9)
        setIcons(icon, document.querySelector('.icon'));

        temperatureSection.addEventListener("click", () => {
          if (temperatureSpan.textContent === "F") {
            temperatureSpan.textContent = "C"
            temperatureDegree.textContent = Math.floor(celcius)
          } else {
            temperatureSpan.textContent = "F"
            temperatureDegree.textContent = temperature
          }
        })
      })
    })


  } else {
    h1.textContent = "Not working b/c reasons"
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" })
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon])
  }
})