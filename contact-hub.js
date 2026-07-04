/* Salon Factory — Contact FAB + Dummy Chatbot */
(function () {
  'use strict';

  if (window.__sfContactHubReady) return;

  var WHATSAPP_URL = 'https://wa.me/919876543210?text=Hi%20Salon%20Factory,%20I%20need%20help';
  var PIN_RIGHT = 16;
  var PIN_BOTTOM = 20;

  var DUMMY_REPLIES = {
    greeting: [
      'Hello! I\'m SF Assistant (demo). Ask about products, delivery, warranty, or pricing.',
      'Welcome to Salon Factory! How can I help you today?'
    ],
    price: [
      'Salon chairs start at ₹14,500. Hydraulic Pro bestseller is ₹18,500 with factory-direct pricing.',
      'All prices include GST. Orders of 5+ units get bulk discounts at checkout.'
    ],
    delivery: [
      'We deliver pan-India in 7–15 days. Free shipping on orders above ₹25,000.',
      'In-stock items ship within 2 weeks. You\'ll get tracking on WhatsApp once dispatched.'
    ],
    warranty: [
      'Every product includes 1-year on-site warranty and GST invoice.',
      'Commercial-grade build with ISO-certified materials. Returns within 7 days if unopened.'
    ],
    product: [
      'Browse our shop for 16+ salon furniture products — chairs, stations, spa & more.',
      'Bestseller: Hydraulic Salon Chair Pro at ₹18,500. Check Collections for more.'
    ],
    default: [
      'Thanks for your message! Our team will assist you shortly. For instant help, use WhatsApp.',
      'Great question! Tap WhatsApp or Call for a faster response from our team.'
    ]
  };

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function pickReply(text) {
    var m = (text || '').toLowerCase();
    if (/hi|hello|hey|namaste|start/.test(m)) return pick(DUMMY_REPLIES.greeting);
    if (/price|cost|₹|chair|discount/.test(m)) return pick(DUMMY_REPLIES.price);
    if (/deliver|ship|days|track/.test(m)) return pick(DUMMY_REPLIES.delivery);
    if (/warrant|return|quality/.test(m)) return pick(DUMMY_REPLIES.warranty);
    if (/product|shop|catalog|station/.test(m)) return pick(DUMMY_REPLIES.product);
    return pick(DUMMY_REPLIES.default);
  }

  function setImportant(el, prop, value) {
    el.style.setProperty(prop, value, 'important');
  }

  function pinHub(hub, chatbot) {
    if (!hub) return;

    if (hub.parentElement !== document.body) {
      document.body.appendChild(hub);
    }

    ['inset', 'top', 'left', 'right', 'bottom', 'transform', 'translate', 'margin', 'width', 'max-width'].forEach(function (prop) {
      hub.style.removeProperty(prop);
    });

    var bottom = window.innerWidth <= 768
      ? 'max(18px, env(safe-area-inset-bottom, 0px))'
      : PIN_BOTTOM + 'px';
    var right = (window.innerWidth <= 768 ? 14 : PIN_RIGHT) + 'px';

    setImportant(hub, 'position', 'fixed');
    setImportant(hub, 'top', 'auto');
    setImportant(hub, 'left', 'auto');
    setImportant(hub, 'right', right);
    setImportant(hub, 'bottom', bottom);
    setImportant(hub, 'width', 'auto');
    setImportant(hub, 'max-width', 'none');
    setImportant(hub, 'margin', '0');
    setImportant(hub, 'padding', '0');
    setImportant(hub, 'transform', 'none');
    setImportant(hub, 'translate', 'none');
    setImportant(hub, 'z-index', '99999');

    var anchor = hub.querySelector('.contact-hub-anchor');
    if (anchor) {
      setImportant(anchor, 'display', 'inline-flex');
      setImportant(anchor, 'width', 'auto');
      setImportant(anchor, 'max-width', 'none');
      setImportant(anchor, 'justify-content', 'flex-end');
      setImportant(anchor, 'margin', '0');
    }

    if (chatbot) {
      if (chatbot.parentElement !== document.body) {
        document.body.appendChild(chatbot);
      }
      setImportant(chatbot, 'position', 'fixed');
      setImportant(chatbot, 'left', 'auto');
      setImportant(chatbot, 'right', right);
      setImportant(chatbot, 'z-index', '99998');
    }

    requestAnimationFrame(function () {
      verifyPin(hub);
    });
  }

  function verifyPin(hub) {
    if (!hub || !hub.getBoundingClientRect) return;
    var rect = hub.getBoundingClientRect();
    var vw = document.documentElement.clientWidth || window.innerWidth;
    var rightGap = vw - rect.right;
    var isCentered = rect.left > vw * 0.25 && rect.left < vw * 0.55;

    if (isCentered || rightGap > 80 || rightGap < 0) {
      setImportant(hub, 'left', 'auto');
      setImportant(hub, 'right', (window.innerWidth <= 768 ? 14 : PIN_RIGHT) + 'px');
      setImportant(hub, 'transform', 'none');
      setImportant(hub, 'margin-left', '0');
      setImportant(hub, 'margin-right', '0');
    }
  }

  function boot() {
    var hub = document.getElementById('contact-hub');
    var fab = document.getElementById('contact-hub-fab');
    var menu = document.getElementById('contact-hub-menu');
    var chatbot = document.getElementById('sf-chatbot');
    var chatClose = document.getElementById('sf-chatbot-close');
    var chatMessages = document.getElementById('sf-chatbot-messages');
    var chatQuick = document.getElementById('sf-chatbot-quick');
    var chatForm = document.getElementById('sf-chatbot-form');
    var chatInput = document.getElementById('sf-chatbot-input');

    if (!hub || !fab || !menu) {
      setTimeout(boot, 120);
      return;
    }

    pinHub(hub, chatbot);

    function repin() { pinHub(hub, chatbot); }
    window.addEventListener('resize', repin);
    window.addEventListener('orientationchange', function () { setTimeout(repin, 150); });
    window.addEventListener('scroll', repin, { passive: true });
    window.addEventListener('load', repin);
    setTimeout(repin, 400);
    setTimeout(repin, 1200);

    var menuOpen = false;
    var chatOpen = false;
    var chatReady = false;
    var touchHandled = false;

    function setMenuOpen(open) {
      menuOpen = open;
      hub.classList.toggle('open', open);
      fab.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      repin();
    }

    function showTyping() {
      if (!chatMessages) return null;
      var el = document.createElement('div');
      el.className = 'sf-chatbot-msg sf-chatbot-msg--bot sf-chatbot-typing';
      el.innerHTML = '<span class="sf-chatbot-msg-avatar">SF</span><div class="sf-chatbot-bubble"><span></span><span></span><span></span></div>';
      chatMessages.appendChild(el);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return el;
    }

    function appendMsg(text, role) {
      if (!chatMessages) return;
      var el = document.createElement('div');
      el.className = 'sf-chatbot-msg sf-chatbot-msg--' + role;
      if (role === 'bot') {
        el.innerHTML = '<span class="sf-chatbot-msg-avatar">SF</span><div class="sf-chatbot-bubble">' + text + '</div>';
      } else {
        var bubble = document.createElement('div');
        bubble.className = 'sf-chatbot-bubble';
        bubble.textContent = text;
        el.appendChild(bubble);
      }
      chatMessages.appendChild(el);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function initDummyChat() {
      if (chatReady || !chatMessages) return;
      chatReady = true;
      if (chatQuick) {
        chatQuick.innerHTML = [
          'Product prices',
          'Delivery time',
          'Warranty info',
          'Talk on WhatsApp'
        ].map(function (q) {
          return '<button type="button" class="sf-chatbot-chip" data-msg="' + q + '">' + q + '</button>';
        }).join('');
        chatQuick.querySelectorAll('.sf-chatbot-chip').forEach(function (chip) {
          chip.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var msg = chip.getAttribute('data-msg');
            if (/whatsapp/i.test(msg)) {
              window.open(WHATSAPP_URL, '_blank', 'noopener');
              return;
            }
            sendUserMessage(msg);
          });
        });
      }
      appendMsg(pick(DUMMY_REPLIES.greeting), 'bot');
    }

    function openChat() {
      setMenuOpen(false);
      chatOpen = true;
      if (chatbot) {
        chatbot.classList.add('open');
        chatbot.setAttribute('aria-hidden', 'false');
      }
      initDummyChat();
      if (chatInput) setTimeout(function () { chatInput.focus(); }, 300);
    }

    function closeChat() {
      chatOpen = false;
      if (chatbot) {
        chatbot.classList.remove('open');
        chatbot.setAttribute('aria-hidden', 'true');
      }
    }

    function sendUserMessage(text) {
      var msg = (text || '').trim();
      if (!msg) return;
      if (chatInput) chatInput.value = '';
      appendMsg(msg, 'user');
      var typing = showTyping();
      setTimeout(function () {
        if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
        appendMsg(pickReply(msg), 'bot');
      }, 700 + Math.random() * 600);
    }

    function toggleMenu(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setMenuOpen(!menuOpen);
    }

    fab.addEventListener('click', function (e) {
      if (touchHandled) {
        touchHandled = false;
        return;
      }
      toggleMenu(e);
    });

    fab.addEventListener('touchend', function (e) {
      touchHandled = true;
      toggleMenu(e);
    }, { passive: false });

    var chatBtn = menu.querySelector('[data-action="chat"]');
    if (chatBtn) {
      chatBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openChat();
      });
    }

    if (chatClose) chatClose.addEventListener('click', closeChat);

    if (chatForm) {
      chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        sendUserMessage(chatInput ? chatInput.value : '');
      });
    }

    document.addEventListener('click', function (e) {
      if (menuOpen && !e.target.closest('#contact-hub')) setMenuOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (chatOpen) closeChat();
      else if (menuOpen) setMenuOpen(false);
    });

    window.__sfContactHubReady = true;
    window.SF_toggleContactMenu = function () { setMenuOpen(!menuOpen); };
    window.SF_openChatbot = openChat;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
