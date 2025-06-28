import {
  SHOP_CONTACT_INFO,
  NAV_ITEMS,
  Page,
  PRODUCTS_DATA,
  CATEGORIES_AVAILABLE,
} from './constants.js';

const mainContent = document.getElementById('app-main-content');
const headerContainer = document.getElementById('app-header');
const footerContainer = document.getElementById('app-footer');

let currentPage = Page.HOME;

// --- Icon Helper ---
function getIconSVG(name, additionalClasses = "w-5 h-5") {
  const icons = {
    home: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0l8.954 8.955M11.25 18.75v-5.25m0 0A2.25 2.25 0 0113.5 11.25h0A2.25 2.25 0 0115.75 13.5v5.25m0 0h3.75a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v9.75a2.25 2.25 0 002.25 2.25h3.75m-3.75 0h3.75m0-13.5H2.25m0 0A2.25 2.25 0 014.5 2.25h15A2.25 2.25 0 0121.75 4.5v15a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 19.5v-15Z" />',
    'wrench-screwdriver': '<path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.528-1.036.096-2.271-1.035-2.798l-1.551-.592a2.015 2.015 0 00-2.12.784L5.602 12.33M11.42 15.17L5.602 12.33m0 0a2.015 2.015 0 01.784-2.12l1.588-.592a2.652 2.652 0 012.798-1.035l3.031 2.496m0 0A2.652 2.652 0 0017.25 21M6.75 7.5l.256-.256a2.652 2.652 0 013.75 0l.256.256m-3.75 0l-1.5 1.5M10.5 10.5l-1.5 1.5m3.75-3.75l1.5-1.5m-3.75 0l3.75 3.75" />',
    phone: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.018-.991-.053-1.466l-.094-.465a1.125 1.125 0 00-1.265-.898l-.92.233c-.426.107-.852.002-1.148-.25l-.27-.27a1.5 1.5 0 00-2.122 0l-.636.635a1.125 1.125 0 01-1.591 0l-3.224-3.224a1.125 1.125 0 010-1.591l.635-.636a1.5 1.5 0 000-2.122l-.27-.27c-.248-.248-.357-.622-.25_1.148l.233_-.92a1.125 1.125 0 00-.898-1.265l-.465-.094A18.89 18.89 0 0013.372 3.82c-.475-.035-.95-.053-1.466-.053H9.75a2.25 2.25 0 00-2.25 2.25v2.25Z" />',
    sparkles: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09ZM18.25 12L17 14.188l-1.25.702L17 15.59l1.25.701L17 17l1.25.701L17 18.409l1.25.701L17 19.813l1.25.701L17 21.219l1.25.701L17 22.625l1.25.701L19.5 21.219l1.25-.701L19.5 19.813l1.25-.701L19.5 18.409l1.25-.701L19.5 17l1.25-.701L19.5 15.59l1.25-.702L19.5 14.188 18.25 12Z" />',
    'paper-airplane': '<path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />'
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${additionalClasses}">${icons[name] || ''}</svg>`;
}

// --- Render Functions ---
function renderHeader() {
  const navButtonsHTML = NAV_ITEMS.map(item => `
    <li>
      <button
        data-pageid="${item.id}"
        class="nav-button flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
          ${currentPage === item.id 
            ? 'bg-blue-700 text-white shadow-inner' 
            : 'text-gray-100 hover:bg-gray-800 hover:text-cyan-400'
          }"
      >
        ${getIconSVG(item.icon)}
        <span>${item.label}</span>
      </button>
    </li>
  `).join('');

  headerContainer.innerHTML = `
    <div class="bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 w-full">
      <div class="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <h1 class="text-3xl font-bold tracking-tight mb-4 sm:mb-0 text-white drop-shadow">${SHOP_CONTACT_INFO.name}</h1>
        <nav>
          <ul class="flex space-x-2 sm:space-x-4">
            ${navButtonsHTML}
          </ul>
        </nav>
      </div>
    </div>
  `;
  headerContainer.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => navigateTo(button.dataset.pageid));
  });
}

