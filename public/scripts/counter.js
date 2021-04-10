const counter = document.querySelector('#counter-number');
const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');

const checkInvalid = (minValue) => {
  currentCount = parseInt(counter.value);

  if (currentCount <= minValue) {
    counter.value = minValue;
    subtract.setAttribute('disabled', '');
    return;
  }
  subtract.removeAttribute('disabled');
};

checkInvalid(1);

const addCounter = () => {
  currentCount = parseInt(counter.value);
  counter.value = currentCount + 1;
};

const subtractCounter = () => {
  currentCount = parseInt(counter.value);
  counter.value = currentCount - 1;
};

add.addEventListener('click', () => {
  addCounter();
  checkInvalid(1);
});

subtract.addEventListener('click', () => {
  subtractCounter();
  checkInvalid(1);
});

counter.addEventListener('input', () => {
  checkInvalid(1);
});

counter.addEventListener('change', () => {
  if (!currentCount) counter.value = 1;
  checkInvalid(1);
});
