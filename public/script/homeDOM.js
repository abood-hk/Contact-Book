document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#add-button');
  const addForm = document.querySelector('#add-form');
  const overlay = document.querySelector('#overlay');
  const infoBtns = document.querySelectorAll('.infoBtn');

  let infoContainer;

  addBtn.addEventListener('click', () => {
    addForm.classList.add('visible');
    overlay.classList.add('visible');
  });

  infoBtns.forEach((infoBtn) => {
    infoBtn.addEventListener('click', (e) => {
      infoContainer = infoBtn.parentElement.nextElementSibling;
      infoContainer.classList.add('visible');
      overlay.classList.add('visible');
    });
  });

  document.body.addEventListener('click', (e) => {
    if (e.target === overlay && addForm.classList.contains('visible')) {
      addForm.classList.remove('visible');
      overlay.classList.remove('visible');
    }
    if (e.target === overlay && infoContainer.classList.contains('visible')) {
      infoContainer.classList.remove('visible');
      overlay.classList.remove('visible');
    }
  });
});
