// document.querySelectorAll(".icon-container").forEach(container => {
// container.addEventListener("click", () => {
//     const dropdown = container.querySelector(".dropdown");
//     dropdown.style.display = dropdown.style.display === "block" ? "none" : " block";

// });    

// });

// ================== Mobile hamburger toggle ==================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});

// Close mobile menu when clicking a link
document.querySelectorAll("#mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
  });
});


// greeting message

const messages ="Welcome to M&M ";
    
let i =0;
const speed =120;

function typeWriter()
{
   if (i < messages.length){
    document.getElementById("typewriter").textContent += messages.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
   }

    
}

typeWriter();

// Banner slider

const slides = document.querySelectorAll(".banner-slide");
const bannerContainer = document.querySelector(".banner-container");
const progressBar = document.getElementById("progress-bar");

let currentSlide = 0;
const totalSlides = slides.length;
const slideInterval = 5000;



function showSlides(index) {
  bannerContainer.style.transform = `translateX(-${index * 100}%)`;
  resetProgressBar();

}

function resetProgressBar() {
  progressBar.style.transition = "none";
  progressBar.style.width = "0";
  setTimeout(() => {
    progressBar.style.transition = `width ${slideInterval}ms linear`;
    progressBar.style.width = "100%"
  },50);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlides(currentSlide);

}

setInterval(nextSlide, slideInterval);

showSlides(currentSlide);


// deal of the day time countdown

function startCountdown(hours) {
  let endTime = new Date().getTime() + hours * 60 * 60 * 1000;

  setInterval(() => {
    let now = new Date().getTime();
    let distance = endTime - now;

    if (distance < 0) {
      document.getElementById("countdown").innerHTML = "Expired";
      return;
    }

    let h = Math.floor(distance / (1000 * 60 * 60));
    let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
      `Ends in ${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;

  }, 1000);
}

startCountdown(6);

// newsletter form submit (demo only)

document.querySelector(".newsletter-form").addEventListener("submit", function(e){
  e.preventDefault();

  const nameInput = this.querySelector("input[name='name']");
  const emailInput = this.querySelector("input[name='email']");

  if (nameInput.value.trim() !== "" && emailInput.value.trim() !== ""){
  alert("Thank you for subscribing!");
  nameInput.value = "";
  emailInput.value = ""; 
  }
});


// medicines page

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("disclaimer-popup");
  const uploadSection = document.getElementById("upload-section");
  const medicineContent = document.getElementById("medicine-content");

  // Button: I Have Prescription
  document.getElementById("prescription-btn").addEventListener("click", () => {
    popup.style.display = "none";
    uploadSection.style.display = "block"; // Show upload form
  });

  // Button: Suggest me a nearest hospital
  document.getElementById("hospital-btn").addEventListener("click", () => {
    alert("We will suggest nearest hospitals soon. For now, please search in Google Maps.");
  });

  // Upload Submit
  document.getElementById("upload-submit").addEventListener("click", () => {
    const fileInput = document.getElementById("prescription-file");
    if (fileInput.files.length === 0) {
      alert("Please upload a prescription file first!");
      return;
    }

    // For now, just simulate upload success
    uploadSection.style.display = "none";
    medicineContent.style.display = "block"; // Show medicine categories
    alert("Prescription uploaded successfully! Now you can browse medicines.");
  });
});


// for loading animation

window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");

  // Wait a bit to let the bounce play
  setTimeout(() => {
    loader.classList.add("slide-out");

    // After sliding animation ends, remove loader
    loader.addEventListener("animationend", () => {
      loader.style.display = "none";
    });
  }, 2000); // adjust bounce duration before sliding out
});

if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
}

// Add to Cart Function
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists by name
    let existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Update Cart Count + Total Price
function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById("cart-count").innerText = totalItems;
    document.getElementById("cart-total").innerText = totalPrice;
}

document.querySelectorAll(".cart-btn").forEach(button => {
    button.addEventListener("click", () => {
        let product = {
            name: button.dataset.name,
            price: parseInt(button.dataset.price),
            img: button.dataset.img
        };
        addToCart(product);
    });
});

// Load cart UI when page loads
document.addEventListener("DOMContentLoaded", updateCartUI);


// cart icon click

// Toggle dropdown on click
document.querySelectorAll('.icon-container').forEach(icon => {
    icon.addEventListener('click', () => {
        icon.classList.toggle('active');
    });
});

// Optional: close dropdown if clicked outside
document.addEventListener('click', (e) => {
    document.querySelectorAll('.icon-container').forEach(icon => {
        if (!icon.contains(e.target)) {
            icon.classList.remove('active');
        }
    });
});
