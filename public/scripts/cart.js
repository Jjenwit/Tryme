const cartItems = document.querySelectorAll('.cart-item');
const cartTotal = document.querySelector('#cart-total');

//
const updateTotalPrice = () => {
  let total = 0;
  cartItems.forEach((item) => {
    const priceText = item.querySelector('.price');

    total += parseInt(priceText.innerText.substring(1));
  });
  cartTotal.innerText = '฿' + total;
};
//

//
const cartLink = document.querySelector('.cart-link');
cartLink.classList.add('d-none');
//

//
const minValue = 1;

const checkInvalid = (counterInput, addButton, subtractButton, minValue) => {
  currentCount = parseInt(counterInput.value);

  if (currentCount <= minValue) {
    counterInput.value = minValue;
    subtractButton.setAttribute('disabled', '');
    return;
  }
  subtractButton.removeAttribute('disabled');
};

const updateSession = async (id, size, qty) => {
  await axios.patch('/cart', { id, size, qty });
};

const updatePrice = (priceText, counterInput, price) => {
  priceText.innerText = '฿' + counterInput.value * price;
};

cartItems.forEach((item) => {
  const priceText = item.querySelector('.price');
  const counterChildren = item.querySelector('.counter').children;
  const subtractButton = counterChildren[0];
  const counterInput = counterChildren[1];
  const addButton = counterChildren[2];
  const [id, size, price] = item.id.split(',');

  checkInvalid(counterInput, addButton, subtractButton, minValue);

  subtractButton.addEventListener('click', async () => {
    currentCount = parseInt(counterInput.value);
    counterInput.value = currentCount - 1;
    checkInvalid(counterInput, addButton, subtractButton, minValue);
    updatePrice(priceText, counterInput, price);
    updateTotalPrice();
    await updateSession(id, size, counterInput.value);
  });

  addButton.addEventListener('click', async () => {
    currentCount = parseInt(counterInput.value);
    counterInput.value = currentCount + 1;
    checkInvalid(counterInput, addButton, subtractButton, minValue);
    updatePrice(priceText, counterInput, price);
    updateTotalPrice();
    await updateSession(id, size, counterInput.value);
  });

  counterInput.addEventListener('input', async () => {
    checkInvalid(counterInput, addButton, subtractButton, minValue);
  });

  counterInput.addEventListener('change', async () => {
    if (!counterInput.value) counterInput.value = 1;
    checkInvalid(counterInput, addButton, subtractButton, minValue);
    updatePrice(priceText, counterInput, price);
    updateTotalPrice();
    await updateSession(id, size, counterInput.value);
  });
});
//

updateTotalPrice();
