// Carrinho de compras
let cart = [];
let cartCount = 0;

// Elementos do DOM
const cartCountElement = document.querySelector(".cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const contactForm = document.getElementById("contact-form");

// Atualizar contador do carrinho
function updateCartCount() {
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

// Adicionar produto ao carrinho
if (addToCartButtons.length > 0) {
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");
      const productName = productCard.querySelector("h3").textContent;
      const productPrice = productCard.querySelector(".price").textContent;

      cart.push({
        name: productName,
        price: productPrice,
      });

      cartCount++;
      updateCartCount();

      // Feedback visual
      button.textContent = "Adicionado!";
      button.style.backgroundColor = "#4CAF50";

      setTimeout(() => {
        button.textContent = "Adicionar ao Carrinho";
        button.style.backgroundColor = "#6F4E37";
      }, 2000);
    });
  });
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const formObject = Object.fromEntries(formData);

  console.log("Dados do formulário:", formObject);

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.textContent = "Mensagem Enviada!";
  submitButton.style.backgroundColor = "#4CAF50";

  setTimeout(() => {
    contactForm.submit(); // 🔥 Envia o formulário para o FormSubmit
    submitButton.textContent = "Enviar";
    submitButton.style.backgroundColor = "#6F4E37";
    
    // Redirecionar para a home após envio
    window.location.href = "https://ivansallas.github.io/PageCafe/";
  }, 1000);
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animação de fade-in para elementos quando aparecem na tela
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Aplicar animação aos elementos
document
  .querySelectorAll(".product-card, .about-content, .contact")
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
    observer.observe(element);
  });
