/* Salon Factory — Product Catalog + Images */
const SF_IMG = {
  salonChair: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=800&fit=crop&auto=format&q=80',
  salonChair2: 'https://images.unsplash.com/photo-1521592802127-2393edcd3e9e?w=800&h=800&fit=crop&auto=format&q=80',
  barberChair: 'https://images.unsplash.com/photo-1585747860715-2ba37f7887a2?w=800&h=800&fit=crop&auto=format&q=80',
  barberShop: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=800&fit=crop&auto=format&q=80',
  stylingStation: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb04d?w=800&h=800&fit=crop&auto=format&q=80',
  salonInterior: 'https://images.unsplash.com/photo-1562322140-8baeece4cf24?w=800&h=800&fit=crop&auto=format&q=80',
  shampoo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop&auto=format&q=80',
  reception: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=800&fit=crop&auto=format&q=80',
  lounge: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop&auto=format&q=80',
  mirror: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop&auto=format&q=80',
  trolley: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb04d?w=800&h=800&fit=crop&auto=format&q=80',
  pedicure: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=800&fit=crop&auto=format&q=80',
  manicure: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=800&fit=crop&auto=format&q=80',
  lighting: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop&auto=format&q=80',
  accessories: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=800&fit=crop&auto=format&q=80',
  factory: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=900&fit=crop&auto=format&q=80',
  showroom: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=500&fit=crop&auto=format&q=80',
  hero: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb04d?w=1920&h=1080&fit=crop&auto=format&q=80',
  fallback: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=800&fit=crop&auto=format&q=80'
};

