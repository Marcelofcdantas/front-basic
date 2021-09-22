const imageArea = document.querySelector('.imageArea');

function createCustomElement(element, className, link) {
  const e = document.createElement(element);
  e.className = className;
  e.href = link;
  return e;
};

function createProductImageElement(imageSource, alt) {
  const img = document.createElement('img');
  img.className = 'photo';
  img.src = imageSource;
  img.setAttribute('alt', alt)
  return img;
};

const settingImages = ({ image, link, alt }) => {
  const section = document.createElement('div');
  section.className = 'item';
  section.appendChild(createCustomElement('a', 'linking', link));
  const lastImage = section.lastChild;
  lastImage.appendChild(createProductImageElement(image, alt));
  return section;
};

const setTarget = () => {
  const link = document.querySelectorAll('.linking');
  link.forEach((item) => item.setAttribute('target', '_blank'));
};

document.addEventListener("DOMContentLoaded", async function () {
  const link = 'https://us-central1-squid-apis.cloudfunctions.net/test-front-basic';
  try {
    const datas =  await fetch(link);
    const jsonData = await datas.json();
    console.log(jsonData);
    const loader = document.querySelector('.loader');
    const loading = document.querySelector('.loading');
    loading.remove();
    loader.remove();
    jsonData.forEach((photo) => {
      const images = {
        image: photo.imagens.thumbnail.url,
        link: photo.link,
        alt: photo.legenda,
      };
      const item = settingImages(images);
      imageArea.appendChild(item);
    });
    setTarget();
  } 
  catch {

  }
});
