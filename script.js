let cartItems = [];

// تحميل السلة من localStorage عند بدء الصفحة
window.onload = () => {
  const savedCart = localStorage.getItem('cartItems');
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    updateCart();
  }
};

function addToCart(name, price) {
  const existingItem = cartItems.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ name, price, quantity: 1 });
  }
  saveCart();
  updateCart();
  showMessage(`تمت إضافة ${name} إلى السلة`);
}

function removeFromCart(name) {
  cartItems = cartItems.filter(item => item.name !== name);
  saveCart();
  updateCart();
  showMessage(`تم حذف ${name} من السلة`);
}

function clearCart() {
  cartItems = [];
  saveCart();
  updateCart();
  showMessage("تم تفريغ السلة");
}

function saveCart() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalElement = document.getElementById("total-price");
  cartList.innerHTML = "";

  let total = 0;
  cartItems.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
      <span>${item.name} × ${item.quantity} = ${item.price * item.quantity} درهم</span>
      <button onclick="removeFromCart('${item.name}')">حذف</button>
    `;
    cartList.appendChild(itemElement);
    total += item.price * item.quantity;
  });

  totalElement.textContent = `المجموع: ${total} درهم`;
}

// الرسالة القصيرة تظهر وتختفي
function showMessage(text) {
  const messageElem = document.getElementById('message');
  messageElem.textContent = text;
  messageElem.style.display = 'block';

  setTimeout(() => {
    messageElem.style.display = 'none';
  }, 2000);
}

// البحث في المنتجات
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const products = document.querySelectorAll('.product');

searchInput.addEventListener('input', () => {
  const filter = searchInput.value.trim().toLowerCase();

  products.forEach(product => {
    const productName = product.querySelector('h3').textContent.toLowerCase();
    if (productName.includes(filter) || filter === "") {
      product.style.display = 'inline-block';
    } else {
      product.style.display = 'none';
    }
  });
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  products.forEach(product => {
    product.style.display = 'inline-block';
  });
});