const SF_PRODUCTS = [
  { id: 'sf-001', name: 'Hydraulic Salon Chair Pro', category: 'chairs', subcategory: 'Salon Chairs', price: 18500, originalPrice: 24999, badge: 'Bestseller', image: SF_IMG.salonChair, hoverImage: SF_IMG.salonChair2, images: [SF_IMG.salonChair, SF_IMG.salonChair2, SF_IMG.mirror, SF_IMG.stylingStation], description: 'Flagship hydraulic salon chair for 8+ hours daily commercial use.', shortDesc: 'Heavy-duty chrome · Premium PU leather', specs: { 'Base': 'Chrome Steel', 'Warranty': '1 Year' }, trending: true },
  { id: 'sf-002', name: 'Vintage Barber Chair Elite', category: 'chairs', subcategory: 'Barber Chairs', price: 32999, originalPrice: 42000, badge: 'Premium', image: SF_IMG.barberShop, hoverImage: SF_IMG.barberChair, images: [SF_IMG.barberShop, SF_IMG.barberChair], description: 'Classic vintage barber chair with reclining headrest and gold chrome finish.', shortDesc: 'Reclining headrest · Gold chrome', specs: { 'Finish': 'Gold Chrome', 'Warranty': '1 Year' }, trending: true },
  { id: 'sf-003', name: 'Luxury Styling Station', category: 'stations', subcategory: 'Styling Stations', price: 45999, originalPrice: 58000, badge: 'New', image: SF_IMG.stylingStation, hoverImage: SF_IMG.salonInterior, images: [SF_IMG.stylingStation, SF_IMG.salonInterior], description: 'Full styling station with LED backlit mirror and storage drawers.', shortDesc: 'LED mirror · Storage drawers', specs: { 'Mirror': 'LED Backlit', 'Warranty': '1 Year' }, trending: true },
  { id: 'sf-004', name: 'Ceramic Shampoo Unit', category: 'stations', subcategory: 'Shampoo Stations', price: 28999, originalPrice: 36000, image: SF_IMG.shampoo, hoverImage: SF_IMG.mirror, images: [SF_IMG.shampoo, SF_IMG.mirror], description: 'Ergonomic ceramic shampoo bowl with integrated plumbing bracket.', shortDesc: 'Ceramic bowl · Ergonomic design', specs: { 'Bowl': 'Ceramic', 'Warranty': '1 Year' }, trending: true },
  { id: 'sf-005', name: 'Modern Reception Desk', category: 'furniture', subcategory: 'Reception Desks', price: 54999, originalPrice: 68000, badge: 'Popular', image: SF_IMG.reception, hoverImage: SF_IMG.lounge, images: [SF_IMG.reception, SF_IMG.lounge], description: 'Sleek reception counter with LED accent strip.', shortDesc: 'LED accent · Custom laminate', specs: { 'Length': '180cm', 'Warranty': '1 Year' }, trending: true },
  { id: 'sf-006', name: 'Spa Pedicure Chair', category: 'spa', subcategory: 'Pedicure Chairs', price: 68999, originalPrice: 85000, badge: 'Luxury', image: SF_IMG.pedicure, hoverImage: SF_IMG.manicure, images: [SF_IMG.pedicure, SF_IMG.manicure], description: 'Full-feature spa pedicure chair with pipeless jet system.', shortDesc: 'Pipeless jets · Massage function', specs: { 'Jets': 'Pipeless', 'Warranty': '1 Year' }, trending: true },
  { id: 'sf-007', name: 'Salon Trolley Pro', category: 'accessories', subcategory: 'Trolley & Storage', price: 8499, originalPrice: 12000, image: SF_IMG.accessories, hoverImage: SF_IMG.trolley, images: [SF_IMG.accessories, SF_IMG.trolley], description: '5-tier rolling salon trolley with lockable wheels.', shortDesc: '5-tier · Lockable wheels', specs: { 'Tiers': '5', 'Warranty': '6 Months' }, trending: false },
  { id: 'sf-008', name: 'LED Mirror Station Wall', category: 'stations', subcategory: 'Mirror Units', price: 22999, originalPrice: 29000, image: SF_IMG.mirror, hoverImage: SF_IMG.lighting, images: [SF_IMG.mirror, SF_IMG.lighting], description: 'Wall-mounted LED vanity mirror with 3 colour temperature modes.', shortDesc: '3 colour modes · Touch dimmer', specs: { 'Size': '120×80cm', 'Warranty': '1 Year' }, trending: false },
  { id: 'sf-009', name: 'Executive Salon Chair', category: 'chairs', subcategory: 'Salon Chairs', price: 21500, originalPrice: 28000, image: SF_IMG.salonChair2, hoverImage: SF_IMG.salonChair, images: [SF_IMG.salonChair2], description: 'High-back executive styling chair with memory foam cushioning.', shortDesc: 'Memory foam · Rose-gold pump', specs: { 'Cushion': 'Memory Foam', 'Warranty': '1 Year' }, trending: false },
  { id: 'sf-010', name: 'Classic Barber Chair', category: 'chairs', subcategory: 'Barber Chairs', price: 27500, originalPrice: 35000, image: SF_IMG.barberShop, hoverImage: SF_IMG.barberChair, images: [SF_IMG.barberShop], description: 'Traditional barber chair with alligator PU upholstery.', shortDesc: 'Alligator PU · Chrome frame', specs: { 'Frame': 'Chrome', 'Warranty': '1 Year' }, trending: false },
  { id: 'sf-011', name: 'Waiting Lounge Sofa Set', category: 'furniture', subcategory: 'Waiting Lounge', price: 38500, originalPrice: 48000, image: SF_IMG.lounge, hoverImage: SF_IMG.reception, images: [SF_IMG.lounge], description: '3-seater salon waiting sofa with commercial-grade fabric.', shortDesc: '3-seater · Stain-resistant', specs: { 'Seats': '3', 'Warranty': '1 Year' }, trending: false },
  { id: 'sf-012', name: 'Manicure Table Deluxe', category: 'spa', subcategory: 'Manicure Tables', price: 18999, originalPrice: 24000, image: SF_IMG.pedicure, hoverImage: SF_IMG.manicure, images: [SF_IMG.pedicure, SF_IMG.manicure], description: 'Professional manicure table with dust extractor.', shortDesc: 'Dust extractor · LED lamp', specs: { 'Extractor': 'Built-in', 'Warranty': '1 Year' }, trending: false },
  { id: 'sf-013', name: 'Double Shampoo Station', category: 'stations', subcategory: 'Shampoo Stations', price: 52000, originalPrice: 65000, badge: 'Pro', image: SF_IMG.shampoo, hoverImage: SF_IMG.mirror, images: [SF_IMG.shampoo], description: 'Dual-bowl shampoo backwash unit for high-traffic salons.', shortDesc: 'Dual bowl · High-traffic ready', specs: { 'Bowls': '2 Ceramic', 'Warranty': '1 Year' }, trending: false },
  { id: 'sf-014', name: 'Salon LED Ring Light', category: 'accessories', subcategory: 'LED Lighting', price: 4999, originalPrice: 7500, image: SF_IMG.lighting, hoverImage: SF_IMG.salonInterior, images: [SF_IMG.lighting], description: '18-inch professional ring light with adjustable stand.', shortDesc: '18-inch · Adjustable stand', specs: { 'Diameter': '18 inch', 'Warranty': '6 Months' }, trending: false },
  { id: 'sf-015', name: 'Tool Sterilizer UV Cabinet', category: 'accessories', subcategory: 'Salon Accessories', price: 12999, originalPrice: 16500, image: SF_IMG.accessories, hoverImage: SF_IMG.trolley, images: [SF_IMG.accessories], description: 'UV-C sterilization cabinet for combs and scissors.', shortDesc: 'UV-C · 30L capacity', specs: { 'Capacity': '30L', 'Warranty': '1 Year' }, trending: false },
  { id: 'sf-016', name: 'Kids Salon Chair', category: 'chairs', subcategory: 'Salon Chairs', price: 14500, originalPrice: 19000, badge: 'Cute', image: SF_IMG.salonChair, hoverImage: SF_IMG.salonChair2, images: [SF_IMG.salonChair], description: 'Child-friendly hydraulic chair with safety belt.', shortDesc: 'Child-safe · Adjustable height', specs: { 'Safety': 'Belt Included', 'Warranty': '1 Year' }, trending: false }
];

