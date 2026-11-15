(() => {
  const CART_KEY = 'lp-demo-cart-v1';
  const readCart = () => {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
    catch { return []; }
  };
  const writeCart = (cart) => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
    catch { announce('ذخیره‌سازی در این مرورگر در دسترس نیست.'); }
    updateCartCount();
  };
  const announce = (message) => {
    let live = document.querySelector('.lp-live');
    if (!live) {
      live = document.createElement('div');
      live.className = 'lp-live'; live.setAttribute('aria-live', 'polite'); live.setAttribute('role', 'status');
      document.body.appendChild(live);
    }
    live.textContent = message;
    live.classList.add('is-visible');
    window.clearTimeout(announce.timer);
    announce.timer = window.setTimeout(() => live.classList.remove('is-visible'), 2600);
  };
  const updateCartCount = () => {
    const count = readCart().reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = new Intl.NumberFormat('fa-IR').format(count); });
  };
  const addToCart = (id, size, qty = 1) => {
    const product = (window.LP_PRODUCTS || []).find(p => p.id === id);
    if (!product) return;
    const cart = readCart();
    const existing = cart.find(item => item.id === id && item.size === size);
    if (existing) existing.qty += qty;
    else cart.push({ id, size, qty });
    writeCart(cart);
    announce(`${product.name} به سبد خرید اضافه شد.`);
  };

  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    const menuButton = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    const closeMenu = () => {
      if (!menu || !menuButton) return;
      menu.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };
    if (menuButton && menu) {
      menuButton.addEventListener('click', () => {
        const open = menu.classList.toggle('is-open');
        menuButton.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('menu-open', open);
      });
      menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
      document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
      });
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    }

    document.addEventListener('click', (event) => {
      const add = event.target.closest('[data-add-cart]');
      if (add) {
        const card = add.closest('[data-product-card]');
        const sizeControl = card?.querySelector('[data-card-size]');
        if (sizeControl && !sizeControl.value) {
          announce('برای افزودن محصول، ابتدا سایز را انتخاب کن.');
          sizeControl.focus();
          return;
        }
        const size = sizeControl?.value || add.dataset.size || 'سایز انتخاب‌نشده';
        addToCart(add.dataset.addCart, size, 1);
      }
    });

    const cartRoot = document.querySelector('[data-cart-root]');
    if (cartRoot) renderCart(cartRoot);

    document.querySelectorAll('[data-demo-form]').forEach(form => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const output = form.querySelector('[data-form-message]');
        if (output) output.textContent = 'اطلاعات فرم بررسی شد. این نسخه نمایشی است و اطلاعات به سرور ارسال نشده‌اند.';
        form.reset();
      });
    });
  });

  function renderCart(root) {
    const cart = readCart();
    const products = window.LP_PRODUCTS || [];
    if (!root.dataset.eventsBound) {
      root.dataset.eventsBound = 'true';
      root.addEventListener('click', (event) => {
        if (event.target.closest('[data-clear-cart]')) {
          writeCart([]);
          renderCart(root);
          return;
        }
        const row = event.target.closest('[data-cart-row]');
        if (!row) return;
        const id = row.dataset.id;
        const size = row.dataset.size;
        const current = readCart();
        const item = current.find(x => x.id === id && x.size === size);
        if (!item) return;
        if (event.target.closest('[data-qty-minus]')) item.qty = Math.max(1, item.qty - 1);
        else if (event.target.closest('[data-qty-plus]')) item.qty += 1;
        else if (event.target.closest('[data-remove-item]')) current.splice(current.indexOf(item), 1);
        else return;
        writeCart(current);
        renderCart(root);
      });
    }
    if (!cart.length) {
      root.innerHTML = `<div class="lp-empty"><span class="lp-empty__icon" aria-hidden="true">♡</span><h2>سبد خریدت هنوز خالی است</h2><p>چند تکه‌ی نرم و دوست‌داشتنی منتظر کوچولوی تو هستند.</p><a class="lp-btn lp-btn--primary" href="shop.html">دیدن محصولات</a></div>`;
      return;
    }
    const rows = cart.map(item => {
      const p = products.find(product => product.id === item.id);
      if (!p) return '';
      return `<article class="lp-cart-row" data-cart-row data-id="${p.id}" data-size="${item.size}">
        <img src="${p.image}" alt="${p.name}" width="104" height="124" loading="lazy">
        <div class="lp-cart-row__info"><h3>${p.name}</h3><p>سایز: ${item.size}</p><strong>${LP_FORMAT_PRICE(p.price)}</strong></div>
        <div class="lp-qty" aria-label="تعداد محصول"><button type="button" data-qty-minus aria-label="کم کردن تعداد">−</button><span>${new Intl.NumberFormat('fa-IR').format(item.qty)}</span><button type="button" data-qty-plus aria-label="زیاد کردن تعداد">+</button></div>
        <button class="lp-remove" type="button" data-remove-item aria-label="حذف ${p.name}">حذف</button>
      </article>`;
    }).join('');
    const total = cart.reduce((sum, item) => { const p = products.find(product => product.id === item.id); return sum + (p ? p.price * item.qty : 0); }, 0);
    root.innerHTML = `<div class="lp-cart-layout"><div class="lp-cart-items">${rows}</div><aside class="lp-cart-summary"><span class="lp-eyebrow">خلاصه سفارش · دمو</span><h2>جمع سبد خرید</h2><div class="lp-summary-line"><span>جمع محصولات</span><strong>${LP_FORMAT_PRICE(total)}</strong></div><div class="lp-summary-line"><span>هزینه ارسال</span><span>در مرحله بعد</span></div><div class="lp-summary-line lp-summary-line--total"><span>مجموع نمونه</span><strong>${LP_FORMAT_PRICE(total)}</strong></div><p>قیمت‌ها و هزینه‌ها صرفاً نمایشی هستند؛ پرداخت واقعی فعال نیست.</p><a class="lp-btn lp-btn--primary lp-btn--wide" href="contact.html">ثبت درخواست خرید دمو</a><button class="lp-text-button" type="button" data-clear-cart>خالی کردن سبد</button></aside></div>`;
  }

  window.LP_CART = { add: addToCart, read: readCart, write: writeCart, announce };
})();
