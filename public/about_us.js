const api_key = "ztLX4os3JEp08mfa5b119ZTlMnLiu1pPuJLkZAOwgaWepW52gjl9Fu73";


async function loadAirplaneImages() {
  const response = await
  fetch('https://api.pexels.com/v1/search?query=airplane&per_page=10', {
    headers: {
      Authorization: api_key
    }
  })
  const data = await response.json();
  const photos = data.photos;
  const slider = document.getElementById('myslider');
  slider.innerHTML = "";

  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.style.width = "100%";
    img.style.height = "100%";
    slider.appendChild(img);
  });

  simpleslider.getSlider({
    container: slider,
    duration: 1,
    delay: 3
  });
}

window.onload = loadAirplaneImages();