function renderFooter() {
  const currentYear = new Date().getFullYear();
  footerContainer.innerHTML = `
    <div class="container mx-auto px-4">
      <p class="text-slate-400">&copy; ${currentYear} ${SHOP_CONTACT_INFO.name}. All rights reserved.</p>
      <p class="text-sm mt-1 text-slate-500">Built with HTML, CSS, and JavaScript.</p>
    </div>
  `;
}

function renderHomePage() {
  mainContent.innerHTML = `
    <div class="text-center">
      <section class="bg-gradient-to-br from-slate-900 to-blue-700 text-white py-20 px-6 rounded-xl shadow-xl mb-12">
        <h2 class="text-5xl font-extrabold mb-6 drop-shadow-md text-amber-400">Welcome to Hardware Harmony Hub!</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto drop-shadow-sm text-slate-100">
          Your trusted partner for all building, renovation, and decoration needs. Quality materials, expert advice.
        </p>
        <button id="home-explore-products"
          class="bg-amber-400 text-slate-900 font-semibold py-3 px-8 rounded-lg text-lg hover:bg-amber-300 hover:text-slate-900 transition-transform transform hover:scale-105 shadow-md"
        >
          Explore Our Products
        </button>
      </section>

      <section class="mb-12">
        <h3 class="text-3xl font-bold text-slate-900 mb-8">Discover Our Range</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${CATEGORIES_AVAILABLE.slice(0, 3).map(category => {
            return `
              <div class="category-promo-card bg-slate-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer" data-category-target="${category}">
                <h4 class="text-xl font-semibold text-blue-800 mb-2">${category}</h4>
                <p class="text-slate-600 text-sm">Find top-quality ${category.toLowerCase()} for your projects.</p>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <section class="bg-slate-100 py-12 px-6 rounded-xl shadow-lg">
        <h3 class="text-3xl font-bold text-slate-900 mb-6">Need Project Advice?</h3>
        <p class="text-lg text-slate-700 mb-6 max-w-xl mx-auto">
          Our AI Assistant is here to help! Get tips, ideas, and answers to your home improvement questions.
        </p>
        <button id="home-ask-helper"
          class="bg-blue-800 text-amber-400 font-semibold py-3 px-8 rounded-lg text-lg hover:bg-blue-900 hover:text-amber-300 transition-transform transform hover:scale-105 shadow-md"
        >
          Ask Harmony Helper
        </button>
      </section>
    </div>
  `;
  document.getElementById('home-explore-products').addEventListener('click', () => navigateTo(Page.PRODUCTS));
  // Add click for both div and a
  document.querySelectorAll('.category-promo-card').forEach(card => {
      card.addEventListener('click', (e) => {
          const cat = card.getAttribute('data-category-target');
          navigateTo(Page.PRODUCTS);
          renderProductsPage(cat);
          e.preventDefault();
      });
  });
  document.getElementById('home-ask-helper').addEventListener('click', () => navigateTo(Page.AI_ASSISTANT));
}

function renderProductsPage(selectedCategory = 'all') {
  const categoriesHtml = `
    <button data-category="all" class="category-filter-button px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150
      ${selectedCategory === 'all' ? 'bg-indigo-700 text-white shadow-md' : 'bg-white text-indigo-700 hover:bg-neutral-100 border border-indigo-300'}">
      All Products
    </button>
    ${CATEGORIES_AVAILABLE.map(category => `
      <button data-category="${category}" class="category-filter-button px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150
        ${selectedCategory === category ? 'bg-indigo-700 text-white shadow-md' : 'bg-white text-indigo-700 hover:bg-neutral-100 border border-indigo-300'}">
        ${category}
      </button>
    `).join('')}
  `;

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(product => product.category === selectedCategory);

  const productsHtml = filteredProducts.length > 0 ? filteredProducts.map(product => `
    <div class="bg-neutral-50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col">
      <img class="w-full h-56 object-cover" src="${product.imageUrl}" alt="${product.name}" loading="lazy" />
      <div class="p-6 flex flex-col flex-grow">
        <h3 class="text-xl font-semibold text-indigo-700 mb-2">${product.name}</h3>
        <p class="text-sm text-neutral-600 mb-1"><span class="font-medium">Category:</span> ${product.category}</p>
        <p class="text-neutral-700 text-sm mb-4 flex-grow">${product.description}</p>
        <div class="mt-auto">
          <p class="text-2xl font-bold text-emerald-700 mb-4">$${product.price.toFixed(2)}</p>
          <button class="w-full bg-indigo-700 text-white py-2 px-4 rounded-lg hover:bg-indigo-800 transition-colors duration-150">
            View Details
          </button>
        </div>
      </div>
    </div>
  `).join('') : '<p class="text-center text-neutral-500 text-lg col-span-full">No products found for this category.</p>';

  mainContent.innerHTML = `
    <div>
      <h2 class="text-4xl font-bold text-center text-neutral-900 mb-4">Our Products</h2>
      <p class="text-center text-neutral-600 mb-10 text-lg">Browse our wide selection of quality hardware and materials.</p>
      <div class="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
        ${categoriesHtml}
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        ${productsHtml}
      </div>
    </div>
  `;

  document.querySelectorAll('.category-filter-button').forEach(button => {
    button.addEventListener('click', (e) => {
      renderProductsPage(e.target.dataset.category);
    });
  });
}

function renderContactPage() {
  mainContent.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <h2 class="text-4xl font-bold text-center text-neutral-900 mb-10">Contact Us</h2>
      <div id="contact-form-message" class="mb-4"></div>
      <div class="grid md:grid-cols-2 gap-10 bg-neutral-50 p-8 rounded-xl shadow-xl">
        <div class="text-neutral-700">
          <h3 class="text-2xl font-semibold text-indigo-700 mb-4">${SHOP_CONTACT_INFO.name}</h3>
          <p class="mb-2"><strong>Address:</strong> ${SHOP_CONTACT_INFO.address}</p>
          <p class="mb-2"><strong>Phone:</strong> <a href="tel:${SHOP_CONTACT_INFO.phone}" class="text-indigo-700 hover:underline">${SHOP_CONTACT_INFO.phone}</a></p>
          <p class="mb-2"><strong>Email:</strong> <a href="mailto:${SHOP_CONTACT_INFO.email}" class="text-indigo-700 hover:underline">${SHOP_CONTACT_INFO.email}</a></p>
          <p class="mb-4"><strong>Hours:</strong> ${SHOP_CONTACT_INFO.hours}</p>
          <div class="mt-6">
            <h4 class="text-xl font-semibold text-indigo-700 mb-2">Visit Us</h4>
            <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
               <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1064.0122330039667!2d87.58572726961656!3d21.743565998755653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDQ0JzM2LjgiTiA4N8KwMzUnMTAuOSJF!5e1!3m2!1sen!2sin!4v1751095369193!5m2!1sen!2sin" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Shop Location"></iframe>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-semibold text-indigo-700 mb-4">Send us a Message</h3>
          <form id="contact-form" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-neutral-600">Full Name</label>
              <input type="text" name="name" id="name" required 
                     class="mt-1 block w-full px-3 py-2 bg-white border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-neutral-600">Email Address</label>
              <input type="email" name="email" id="email" required
                     class="mt-1 block w-full px-3 py-2 bg-white border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-neutral-600">Message</label>
              <textarea name="message" id="message" rows="4" required
                        class="mt-1 block w-full px-3 py-2 bg-white border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <div>
              <button type="submit"
                      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    const messageDiv = document.getElementById('contact-form-message');
    messageDiv.innerHTML = `
      <div class="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg">
        Thank you for your message! We'll get back to you soon.
      </div>`;
    e.target.reset();
    setTimeout(() => { messageDiv.innerHTML = ''; }, 5000);
  });
}
// --- Navigation ---
function navigateTo(pageId) {
  currentPage = pageId;
  renderHeader(); // Re-render header to update active button

  switch (pageId) {
    case Page.HOME:
      renderHomePage();
      break;
    case Page.PRODUCTS:
      renderProductsPage();
      break;
    case Page.CONTACT:
      renderContactPage();
      break;
    case Page.AI_ASSISTANT:
      renderAIAssistantPage();
      break;
    default:
      renderHomePage();
  }
   window.scrollTo(0, 0); // Scroll to top on page change
}

// --- Initial Load ---
function initializeApp() {
  renderHeader();
  renderFooter();
  navigateTo(Page.HOME); // Load initial page
}

document.addEventListener('DOMContentLoaded', initializeApp);
