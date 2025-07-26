document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#add-button');
  const addForm = document.querySelector('#add-form');
  const overlay = document.querySelector('#overlay');
  const formBtn = document.querySelector('#formBtn');

  addBtn.addEventListener('click', () => {
    addForm.classList.add('visible');
    overlay.classList.add('visible');
  });

  document.body.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target === overlay && addForm.classList.contains('visible')) {
      addForm.classList.remove('visible');
      overlay.classList.remove('visible');
    }
  });
});
