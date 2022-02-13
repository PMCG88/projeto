const header = document.querySelector(".header");

const headerIntersectionObserver = new IntersectionObserver((header) => {
  console.log(header);
});

headerIntersectionObserver.observe(header);
