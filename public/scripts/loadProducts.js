const loader = document.querySelector('#loader');
const cards = document.querySelector('.cards');
const card = document.querySelector('.col');

let batch = 1;

loader.addEventListener('click', async () => {
  const res = await axios.get('/productsbatch?b=' + batch);
  batch++;

  for (let product of res.data.products) {
    let newCard = card.cloneNode(true);

    const a = newCard.querySelector('.card');
    const img = newCard.querySelector('.card-img');
    const name = newCard.querySelector('.card-title');
    const price = newCard.querySelector('.card-price');

    a.href = '/products/' + product._id;
    img.src = product.images[0];
    name.innerText = product.name;
    price.innerText = '฿' + product.price;

    cards.appendChild(newCard);
  }
});
