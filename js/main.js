// const header = document.querySelector(".header");
// const logo = document.querySelector(".header__logo");
// const images = document.querySelectorAll(".header__img");
// const nav = document.querySelector(".header__nav");

// const headerIntersectionObserver = new IntersectionObserver((header) => {
//   header.forEach((header) => {
//     if (header.isIntersecting === false) {
//       header.target.classList.add("header--stick", "header--transparent");
//       nav.classList.add("header__nav--hide");
//       logo.classList.add("header__logo--small");
//       images.forEach((image) => {
//         image.classList.toggle("header__img--hide");
//       });
//     }
//     console.log(header);
//   });
// });

// headerIntersectionObserver.observe(header);

// &__header
// &--stick {
//   position: fixed;
//   top: 0;
//   width: 100%;
//   z-index: 100;
// }
// &--transparent {
//   background-color: transparentize($color: #1d2033, $amount: 0.5%);
//   border-bottom: 0.1px solid
//     transparentize($color: variables.$color-dot, $amount: 0.8%);
// }

// &__nav
// &--hide {
//   display: none;
// }

// &__logo
// &--small {
//   width: 2rem;
//   margin: 0.0625rem;
// }

// &__img {
//   &--hide {
//     display: none;
//   }
// }
// }

/* <img
  class="header__img header__img--hide"
  src="img/svg/bmw grey small.svg"
  alt="BMW New Logo Grey"
/>; */
