/* ============================================
   SALON FACTORY — Interactive Script
   GSAP + Vanilla JS (CDN-loaded)
   ============================================ */

(function () {
  'use strict';

  const WHATSAPP = 'https://wa.me/919876543210?text=Hi%20Salon%20Factory,%20I%20need%20a%20bulk%20quote';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isTouch = isMobile || 'ontouchstart' in window;

  /* ---- Page Load — boot runs after all modules are defined (see end of file) ---- */
  function boot() {
    initAll();
    ensureVisibleContent();
  }

  function ensureVisibleContent() {
    document.querySelectorAll('.reveal, .reveal-stagger > *, .line-inner, .hero-eyebrow span').forEach((el) => {
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.line-wrap').forEach((el) => { el.style.overflow = 'visible'; });
  }

  const CART_KEY = 'sf_cart';

  function initAll() {
    initImageFallbacks();
    initShopUI();
    initCart();
    if (!isTouch) initCustomCursor();
    initHeader();
    initMobileMenu();
    initCounters();
    initFAQ();
    renderDynamicContent();
    initFilters();
    initGallery();
    initSwatches();
    initRipple();
    initFormLabels();
    initProductPage();
    initCartPage();
    initCheckout();
    initQtySelectors();
    initPaymentMethods();
    initContactHub();
    initInspectBlock();

    if (isMobile || prefersReducedMotion) {
      ensureVisibleContent();
      initScrollReveals();
      return;
    }

    if (typeof gsap !== 'undefined') gsap.defaults({ immediateRender: false });
    initMagneticButtons();
    initHeroAnimations();
    initScrollReveals();
    initMarquee();
    initCarousel();
    initBentoTilt();
    initTimeline();
  }

  /* ---- Block DevTools keyboard shortcuts (right-click allowed) ---- */
  function initInspectBlock() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.shiftKey && /^(I|J|C|K)$/i.test(e.key)) {
        e.preventDefault();
        return false;
      }
      if (e.metaKey && e.altKey && /^(I|J|C)$/i.test(e.key)) {
        e.preventDefault();
        return false;
      }
    }, true);
  }

  /* ---- Custom Cursor ---- */
  function initCustomCursor() {
    if (window.innerWidth <= 768 || prefersReducedMotion) return;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = 'a, button, .btn, .bento-card, .product-card, .client-tile, .filter-tag, .swatch, .gallery-thumb, .faq-question, .mega-item';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.add('hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.remove('hover');
    });
    document.addEventListener('mousedown', () => ring.classList.add('click'));
    document.addEventListener('mouseup', () => ring.classList.remove('click'));
  }

  function initImageFallbacks() {
    if (typeof SF_IMG !== 'undefined') {
      document.querySelectorAll('img[data-sf-img]').forEach((img) => {
        const key = img.dataset.sfImg;
        if (SF_IMG[key]) img.src = SF_IMG[key];
      });
    }
    document.addEventListener('error', (e) => {
      if (e.target.tagName !== 'IMG' || e.target.dataset.fallbackApplied) return;
      e.target.dataset.fallbackApplied = '1';
      e.target.src = (typeof SF_IMG !== 'undefined') ? SF_IMG.fallback : 'https://placehold.co/800x800/14141a/C9A15D/png?text=Salon+Factory';
    }, true);
  }

  /* ---- Sticky Header + Smart Banner ---- */
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    if (isMobile) {
      document.body.classList.add('banner-hidden');
      const banner = document.querySelector('.shop-hero-banner');
      if (banner) banner.setAttribute('aria-hidden', 'true');
    }

    let lastScrollY = window.scrollY;
    let ticking = false;
    const SCROLL_THRESHOLD = 8;
    const TOP_OFFSET = 60;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        header.classList.toggle('scrolled', currentY > 40);

        if (!isMobile && document.querySelector('.shop-hero-banner')) {
          if (currentY <= TOP_OFFSET) {
            document.body.classList.remove('banner-hidden');
          } else if (currentY > lastScrollY + SCROLL_THRESHOLD) {
            document.body.classList.add('banner-hidden');
          } else if (currentY < lastScrollY - SCROLL_THRESHOLD) {
            document.body.classList.remove('banner-hidden');
          }
        }

        if (isMobile) {
          document.body.classList.add('banner-hidden');
        }

        lastScrollY = currentY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile Menu ---- */
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  /* ---- Magnetic Buttons ---- */
  function initMagneticButtons() {
    if (prefersReducedMotion || window.innerWidth <= 768) return;

    document.querySelectorAll('.btn-magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ---- Hero GSAP Animations ---- */
  function initHeroAnimations() {
    const heroEls = document.querySelectorAll('.hero-title .line-inner, .hero-eyebrow span, .hero-subtitle, .hero-ctas .btn, .trust-pill');
    if (isMobile || typeof gsap === 'undefined' || prefersReducedMotion) {
      heroEls.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
      return;
    }

    const hero = document.querySelector('.hero');
    if (!hero) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out', immediateRender: false },
      onComplete: ensureVisibleContent
    });

    tl.from('.hero-eyebrow span', { y: 24, duration: 0.8, stagger: 0.05 })
      .from('.hero-title .line-inner', { y: 32, duration: 1, stagger: 0.12 }, '-=0.5')
      .from('.hero-subtitle', { y: 20, duration: 0.8 }, '-=0.4')
      .from('.hero-ctas .btn', { y: 16, duration: 0.6, stagger: 0.1 }, '-=0.3')
      .from('.trust-pill', { y: 14, duration: 0.5, stagger: 0.08 }, '-=0.2')
      .from('.hero-visual', { x: 24, duration: 1 }, '-=0.8')
      .from('.scroll-indicator', { y: 10, duration: 0.6 }, '-=0.1');

    const heroImg = hero.querySelector('.hero-bg img');
    if (heroImg && typeof ScrollTrigger !== 'undefined') {
      gsap.to(heroImg, {
        scale: 1,
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }

  /* ---- Scroll Reveals (GSAP + IO fallback) ---- */
  function initScrollReveals() {
    if (!isMobile && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 36,
          duration: 0.9,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        });
      });

      gsap.utils.toArray('.reveal-stagger').forEach((container) => {
        gsap.from(container.children, {
          y: 28,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: container,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        });
      });

      gsap.utils.toArray('.usp-item').forEach((item, i) => {
        gsap.from(item, {
          x: 24,
          duration: 0.75,
          delay: i * 0.08,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        });
      });
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }
  }

  /* ---- Animated Counters ---- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const animateCounter = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 2000;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);
        el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target.toLocaleString('en-IN') + suffix;
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((c) => observer.observe(c));
  }

  /* ---- FAQ Accordion ---- */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item.active').forEach((open) => {
          if (open !== item) open.classList.remove('active');
        });

        item.classList.toggle('active', !isActive);
      });
    });
  }

  /* ---- Product Carousel ---- */
  function initCarousel() {
    document.querySelectorAll('.carousel-section').forEach((section) => {
      const track = section.querySelector('.carousel-track');
      if (!track) return;

      const prevBtn = section.querySelector('.carousel-prev');
      const nextBtn = section.querySelector('.carousel-next');
      const cardWidth = 336;

      if (prevBtn) prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      });
      if (nextBtn) nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      });

      let isDown = false, startX, scrollLeft;
      track.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
      });
      track.addEventListener('mouseleave', () => { isDown = false; });
      track.addEventListener('mouseup', () => { isDown = false; });
      track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        track.scrollLeft = scrollLeft - (x - startX) * 1.5;
      });
    });
  }

  /* ---- Bento Card 3D Tilt ---- */
  function   initBentoTilt() {
    if (prefersReducedMotion || window.innerWidth <= 768) return;

    document.querySelectorAll('.category-card, .catalog-card, .bento-card, .collection-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---- Marquee Duplicate ---- */
  function initMarquee() {
    const track = document.querySelector('.marquee-track');
    if (!track) return;
    const logos = track.innerHTML;
    track.innerHTML = logos + logos;
  }

  /* ---- Timeline Progress ---- */
  function initTimeline() {
    const timeline = document.querySelector('.timeline');
    const progress = document.querySelector('.timeline-progress');
    if (!timeline || !progress) return;

    const items = timeline.querySelectorAll('.timeline-item');

    const updateProgress = () => {
      const rect = timeline.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = rect.top - windowH * 0.5;
      const end = rect.bottom - windowH * 0.3;
      const total = end - start;
      const current = Math.max(0, Math.min(1, (-start) / total));
      progress.style.height = (current * 100) + '%';

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        item.classList.toggle('active', itemRect.top < windowH * 0.7);
      });
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ---- Collection & Client Filters ---- */
  function initFilters() {
    document.querySelectorAll('.filter-tags').forEach((bar) => {
      const filterType = bar.dataset.filter;
      const scope = bar.closest('main, .shop-page, .page-content, body') || document;
      const grid = scope.querySelector('.catalog-grid, .clients-wall, .collection-grid');
      const items = grid
        ? grid.querySelectorAll(`[data-${filterType}]`)
        : scope.querySelectorAll(`[data-${filterType}]`);
      const countEl = document.getElementById('product-count');
      const emptyEl = document.getElementById('catalog-empty');

      function applyFilter(value) {
        let visible = 0;
        items.forEach((item) => {
          const match = value === 'all' || item.dataset[filterType] === value;
          item.classList.toggle('hidden', !match);
          if (match) {
            visible++;
            item.style.transform = '';
            item.style.opacity = '';
          }
        });
        if (countEl) countEl.textContent = `${visible} Product${visible !== 1 ? 's' : ''}`;
        if (emptyEl) emptyEl.classList.toggle('hidden', visible > 0);
      }

      bar.querySelectorAll('.filter-tag').forEach((tag) => {
        tag.addEventListener('click', () => {
          bar.querySelectorAll('.filter-tag').forEach((t) => t.classList.remove('active'));
          tag.classList.add('active');
          applyFilter(tag.dataset.value);
        });
      });

      const params = new URLSearchParams(window.location.search);
      const cat = params.get('cat');
      if (cat) {
        const matchTag = bar.querySelector(`.filter-tag[data-value="${cat}"]`);
        if (matchTag) {
          bar.querySelectorAll('.filter-tag').forEach((t) => t.classList.remove('active'));
          matchTag.classList.add('active');
          applyFilter(cat);
        }
      }
    });
  }

  /* ---- Product Gallery ---- */
  function initGallery() {
    const mainImg = document.querySelector('.gallery-main img');
    const thumbs = document.querySelectorAll('.gallery-thumb');
    if (!mainImg || !thumbs.length) return;

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        thumbs.forEach((t) => t.classList.remove('active'));
        thumb.classList.add('active');
        const src = thumb.querySelector('img').src;
        mainImg.style.opacity = '0';
        setTimeout(() => {
          mainImg.src = src;
          mainImg.style.opacity = '1';
        }, 200);
      });
    });
  }

  /* ---- Color Swatches ---- */
  function initSwatches() {
    document.querySelectorAll('.swatch-list').forEach((list) => {
      list.querySelectorAll('.swatch').forEach((swatch) => {
        swatch.addEventListener('click', () => {
          list.querySelectorAll('.swatch').forEach((s) => s.classList.remove('active'));
          swatch.classList.add('active');
        });
      });
    });
  }

  /* ---- Button Ripple ---- */
  function initRipple() {
    document.querySelectorAll('.btn-ripple').forEach((btn) => {
      btn.addEventListener('click', function () {
        this.classList.remove('rippling');
        void this.offsetWidth;
        this.classList.add('rippling');
        setTimeout(() => this.classList.remove('rippling'), 600);
      });
    });
  }

  /* ---- Form Floating Labels ---- */
  function initFormLabels() {
    document.querySelectorAll('.contact-form').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#25D366';
        btn.style.borderColor = '#25D366';
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.style.borderColor = '';
          form.reset();
        }, 3000);
      });
    });
  }

  /* ============================================
     SHOP & CART SYSTEM
     ============================================ */
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
  }

  function cartCount() {
    return getCart().reduce((s, i) => s + i.qty, 0);
  }

  function cartTotal() {
    return getCart().reduce((s, i) => {
      const p = typeof getProduct === 'function' ? getProduct(i.id) : null;
      return s + (p ? p.price * i.qty : 0);
    }, 0);
  }

  function addToCart(id, qty = 1) {
    if (typeof getProduct !== 'function') return;
    const product = getProduct(id);
    if (!product) return;
    const cart = getCart();
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += qty;
    else cart.push({ id, qty });
    saveCart(cart);
    showToast(product);
  }

  function updateCartQty(id, qty) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    if (qty <= 0) cart = cart.filter(i => i.id !== id);
    else item.qty = qty;
    saveCart(cart);
  }

  function removeFromCart(id) {
    saveCart(getCart().filter(i => i.id !== id));
  }

  function showToast(product) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<img class="toast-img" src="${product.image}" alt=""><div><strong>Added to Cart</strong><br><span style="font-size:0.85rem;color:var(--text-secondary)">${product.name}</span></div>`;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  function initShopUI() {
    if (document.getElementById('cart-drawer')) return;
    const html = `
      <div class="cart-overlay" id="cart-overlay"></div>
      <div class="cart-drawer" id="cart-drawer">
        <div class="cart-drawer-header">
          <h3><i class="fas fa-shopping-bag"></i> Your Cart</h3>
          <button class="cart-close" id="cart-close" aria-label="Close cart"><i class="fas fa-times"></i></button>
        </div>
        <div class="cart-drawer-body" id="cart-drawer-body"></div>
        <div class="cart-drawer-footer" id="cart-drawer-footer"></div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', html);

    document.getElementById('cart-close').addEventListener('click', closeCart);
    document.getElementById('cart-overlay').addEventListener('click', closeCart);
  }

  function openCart() {
    renderCartDrawer();
    document.getElementById('cart-overlay')?.classList.add('open');
    document.getElementById('cart-drawer')?.classList.add('open');
    document.body.classList.add('menu-open');
  }

  function closeCart() {
    document.getElementById('cart-overlay')?.classList.remove('open');
    document.getElementById('cart-drawer')?.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  function initCart() {
    document.querySelectorAll('.cart-trigger').forEach(btn => {
      btn.addEventListener('click', openCart);
    });
    document.body.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.add-to-cart-btn');
      if (addBtn) {
        e.preventDefault();
        e.stopPropagation();
        const qtyEl = document.getElementById('product-qty');
        const qty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
        addToCart(addBtn.dataset.id, qty);
      }
      const buyBtn = e.target.closest('.buy-now-btn');
      if (buyBtn) {
        e.preventDefault();
        const qtyEl = document.getElementById('product-qty');
        const qty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
        addToCart(buyBtn.dataset.id, qty);
        setTimeout(() => { window.location.href = 'checkout.html'; }, 400);
      }
    });
    updateCartUI();
  }

  function updateCartUI() {
    const count = cartCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.classList.toggle('visible', count > 0);
    });
    renderCartDrawer();
    renderCartPage();
    renderCheckoutSummary();
  }

  function renderCartDrawer() {
    const body = document.getElementById('cart-drawer-body');
    const footer = document.getElementById('cart-drawer-footer');
    if (!body || !footer) return;
    const cart = getCart();
    if (!cart.length) {
      body.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p><a href="collections.html" class="btn btn-primary btn-sm" style="margin-top:1rem">Shop Now</a></div>`;
      footer.innerHTML = '';
      return;
    }
    body.innerHTML = cart.map(item => {
      const p = getProduct(item.id);
      if (!p) return '';
      return `<div class="cart-item" data-cart-id="${p.id}">
        <img class="cart-item-img" src="${p.image}" alt="${p.name}">
        <div class="cart-item-info">
          <h4>${p.name}</h4>
          <div class="cart-item-price">${formatPrice(p.price)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn cart-qty-minus" data-id="${p.id}">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn cart-qty-plus" data-id="${p.id}">+</button>
          </div>
          <button class="cart-item-remove" data-id="${p.id}">Remove</button>
        </div>
      </div>`;
    }).join('');
    footer.innerHTML = `
      <div class="cart-subtotal"><span>Subtotal</span><strong>${formatPrice(cartTotal())}</strong></div>
      <a href="cart.html" class="btn btn-outline">View Cart</a>
      <a href="checkout.html" class="btn btn-primary btn-ripple">Checkout</a>
      <p class="cart-note">GST included · Free pan-India shipping on orders above ₹25,000</p>`;

    body.querySelectorAll('.cart-qty-minus').forEach(b => b.addEventListener('click', () => {
      const item = getCart().find(i => i.id === b.dataset.id);
      if (item) updateCartQty(b.dataset.id, item.qty - 1);
    }));
    body.querySelectorAll('.cart-qty-plus').forEach(b => b.addEventListener('click', () => {
      const item = getCart().find(i => i.id === b.dataset.id);
      if (item) updateCartQty(b.dataset.id, item.qty + 1);
    }));
    body.querySelectorAll('.cart-item-remove').forEach(b => b.addEventListener('click', () => removeFromCart(b.dataset.id)));
  }

  function buildCatalogCard(p) {
    const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
    const fb = (typeof SF_IMG !== 'undefined') ? SF_IMG.fallback : '';
    return `<article class="catalog-card shop-card" data-category="${p.category}">
      <a href="product.html?id=${p.id}" class="catalog-card-media">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='${fb}'">
        <img class="hover-img" src="${p.hoverImage || p.image}" alt="" loading="lazy" onerror="this.src='${fb}'">
        <span class="catalog-quick-view"><i class="fas fa-arrow-up-right-from-square"></i></span>
      </a>
      <div class="catalog-card-body">
        <p class="catalog-card-cat">${p.subcategory}</p>
        <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <p class="catalog-card-desc">${p.shortDesc}</p>
        <div class="product-price-row">
          <span class="price-current">${formatPrice(p.price)}</span>
          ${p.originalPrice ? `<span class="price-original">${formatPrice(p.originalPrice)}</span>` : ''}
          ${discount ? `<span class="price-discount">${discount}% off</span>` : ''}
        </div>
        <div class="shop-card-actions">
          <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${p.id}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
          <a href="product.html?id=${p.id}" class="btn btn-icon-only" title="View details"><i class="fas fa-eye"></i></a>
        </div>
      </div>
    </article>`;
  }

  function buildShopCard(p, opts = {}) {
    const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
    return `<article class="product-card shop-card">
      <a href="product.html?id=${p.id}">
        <div class="product-card-image">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='${SF_IMG.fallback}'">
          <img class="hover-img" src="${p.hoverImage || p.image}" alt="" loading="lazy" onerror="this.src='${SF_IMG.fallback}'">
        </div>
        <div class="product-card-body">
          <h4>${p.name}</h4>
          <p>${p.shortDesc}</p>
          <div class="product-price-row">
            <span class="price-current">${formatPrice(p.price)}</span>
            ${p.originalPrice ? `<span class="price-original">${formatPrice(p.originalPrice)}</span>` : ''}
            ${discount ? `<span class="price-discount">${discount}% off</span>` : ''}
          </div>
        </div>
      </a>
      <div class="product-card-body" style="padding-top:0">
        <div class="shop-card-actions">
          <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${p.id}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
          <a href="product.html?id=${p.id}" class="btn btn-icon-only" title="View"><i class="fas fa-eye"></i></a>
        </div>
      </div>
    </article>`;
  }

  function renderDynamicContent() {
    if (typeof SF_PRODUCTS === 'undefined') return;

    const mega = document.getElementById('mega-menu-grid');
    if (mega && typeof SF_CATEGORIES !== 'undefined') {
      mega.innerHTML = SF_CATEGORIES.map((c) =>
        `<a href="collections.html?cat=${c.filter}" class="mega-item"><img src="${c.image}" alt="${c.name}" loading="lazy"><span>${c.name}</span></a>`
      ).join('');
    }

    const trending = document.querySelector('[data-render="trending"]');
    if (trending) trending.innerHTML = getTrending().map(p => buildShopCard(p)).join('');

    const shopGrid = document.querySelector('[data-render="shop-grid"]');
    if (shopGrid) shopGrid.innerHTML = SF_PRODUCTS.map(p => buildCatalogCard(p)).join('');

    const bento = document.querySelector('[data-render="categories"]');
    if (bento && typeof SF_CATEGORIES !== 'undefined') {
      bento.className = 'category-grid';
      bento.innerHTML = SF_CATEGORIES.map((c) => `
        <a href="collections.html?cat=${c.filter}" class="category-card">
          <img src="${c.image}" alt="${c.name}" loading="lazy" onerror="this.src='${SF_IMG.fallback}'">
          <div class="bento-overlay"><h3>${c.name}</h3><div class="bento-underline"></div></div>
        </a>`).join('');
    }

    const marquee = document.querySelector('[data-render="marquee"]');
    if (marquee && typeof SF_CLIENTS !== 'undefined') {
      marquee.innerHTML = SF_CLIENTS.map(c => `
        <div class="marquee-logo-img"><img src="${c.image}" alt="${c.name}"><span>${c.name}</span></div>`).join('');
    }

    const clientsWall = document.querySelector('[data-render="clients"]');
    if (clientsWall && typeof SF_CLIENTS !== 'undefined') {
      const extras = [
        { name: 'Truefitt Barber', image: 'https://images.unsplash.com/photo-1622286342628-9f576481b4f9?w=400&h=260&fit=crop&q=80', type: 'barber' },
        { name: 'Bombay Shaving Co.', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=260&fit=crop&q=80', type: 'barber' },
        { name: 'Four Fountains Spa', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=260&fit=crop&q=80', type: 'spa' },
        { name: 'Kaya Skin Clinic', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d880?w=400&h=260&fit=crop&q=80', type: 'spa' },
        { name: 'Madame Salon', image: 'https://images.unsplash.com/photo-1521592802127-2393edcd3e9e?w=400&h=260&fit=crop&q=80', type: 'chain' },
        { name: 'Rod Anker Salon', image: 'https://images.unsplash.com/photo-1562322140-8baeece4cf24?w=400&h=260&fit=crop&q=80', type: 'luxury' }
      ];
      const all = [...SF_CLIENTS, ...extras];
      clientsWall.innerHTML = all.map(c => `
        <a href="#" class="client-tile" data-type="${c.type}">
          <img class="client-tile-img" src="${c.image}" alt="">
          <span>${c.name}</span>
        </a>`).join('');
    }
  }

  function initProductPage() {
    const container = document.getElementById('product-detail-root');
    if (!container || typeof getProduct !== 'function') return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'sf-001';
    const p = getProduct(id);
    if (!p) { container.innerHTML = '<p class="product-loading">Product not found.</p>'; return; }

    const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
    const savings = p.originalPrice ? p.originalPrice - p.price : 0;
    const fb = (typeof SF_IMG !== 'undefined') ? SF_IMG.fallback : '';
    document.title = `${p.name} | Salon Factory`;

    container.innerHTML = `
      <div class="product-gallery">
        <div class="gallery-main">
          ${p.badge ? `<span class="product-badge gallery-badge">${p.badge}</span>` : ''}
          <img src="${p.images[0]}" alt="${p.name}" id="main-product-img" onerror="this.src='${fb}'">
        </div>
        <div class="gallery-thumbs">${p.images.map((img, i) => `
          <button type="button" class="gallery-thumb${i === 0 ? ' active' : ''}" aria-label="View image ${i + 1}">
            <img src="${img}" alt="" onerror="this.src='${fb}'">
          </button>`).join('')}
        </div>
      </div>
      <div class="product-info">
        <div class="product-info-header">
          <p class="section-label">${p.subcategory}</p>
          <h1>${p.name}</h1>
          <p class="product-short-desc">${p.shortDesc}</p>
        </div>

        <div class="product-price-card">
          <div class="product-price-row">
            <span class="price-current price-current--lg">${formatPrice(p.price)}</span>
            ${p.originalPrice ? `<span class="price-original">${formatPrice(p.originalPrice)}</span>` : ''}
            ${discount ? `<span class="price-discount">${discount}% OFF</span>` : ''}
          </div>
          ${savings ? `<p class="product-savings"><i class="fas fa-tag"></i> You save ${formatPrice(savings)} on factory-direct pricing</p>` : ''}
        </div>

        <p class="product-desc">${p.description}</p>

        <div class="product-specs-card">
          <h4><i class="fas fa-list-ul"></i> Specifications</h4>
          <table class="spec-table">${Object.entries(p.specs).map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table>
        </div>

        <div class="product-purchase-card">
          <div class="color-swatches">
            <h4>Select Upholstery Color</h4>
            <div class="swatch-list">
              <button type="button" class="swatch active" style="background:#1A1A1F" aria-label="Black"></button>
              <button type="button" class="swatch" style="background:#8B4513" aria-label="Brown"></button>
              <button type="button" class="swatch" style="background:#C9A15D" aria-label="Gold"></button>
              <button type="button" class="swatch" style="background:#B8876A" aria-label="Rose Gold"></button>
              <button type="button" class="swatch" style="background:#F5F1EA;border:1px solid #ccc" aria-label="Cream"></button>
            </div>
          </div>
          <div class="product-qty-row">
            <h4>Quantity</h4>
            <div class="qty-selector" id="product-qty-selector">
              <button type="button" class="qty-btn qty-minus" aria-label="Decrease">−</button>
              <span class="qty-value" id="product-qty">1</span>
              <button type="button" class="qty-btn qty-plus" aria-label="Increase">+</button>
            </div>
          </div>
          <div class="product-actions">
            <button class="btn btn-primary btn-magnetic add-to-cart-btn" data-id="${p.id}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
            <button class="btn btn-outline btn-magnetic buy-now-btn" data-id="${p.id}">Buy Now</button>
          </div>
        </div>

        <div class="product-trust-badges">
          <span class="product-trust-badge"><i class="fas fa-truck"></i> Pan-India Delivery</span>
          <span class="product-trust-badge"><i class="fas fa-shield-alt"></i> 1 Year Warranty</span>
          <span class="product-trust-badge"><i class="fas fa-undo"></i> Easy Returns</span>
          <span class="product-trust-badge"><i class="fas fa-file-invoice"></i> GST Invoice</span>
        </div>
      </div>`;

    initGallery();
    initSwatches();

    const related = document.querySelector('[data-render="related"]');
    if (related) related.innerHTML = getRelated(id).map(r => buildCatalogCard(r)).join('');
  }

  function initQtySelectors() {
    document.body.addEventListener('click', (e) => {
      const minus = e.target.closest('.qty-minus');
      const plus = e.target.closest('.qty-plus');
      const val = document.getElementById('product-qty');
      if (!val) return;
      let q = parseInt(val.textContent, 10);
      if (minus) { q = Math.max(1, q - 1); val.textContent = q; }
      if (plus) { q = Math.min(99, q + 1); val.textContent = q; }
    });
  }

  function renderCartPage() {
    const root = document.getElementById('cart-page-root');
    if (!root) return;
    const cart = getCart();
    const fb = (typeof SF_IMG !== 'undefined') ? SF_IMG.fallback : '';

    if (!cart.length) {
      root.innerHTML = `
        <div class="cart-empty-page">
          <div class="cart-empty-icon"><i class="fas fa-shopping-bag"></i></div>
          <h2>Your cart is empty</h2>
          <p>Add premium salon furniture to your cart and checkout with factory-direct pricing.</p>
          <a href="collections.html" class="btn btn-primary btn-magnetic">Browse Products</a>
          <div class="cart-empty-perks">
            <span><i class="fas fa-truck"></i> Free shipping ₹25K+</span>
            <span><i class="fas fa-shield-alt"></i> 1 Year Warranty</span>
            <span><i class="fas fa-file-invoice"></i> GST Invoice</span>
          </div>
        </div>`;
      return;
    }

    const subtotal = cartTotal();
    const shipping = subtotal >= 25000 ? 0 : 999;
    const total = subtotal + shipping;
    const items = cartCount();
    const freeShipRemaining = Math.max(0, 25000 - subtotal);
    const freeShipPct = Math.min(100, Math.round((subtotal / 25000) * 100));

    let savingsTotal = 0;
    const linesHtml = cart.map(item => {
      const p = getProduct(item.id);
      if (!p) return '';
      const lineTotal = p.price * item.qty;
      const lineOrig = p.originalPrice ? p.originalPrice * item.qty : 0;
      if (p.originalPrice) savingsTotal += (p.originalPrice - p.price) * item.qty;
      const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
      return `<article class="cart-line-item" data-cart-id="${p.id}">
        <a href="product.html?id=${p.id}" class="cart-line-media">
          <img src="${p.image}" alt="${p.name}" onerror="this.src='${fb}'">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        </a>
        <div class="cart-line-details">
          <p class="cart-line-cat">${p.subcategory}</p>
          <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <p class="cart-line-desc">${p.shortDesc}</p>
          <div class="cart-line-price-row">
            <span class="price-current">${formatPrice(p.price)}</span>
            ${p.originalPrice ? `<span class="price-original">${formatPrice(p.originalPrice)}</span>` : ''}
            ${discount ? `<span class="price-discount">${discount}% off</span>` : ''}
          </div>
        </div>
        <div class="cart-line-qty-col">
          <div class="cart-item-qty cart-line-qty">
            <button type="button" class="qty-btn cart-qty-minus" data-id="${p.id}" aria-label="Decrease">−</button>
            <span class="qty-value">${item.qty}</span>
            <button type="button" class="qty-btn cart-qty-plus" data-id="${p.id}" aria-label="Increase">+</button>
          </div>
          <button type="button" class="cart-line-remove cart-item-remove" data-id="${p.id}" aria-label="Remove item"><i class="fas fa-trash-can"></i> Remove</button>
        </div>
        <div class="cart-line-total-col">
          <span class="cart-line-total-label">Line Total</span>
          <strong>${formatPrice(lineTotal)}</strong>
          ${lineOrig > lineTotal ? `<s>${formatPrice(lineOrig)}</s>` : ''}
        </div>
      </article>`;
    }).join('');

    root.innerHTML = `
      <div class="cart-page-top">
        <div>
          <p class="section-label">Your Bag</p>
          <h1 class="cart-page-title">Shopping Cart</h1>
          <p class="cart-page-meta">${items} item${items !== 1 ? 's' : ''} · Factory-direct pricing · GST included</p>
        </div>
        <button type="button" class="cart-clear-btn" id="cart-clear-all"><i class="fas fa-trash-can"></i> Clear Cart</button>
      </div>

      ${freeShipRemaining > 0 ? `
        <div class="cart-ship-progress">
          <div class="cart-ship-progress-head">
            <span><i class="fas fa-truck-fast"></i> Add ${formatPrice(freeShipRemaining)} more for <strong>FREE shipping</strong></span>
            <span>${freeShipPct}%</span>
          </div>
          <div class="cart-ship-progress-bar"><span style="width:${freeShipPct}%"></span></div>
        </div>` : `
        <div class="cart-ship-progress cart-ship-progress--done">
          <span><i class="fas fa-check-circle"></i> You qualify for <strong>free pan-India shipping</strong></span>
        </div>`}

      <div class="cart-page-layout">
        <div class="cart-page-items">
          <div class="cart-items-head">
            <span class="cart-head-product">Product</span>
            <span class="cart-head-qty">Quantity</span>
            <span class="cart-head-total">Total</span>
          </div>
          <div class="cart-items-list">${linesHtml}</div>
        </div>

        <aside class="cart-page-summary">
          <div class="cart-summary">
          <h3><i class="fas fa-receipt"></i> Order Summary</h3>
          ${savingsTotal > 0 ? `<div class="cart-savings-pill"><i class="fas fa-tag"></i> You're saving ${formatPrice(savingsTotal)}</div>` : ''}
          <div class="summary-row"><span>Subtotal (${items} items)</span><span>${formatPrice(subtotal)}</span></div>
          <div class="summary-row"><span>Shipping</span><span class="${shipping ? '' : 'summary-free'}">${shipping ? formatPrice(shipping) : 'FREE'}</span></div>
          <div class="summary-row"><span>GST (18%)</span><span>Included</span></div>
          <div class="promo-input">
            <input type="text" placeholder="Promo code" aria-label="Promo code">
            <button type="button" class="promo-apply-btn">Apply</button>
          </div>
          <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
          <a href="checkout.html" class="btn btn-primary btn-ripple btn-magnetic cart-checkout-btn"><i class="fas fa-lock"></i> Proceed to Checkout</a>
          <a href="collections.html" class="cart-continue-link"><i class="fas fa-arrow-left"></i> Continue Shopping</a>
          <div class="cart-summary-trust">
            <span><i class="fas fa-shield-alt"></i> Secure checkout</span>
            <span><i class="fas fa-undo"></i> Easy returns</span>
            <span><i class="fas fa-headset"></i> WhatsApp support</span>
          </div>
          </div>
        </aside>
      </div>`;

    root.querySelectorAll('.cart-qty-minus').forEach(b => b.addEventListener('click', () => {
      const item = getCart().find(i => i.id === b.dataset.id);
      if (item) updateCartQty(b.dataset.id, item.qty - 1);
    }));
    root.querySelectorAll('.cart-qty-plus').forEach(b => b.addEventListener('click', () => {
      const item = getCart().find(i => i.id === b.dataset.id);
      if (item) updateCartQty(b.dataset.id, item.qty + 1);
    }));
    root.querySelectorAll('.cart-item-remove').forEach(b => b.addEventListener('click', () => removeFromCart(b.dataset.id)));
    document.getElementById('cart-clear-all')?.addEventListener('click', () => {
      localStorage.setItem(CART_KEY, '[]');
      updateCartUI();
    });
  }

  function initCartPage() { renderCartPage(); }

  function renderCheckoutSummary() {
    const el = document.getElementById('checkout-summary');
    if (!el) return;
    const cart = getCart();
    if (!cart.length) {
      el.innerHTML = '<p class="checkout-empty-msg">Your cart is empty. <a href="collections.html">Shop now</a></p>';
      return;
    }
    const subtotal = cartTotal();
    const shipping = subtotal >= 25000 ? 0 : 999;
    const savings = cart.reduce((sum, item) => {
      const p = getProduct(item.id);
      if (!p || !p.originalPrice) return sum;
      return sum + (p.originalPrice - p.price) * item.qty;
    }, 0);
    const itemCount = cart.reduce((n, i) => n + i.qty, 0);

    el.innerHTML = `
      ${savings > 0 ? `<div class="cart-savings-pill"><i class="fas fa-tag"></i> You save ${formatPrice(savings)}</div>` : ''}
      <p class="checkout-item-count">${itemCount} item${itemCount !== 1 ? 's' : ''} in cart</p>
      <div class="checkout-items">${cart.map(item => {
        const p = getProduct(item.id);
        if (!p) return '';
        return `<div class="checkout-item">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="checkout-item-info">
            <strong>${p.name}</strong>
            <span>Qty: ${item.qty}</span>
          </div>
          <span class="checkout-item-price">${formatPrice(p.price * item.qty)}</span>
        </div>`;
      }).join('')}</div>
      <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
      <div class="summary-row"><span>Shipping</span><span class="${shipping ? '' : 'summary-free'}">${shipping ? formatPrice(shipping) : 'FREE'}</span></div>
      <div class="summary-row"><span>GST (included)</span><span>—</span></div>
      <div class="summary-row total"><span>Total</span><span>${formatPrice(subtotal + shipping)}</span></div>`;
  }

  function setCheckoutStep(step) {
    document.querySelectorAll('.checkout-step').forEach((s) => {
      const n = Number(s.dataset.step);
      s.classList.toggle('active', n === step);
      s.classList.toggle('done', n < step);
    });
    document.querySelectorAll('.checkout-step-line').forEach((line, i) => {
      line.classList.toggle('done', i < step - 1);
    });
    document.querySelectorAll('.checkout-panel').forEach((p) => {
      p.classList.toggle('active', Number(p.dataset.panel) === step);
    });
  }

  function getShippingData() {
    const fields = ['fname', 'lname', 'cemail', 'cphone', 'address', 'city', 'pincode', 'state'];
    const data = {};
    fields.forEach((id) => {
      const input = document.getElementById(id);
      data[id] = input ? input.value.trim() : '';
    });
    return data;
  }

  function validateShippingForm() {
    const form = document.getElementById('checkout-shipping-form');
    if (!form) return false;
    let valid = true;
    form.querySelectorAll('input[required]').forEach((input) => {
      const ok = input.checkValidity() && input.value.trim();
      input.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });
    return valid;
  }

  function renderShippingReview() {
    const el = document.getElementById('shipping-review');
    if (!el) return;
    const d = getShippingData();
    el.innerHTML = `
      <div>
        <strong>${d.fname} ${d.lname}</strong>
        <p>${d.address}, ${d.city}, ${d.state} — ${d.pincode}<br>${d.cphone} · ${d.cemail}</p>
      </div>
      <button type="button" class="checkout-shipping-edit" id="shipping-edit-btn">Edit</button>`;
    document.getElementById('shipping-edit-btn')?.addEventListener('click', () => {
      setCheckoutStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initCheckout() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    if (!getCart().length) {
      const root = document.querySelector('.checkout-page .container');
      if (root) {
        root.innerHTML = `
          <div class="checkout-empty-state">
            <i class="fas fa-shopping-bag"></i>
            <h2>Your cart is empty</h2>
            <p>Add salon furniture to your cart before checkout.</p>
            <a href="collections.html" class="btn btn-primary">Browse Products</a>
          </div>`;
      }
      return;
    }

    renderCheckoutSummary();

    document.getElementById('checkout-continue')?.addEventListener('click', () => {
      if (!validateShippingForm()) return;
      renderShippingReview();
      setCheckoutStep(2);
      document.querySelector('.checkout-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('checkout-back')?.addEventListener('click', () => {
      setCheckoutStep(1);
    });

    document.getElementById('checkout-shipping-form')?.querySelectorAll('input').forEach((input) => {
      input.addEventListener('input', () => input.classList.remove('is-invalid'));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!getCart().length) { alert('Your cart is empty!'); return; }
      const orderId = 'SF' + Date.now().toString(36).toUpperCase();
      const method = document.querySelector('.payment-method.active')?.dataset.method || 'upi';
      localStorage.setItem(CART_KEY, '[]');
      updateCartUI();
      setCheckoutStep(3);
      document.getElementById('checkout-main').innerHTML = `
        <div class="product-breadcrumb-bar">
          <div class="container">
            <nav class="breadcrumb"><a href="index.html">Home</a> / <span>Order Confirmed</span></nav>
          </div>
        </div>
        <div class="order-success reveal">
          <div class="order-success-icon"><i class="fas fa-check-circle"></i></div>
          <p class="section-label">Order Confirmed</p>
          <h1>Thank You!</h1>
          <p class="order-success-id">Order <strong>#${orderId}</strong></p>
          <p class="order-success-desc">We've received your order via <strong>${method.toUpperCase()}</strong>. Our team will contact you within 24 hours to confirm delivery scheduling.</p>
          <div class="order-success-actions">
            <a href="collections.html" class="btn btn-primary">Continue Shopping</a>
            <a href="contact.html" class="btn btn-ghost">Contact Support</a>
          </div>
        </div>`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initPaymentMethods() {
    document.querySelectorAll('.payment-method').forEach((m) => {
      m.addEventListener('click', () => {
        document.querySelectorAll('.payment-method').forEach((x) => {
          x.classList.remove('active');
          x.setAttribute('aria-pressed', 'false');
        });
        m.classList.add('active');
        m.setAttribute('aria-pressed', 'true');
      });
    });
  }

  /* ---- Contact Hub + Chatbot ---- */
  const SF_PHONE = '+919876543210';
  const SF_EMAIL = 'info@salonfactory.in';
  const SF_PHONE_DISPLAY = '+91 98765 43210';

  const CHAT_QUICK = ['Product prices', 'Delivery time', 'Bulk discount', 'Warranty info'];
  const CHAT_POOL = {
    price: [
      'Salon chairs start at ₹14,500 factory-direct. Hydraulic Pro is ₹18,500 — 26% off retail.',
      'All prices include GST. Orders of 5+ units get automatic bulk discounts at checkout.',
      'Browse our shop — every product shows factory price with no hidden markup.'
    ],
    delivery: [
      'In-stock items ship in 7–15 business days pan-India. Free delivery on orders above ₹25,000.',
      'We dispatch from Delhi & Lucknow. You\'ll get WhatsApp tracking once shipped.',
      'Custom upholstery orders take 3–4 weeks. Standard items ship within 2 weeks.'
    ],
    bulk: [
      'Orders of 5+ same products get wholesale pricing automatically at checkout.',
      'Salon chains ordering 20+ units — contact us for a custom factory quote.',
      'Bulk buyers save up to 30% vs retail. WhatsApp us for chain pricing.'
    ],
    warranty: [
      'Every product includes 1-year on-site warranty for manufacturing defects.',
      'Commercial-grade materials tested for 8+ hours daily salon use. ISO certified.',
      'Warranty covers parts & service. Unopened returns within 7 days with approval.'
    ],
    product: [
      'We have 16 products across 12 categories — chairs, stations, spa, accessories & more.',
      'Bestseller: Hydraulic Salon Chair Pro at ₹18,500. Vintage Barber Chair at ₹32,999.',
      'Check collections page for salon chairs, shampoo stations, reception desks & more.'
    ],
    greeting: [
      'Hello! I\'m SF Assistant — here to help with salon furniture queries.',
      'Welcome to Salon Factory! Ask me about products, pricing, or delivery.',
      'Hi there! India\'s #1 factory-direct salon furniture store. How can I help?'
    ],
    default: [
      'Great question! For detailed help, tap WhatsApp or Call — our team responds within minutes.',
      'I\'m still learning — try asking about prices, delivery, warranty, or bulk orders.',
      'Our Delhi showroom is open Mon–Sat 9AM–7PM. You can also shop online 24/7!',
      'Need a custom quote? WhatsApp us with your salon size and we\'ll suggest a package.',
      'All orders include GST invoice. COD available for orders under ₹50,000.'
    ]
  };

  function chatPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getChatReply(text) {
    const m = text.toLowerCase();
    if (/hi|hello|hey|namaste|start/.test(m)) return chatPick(CHAT_POOL.greeting);
    if (/price|cost|₹|rupee|cheap|discount|offer/.test(m)) return chatPick(CHAT_POOL.price);
    if (/deliver|ship|dispatch|track|courier|days/.test(m)) return chatPick(CHAT_POOL.delivery);
    if (/bulk|wholesale|chain|5\+|units|many/.test(m)) return chatPick(CHAT_POOL.bulk);
    if (/warrant|return|defect|quality|iso/.test(m)) return chatPick(CHAT_POOL.warranty);
    if (/chair|product|station|shampoo|barber|furniture|catalog|shop/.test(m)) return chatPick(CHAT_POOL.product);
    return chatPick(CHAT_POOL.default);
  }

  function initContactHub() {
    if (window.__sfContactHubReady) return;
  }

  window.SalonFactory = { whatsapp: WHATSAPP, addToCart, getCart, cartTotal, openCart };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  setTimeout(ensureVisibleContent, 300);

})();
