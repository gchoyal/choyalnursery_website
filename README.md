# Choyal Nursery — Static Website

प्रीमियम, एनिमेटेड एक-पेज वेबसाइट (पूरी तरह Hindi में) — किसी सर्वर के root में सीधे अपलोड करने के लिए तैयार।

## फाइल संरचना
```
index.html              ← मुख्य पेज (इसे root में रखें)
assets/
  css/styles.css        ← सम्पूर्ण डिज़ाइन व स्टाइल
  js/script.js          ← सभी एनिमेशन व इंटरैक्शन
  images/               ← सभी फोटो (पौधे, हार्डवेयर, गैलरी, लोगो)
```

## डिप्लॉय कैसे करें (Static Hosting)
1. इस पूरे `choyal_site` फोल्डर का सारा कंटेंट अपने डोमेन (choyalnursery.in) के root/public_html में अपलोड करें।
2. सुनिश्चित करें कि `index.html`, `assets/` फोल्डर के साथ root में है।
3. बस! कोई बिल्ड/सर्वर ज़रूरी नहीं — यह pure HTML/CSS/JS है।
   - Hosting विकल्प: cPanel/Hostinger, Netlify, Vercel, GitHub Pages, या कोई भी static host.

## हीरो में बैकग्राउंड वीडियो कैसे लगाएँ (वैकल्पिक)
अभी हीरो में **सिनेमैटिक क्रॉसफेड स्लाइडशो** (वीडियो जैसा दिखने वाला) है — हल्का व तेज़।
असली वीडियो लगाने के लिए `index.html` में `.hero__slideshow` के अंदर slides हटाकर ये डालें:
```html
<video class="hero__video" autoplay muted loop playsinline poster="assets/images/hero.jpg">
  <source src="assets/videos/nursery.mp4" type="video/mp4">
</video>
```
फिर अपना `nursery.mp4` फाइल `assets/videos/` फोल्डर में रख दें। (कोड में यह comment के रूप में पहले से मौजूद है।)

## फीचर्स
- सीड→पौधा ग्रोइंग लोडिंग स्क्रीन, गिरती हुई पत्तियाँ, कर्सर लीफ-ट्रेल, पैरालैक्स हीरो
- सिनेमैटिक वीडियो-स्टाइल हीरो (4 इमेज क्रॉसफेड + Ken Burns ज़ूम), उठते particles, शब्द-दर-शब्द heading
- स्क्रॉल प्रोग्रेस बार, back-to-top बटन, कैटेगरी marquee, 3D tilt प्रोडक्ट कार्ड, टाइमलाइन grow एनिमेशन
- स्क्रॉल रिवील एनिमेशन, काउंटर एनिमेशन, प्रोडक्ट hover इफेक्ट्स
- 11 पौधों के कार्ड + 6 कृषि हार्डवेयर कार्ड (मात्रा सिलेक्टर सहित)
- "ऑर्डर करें" बटन → सीधे कॉल (tel:+918435155366)
- हर प्रोडक्ट पर WhatsApp बटन (प्रोडक्ट नाम व मात्रा के साथ ऑटो-मैसेज)
- गैलरी lightbox, FAQ accordion, टेस्टिमोनियल स्लाइडर
- फिक्स्ड bottom-center "अभी कॉल करें" (दोनों नंबर popup), floating WhatsApp
- Google Map embed, संपर्क फॉर्म → WhatsApp
- SEO meta tags + LocalBusiness schema, मोबाइल-फर्स्ट रिस्पॉन्सिव

## नंबर बदलने हों तो
`assets/js/script.js` के सबसे ऊपर `PHONE` वैरिएबल और `index.html` में `tel:` / `wa.me` लिंक अपडेट करें।

## नोट
- कार्ट हटा दिया गया है (आपके अनुरोध अनुसार) — सिर्फ़ Order Now (कॉल) + WhatsApp.
- सभी कीमतें placeholder हैं — `script.js` के `PLANTS` / `HARDWARE` में आसानी से बदलें।
