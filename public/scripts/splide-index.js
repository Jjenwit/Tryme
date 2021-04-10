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

new Splide('#grid-slider', {
  type: 'loop',
  height: 350,
  perPage: 3,
  cover: true,
  perMove: 2,
  gap: 15,
  grid: {
    // You can define rows/cols instead of dimensions.
    dimensions: [
      [1, 1],
      [1, 1],
      [2, 2],
    ],
    gap: { col: 15 },
  },
  breakpoints: {
    576: {
      perPage: 2,
      height: 200,
      grid: {
        dimensions: [[1, 1]],
      },
    },
    768: {
      perPage: 2,
      height: 250,
      grid: {
        dimensions: [[1, 1]],
      },
    },
    992: {
      perPage: 2,
      height: 300,
      grid: {
        dimensions: [[1, 1]],
      },
    },
  },
}).mount(window.splide.Extensions);
