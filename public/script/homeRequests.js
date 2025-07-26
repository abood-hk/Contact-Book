const addBtn = document.querySelector('#add-button');
const addForm = document.querySelector('#add-form');
const name = document.querySelector('#name');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const adress = document.querySelector('#adress');
const notes = document.querySelector('#notes');

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(addForm);
  const params = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    if (value.trim() !== '') params.append(key, value);
  }
  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })
    .then((responce) => {
      if (!responce.ok) throw new Error('Responce was not ok');
      return responce.text();
    })
    .then((data) => {
      window.location.href = '/';
    })
    .catch((err) => {
      console.log('error : ' + err.message);
    });
});
