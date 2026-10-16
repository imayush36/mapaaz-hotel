/* ==========================================================================
   MAPAAZ LUXURY HOTEL & FINE DINING - INTERACTIVE SCRIPT & ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. HERO BACKGROUND SLIDER ---
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroPrevBtn = document.getElementById('heroPrevBtn');
  const heroNextBtn = document.getElementById('heroNextBtn');
  let currentHeroSlide = 0;
  let heroSlideInterval = null;

  function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    currentHeroSlide = index;
  }

  function nextHeroSlide() {
    const nextIndex = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(nextIndex);
  }

  function prevHeroSlide() {
    const prevIndex = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(prevIndex);
  }

  if (heroPrevBtn && heroNextBtn) {
    heroNextBtn.addEventListener('click', () => {
      nextHeroSlide();
      resetHeroAutoplay();
    });

    heroPrevBtn.addEventListener('click', () => {
      prevHeroSlide();
      resetHeroAutoplay();
    });
  }

  function startHeroAutoplay() {
    heroSlideInterval = setInterval(nextHeroSlide, 6500);
  }

  function resetHeroAutoplay() {
    clearInterval(heroSlideInterval);
    startHeroAutoplay();
  }

  startHeroAutoplay();

  // --- 2. HEADER SCROLL & ACTIVE LINK HIGHLIGHTING ---
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // ScrollSpy for Nav Links
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // --- 3. MOBILE MENU TOGGLE ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }

  // --- 4. ROOMS & SUITES DATA & INTERACTIVE CAROUSEL ---
  const roomsData = [
    {
      id: 'standard-room',
      title: 'Standard room',
      price: '$210',
      description: 'Cozy and modern, this room offers essential amenities for a comfortable stay, perfect for solo travelers or couples seeking relaxation.',
      size: 'ROOM SIZE 28 M²',
      view: 'STREET VIEW',
      bed: '1 KING BED',
      smoking: 'SMOKING - NO',
      guests: '2 ADULTS - 1 CHILD',
      breakfast: 'BREAKFAST - YES',
      image: 'assets/images/room-standard.jpg'
    },
    {
      id: 'deluxe-suite',
      title: 'Deluxe suite',
      price: '$340',
      description: 'Spacious and tastefully furnished with panoramic city skyline views, a separate lounge area, and an Italian marble soaking bath.',
      size: 'ROOM SIZE 45 M²',
      view: 'SKYLINE VIEW',
      bed: '1 SUPER KING BED',
      smoking: 'SMOKING - NO',
      guests: '2 ADULTS - 2 CHILDREN',
      breakfast: 'BREAKFAST - YES',
      image: 'assets/images/room-deluxe.jpg'
    },
    {
      id: 'presidential-suite',
      title: 'Presidential suite',
      price: '$580',
      description: 'The pinnacle of urban elegance featuring a private outdoor terrace, whirlpool jacuzzi, personalized 24h butler service, and dedicated dining salon.',
      size: 'ROOM SIZE 85 M²',
      view: 'CITY & HARBOR VIEW',
      bed: '2 KING BEDS',
      smoking: 'SMOKING - NO',
      guests: '4 ADULTS - 2 CHILDREN',
      breakfast: 'PREMIUM VIP BREAKFAST',
      image: 'assets/images/room-presidential.jpg'
    }
  ];

  let currentRoomIndex = 0;
  const roomCardWrapper = document.getElementById('roomCardWrapper');
  const roomPriceDisplay = document.getElementById('roomPriceDisplay');
  const roomTitleDisplay = document.getElementById('roomTitleDisplay');
  const roomDescDisplay = document.getElementById('roomDescDisplay');
  const specSize = document.getElementById('specSize');
  const specView = document.getElementById('specView');
  const specBed = document.getElementById('specBed');
  const specSmoking = document.getElementById('specSmoking');
  const specGuests = document.getElementById('specGuests');
  const specBreakfast = document.getElementById('specBreakfast');
  const roomPhotoDisplay = document.getElementById('roomPhotoDisplay');
  const roomPrevBtn = document.getElementById('roomPrevBtn');
  const roomNextBtn = document.getElementById('roomNextBtn');

  function updateRoomCard(index, direction = 'next') {
    const room = roomsData[index];

    // Smooth transition
    roomCardWrapper.style.opacity = '0';
    roomCardWrapper.style.transform = direction === 'next' ? 'translateX(20px)' : 'translateX(-20px)';

    setTimeout(() => {
      roomPriceDisplay.textContent = room.price;
      roomTitleDisplay.textContent = room.title;
      roomDescDisplay.textContent = room.description;
      specSize.textContent = room.size;
      specView.textContent = room.view;
      specBed.textContent = room.bed;
      specSmoking.textContent = room.smoking;
      specGuests.textContent = room.guests;
      specBreakfast.textContent = room.breakfast;
      roomPhotoDisplay.src = room.image;
      roomPhotoDisplay.alt = `Mapaaz ${room.title}`;

      roomCardWrapper.style.opacity = '1';
      roomCardWrapper.style.transform = 'translateX(0)';
    }, 280);
  }

  if (roomPrevBtn && roomNextBtn) {
    roomNextBtn.addEventListener('click', () => {
      currentRoomIndex = (currentRoomIndex + 1) % roomsData.length;
      updateRoomCard(currentRoomIndex, 'next');
    });

    roomPrevBtn.addEventListener('click', () => {
      currentRoomIndex = (currentRoomIndex - 1 + roomsData.length) % roomsData.length;
      updateRoomCard(currentRoomIndex, 'prev');
    });
  }

  // --- 5. MODALS & POPUPS ---
  const reservationModal = document.getElementById('reservationModal');
  const openReservationBtn = document.getElementById('openReservationBtn');
  const closeReservationModal = document.getElementById('closeReservationModal');
  const reservationForm = document.getElementById('reservationForm');
  const tableReservationForm = document.getElementById('tableReservationForm');
  const tabRoomBooking = document.getElementById('tabRoomBooking');
  const tabTableBooking = document.getElementById('tabTableBooking');
  const resRoomSelect = document.getElementById('resRoomSelect');

  const storyModal = document.getElementById('storyModal');
  const heroStoryBtn = document.getElementById('heroStoryBtn');
  const closeStoryModal = document.getElementById('closeStoryModal');
  const welcomeReadMoreBtn = document.getElementById('welcomeReadMoreBtn');

  const videoModal = document.getElementById('videoModal');
  const videoPlayBtn = document.getElementById('videoPlayBtn');
  const closeVideoModal = document.getElementById('closeVideoModal');
  const videoIframe = document.getElementById('videoIframe');

  const roomDetailModal = document.getElementById('roomDetailModal');
  const closeRoomDetailModal = document.getElementById('closeRoomDetailModal');
  const roomViewBtn = document.getElementById('roomViewBtn');
  const roomBookBtn = document.getElementById('roomBookBtn');
  const roomDetailTitle = document.getElementById('roomDetailTitle');
  const roomDetailPrice = document.getElementById('roomDetailPrice');
  const roomDetailImg = document.getElementById('roomDetailImg');
  const bookThisRoomFromDetail = document.getElementById('bookThisRoomFromDetail');

  const menuModal = document.getElementById('menuModal');
  const viewMenuBtn = document.getElementById('viewMenuBtn');
  const closeMenuModal = document.getElementById('closeMenuModal');
  const reserveTableBtn = document.getElementById('reserveTableBtn');
  const reserveTableFromMenuBtn = document.getElementById('reserveTableFromMenuBtn');
  const menuItemsContainer = document.getElementById('menuItemsContainer');
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');

  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(message) {
    toastMessage.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 4500);
  }

  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Reservation Tabs Switcher
  function switchBookingTab(tabType) {
    if (tabType === 'room') {
      tabRoomBooking.classList.add('active');
      tabTableBooking.classList.remove('active');
      reservationForm.style.display = 'block';
      tableReservationForm.style.display = 'none';
    } else {
      tabTableBooking.classList.add('active');
      tabRoomBooking.classList.remove('active');
      tableReservationForm.style.display = 'block';
      reservationForm.style.display = 'none';
    }
  }

  if (tabRoomBooking && tabTableBooking) {
    tabRoomBooking.addEventListener('click', () => switchBookingTab('room'));
    tabTableBooking.addEventListener('click', () => switchBookingTab('table'));
  }

  // Open Reservation from Header
  if (openReservationBtn) {
    openReservationBtn.addEventListener('click', () => {
      switchBookingTab('room');
      openModal(reservationModal);
    });
  }

  // Open Table Reservation from Restaurant Section
  if (reserveTableBtn) {
    reserveTableBtn.addEventListener('click', () => {
      switchBookingTab('table');
      openModal(reservationModal);
    });
  }

  if (reserveTableFromMenuBtn) {
    reserveTableFromMenuBtn.addEventListener('click', () => {
      closeModal(menuModal);
      switchBookingTab('table');
      openModal(reservationModal);
    });
  }

  if (closeReservationModal) {
    closeReservationModal.addEventListener('click', () => closeModal(reservationModal));
  }

  // Book from room card
  if (roomBookBtn) {
    roomBookBtn.addEventListener('click', () => {
      const room = roomsData[currentRoomIndex];
      if (resRoomSelect) {
        for (let i = 0; i < resRoomSelect.options.length; i++) {
          if (resRoomSelect.options[i].text.toLowerCase().includes(room.title.toLowerCase())) {
            resRoomSelect.selectedIndex = i;
            break;
          }
        }
      }
      switchBookingTab('room');
      openModal(reservationModal);
    });
  }

  // Default dates
  const today = new Date();
  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + 1);
  const checkOut = new Date(today);
  checkOut.setDate(today.getDate() + 4);

  const resCheckIn = document.getElementById('resCheckIn');
  const resCheckOut = document.getElementById('resCheckOut');
  const diningDate = document.getElementById('diningDate');

  if (resCheckIn && resCheckOut) {
    resCheckIn.value = checkIn.toISOString().split('T')[0];
    resCheckOut.value = checkOut.toISOString().split('T')[0];
  }
  if (diningDate) {
    diningDate.value = checkIn.toISOString().split('T')[0];
  }

  // Submit Room Reservation
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = document.getElementById('resName').value || 'Guest';
      closeModal(reservationModal);
      showToast(`Thank you, ${guestName}! Your room reservation at Mapaaz has been confirmed.`);
      reservationForm.reset();
    });
  }

  // Submit Table Reservation
  if (tableReservationForm) {
    tableReservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = document.getElementById('diningName').value || 'Guest';
      const timeSlot = document.getElementById('diningTime').value || 'Dinner';
      closeModal(reservationModal);
      showToast(`Table confirmed for ${guestName} at ${timeSlot}! We look forward to hosting you at The Mapaaz Salon.`);
      tableReservationForm.reset();
    });
  }

  // Story Modal Handlers
  if (heroStoryBtn) {
    heroStoryBtn.addEventListener('click', () => openModal(storyModal));
  }
  if (welcomeReadMoreBtn) {
    welcomeReadMoreBtn.addEventListener('click', () => openModal(storyModal));
  }
  if (closeStoryModal) {
    closeStoryModal.addEventListener('click', () => closeModal(storyModal));
  }

  // Room Quick View Modal Handlers
  if (roomViewBtn) {
    roomViewBtn.addEventListener('click', () => {
      const room = roomsData[currentRoomIndex];
      roomDetailTitle.textContent = room.title;
      roomDetailPrice.textContent = `${room.price} / Night • ${room.size}`;
      roomDetailImg.src = room.image;
      openModal(roomDetailModal);
    });
  }

  if (closeRoomDetailModal) {
    closeRoomDetailModal.addEventListener('click', () => closeModal(roomDetailModal));
  }

  if (bookThisRoomFromDetail) {
    bookThisRoomFromDetail.addEventListener('click', () => {
      closeModal(roomDetailModal);
      const room = roomsData[currentRoomIndex];
      if (resRoomSelect) {
        for (let i = 0; i < resRoomSelect.options.length; i++) {
          if (resRoomSelect.options[i].text.toLowerCase().includes(room.title.toLowerCase())) {
            resRoomSelect.selectedIndex = i;
            break;
          }
        }
      }
      switchBookingTab('room');
      openModal(reservationModal);
    });
  }

  // Video Tour Modal Handlers
  if (videoPlayBtn) {
    videoPlayBtn.addEventListener('click', () => {
      videoIframe.src = 'https://www.youtube-nocookie.com/embed/S43o6m2-H6g?autoplay=1&mute=0&controls=1&rel=0';
      openModal(videoModal);
    });
  }

  if (closeVideoModal) {
    closeVideoModal.addEventListener('click', () => {
      videoIframe.src = '';
      closeModal(videoModal);
    });
  }

  // Menu Modal & Category Filter Data
  const menuCatalog = {
    starters: [
      {
        name: 'Hokkaido Diver Scallops with Royal Osetra Caviar',
        desc: 'Pan-seared scallops, cauliflower mousseline, yuzu brown butter, crisp chives.',
        price: '$38'
      },
      {
        name: 'Winter Black Truffle & Morel Mushroom Velouté',
        desc: 'Velvety soup with freshly shaved Périgord truffles, brioche croutons, crème fraîche.',
        price: '$28'
      },
      {
        name: 'Yellowfin Tuna Tartare & Avocado Mousse',
        desc: 'Sashimi grade tuna, white truffle oil, toasted sesame, lotus root crisps.',
        price: '$32'
      }
    ],
    mains: [
      {
        name: 'Miyazaki A5 Wagyu Tenderloin (6 oz)',
        desc: 'Smoked shallot puree, bone marrow jus, roasted baby heirloom carrots, potato fondant.',
        price: '$92'
      },
      {
        name: 'Chilean Sea Bass en Papillote',
        desc: 'Steamed with saffron fumet, baby leeks, clams, Meyer lemon, and fine herbs.',
        price: '$74'
      },
      {
        name: 'Roast Duck Breast with Honey Lavender Glaze',
        desc: 'Spiced parsnip purée, caramelized figs, port wine reduction.',
        price: '$64'
      }
    ],
    desserts: [
      {
        name: 'Valrhona Grand Cru Dark Chocolate Dome',
        desc: '24k edible gold leaf, warm salted caramel ganache, hazelnut praline gelato.',
        price: '$24'
      },
      {
        name: 'Madagascar Tahitian Vanilla Mille-Feuille',
        desc: 'Caramelized puff pastry, whipped mascarpone diplomate, raspberry coulis.',
        price: '$22'
      }
    ],
    cocktails: [
      {
        name: 'The Mapaaz Royal Elixir',
        desc: 'Louis Roederer Champagne, Hennessy VSOP, edible gold flakes, aromatic bitters.',
        price: '$28'
      },
      {
        name: 'Smoked Cedar Old Fashioned',
        desc: 'Woodford Reserve Bourbon, demerara, roasted walnut bitters, torched rosemary.',
        price: '$25'
      }
    ]
  };

  if (viewMenuBtn) {
    viewMenuBtn.addEventListener('click', () => openModal(menuModal));
  }
  if (closeMenuModal) {
    closeMenuModal.addEventListener('click', () => closeModal(menuModal));
  }

  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderMenuItems(category);
    });
  });

  function renderMenuItems(category) {
    const items = menuCatalog[category] || [];
    menuItemsContainer.innerHTML = items.map(item => `
      <div class="menu-item-row">
        <div class="menu-item-info">
          <h5>${item.name}</h5>
          <p>${item.desc}</p>
        </div>
        <span class="menu-item-price">${item.price}</span>
      </div>
    `).join('');
  }

  // Close modals on clicking overlay backdrop
  [reservationModal, storyModal, videoModal, roomDetailModal, menuModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          if (modal === videoModal && videoIframe) {
            videoIframe.src = '';
          }
          closeModal(modal);
        }
      });
    }
  });

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Welcome to the Mapaaz Privilege Club! Exclusive dining & suite offers sent.');
      newsletterForm.reset();
    });
  }

  // --- 6. SCROLL REVEAL ANIMATIONS (IntersectionObserver) ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

});
