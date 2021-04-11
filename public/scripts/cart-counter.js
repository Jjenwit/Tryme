const counters = document.querySelectorAll('.counter');

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

counters.forEach((counter) => {
  const counterChildren = counter.children;
  const subtractButton = counterChildren[0];
  const counterInput = counterChildren[1];
  const addButton = counterChildren[2];
  const [id, size] = counter.id.split(',');

  checkInvalid(counterInput, addButton, subtractButton, minValue);

  subtractButton.addEventListener('click', async () => {
    currentCount = parseInt(counterInput.value);
    counterInput.value = currentCount - 1;
    checkInvalid(counterInput, addButton, subtractButton, minValue);
    await updateSession(id, size, counterInput.value);
  });

  addButton.addEventListener('click', async () => {
    currentCount = parseInt(counterInput.value);
    counterInput.value = currentCount + 1;
    checkInvalid(counterInput, addButton, subtractButton, minValue);
    await updateSession(id, size, counterInput.value);
  });

  counterInput.addEventListener('input', async () => {
    checkInvalid(counterInput, addButton, subtractButton, minValue);
  });

  counterInput.addEventListener('change', async () => {
    if (!counterInput.value) counterInput.value = 1;
    checkInvalid(counterInput, addButton, subtractButton, minValue);
    await updateSession(id, size, counterInput.value);
  });
});