const SF_CATEGORIES = [
  { id: 'chairs', name: 'Salon Chairs', image: SF_IMG.salonChair, filter: 'chairs' },
  { id: 'barber', name: 'Barber Chairs', image: SF_IMG.barberChair, filter: 'chairs' },
  { id: 'shampoo', name: 'Shampoo Stations', image: SF_IMG.shampoo, filter: 'stations' },
  { id: 'styling', name: 'Styling Stations', image: SF_IMG.stylingStation, filter: 'stations' },
  { id: 'reception', name: 'Reception Desks', image: SF_IMG.reception, filter: 'furniture' },
  { id: 'lounge', name: 'Waiting Lounge', image: SF_IMG.lounge, filter: 'furniture' },
  { id: 'mirror', name: 'Mirror Units', image: SF_IMG.mirror, filter: 'stations' },
  { id: 'trolley', name: 'Trolley & Storage', image: SF_IMG.trolley, filter: 'accessories' },
  { id: 'pedicure', name: 'Pedicure Chairs', image: SF_IMG.pedicure, filter: 'spa' },
  { id: 'manicure', name: 'Manicure Tables', image: SF_IMG.manicure, filter: 'spa' },
  { id: 'led', name: 'LED Lighting', image: SF_IMG.lighting, filter: 'accessories' },
  { id: 'accessories', name: 'Salon Accessories', image: SF_IMG.accessories, filter: 'accessories' }
];

const SF_CLIENTS = [
  { name: 'Lakmé Salon', image: SF_IMG.salonChair, type: 'chain' },
  { name: 'Naturals', image: SF_IMG.shampoo, type: 'chain' },
  { name: 'VLCC', image: SF_IMG.pedicure, type: 'spa' },
  { name: 'Green Trends', image: SF_IMG.stylingStation, type: 'chain' },
  { name: 'Jawed Habib', image: SF_IMG.salonInterior, type: 'chain' },
  { name: 'Looks Salon', image: SF_IMG.reception, type: 'luxury' },
  { name: 'Enrich Salon', image: SF_IMG.salonChair2, type: 'chain' },
  { name: 'YLG Salon', image: SF_IMG.lounge, type: 'chain' },
  { name: 'BBlunt', image: SF_IMG.lighting, type: 'luxury' },
  { name: 'Truefitt & Hill', image: SF_IMG.barberShop, type: 'barber' }
];

function formatPrice(n) { return '₹' + n.toLocaleString('en-IN'); }
function getProduct(id) { return SF_PRODUCTS.find(p => p.id === id); }
function getTrending() { return SF_PRODUCTS.filter(p => p.trending); }
function getRelated(id) {
  const p = getProduct(id);
  if (!p) return SF_PRODUCTS.slice(0, 4);
  const same = SF_PRODUCTS.filter(x => x.category === p.category && x.id !== id);
  const others = SF_PRODUCTS.filter(x => x.id !== id && !same.find(s => s.id === x.id));
  return [...same, ...others].slice(0, 4);
}
