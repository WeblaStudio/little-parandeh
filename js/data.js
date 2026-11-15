/* Little Parandeh — demonstration catalogue. All product facts and prices are sample data. */
window.LP_PRODUCTS = [
  {
    id: 'lp-101', name: 'ست بلوز و شلوار پنبه‌ای', category: 'sets', age: 'baby', ageLabel: 'نوزاد تا ۱۲ ماه', price: 890000, oldPrice: 1090000,
    color: 'آبی مه‌آلود', colorCode: '#bfddf0', material: 'پنبه ۱۰۰٪ (نمونه)', sizes: ['۰-۳ ماه', '۳-۶ ماه', '۶-۹ ماه', '۹-۱۲ ماه'],
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=85',
    description: 'یک ست سبک و راحت برای روزهای پرجنب‌وجوش کوچولوها؛ با برشی آزاد و لمس لطیف.'
  },
  {
    id: 'lp-102', name: 'پیراهن روزهای آفتابی', category: 'dresses', age: 'toddler', ageLabel: '۱ تا ۳ سال', price: 760000, oldPrice: null,
    color: 'هلویی ملایم', colorCode: '#f7cdb8', material: 'ترکیب پنبه و لینن (نمونه)', sizes: ['۸۰', '۹۰', '۱۰۰'],
    image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=1000&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=85',
    description: 'پیراهنی سبک با جزئیات ساده و دوست‌داشتنی؛ مناسب بازی، مهمانی و کشف دنیا.'
  },
  {
    id: 'lp-103', name: 'هودی نرم ابر کوچولو', category: 'tops', age: 'kid', ageLabel: '۴ تا ۸ سال', price: 940000, oldPrice: null,
    color: 'زرد کره‌ای', colorCode: '#f6dfa0', material: 'دورس پنبه‌ای (نمونه)', sizes: ['۱۱۰', '۱۲۰', '۱۳۰'],
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=85',
    description: 'گرمای سبک برای روزهای خنک؛ با کلاه نرم و آزادی حرکت برای بازی بی‌وقفه.'
  },
  {
    id: 'lp-104', name: 'رامپر خال‌خالی', category: 'onesies', age: 'baby', ageLabel: 'نوزاد تا ۱۲ ماه', price: 640000, oldPrice: 790000,
    color: 'سفید شیری', colorCode: '#fffdf8', material: 'پنبه ارگانیک (نمونه)', sizes: ['۰-۳ ماه', '۳-۶ ماه', '۶-۹ ماه'],
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=85',
    description: 'رامپری راحت و ساده برای آغوش، خواب و اولین ماجراجویی‌ها.'
  },
  {
    id: 'lp-105', name: 'شلوار راحتی بازیگوش', category: 'bottoms', age: 'toddler', ageLabel: '۱ تا ۳ سال', price: 520000, oldPrice: null,
    color: 'آبی آسمانی', colorCode: '#bfddf0', material: 'پنبه لطیف (نمونه)', sizes: ['۸۰', '۹۰', '۱۰۰'],
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=1000&q=85',
    description: 'کمر نرم و برش راحت تا دویدن، نشستن و بازی کردن آسان‌تر شود.'
  },
  {
    id: 'lp-106', name: 'ژاکت بافت دانه‌برفی', category: 'tops', age: 'kid', ageLabel: '۴ تا ۸ سال', price: 1180000, oldPrice: null,
    color: 'کرم گرم', colorCode: '#e9dfd0', material: 'بافت پنبه‌ای (نمونه)', sizes: ['۱۱۰', '۱۲۰', '۱۳۰'],
    image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=1000&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=85',
    description: 'یک لایه‌ی گرم و خوش‌فرم برای روزهای خنک و استایل‌های لایه‌ای.'
  }
];

window.LP_FORMAT_PRICE = function (amount) {
  return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
};
