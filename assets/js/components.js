/* ============================================================
   SILICONCORE LOCAL â Shared Header + Footer Components
   Injected by each page via <script> at top/bottom of body
   ============================================================ */

/* Determine path depth for relative asset links.
   On GitHub Pages the URL includes a repo subfolder (e.g. /silicon-core-local/)
   that doesn't exist on localhost â strip it before counting depth. */
const _onGHPages = window.location.hostname.endsWith('github.io');
const _pathname  = _onGHPages
  ? '/' + window.location.pathname.split('/').slice(2).join('/')
  : window.location.pathname;
const _depth = (_pathname.match(/\//g) || []).length - 1;
const _root  = _depth > 0 ? '../'.repeat(_depth) : './';

/* ââ Header ââââââââââââââââââââââââââââââââââââââââââââââââââ */
document.addEventListener('DOMContentLoaded', () => {

  /* Insert header */
  const headerEl = document.createElement('header');
  headerEl.className = 'site-header';
  headerEl.innerHTML = `
    <a class="logo" href="${_root}index.html">
      <img src="${_root}assets/images/logos/logo-siliconcore-blue.png"
           onerror="this.onerror=null;this.src='https://images.squarespace-cdn.com/content/v1/5d0a4fc001091b0001aa8e37/62d355ce-2327-4320-85c6-4300a8e4aff0/SC_Master_logo_blue.png'"
           alt="SiliconCore">
    </a>

    <!-- Desktop horizontal nav -->
    <nav class="desktop-nav" aria-label="Main navigation">
      <ul class="dn-list">

        <!-- Products (with nested flyouts) -->
        <li class="dn-item">
          <button class="dn-btn">Products <span class="dn-chevron"></span></button>
          <ul class="dn-dropdown">

            <!-- Indoor flyout -->
            <li>
              <button class="dn-sub-btn">Indoor <span class="dn-sub-arrow"></span></button>
              <ul class="dn-subflyout">
                <li class="dn-subflyout-group-label">By Pixel Pitch</li>
                <li><a href="${_root}products/indoor/0.6mm/index.html">0.6 mm</a></li>
                <li><a href="${_root}products/indoor/0.7mm/index.html">0.7 mm</a></li>
                <li><a href="${_root}products/indoor/0.9mm/index.html">0.9 mm</a></li>
                <li><a href="${_root}products/indoor/1.2mm/index.html">1.2 mm</a></li>
                <li><a href="${_root}products/indoor/1.5mm/index.html">1.5 mm</a></li>
                <li><a href="${_root}products/indoor/1.9mm/index.html">1.9 mm</a></li>
                <li><a href="${_root}products/indoor/2.5mm/index.html">2.5 mm</a></li>
                <li><a href="${_root}products/indoor/2.6mm/index.html">2.6 mm</a></li>
              </ul>
            </li>

            <!-- Outdoor flyout -->
            <li>
              <button class="dn-sub-btn">Outdoor <span class="dn-sub-arrow"></span></button>
              <ul class="dn-subflyout">
                <li class="dn-subflyout-group-label">By Pixel Pitch</li>
                <li><a href="${_root}products/outdoor/0.8mm/index.html">0.8 mm</a></li>
                <li><a href="${_root}products/outdoor/1.2mm/index.html">1.2 mm</a></li>
                <li><a href="${_root}products/outdoor/1.5mm/index.html">1.5 mm</a></li>
                <li><a href="${_root}products/outdoor/1.9mm/index.html">1.9 mm</a></li>
                <li><a href="${_root}products/outdoor/2.6mm/index.html">2.6 mm</a></li>
                <li><a href="${_root}products/outdoor/3.9mm/index.html">3.9 mm</a></li>
                <li><a href="${_root}products/outdoor/6.0mm/index.html">6.0 mm</a></li>
                <li><a href="${_root}products/outdoor/7.8mm/index.html">7.8 mm</a></li>
                <li><a href="${_root}products/outdoor/10.4mm/index.html">10.4 mm</a></li>
                <li><a href="${_root}products/outdoor/12.0mm/index.html">12.0 mm</a></li>
                <li><a href="${_root}products/outdoor/16.0mm/index.html">16.0 mm</a></li>
              </ul>
            </li>

            <!-- TAA flyout -->
            <li>
              <button class="dn-sub-btn">TAA <span class="dn-sub-arrow"></span></button>
              <ul class="dn-subflyout">
                <li><a href="${_root}taa-compliant-led-displays/index.html">TAA Products</a></li>
                <li class="dn-subflyout-divider"></li>
                <li class="dn-subflyout-group-label">TAA Indoor</li>
                <li><a href="${_root}products/taa/indoor/0.6mm/index.html">0.6 mm</a></li>
                <li><a href="${_root}products/taa/indoor/0.9mm/index.html">0.9 mm</a></li>
                <li><a href="${_root}products/taa/indoor/1.2mm/index.html">1.2 mm</a></li>
                <li><a href="${_root}products/taa/indoor/1.5mm/index.html">1.5 mm</a></li>
                <li class="dn-subflyout-divider"></li>
                <li class="dn-subflyout-group-label">TAA Outdoor</li>
                <li><a href="${_root}products/taa/outdoor/1.2mm/index.html">1.2 mm</a></li>
              </ul>
            </li>

                        <!-- Solutions â flyout -->
            <li>
              <button class="dn-sub-btn">Solutions <span class="dn-sub-arrow"></span></button>
              <ul class="dn-subflyout">
                <li><a href="${_root}products/trak-kit/index.html">TrakKit</a></li>
              </ul>
            </li>

          </ul>
        </li>

        <!-- Our Technology -->
        <li class="dn-item">
          <button class="dn-btn">Our Technology <span class="dn-chevron"></span></button>
          <ul class="dn-dropdown">
            <li><a href="${_root}unique-technologies/index.html">Unique Technologies</a></li>
            <li><a href="${_root}knowledge-base/index.html">Knowledge Base</a></li>
            <li><a href="${_root}why-siliconcore/index.html">Why SiliconCore</a></li>
          </ul>
        </li>

        <!-- Markets -->
        <li class="dn-item">
          <button class="dn-btn">Markets <span class="dn-chevron"></span></button>
          <ul class="dn-dropdown">
            <li><a href="${_root}virtual-production/index.html">Virtual Production</a></li>
            <li><a href="${_root}casestudies/index.html">Corporate</a></li>
            <li><a href="${_root}casestudies/index.html">Broadcast</a></li>
            <li><a href="${_root}casestudies/index.html">Hospitality</a></li>
          </ul>
        </li>

        <!-- Experience -->
        <li class="dn-item">
          <a class="dn-link" href="${_root}casestudies/index.html">Experience</a>
        </li>

        <!-- Support -->
        <li class="dn-item">
          <button class="dn-btn">Support <span class="dn-chevron"></span></button>
          <ul class="dn-dropdown">
            <li><a href="${_root}training/index.html">Training</a></li>
            <li><a href="${_root}knowledge-base/index.html">Knowledge Base</a></li>
            <li><a href="${_root}contact-us/index.html">Contact Support</a></li>
          </ul>
        </li>

        <!-- Contact -->
        <li class="dn-item">
          <a class="dn-link" href="${_root}contact-us/index.html">Contact</a>
        </li>

        <!-- About -->
        <li class="dn-item">
          <button class="dn-btn">About <span class="dn-chevron"></span></button>
          <ul class="dn-dropdown">
            <li><a href="${_root}about/index.html">About Us</a></li>
            <li><a href="${_root}awards/index.html">Awards</a></li>
            <li><a href="${_root}history/index.html">History</a></li>
            <li><a href="${_root}why-siliconcore/index.html">The Difference</a></li>
          </ul>
        </li>

      </ul>
    </nav>

    <!-- Hamburger (mobile only) -->
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  `;
  document.body.prepend(headerEl);

  /* Insert nav overlay */
  const navEl = document.createElement('nav');
  navEl.className = 'nav-overlay';
  navEl.innerHTML = `
    <ul class="nav-items">

      <li class="nav-item nav-folder">
        <button class="nav-folder-toggle">About <span class="nav-folder-arrow"></span></button>
        <ul class="nav-sub">
          <li><a href="${_root}about/index.html">About Us</a></li>
          <li><a href="${_root}awards/index.html">Awards</a></li>
          <li><a href="${_root}history/index.html">History</a></li>
          <li><a href="${_root}taa-compliant-led-displays/index.html">TAA Compliant LED Displays</a></li>
          <li><a href="${_root}training/index.html">Training</a></li>
          <li><a href="${_root}why-siliconcore/index.html">The Difference</a></li>
        </ul>
      </li>

      <li class="nav-item nav-folder">
        <button class="nav-folder-toggle">Technology <span class="nav-folder-arrow"></span></button>
        <ul class="nav-sub">
          <li><a href="${_root}unique-technologies/index.html">Unique Technologies</a></li>
          <li><a href="${_root}knowledge-base/index.html">Knowledge Base</a></li>
          <li><a href="${_root}why-siliconcore/index.html">Why SiliconCore</a></li>
        </ul>
      </li>

      <li class="nav-item nav-folder">
        <button class="nav-folder-toggle">Displays <span class="nav-folder-arrow"></span></button>
        <ul class="nav-sub">
          <li><a href="${_root}products/iris/index.html">Iris 0.78mm</a></li>
          <li><a href="${_root}products/camellia/index.html">Camellia 0.95mm</a></li>
          <li><a href="${_root}products/lavender/index.html">Lavender 1.2mm</a></li>
          <li><a href="${_root}products/magnolia/index.html">Magnolia 1.5mm</a></li>
          <li><a href="${_root}products/orchid/index.html">Orchid 1.9mm HB</a></li>
          <li><a href="${_root}products/peony/index.html">Peony 2.6mm</a></li>
          <li><a href="${_root}products/daffodil/index.html">Daffodil 2.5mm</a></li>
          <li><a href="${_root}products/tulip-indoor/index.html">Tulip 3.9mm â Indoor</a></li>
          <li><a href="${_root}products/tulip-outdoor/index.html">Tulip 3.9mm â Outdoor</a></li>
          <li><a href="${_root}products/lotus/index.html">Lotus 0.83mm</a></li>
          <li><a href="${_root}products/lily/index.html">Lily</a></li>
          <li><a href="${_root}products/magnolia-158/index.html">Magnolia 158"</a></li>
          <li><a href="${_root}products/silicon-floor/index.html">Silicon Floor</a></li>
          <li><a href="${_root}products/sunflower/index.html">Sunflower</a></li>
          <li><a href="${_root}products/mobile-foldable-columns/index.html">Mobile Foldable Columns</a></li>
          <li><a href="${_root}products/all-in-one/index.html">Mobile All-In-One LED</a></li>
          <li><a href="${_root}products/xr/index.html">XR LED Displays</a></li>
          <li><a href="${_root}products/led-outdoor-display/index.html">1.2mm Outdoor LED</a></li>
        </ul>
      </li>

      <li class="nav-item"><a href="${_root}products/enlighten/index.html">Enlighten</a></li>
      <li class="nav-item"><a href="${_root}casestudies/index.html">Experience</a></li>
      <li class="nav-item"><a href="${_root}virtual-production/index.html">Virtual Production</a></li>
      <li class="nav-item"><a href="${_root}news-1/index.html">News</a></li>
      <li class="nav-item"><a href="${_root}contact-us/index.html">Contact</a></li>
      <li class="nav-item"><a href="${_root}contact-us/index.html#signup">Sign Up</a></li>

    </ul>
  `;
  document.body.insertBefore(navEl, headerEl.nextSibling);

  /* Insert footer */
  const footerEl = document.createElement('footer');
  footerEl.className = 'site-footer';
  footerEl.innerHTML = `
    <div class="footer-inner">
      <div class="footer-col">
        <h4>About</h4>
        <ul>
          <li><a href="${_root}about/index.html">About Us</a></li>
          <li><a href="${_root}awards/index.html">Awards</a></li>
          <li><a href="${_root}history/index.html">History</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Technology</h4>
        <ul>
          <li><a href="${_root}why-siliconcore/index.html">Why SiliconCore</a></li>
          <li><a href="${_root}unique-technologies/index.html">Unique Technologies</a></li>
          <li><a href="${_root}knowledge-base/index.html">Knowledge Base</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Displays</h4>
        <ul>
          <li><a href="${_root}products/enlighten/index.html">Enlighten</a></li>
          <li><a href="${_root}products/lotus/index.html">Lotus 0.83mm</a></li>
          <li><a href="${_root}products/camellia/index.html">Camellia 0.95mm</a></li>
          <li><a href="${_root}products/lavender/index.html">Lavender 1.2mm</a></li>
          <li><a href="${_root}products/magnolia/index.html">Magnolia 1.5mm</a></li>
          <li><a href="${_root}products/orchid/index.html">Orchid 1.9mm HB</a></li>
          <li><a href="${_root}products/peony/index.html">Peony 2.6mm</a></li>
          <li><a href="${_root}products/daffodil/index.html">Daffodil 2.5mm</a></li>
          <li><a href="${_root}products/tulip-indoor/index.html">Tulip 3.9mm - Indoor</a></li>
          <li><a href="${_root}products/tulip-outdoor/index.html">Tulip 3.9mm - Outdoor</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Experience</h4>
        <ul>
          <li><a href="${_root}casestudies/index.html">Case Studies</a></li>
          <li><a href="${_root}virtual-production/index.html">Virtual Production</a></li>
          <li><a href="${_root}products/trak-kit/index.html">TRAK-KIT</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>News</h4>
        <ul>
          <li><a href="${_root}news-1/index.html">Latest News</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="${_root}contact-us/index.html">Get in Touch</a></li>
          <li><a href="${_root}privacy-statement/index.html">Privacy</a></li>
        </ul>
      </div>
      <div class="footer-social">
        <a href="https://twitter.com/siliconcore" target="_blank" aria-label="Twitter">ð</a>
        <a href="https://linkedin.com/company/siliconcore" target="_blank" aria-label="LinkedIn">in</a>
        <a href="https://youtube.com/siliconcore" target="_blank" aria-label="YouTube">â¶</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>890 Hillview Court, Suite 120 Milpitas, CA 95035, USA &nbsp;|&nbsp;
        TEL: +1 (408) 946 8185 &nbsp;|&nbsp;
        <a href="mailto:sales@silicon-core.com">sales@silicon-core.com</a>
      </span>
      <span>Â© 2024 SiliconCore Technology Inc. &nbsp;|&nbsp; <a href="${_root}privacy-statement/index.html">Privacy Policy</a></span>
    </div>
  `;
  document.body.appendChild(footerEl);

});
