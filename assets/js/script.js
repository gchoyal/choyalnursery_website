/* ============================================================
   Choyal Nursery — Interactions & Animations (Vanilla JS)
   ============================================================ */
(function () {
  "use strict";

  var PHONE = "918435155366";
  var WA_BASE = "नमस्ते, मुझे Choyal Nursery से यह उत्पाद ऑर्डर करना है।";

  /* ---------- Product data ---------- */
  var PLANTS = [
    { img: "chilli", name: "मिर्च के पौधे", cat: "veg", price: 3, unit: "प्रति पौधा", desc: "तीखी एवं हाइब्रिड मिर्च के मजबूत, रोग-मुक्त पौधे।", stock: true },
    { img: "tomato", name: "टमाटर के पौधे", cat: "veg", price: 3, unit: "प्रति पौधा", desc: "रोग प्रतिरोधी हाइब्रिड टमाटर के स्वस्थ पौधे।", stock: true },
    { img: "brinjal", name: "बैंगन के पौधे", cat: "veg", price: 3, unit: "प्रति पौधा", desc: "मोटे, चमकदार फल देने वाले बैंगन के पौधे।", stock: true },
    { img: "cauliflower", name: "फूलगोभी के पौधे", cat: "veg", price: 2.5, unit: "प्रति पौधा", desc: "सफेद, ठोस फूल वाली उन्नत फूलगोभी।", stock: true },
    { img: "cabbage", name: "पत्तागोभी के पौधे", cat: "veg", price: 2.5, unit: "प्रति पौधा", desc: "कसी हुई, भारी पत्तागोभी के स्वस्थ पौधे।", stock: true },
    { img: "gourd", name: "लौकी के पौधे", cat: "veg", price: 4, unit: "प्रति पौधा", desc: "अधिक उपज देने वाली हाइब्रिड लौकी।", stock: true },
    { img: "cucumber", name: "खीरा के पौधे", cat: "veg", price: 4, unit: "प्रति पौधा", desc: "कुरकुरे, हरे खीरे के तेजी से बढ़ने वाले पौधे।", stock: true },
    { img: "hybrid", name: "हाइब्रिड सब्जी पौधे", cat: "veg", price: 5, unit: "प्रति पौधा", desc: "उच्च उपज वाली चुनिंदा हाइब्रिड किस्में।", stock: true },
    { img: "fruit", name: "फलदार पौधे", cat: "fruit", price: 60, unit: "प्रति पौधा", desc: "आम, अमरूद, अनार आदि के ग्राफ्टेड पौधे।", stock: true },
    { img: "flower", name: "फूलों के पौधे", cat: "flower", price: 15, unit: "प्रति पौधा", desc: "गेंदा, पिटूनिया एवं मौसमी रंग-बिरंगे फूल।", stock: true },
    { img: "ornamental", name: "सजावटी पौधे", cat: "flower", price: 40, unit: "प्रति पौधा", desc: "घर एवं बगीचे के लिए आकर्षक सजावटी पौधे।", stock: true }
  ];

  var HARDWARE = [
    { img: "pvc", name: "PVC एवं HDPE पाइप", price: 120, unit: "प्रति मीटर से", desc: "मजबूत व टिकाऊ सिंचाई पाइप, सभी साइज़ में।", stock: true },
    { img: "drip", name: "ड्रिप पाइप", price: 8, unit: "प्रति मीटर से", desc: "पानी की बचत करने वाली ड्रिप इरिगेशन लाइन।", stock: true },
    { img: "fittings", name: "पाइप फिटिंग्स (Elbow, Tee, Joiner)", price: 15, unit: "से शुरू", desc: "एल्बो, टी, जॉइनर सहित सभी कनेक्टर।", stock: true },
    { img: "valve", name: "बॉल वाल्व एवं फुट वाल्व", price: 90, unit: "से शुरू", desc: "वॉटर कंट्रोल बॉल वाल्व व फुट वाल्व।", stock: true },
    { img: "sprayer", name: "स्प्रेयर एवं पार्ट्स", price: 1200, unit: "से शुरू", desc: "नैपसैक स्प्रेयर, नोज़ल व स्प्रेयर पार्ट्स।", stock: true },
    { img: "tools", name: "कृषि उपकरण", price: 150, unit: "से शुरू", desc: "खुरपी, कटर सहित ज़रूरी कृषि औज़ार।", stock: true }
  ];

  function rupee(n) { return "₹" + (Number.isInteger(n) ? n : n.toFixed(1)); }
  function waLink(extra) { return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(WA_BASE + (extra ? "\n" + extra : "")); }

  function cardHTML(p) {
    var stockBadge = p.stock
      ? '<span class="pcard__stock"><i class="fa-solid fa-circle-check"></i> उपलब्ध</span>'
      : '<span class="pcard__stock out"><i class="fa-solid fa-circle-xmark"></i> स्टॉक नहीं</span>';
    return (
      '<article class="pcard reveal" data-cat="' + (p.cat || "hw") + '">' +
        '<div class="pcard__media">' + stockBadge +
          '<img src="assets/images/' + p.img + '.jpg" alt="' + p.name + '" loading="lazy">' +
        "</div>" +
        '<div class="pcard__body">' +
          '<h3 class="pcard__name">' + p.name + "</h3>" +
          '<p class="pcard__desc">' + p.desc + "</p>" +
          '<div class="pcard__price"><b>' + rupee(p.price) + "</b><span>" + p.unit + "</span></div>" +
          '<div class="qty"><label>मात्रा</label>' +
            '<button type="button" data-act="dec" aria-label="कम करें">−</button>' +
            '<input type="number" min="1" value="100" aria-label="मात्रा">' +
            '<button type="button" data-act="inc" aria-label="बढ़ाएँ">+</button>' +
          "</div>" +
          '<div class="pcard__actions">' +
            '<a class="btn btn--accent" href="tel:+' + PHONE + '"><i class="fa-solid fa-phone"></i> ऑर्डर करें</a>' +
            '<a class="btn btn--wa" data-wa target="_blank" rel="noopener" href="' + waLink(p.name) + '"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }
  function renderGrid(id, list) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = list.map(cardHTML).join("");
  }
  renderGrid("plantGrid", PLANTS);
  renderGrid("hardwareGrid", HARDWARE);

  /* ---------- Hero heading: word-by-word reveal ---------- */
  (function heroWords() {
    var t = document.getElementById("heroTitle");
    if (!t) return;
    var nodes = Array.from(t.childNodes);
    t.innerHTML = "";
    var i = 0;
    nodes.forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(function (w) {
          if (!w.trim()) { t.appendChild(document.createTextNode(w)); return; }
          var s = document.createElement("span");
          s.className = "word"; s.textContent = w;
          s.style.animationDelay = (0.3 + i * 0.08) + "s"; i++;
          t.appendChild(s);
        });
      } else {
        node.classList.add("word");
        node.style.animationDelay = (0.3 + i * 0.08) + "s"; i++;
        t.appendChild(node);
      }
    });
  })();

  /* ---------- Hero rising particles ---------- */
  (function particles() {
    var box = document.getElementById("heroParticles");
    if (!box) return;
    for (var i = 0; i < 22; i++) {
      var p = document.createElement("span");
      p.className = "particle";
      var sz = 3 + Math.random() * 7;
      p.style.width = sz + "px"; p.style.height = sz + "px";
      p.style.left = Math.random() * 100 + "%";
      p.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
      p.style.animation = "rise " + (8 + Math.random() * 10) + "s linear " + (Math.random() * 8) + "s infinite";
      box.appendChild(p);
    }
  })();

  /* ---------- Marquee content ---------- */
  (function marquee() {
    var track = document.getElementById("marqueeTrack");
    if (!track) return;
    var items = ["मिर्च के पौधे", "टमाटर के पौधे", "बैंगन के पौधे", "फूलगोभी", "पत्तागोभी", "लौकी", "खीरा", "हाइब्रिड सब्जी", "फलदार पौधे", "फूलों के पौधे", "ड्रिप सिंचाई", "PVC पाइप", "कृषि उपकरण"];
    var html = items.map(function (t) { return '<span><i class="fa-solid fa-seedling"></i> ' + t + "</span>"; }).join("");
    track.innerHTML = html + html; // duplicate for seamless loop
  })();

  /* ---------- Quantity steppers + dynamic WhatsApp ---------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-act]");
    if (!btn) return;
    var qty = btn.parentElement.querySelector("input");
    var v = parseInt(qty.value, 10) || 1;
    v = btn.dataset.act === "inc" ? v + 1 : Math.max(1, v - 1);
    qty.value = v;
    updateWa(btn.closest(".pcard"));
  });
  document.addEventListener("input", function (e) {
    if (e.target.matches(".qty input")) updateWa(e.target.closest(".pcard"));
  });
  function updateWa(card) {
    if (!card) return;
    var wa = card.querySelector("[data-wa]");
    var name = card.querySelector(".pcard__name").textContent;
    var q = card.querySelector(".qty input").value;
    wa.href = waLink(name + " — मात्रा: " + q);
  }

  /* ---------- 3D tilt on product cards ---------- */
  function bindTilt() {
    document.querySelectorAll(".pcard").forEach(function (card) {
      if (card.dataset.tilt) return;
      card.dataset.tilt = "1";
      card.addEventListener("mousemove", function (e) {
        if (window.innerWidth < 768) return;
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(800px) rotateX(" + (-y * 6) + "deg) rotateY(" + (x * 6) + "deg) translateY(-8px)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }
  bindTilt();

  /* ---------- Product filter ---------- */
  var filters = document.getElementById("plantFilters");
  if (filters) {
    filters.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      filters.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      var f = chip.dataset.filter;
      document.querySelectorAll("#plantGrid .pcard").forEach(function (card) {
        var show = f === "all" || card.dataset.cat === f;
        card.style.display = show ? "" : "none";
      });
    });
  }

  /* ---------- Loader ---------- */
  window.addEventListener("load", function () {
    setTimeout(function () {
      var l = document.getElementById("loader");
      if (l) l.classList.add("hide");
    }, 2200);
  });

  /* ---------- Scroll: header, parallax, progress, back-to-top ---------- */
  var header = document.getElementById("header");
  var slides = document.getElementById("heroSlides");
  var progress = document.getElementById("progress");
  var toTop = document.getElementById("toTop");
  function onScroll() {
    var y = window.scrollY;
    if (y > 40) header.classList.add("scrolled"); else header.classList.remove("scrolled");
    if (slides && y < window.innerHeight) slides.style.transform = "translateY(" + y * 0.3 + "px) scale(1.02)";
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
    if (toTop) { if (y > 600) toTop.classList.add("show"); else toTop.classList.remove("show"); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- Scroll reveal + counters + timeline grow ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("visible");
        if (en.target.classList.contains("stat__num")) countUp(en.target);
        if (en.target.id === "timeline") en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(function (el, i) {
    if (!el.style.transitionDelay) el.style.transitionDelay = (i % 4) * 0.07 + "s";
    io.observe(el);
  });
  document.querySelectorAll(".stat__num").forEach(function (el) { io.observe(el); });
  var tl = document.getElementById("timeline");
  if (tl) io.observe(tl);

  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || "";
    var dur = 1600, start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString("en-IN") + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString("en-IN") + suffix;
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Falling leaves ---------- */
  var field = document.getElementById("leafField");
  var leafSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>';
  function spawnLeaf() {
    if (!field || document.hidden) return;
    var leaf = document.createElement("div");
    leaf.className = "leaf-fall";
    leaf.innerHTML = leafSVG;
    var size = 12 + Math.random() * 16;
    var dur = 7 + Math.random() * 7;
    var drift = (Math.random() * 160 - 80);
    var hue = ["hsl(134 55% 40%)", "hsl(96 62% 55%)", "hsl(140 60% 35%)", "hsl(43 90% 55%)"][Math.floor(Math.random() * 4)];
    leaf.style.left = Math.random() * 100 + "vw";
    leaf.style.color = hue;
    leaf.style.fontSize = size + "px";
    leaf.style.opacity = (0.35 + Math.random() * 0.35).toFixed(2);
    leaf.animate([
      { transform: "translate(0,-40px) rotate(0deg)" },
      { transform: "translate(" + drift + "px," + (window.innerHeight + 80) + "px) rotate(" + (360 + Math.random() * 360) + "deg)" }
    ], { duration: dur * 1000, easing: "linear" });
    field.appendChild(leaf);
    setTimeout(function () { leaf.remove(); }, dur * 1000);
  }
  setInterval(spawnLeaf, 1400);

  /* ---------- Cursor leaf trail ---------- */
  var lastTrail = 0;
  window.addEventListener("mousemove", function (e) {
    var now = Date.now();
    if (now - lastTrail < 90) return;
    lastTrail = now;
    var t = document.createElement("i");
    t.className = "fa-solid fa-leaf trail-leaf";
    t.style.left = e.clientX + "px";
    t.style.top = e.clientY + "px";
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 900);
  }, { passive: true });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".acc__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.parentElement;
      var a = item.querySelector(".acc__a");
      var open = item.classList.contains("open");
      document.querySelectorAll(".acc__item.open").forEach(function (it) {
        it.classList.remove("open");
        it.querySelector(".acc__a").style.maxHeight = null;
      });
      if (!open) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });

  /* ---------- Testimonials slider ---------- */
  var track = document.getElementById("tTrack");
  if (track) {
    var step = function () { var c = track.querySelector(".tcard"); return c ? c.offsetWidth + 22 : 360; };
    document.getElementById("tNext").addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    document.getElementById("tPrev").addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    var autoT = setInterval(function () {
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 8) track.scrollTo({ left: 0, behavior: "smooth" });
      else track.scrollBy({ left: step(), behavior: "smooth" });
    }, 4500);
    track.addEventListener("pointerenter", function () { clearInterval(autoT); });
  }

  /* ---------- Gallery lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  document.querySelectorAll(".masonry__item").forEach(function (fig) {
    fig.addEventListener("click", function () {
      lbImg.src = fig.dataset.img;
      lb.classList.add("show");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });
  function closeLb() { lb.classList.remove("show"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  document.getElementById("lbClose").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });

  var lbStyle = document.createElement("style");
  lbStyle.textContent = ".lightbox{position:fixed;inset:0;z-index:9997;background:hsl(150 60% 6% / .92);display:none;align-items:center;justify-content:center;padding:1.5rem;backdrop-filter:blur(6px)}.lightbox.show{display:flex;animation:lbIn .3s ease}.lightbox img{max-width:92vw;max-height:88vh;border-radius:14px;box-shadow:0 30px 60px -10px rgba(0,0,0,.6)}.lightbox__close{position:absolute;top:1.2rem;right:1.4rem;width:46px;height:46px;border-radius:50%;background:hsl(0 0% 100% / .15);color:#fff;font-size:1.3rem;display:grid;place-items:center}.lightbox__close:hover{background:hsl(0 0% 100% / .28)}@keyframes lbIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}";
  document.head.appendChild(lbStyle);

  /* ---------- Sticky call CTA popup ---------- */
  var callBtn = document.getElementById("callBtn");
  var callPopup = document.getElementById("callPopup");
  callBtn.addEventListener("click", function (e) { e.stopPropagation(); callPopup.classList.toggle("show"); });
  document.addEventListener("click", function (e) { if (!e.target.closest(".call-cta")) callPopup.classList.remove("show"); });

  /* ---------- Contact form -> WhatsApp ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cName").value.trim();
      var phone = document.getElementById("cPhone").value.trim();
      var msg = document.getElementById("cMsg").value.trim();
      var note = document.getElementById("formNote");
      if (!name || !phone) { note.textContent = "कृपया नाम और मोबाइल नंबर भरें।"; note.style.color = "hsl(0 65% 50%)"; return; }
      var text = "नमस्ते Choyal Nursery,\nनाम: " + name + "\nमोबाइल: " + phone + (msg ? "\nसंदेश: " + msg : "");
      note.style.color = ""; note.textContent = "WhatsApp खुल रहा है... धन्यवाद " + name + "!";
      window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(text), "_blank");
      form.reset();
    });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
