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

counters.forEach((counter) => {
  const counterChildren = counter.children;
  const subtractButton = counterChildren[0];
  const counterInput = counterChildren[1];
  const addButton = counterChildren[2];

  checkInvalid(counterInput, addButton, subtractButton, minValue);

  subtractButton.addEventListener('click', () => {
    currentCount = parseInt(counterInput.value);
    counterInput.value = currentCount - 1;
    checkInvalid(counterInput, addButton, subtractButton, minValue);
  });

  addButton.addEventListener('click', () => {
    currentCount = parseInt(counterInput.value);
    counterInput.value = currentCount + 1;
    checkInvalid(counterInput, addButton, subtractButton, minValue);
  });

  counterInput.addEventListener('input', () => {
    checkInvalid(counterInput, addButton, subtractButton, minValue);
  });

  counterInput.addEventListener('change', () => {
    if (!counterInput.value) counterInput.value = 1;
    checkInvalid(counterInput, addButton, subtractButton, minValue);
  });
});
