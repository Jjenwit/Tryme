new Splide('#image-slider', {
  fixedWidth: 240,
  rewind: true,
  pagination: false,
  cover: true,
  height: 240,
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
