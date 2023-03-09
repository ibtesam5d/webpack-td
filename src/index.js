import "./styles/main.scss";
import dino1 from "./assets/dino1.png";
import dino2 from "./assets/dino2.png";
import machine from "./assets/machine.png";
import neon1 from "./assets/neon1.png";
import neon2 from "./assets/neon2.png";
import retro from "./assets/retro.png";

const navBtn = document.querySelector(".nav__buttons");
const menuBtn = document.querySelector("#menu");
const closeBtn = document.querySelector("#close");
const navLinks = document.querySelector(".nav__links");

// Nav Button toggle
navBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("hidden");
  closeBtn.classList.toggle("hidden");
  navLinks.classList.toggle("show");
});
// nav links toggle on link click
navLinks.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  closeBtn.classList.toggle("hidden");
  menuBtn.classList.toggle("hidden");
});

// Data

const data = [
  {
    id: 0,
    img: dino1,
    title: "Dino Mech 1",
    price: 70,
    category: "Dino",
  },
  {
    id: 1,
    img: dino2,
    title: "Dino Mech 2",
    price: 70,
    category: "Dino",
  },
  {
    id: 2,
    img: neon1,
    title: "Neon Pathway 1",
    price: 100,
    category: "Neon",
  },
  {
    id: 3,
    img: neon2,
    title: "Neon Pathway 2",
    price: 100,
    category: "Neon",
  },
  {
    id: 4,
    img: machine,
    title: "Machine World",
    price: 80,
    category: "Machine",
  },
  {
    id: 5,
    img: retro,
    title: "Retro Future",
    price: 90,
    category: "Retro",
  },
];

// Product

const productsRight = document.querySelector(".products__right");

const search = document.querySelector(".search");
const categories = document.querySelector(".categories");

const priceRange = document.querySelector(".price__input");

const priceValue = document.querySelector(".price__value");

// displaying products
const displayProducts = (filteredProducts) => {
  productsRight.setHTML(
    filteredProducts
      .map((product) => {
        return `<div class="product">
        <div class="img-container">
          <img id="img" src=${product.img} alt=${product.title} />
        </div>

        <p>${product.title}</p>
        <p>Price: $${product.price}</p>
      </div>`;
      })
      .join("")
  );
};

displayProducts(data);

search.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();

  if (value) {
    const filteredData = data.filter(
      (item) => item.title.toLowerCase().indexOf(value) !== -1
    );

    displayProducts(filteredData);
  } else {
    displayProducts(data);
  }
});

// displaying categories

const displayCategories = () => {
  const allCategories = data.map((item) => item.category);
  console.log(allCategories);

  const uniqueCategory = allCategories.filter((item, i) => {
    return allCategories.indexOf(item) === i;
  });

  const finalCatOutput = ["All", ...uniqueCategory];
  console.log(finalCatOutput);

  categories.setHTML(
    finalCatOutput
      .map((item) => `<span class="category">${item}</span>`)
      .join("")
  );

  // each category element

  categories.addEventListener("click", (e) => {
    const selectedCat = e.target.textContent;
    const filteredCat = data.filter((item) => item.category === selectedCat);

    selectedCat === "All"
      ? displayProducts(data)
      : displayProducts(filteredCat);
  });
};

displayCategories();

// price range input
const setPrice = () => {
  const prices = data.map((item) => item.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;

  priceValue.textContent = "$" + priceRange.value;

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = "$" + e.target.value;
    displayProducts(data.filter((item) => item.price <= e.target.value));
  });
};

setPrice();
