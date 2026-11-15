(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('[data-size-form]');
    if (!form) return;
    const result = form.querySelector('[data-size-result]');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const normalizeDigits = value => String(value).replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).replace(/[٫،]/g, '.').replace(/,/g, '.');
      const age = Number(normalizeDigits(form.elements.age.value));
      const height = Number(normalizeDigits(form.elements.height.value));
      if (!Number.isFinite(age) || !Number.isFinite(height) || age < 0 || age > 8 || height < 45 || height > 150) {
        result.textContent = 'لطفاً سن بین صفر تا ۸ سال و قد بین ۴۵ تا ۱۵۰ سانتی‌متر وارد کن.';
        result.classList.add('is-visible'); return;
      }
      let recommendation;
      if (height <= 68) recommendation = '۰ تا ۳ ماه';
      else if (height <= 74) recommendation = '۳ تا ۶ ماه';
      else if (height <= 80) recommendation = '۶ تا ۱۲ ماه';
      else if (height <= 92) recommendation = 'سایز ۸۰ تا ۹۰';
      else if (height <= 104) recommendation = 'سایز ۹۰ تا ۱۰۰';
      else if (height <= 116) recommendation = 'سایز ۱۱۰';
      else if (height <= 128) recommendation = 'سایز ۱۲۰';
      else recommendation = 'سایز ۱۳۰';
      const ageText = age < 1 ? 'زیر یک سال' : `${Math.floor(age)} سال`;
      result.innerHTML = `<strong>پیشنهاد اولیه: ${recommendation}</strong><span>برای کودک ${ageText} با قد ${height} سانتی‌متر محاسبه شد. قد مبنای اصلی این پیشنهاد است؛ اگر سن و قد با جدول محصول هم‌خوانی ندارند، اندازه‌گیری را دوباره بررسی کن. این راهنما نمونه است و جایگزین جدول تولیدکننده نیست.</span>`;
      result.classList.add('is-visible');
    });
  });
})();
