const imageArea = document.querySelector('.imageArea');

function createLinkElement(element, className, link) {
  const e = document.createElement(element);
  e.className = className;
  e.href = link;
  return e;
};

function createCustomElement(element, className, type) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = type;
  return e;
};

const settingImages = ({ image, link, alt, user, like, comments, createdDate }) => {
  const date = (createdDate[8] + createdDate[9] + '/' + createdDate[5] + createdDate[6] + '/' +
  createdDate[0] + createdDate[1] + createdDate[2] + createdDate[3] + ' ' + createdDate[11] +
  createdDate[12] + createdDate[13] + createdDate[14] + createdDate[15]);
  const linking = createLinkElement('a', 'linking', link);
  const div = document.createElement('div');
  linking.appendChild(div);
  linking.style.backgroundImage = `url(${image})`;
  div.className = 'photoDiv';
  linking.className = 'item';
  const lastImage = linking.lastChild;
  lastImage.appendChild(createCustomElement('i', 'fas fa-at', user));
  lastImage.appendChild(document.createElement('br'));
  lastImage.appendChild(createCustomElement('i', 'fas fa-heart', like));
  lastImage.appendChild(document.createElement('br'));
  lastImage.appendChild(createCustomElement('i', 'fas fa-comment', comments));
  lastImage.appendChild(document.createElement('br'));
  lastImage.appendChild(createCustomElement('i', 'fas fa-calendar-alt', date));
  return linking;
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
    const loader = document.querySelector('.loader');
    const loading = document.querySelector('.loading');
    loading.remove();
    loader.remove();
    jsonData.forEach((photo) => {
      const images = {
        image: photo.imagens.thumbnail.url,
        link: photo.link,
        alt: photo.legenda,
        user:photo.usuario.username,
        like:photo.upvotes,
        comments:photo.comentarios,
        createdDate:photo.criadoEm,
      };
      const item = settingImages(images);
      imageArea.appendChild(item);
    });
    setTarget();
    show();
    hide();
  } 
  catch (e) {
    console.error('outer', e.message);
  }
});

function show(){
const selection = document.querySelectorAll('.photoDiv');
selection.forEach((element) => element.addEventListener('mouseover', (event) => {
  const text = event.target.querySelectorAll('i' || 'p');
  text.forEach((textItem) => { textItem.style.visibility = 'visible'});
}));
}

function hide(){
  const selection = document.querySelectorAll('.photoDiv');
selection.forEach((element) => element.addEventListener('mouseleave', (event) => {
  const text = event.target.querySelectorAll('i' || 'p');
  text.forEach((textItem) => { textItem.style.visibility = 'hidden'});
}));
};
