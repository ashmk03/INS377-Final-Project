const api_key = "ztLX4os3JEp08mfa5b119ZTlMnLiu1pPuJLkZAOwgaWepW52gjl9Fu73";
const container = document.getElementById('image-container');

fetch('https://api.pexels.com/v1/search?query=airplane&per_page=10', {
  headers: {
    Authorization: api_key
  }
})
  .then(response => response.json())
  .then(data => {
    data.photos.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.src.medium;
      img.alt = "Airplane";
      img.style.margin = "10px";
      container.appendChild(img);
    });
})