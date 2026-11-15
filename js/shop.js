(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('[data-shop-grid]');
    if (!grid || !window.LP_PRODUCTS) return;
    const ageButtons = [...document.querySelectorAll('[data-age-filter]')];
    const category = document.querySelector('[data-category-filter]');
    const search = document.querySelector('[data-shop-search]');
    const sort = document.querySelector('[data-shop-sort]');
    const count = document.querySelector('[data-shop-count]');
    let activeAge = 'all';
    const params = new URLSearchParams(location.search);
    if (['baby', 'toddler', 'kid'].includes(params.get('age'))) {
      activeAge = params.get('age');
      ageButtons.forEach(btn => {
        const active = btn.dataset.ageFilter === activeAge;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
    }
    const card = (p) => `<article class="lp-product-card" data-product-card>
      <a class="lp-product-card__media" href="product.html?id=${encodeURIComponent(p.id)}" aria-label="مشاهده ${p.name}">
        <img class="lp-product-card__image lp-product-card__image--main" src="${p.image}" alt="${p.name}" width="720" height="850" loading="lazy">
        <img class="lp-product-card__image lp-product-card__image--hover" src="${p.hoverImage}" alt="" width="720" height="850" loading="lazy">
        <span class="lp-product-card__tag">${p.material}</span><span class="lp-product-card__quick">دیدن محصول ↗</span>
      </a>
      <div class="lp-product-card__meta"><div><span class="lp-product-card__age">${p.ageLabel}</span><h3><a href="product.html?id=${encodeURIComponent(p.id)}">${p.name}</a></h3><span class="lp-product-card__color"><i style="--swatch:${p.colorCode}"></i>${p.color}</span></div><strong>${LP_FORMAT_PRICE(p.price)}</strong></div>
      <div class="lp-product-card__actions"><select data-card-size aria-label="انتخاب سایز ${p.name}"><option value="" selected disabled>انتخاب سایز</option>${p.sizes.map(s => `<option>${s}</option>`).join('')}</select><button type="button" class="lp-icon-button lp-icon-button--add" data-add-cart="${p.id}" aria-label="افزودن ${p.name} به سبد">+</button></div>
    </article>`;
    const update = () => {
      let items = [...LP_PRODUCTS];
      if (activeAge !== 'all') items = items.filter(p => p.age === activeAge);
      if (category?.value && category.value !== 'all') items = items.filter(p => p.category === category.value);
      const q = (search?.value || '').trim().toLocaleLowerCase('fa');
      if (q) items = items.filter(p => p.name.toLocaleLowerCase('fa').includes(q) || p.color.toLocaleLowerCase('fa').includes(q));
      if (sort?.value === 'low') items.sort((a,b) => a.price - b.price);
      if (sort?.value === 'high') items.sort((a,b) => b.price - a.price);
      if (sort?.value === 'name') items.sort((a,b) => a.name.localeCompare(b.name, 'fa'));
      grid.innerHTML = items.length ? items.map(card).join('') : `<div class="lp-empty lp-empty--grid"><span class="lp-empty__icon">⌕</span><h2>محصولی پیدا نشد</h2><p>فیلترها را تغییر بده و دوباره امتحان کن.</p></div>`;
      if (count) count.textContent = `${new Intl.NumberFormat('fa-IR').format(items.length)} محصول`;
    };
    ageButtons.forEach(btn => btn.addEventListener('click', () => {
      ageButtons.forEach(b => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-pressed', String(b === btn)); });
      activeAge = btn.dataset.ageFilter; update();
    }));
    [category, search, sort].forEach(el => el?.addEventListener(el === search ? 'input' : 'change', update));
    update();
  });
})();
