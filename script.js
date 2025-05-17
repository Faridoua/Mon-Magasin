// script.js

// تحميل السلة من localStorage أو إنشاء جديدة
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// دالة لإضافة منتج للسلة
function addToCart(name, price) {
  if (cart[name]) {
    cart[name].quantity += 1;
  } else {
    cart[name] = { price: price, quantity: 1 };
  }
  saveCart();
  showMessage(`تم إضافة ${name} إلى السلة`);
  renderCart();
}

// دالة لحفظ السلة في localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// دالة لعرض رسالة مؤقتة
function showMessage(msg) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = msg;
  setTimeout(() => {
    messageDiv.textContent = '';
  }, 3000);
}

// دالة لعرض محتويات السلة في الصفحة
function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  cartItemsDiv.innerHTML = '';

  let total = 0;
  for (const [name, info] of Object.entries(cart)) {
    const itemTotal = info.price * info.quantity;
    total += itemTotal;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <span>${name} - ${info.price} درهم × ${info.quantity} = ${itemTotal} درهم</span>
      <button onclick="removeFromCart('${name}')">✖</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  }

  document.getElementById('total-price').textContent = `المجموع: ${total} درهم`;
}

// دالة لإزالة منتج من السلة (كمية واحدة)
function removeFromCart(name) {
  if (!cart[name]) return;
  cart[name].quantity -= 1;
  if (cart[name].quantity <= 0) {
    delete cart[name];
  }
  saveCart();
  renderCart();
}

// دالة لتفريغ السلة كاملة
function clearCart() {
  cart = {};
  saveCart();
  renderCart();
  showMessage('تم تفريغ السلة');
}

// دالة للبحث عن المنتجات وعرضها فقط
function filterProducts() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    const title = product.querySelector('h3').textContent.toLowerCase();
    if (title.includes(input)) {
      product.style.display = '';
    } else {
      product.style.display = 'none';
    }
  });
}

// حدث الكتابة في مربع البحث
document.getElementById('searchInput').addEventListener('input', filterProducts);

// زر تفريغ البحث وإظهار جميع المنتجات
document.getElementById('clearSearch').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  filterProducts();
});

// عند تحميل الصفحة، عرض السلة إذا كانت محفوظة
window.onload = () => {
  renderCart();
  filterProducts();
};
