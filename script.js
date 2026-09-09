const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobileQuery = window.matchMedia('(max-width: 600px)');

// Without JavaScript, navigation links remain visible at every width.
menuButton.hidden = false;
navigation.dataset.collapsible = '';

function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !mobileQuery.matches) return;
  closeMenu();
  // Keep keyboard focus with the destination, rather than in the hidden menu.
  const destination = document.querySelector(link.hash);
  destination.setAttribute('tabindex', '-1');
  destination.focus({ preventScroll: true });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) closeMenu(true);
});

mobileQuery.addEventListener('change', () => closeMenu());
