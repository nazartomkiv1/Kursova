document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const productList = document.querySelectorAll('.product-item');
  const cartItems = document.getElementById('cart-items');
  const emptyCartMessage = document.getElementById('empty-cart');
  const productDescription = document.getElementById('product-description');
  const productImage = document.getElementById('product-image');
  const detailQuantity = document.getElementById('detail-quantity');
  const addToCartDetailButton = document.getElementById('add-to-cart-detail');
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const profileLink = document.getElementById('profile-link');
  const accountLink = document.getElementById('account-link');
  const adminLink = document.getElementById('admin-link');
  const profileName = document.getElementById('profile-name');
  const profileEmail = document.getElementById('profile-email');
  const orderList = document.getElementById('order-list');
  const userList = document.getElementById('user-list');
  const productContainer = document.getElementById('product-list');
  const productListAdmin = document.getElementById('product-list-admin');
  const orderListAdmin = document.getElementById('order-list-admin');
  const orderForm = document.getElementById('order-form');
  const orderConfirmationModal = document.getElementById('order-confirmation');
  const orderSuccessModal = document.getElementById('order-success');
  let currentProductId = null;
  let currentUser = JSON.parse(localStorage.getItem('user')) || null;

  const products = [
    {
      id: 1,
      name: "Цемент",
      description: "Високоякісний цемент для всіх видів будівництва.",
      image:
        "https://fenixcentr.lviv.ua/image/cache/catalog/obschestroj/m500-1000x1000.png",
      price: 100,
      category: "building",
    },
    {
      id: 2,
      name: "Цегла",
      description: "Міцна цегла для будівництва будівель і стін.",
      image: "https://starti.com.ua/images/img-350/1568283602_cat.png",
      price: 50,
      category: "building",
    },
    {
      id: 3,
      name: "Плитка",
      description: "Декоративна плитка для внутрішніх та зовнішніх робіт.",
      image:
        "https://stoffmark.com/wp-content/uploads/2021/08/x71a68a03-16ce-4206-9e5a-7b7f9e6396e6.png.pagespeed.ic.ITdmmkKSkb.png",
      price: 200,
      category: "finishing",
    },
    {
      id: 4,
      name: "Керамоблок",
      description: "Керамоблок для будівництва стін і перегородок.",
      image:
        "https://terracot.ua/storage/app/uploads/public/611/4dc/1ce/thumb_30316_420_315_0_0_auto.jpg",
      price: 300,
      category: "building",
    },
    {
      id: 5,
      name: "Пісок",
      description: "Якісний пісок для будівельних робіт.",
      image:
        "https://content.rozetka.com.ua/goods/images/original/244665644.jpg",
      price: 150,
      category: "building",
    },
    {
      id: 6,
      name: "Арматура",
      description: "Арматура для зміцнення бетонних конструкцій.",
      image:
        "https://metinvest-smc.com/uploads/images/categories-product-images/original/8ca9b75b88af1f736abaf4058d49f6c9.webp?v=1707155911",
      price: 500,
      category: "building",
    },
    {
      id: 7,
      name: "Дошки",
      description: "Будівельні дошки для різних видів робіт.",
      image:
        "https://budstroy.kiev.ua/wp-content/uploads/2015/09/5204aa6f9f112-doska-stroganaya.jpg",
      price: 120,
      category: "building",
    },
    {
      id: 8,
      name: "Гіпсокартон",
      description: "Гіпсокартон для внутрішнього оздоблення.",
      image:
        "https://angio.com.ua/assets/files/angio/reg_images/gipsokarton_stenovoj_3_1.jpg",
      price: 180,
      category: "finishing",
    },
    {
      id: 9,
      name: "Штукатурка",
      description: "Штукатурка для внутрішніх та зовнішніх робіт.",
      image: "https://eximbud.com/image/cache/catalog/category/hp%20start-600x600.jpg",
      price: 90,
      category: "finishing",
    },
    {
      id: 10,
      name: "Інструменти",
      description: "Інструменти для будівництва та ремонту.",
      image:
        "https://kk6shv0fp5cbe3fbe1mvtuwn6ubegs12.cdn-freehost.com.ua/wp-content/uploads/2022/07/HOSRA-34-1-550x550.jpg",
      price: 250,
      category: "tools",
    },
    {
      id: 11,
      name: "Цемент Преміум",
      description: "Цемент високої міцності для різних видів будівництва.",
      image:
        "https://images.prom.ua/4780043413_w640_h640_tsement-pts-i-500r-n-premium.jpg",
      price: 105,
      category: "building",
    },
    {
      id: 12,
      name: "Ламінат",
      description: "Сучасні ламінатні підлоги для вашого дому.",
      image: "https://images.prom.ua/5742763460_w640_h640_5742763460.jpg",
      price: 300,
      category: "finishing",
    },
    {
      id: 13,
      name: "Шпалери",
      description: "Якісні шпалери для внутрішніх робіт.",
      image:
        "https://stickerwall.com.ua/image/cache/catalog/YM%20sqr/oboi-21-01-2022/OS-YM%2008-0-800x800.png",
      price: 220,
      category: "finishing",
    },
    {
      id: 14,
      name: "Вапна",
      description: "Високоякісна вапна для будівельних робіт.",
      image: "https://www.budbox.com.ua/UserFiles/product/21.png",
      price: 85,
      category: "building",
    },
    {
      id: 15,
      name: "Труби",
      description: "Пластикові труби для водопостачання та каналізації.",
      image: "https://kievstroy.org/data/category/23350.png",
      price: 70,
      category: "building",
    },
    {
      id: 16,
      name: "Електроінструменти",
      description: "Електричні інструменти для професійних робіт.",
      image: "https://img.moyo.ua/img/categories/4921/4921_1473863135_22.jpg",
      price: 600,
      category: "tools",
    },
    {
      id: 17,
      name: "Клей",
      description: "Клей для плитки та інших матеріалів.",
      image:
        "https://images-shop.agromat.ua/188550/0418178001702631076-600.webp",
      price: 90,
      category: "finishing",
    },
    {
      id: 18,
      name: "Шпаклівка",
      description: "Шпаклівка для внутрішніх та зовнішніх робіт.",
      image:
        "https://www.budbox.com.ua/UserFiles/product/3D_shpakl_600-600x600.png",
      price: 100,
      category: "finishing",
    },
    {
      id: 19,
      name: "Пінопласт",
      description: "Пінопласт для утеплення будівель.",
      image:
        "https://citadelbuddekor.com.ua/image/cache/catalog/goods/pinoplast-greinplast-1000x1000.png",
      price: 150,
      category: "finishing",
    },
    {
      id: 20,
      name: "Керамічна плитка",
      description: "Керамічна плитка для підлоги та стін.",
      image: "https://novatorstroy.com/wa-data/public/blog/img/img-84.jpg",
      price: 250,
      category: "finishing",
    },
    {
      id: 21,
      name: "Цементний розчин",
      description: "Цементний розчин для будівельних робіт.",
      image:
        "https://img.kub.in.ua/data/products/6487/polimin-m150-rastvor-cementnyj-stroitelnyj-25-kg-2107-0.jpg",
      price: 110,
      category: "building",
    },
    {
      id: 22,
      name: "Мідні труби",
      description: "Мідні труби для водопостачання.",
      image:
        "https://teplotep.com.ua/wp-content/uploads/2018/12/91a526d3d9e55363a62d8fad846e4b2f.png",
      price: 200,
      category: "building",
    },
    {
      id: 23,
      name: "Будівельний розчин",
      description: "Будівельний розчин для кладки.",
      image: "https://budstore.com.ua/tovb-2995-4287.jpg",
      price: 90,
      category: "building",
    },
    {
      id: 24,
      name: "Фарба",
      description: "Фарба для внутрішніх та зовнішніх робіт.",
      image:
        "https://megatrade-sm.com.ua/uploads/images/articles/stroitelnaya-kraska1.jpg?1584434284700",
      price: 80,
      category: "finishing",
    },
    {
      id: 25,
      name: "Гідроізоляція",
      description: "Гідроізоляційні матеріали для будівель.",
      image:
        "https://images.prom.ua/1932991167_w640_h640_gidroizolyatsiya-na-fundament.jpg",
      price: 130,
      category: "building",
    },
    {
      id: 26,
      name: "Скотч",
      description: "Будівельний скотч для різних робіт.",
      image:
        "https://fenixcentr.kiev.ua/image/cache/catalog/instrumenty/rashodnye/147731333_images_15143660101-1000x1000.jpg",
      price: 50,
      category: "tools",
    },
    {
      id: 27,
      name: "Рукавиці",
      description: "Будівельні рукавиці для захисту рук.",
      image:
        "https://profservis.in.ua/uploads/shop/products/main/633ae5701feddddb99ef8b183e81753d.jpg",
      price: 20,
      category: "tools",
    },
    {
      id: 28,
      name: "Зварювальні матеріали",
      description: "Зварювальні матеріали для різних робіт.",
      image: "https://zvarka.info/wp-content/uploads/2022/01/1-7.jpg",
      price: 150,
      category: "tools",
    },
    {
      id: 29,
      name: "Клінкерна цегла",
      description: "Клінкерна цегла для облицювання.",
      image: "https://www.nl.ua/upload/iblock/adf/90133429_4.jpg",
      price: 200,
      category: "building",
    },
    {
      id: 30,
      name: "Шпаклівка фінішна",
      description: "Шпаклівка для підготовки стін до фарбування.",
      image:
        "https://forbud.com.ua/image/cache/catalog/photo/0/a-image-cache-catalog-D0-BA-D0-B0-D1-80-D1-82-D0-B8-D0-BD-D0-BA-D0-B8-Knauf-20HP-20Finish-2025-20-D0-BA-D0-B3-20-20111-500x500-800x800.jpg",
      price: 95,
      category: "finishing",
    },
  ];

  if (currentUser) {
    accountLink.classList.add('hidden');
    profileLink.classList.remove('hidden');
    if (currentUser.email === "admin@gmail.com" && currentUser.password === "root") {
      adminLink.classList.remove('hidden');
    }
    profileName.textContent = `Ім'я: ${currentUser.firstName} ${currentUser.lastName}`;
    profileEmail.textContent = `Емейл: ${currentUser.email}`;
    displayOrders();
  }

  function displayProducts(products) {
    productContainer.innerHTML = '';
    products.forEach(product => {
      if (!product.hidden) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.setAttribute('data-id', product.id);
        productDiv.setAttribute('data-description', product.description);
        productDiv.setAttribute('data-image', product.image);
        productDiv.setAttribute('data-price', product.price);
        productDiv.innerHTML = `
          <h3 class="product-name">${product.name}</h3>
          <img src="${product.image}" alt="${product.name}">
          <p>Ціна: ${product.price} грн</p>
          <input type="number" value="1" min="1" class="quantity">
          <button class="add-to-cart button-primary">Додати в кошик</button>
        `;
        productDiv.querySelector('.add-to-cart').addEventListener('click', (event) => {
          event.stopPropagation();
          const quantityInput = productDiv.querySelector('.quantity');
          const quantity = parseInt(quantityInput.value);
          addToCart(productDiv, quantity);
        });
        productDiv.querySelector('.product-name').addEventListener('click', () => {
          const description = productDiv.getAttribute('data-description');
          const image = productDiv.getAttribute('data-image');
          const price = productDiv.getAttribute('data-price');
          currentProductId = productDiv.getAttribute('data-id');
          productDescription.innerHTML = `<strong>${description}</strong><br>Ціна: ${price} грн`;
          productImage.src = image;
          detailQuantity.value = 1;
          showPage('product-details');
        });
        productContainer.appendChild(productDiv);
      }
    });
  }

  function sortProducts(category) {
    const sortedProducts = products.filter(product => product.category === category && !product.hidden);
    displayProducts(sortedProducts);
  }

  addToCartDetailButton.addEventListener('click', () => {
    const product = document.querySelector(`.product-item[data-id='${currentProductId}']`);
    if (product) {
      addToCart(product, parseInt(detailQuantity.value));
    }
  });

  function addToCart(product, quantity = 1) {
    const productId = product.getAttribute('data-id');
    const productName = product.querySelector('h3').innerText;
    const productPrice = parseFloat(product.querySelector('p').innerText.split(' ')[1]);

    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex > -1) {
      cart[cartItemIndex].quantity += quantity;
    } else {
      const cartItem = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: quantity
      };
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }

  function updateCart() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.price} грн x ${item.quantity}`;
      cartItems.appendChild(li);
    });

    if (cart.length > 0) {
      emptyCartMessage.style.display = 'none';
    } else {
      emptyCartMessage.style.display = 'block';
    }
  }

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!currentUser) {
      alert('Будь ласка, увійдіть у свій акаунт для оформлення замовлення.');
      return;
    }
    if (cart.length === 0) {
      alert('Ваш кошик порожній. Будь ласка, додайте товари до кошика.');
      return;
    }
    
    const name = document.getElementById('order-name').value;
    const phone = document.getElementById('order-phone').value;
    const address = document.getElementById('address').value;

    const order = {
      date: new Date().toLocaleString(),
      items: [...cart],
      address,
      name,
      phone
    };
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    cart.length = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    closeOrderConfirmation();
    showOrderSuccess();
    displayOrders();
  });

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const birthday = document.getElementById('birthday').value;

    const user = {
      firstName,
      lastName,
      phone,
      email,
      password,
      birthday
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(user));
    currentUser = user;
    alert('Реєстрація успішна! Ви увійшли в свій акаунт.');
    accountLink.classList.add('hidden');
    profileLink.classList.remove('hidden');
    profileName.textContent = `Ім'я: ${user.firstName} ${user.lastName}`;
    profileEmail.textContent = `Емейл: ${user.email}`;
    showPage('catalog');
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      alert(`Вітаємо, ${user.firstName}! Ви увійшли в свій акаунт.`);
      currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      accountLink.classList.add('hidden');
      profileLink.classList.remove('hidden');
      if (user.email === "admin@gmail.com" && user.password === "root") {
        adminLink.classList.remove('hidden');
      }
      profileName.textContent = `Ім'я: ${user.firstName} ${user.lastName}`;
      profileEmail.textContent = `Ем'ейл: ${user.email}`;
      showPage('catalog');
    } else {
      alert('Невірний емейл або пароль.');
    }
  });

  function displayOrders() {
    orderList.innerHTML = '';
    orders.forEach((order, index) => {
      const li = document.createElement('li');
      li.textContent = `Замовлення від ${order.date}`;
      const ul = document.createElement('ul');
      order.items.forEach(item => {
        const itemLi = document.createElement('li');
        itemLi.textContent = `${item.name} - ${item.price} грн x ${item.quantity}`;
        ul.appendChild(itemLi);
      });
      const addressLi = document.createElement('li');
      addressLi.textContent = `Адреса доставки: ${order.address}`;
      ul.appendChild(addressLi);

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Скасувати замовлення';
      cancelBtn.classList.add('button-danger');
      cancelBtn.onclick = () => {
        orders.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        displayOrders();
      };
      ul.appendChild(cancelBtn);

      li.appendChild(ul);
      orderList.appendChild(li);
    });
  }

  function displayUsers() {
    userList.innerHTML = '';
    users.forEach(user => {
      const userOrders = orders.filter(order => order.email === user.email);
      const li = document.createElement('li');
      li.innerHTML = `<strong>${user.firstName} ${user.lastName} - ${user.email}</strong>`;
      const ul = document.createElement('ul');
      userOrders.forEach(order => {
        const orderLi = document.createElement('li');
        orderLi.innerHTML = `Замовлення від ${order.date} - ${order.name} - ${order.phone} - ${order.address}`;
        const orderItemsUl = document.createElement('ul');
        order.items.forEach(item => {
          const itemLi = document.createElement('li');
          itemLi.textContent = `${item.name} - ${item.price} грн x ${item.quantity}`;
          orderItemsUl.appendChild(itemLi);
        });
        orderLi.appendChild(orderItemsUl);
        ul.appendChild(orderLi);
      });
      li.appendChild(ul);
      userList.appendChild(li);
    });
  }

  function displayAdminProducts() {
    productListAdmin.innerHTML = '';
    products.forEach(product => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${product.name} - ${product.price} грн</span>
        <input type="number" value="${product.price}" class="edit-price" data-id="${product.id}">
        <button class="button-secondary" onclick="updatePrice(${product.id})">Оновити ціну</button>
        <button class="button-danger" onclick="toggleProductVisibility(${product.id})">${product.hidden ? 'Показати' : 'Сховати'}</button>
      `;
      productListAdmin.appendChild(li);
    });
  }

  window.updatePrice = function(productId) {
    const input = document.querySelector(`.edit-price[data-id='${productId}']`);
    const newPrice = input.value;
    const product = products.find(p => p.id === productId);
    product.price = parseFloat(newPrice);
    displayProducts(products);
    displayAdminProducts();
  }

  window.toggleProductVisibility = function(productId) {
    const product = products.find(p => p.id === productId);
    product.hidden = !product.hidden;
    displayProducts(products);
    displayAdminProducts();
  }

  window.showPage = function(pageId) {
    document.querySelectorAll('main > section').forEach(section => {
      section.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
    if (pageId === 'profile') {
      displayOrders();
    }
    if (pageId === 'admin') {
      displayUsers();
      displayAdminProducts();
      displayAdminOrders();
    }
  };

  function displayAdminOrders() {
    orderListAdmin.innerHTML = '';
    orders.forEach((order, index) => {
      const li = document.createElement('li');
      li.textContent = `Замовлення від ${order.date} - ${order.name} - ${order.phone} - ${order.address}`;
      const ul = document.createElement('ul');
      order.items.forEach(item => {
        const itemLi = document.createElement('li');
        itemLi.textContent = `${item.name} - ${item.price} грн x ${item.quantity}`;
        ul.appendChild(itemLi);
      });
      li.appendChild(ul);
      orderListAdmin.appendChild(li);
    });
  }

  window.showOrderConfirmation = function() {
    if (!currentUser) {
      alert('Будь ласка, увійдіть у свій акаунт для оформлення замовлення.');
      return;
    }
    if (cart.length === 0) {
      alert('Ваш кошик порожній. Будь ласка, додайте товари до кошика.');
      return;
    }
    orderConfirmationModal.style.display = 'flex';
  };

  window.closeOrderConfirmation = function() {
    orderConfirmationModal.style.display = 'none';
  };

  window.showOrderSuccess = function() {
    orderSuccessModal.style.display = 'flex';
  };

  window.closeOrderSuccess = function() {
    orderSuccessModal.style.display = 'none';
    showPage('catalog');
  };

  window.logout = function() {
    currentUser = null;
    localStorage.removeItem('user');
    accountLink.classList.remove('hidden');
    profileLink.classList.add('hidden');
    adminLink.classList.add('hidden');
    showPage('catalog');
  };

  window.deleteAccount = function() {
    const confirmDelete = confirm('Ви впевнені, що хочете видалити свій акаунт? Ця дія не може бути скасована.');
    if (confirmDelete) {
      const userIndex = users.findIndex(u => u.email === currentUser.email);
      if (userIndex > -1) {
        users.splice(userIndex, 1);
        localStorage.setItem('users', JSON.stringify(users));
      }
      localStorage.removeItem('user');
      currentUser = null;
      orders.length = 0;
      accountLink.classList.remove('hidden');
      profileLink.classList.add('hidden');
      adminLink.classList.add('hidden');
      showPage('catalog');
      alert('Ваш акаунт було видалено.');
    }
  };

  displayProducts(products);
  updateCart();
});
