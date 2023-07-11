const swiper = new Swiper('.swiper', {

  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }, 

  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
});