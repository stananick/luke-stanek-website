const dropdownTitle = document.querySelectorAll('.research__item__dropdown-title');

// Adds a click event to each title to allow the body to slide down
dropdownTitle.forEach((title) => {
  title.addEventListener('click', () => {
    const dropdownBody = title.nextElementSibling;

    if (dropdownBody.classList.contains('expanded')) {
      dropdownBody.classList.remove('expanded');
      dropdownBody.setAttribute('aria-hidden', true);
      title.firstElementChild.classList.remove('rotate');
    } else {
      dropdownBody.classList.add('expanded');
      dropdownBody.setAttribute('aria-hidden', false);
      title.firstElementChild.classList.add('rotate');
    }
  });
});
