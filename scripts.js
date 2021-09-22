const imageArea = document.querySelector('.imageArea');

document.addEventListener("DOMContentLoaded", async function () {
  const link = 'https://us-central1-squid-apis.cloudfunctions.net/test-front-basic';
  try {
    const datas =  await fetch(link);
    const jsonData = await datas.json();
    const loader = document.querySelector('.loader');
    const loading = document.querySelector('.loading');
    loading.remove();
    loader.remove();
    console.log(jsonData);
    jsonData.forEach((photo) => {
      const images = {
        image: photo.imagens.thumbnail.url,
        link: photo.link,
      };
      images.onclick = function() {
        window.location.href = photo.link;
    };
      const item = settingImages(images);
      imageArea.appendChild(item);
    });
    setTarget();
  } 
  catch {

  }
});