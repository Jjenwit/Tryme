const filesInput = document.querySelector('#files');
const images = document.querySelector('#images');

filesInput.addEventListener('change', (e) => {
  images.textContent = '';

  for (let i = 0; i < e.target.files.length; i++) {
    const image = document.createElement('img');
    image.src = URL.createObjectURL(e.target.files[i]);
    image.classList.add('w-100');

    const imageCard = document.createElement('div');
    imageCard.classList.add('col', 'mb-3');
    imageCard.appendChild(image);
    images.appendChild(imageCard);
  }
});
