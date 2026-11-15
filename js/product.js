(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('[data-product-detail]');
    if (!root || !window.LP_PRODUCTS) return;
    const params = new URLSearchParams(location.search);
    const product = LP_PRODUCTS.find(p => p.id === params.get('id')) || LP_PRODUCTS[0];
    root.innerHTML = `<div class="lp-product-detail__gallery"><div class="lp-product-detail__main-image"><img data-product-main-image src="${product.image}" alt="${product.name}" width="960" height="1120"></div><div class="lp-product-detail__thumbs"><button class="is-active" type="button" data-product-image="${product.image}" aria-label="تصویر اول"><img src="${product.image}" alt="" width="120" height="140"></button><button type="button" data-product-image="${product.hoverImage}" aria-label="تصویر دوم"><img src="${product.hoverImage}" alt="" width="120" height="140"></button></div></div>
      <div class="lp-product-detail__copy"><span class="lp-eyebrow">${product.ageLabel} · مجموعه روزمره</span><h1>${product.name}</h1><p class="lp-product-detail__desc">${product.description}</p><div class="lp-product-detail__price">${LP_FORMAT_PRICE(product.price)} ${product.oldPrice ? `<del>${LP_FORMAT_PRICE(product.oldPrice)}</del>` : ''}</div><div class="lp-choice"><span class="lp-choice__label">رنگ: <strong data-selected-color>${product.color}</strong></span><div class="lp-swatches"><button type="button" class="is-active" aria-label="${product.color}" style="--swatch:${product.colorCode}" data-color-name="${product.color}"></button><button type="button" aria-label="سفید شیری" style="--swatch:#fffdf8" data-color-name="سفید شیری"></button><button type="button" aria-label="هلویی" style="--swatch:#f7cdb8" data-color-name="هلویی"></button></div></div><div class="lp-choice"><label class="lp-choice__label" for="lp-product-size">سایز را انتخاب کن</label><select id="lp-product-size" data-detail-size><option value="" selected disabled>انتخاب سایز</option>${product.sizes.map(s => `<option>${s}</option>`).join('')}</select><a href="size-guide.html" class="lp-size-link">راهنمای انتخاب سایز ↗</a></div><div class="lp-product-detail__buttons"><button type="button" class="lp-btn lp-btn--primary" data-detail-add>افزودن به سبد خرید</button><a href="contact.html" class="lp-btn lp-btn--soft">سوالی داری؟</a></div><div class="lp-product-detail__notes"><span>♡ انتخابی راحت برای هر روز</span><span>✳ جزئیات محصول در نسخه دمو</span></div></div>`;
    const mainImage = root.querySelector('[data-product-main-image]');
    root.querySelectorAll('[data-product-image]').forEach(btn => btn.addEventListener('click', () => {
      root.querySelectorAll('[data-product-image]').forEach(b => b.classList.toggle('is-active', b === btn));
      mainImage.src = btn.dataset.productImage;
    }));
    root.querySelectorAll('[data-color-name]').forEach(btn => btn.addEventListener('click', () => {
      root.querySelectorAll('[data-color-name]').forEach(b => b.classList.toggle('is-active', b === btn));
      root.querySelector('[data-selected-color]').textContent = btn.dataset.colorName;
      if (btn.dataset.colorName === 'سفید شیری') mainImage.src = product.hoverImage;
      if (btn.dataset.colorName === product.color || btn.dataset.colorName === 'هلویی') mainImage.src = product.image;
    }));
    root.querySelector('[data-detail-add]').addEventListener('click', () => {
      const size = root.querySelector('[data-detail-size]').value;
      if (!size) { LP_CART.announce('لطفاً ابتدا سایز را انتخاب کن.'); root.querySelector('[data-detail-size]').focus(); return; }
      LP_CART.add(product.id, size, 1);
    });
  });
})();
