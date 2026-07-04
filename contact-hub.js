/* Salon Factory — Contact FAB + Dummy Chatbot */
(function () {
  'use strict';

  if (window.__sfContactHubReady) return;

  const WHATSAPP_URL = 'https://wa.me/919876543210?text=Hi%20Salon%20Factory,%20I%20need%20help';

  const DUMMY_REPLIES = {
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
    const m = (text || '').toLowerCase();
    if (/hi|hello|hey|namaste|start/.test(m)) return pick(DUMMY_REPLIES.greeting);
    if (/price|cost|₹|chair|discount/.test(m)) return pick(DUMMY_REPLIES.price);
    if (/deliver|ship|days|track/.test(m)) return pick(DUMMY_REPLIES.delivery);
    if (/warrant|return|quality/.test(m)) return pick(DUMMY_REPLIES.warranty);
    if (/product|shop|catalog|station/.test(m)) return pick(DUMMY_REPLIES.product);
    return pick(DUMMY_REPLIES.default);
  }

  function pinHub(hub, chatbot) {
    var right = 'max(10px, env(safe-area-inset-right, 0px))';
    hub.style.cssText =
      'position:fixed!important;bottom:max(22px,env(safe-area-inset-bottom,0px))!important;' +
      'right:' + right + '!important;left:auto!important;top:auto!important;' +
      'z-index:99999!important;pointer-events:auto!important;margin:0!important;' +
      'width:auto!important;max-width:none!important;transform:none!important;';
    if (chatbot) {
      chatbot.style.right = right;
      chatbot.style.left = 'auto';
      chatbot.style.zIndex = '99998';
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

    if (hub.parentElement !== document.body) document.body.appendChild(hub);
    if (chatbot && chatbot.parentElement !== document.body) document.body.appendChild(chatbot);
    pinHub(hub, chatbot);

    var menuOpen = false;
    var chatOpen = false;
    var chatReady = false;
    var touchHandled = false;

    function setMenuOpen(open) {
      menuOpen = open;
      hub.classList.toggle('open', open);
      fab.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
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
