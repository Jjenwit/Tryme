const verticalSecondarySlider = new Splide('#vertical-secondary-slider', {
  height: 500,
  perPage: 5,
  gap: 10,
  cover: true,
  direction: 'ttb',
  isNavigation: true,
  focus: 'center',
  pagination: false,
  breakpoints: {
    992: {
      height: 350,
    },
  },
}).mount();

const verticalPrimarySlider = new Splide('#vertical-primary-slider', {
  type: 'fade',
  heightRatio: 1.3,
  pagination: false,
  cover: true,
  perPage: 1,
  perMove: 1,
});

verticalPrimarySlider.sync(verticalSecondarySlider).mount();

new Splide('#image-slider', {
  fixedWidth: 240,
  perMove: 2,
  rewind: true,
  pagination: false,
  cover: true,
  height: 240,
  gap: 10,
  breakpoints: {
    576: {
      fixedWidth: 150,
      height: 150,
    },
    768: {
      fixedWidth: 175,
      height: 175,
    },
    992: {
      fixedWidth: 200,
      height: 200,
    },
  },
}).mount();
