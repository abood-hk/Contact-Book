import { addContact, renderContacts, deleteContact } from './homeDOM.js';

const addForm = document.querySelector('#add-form');
const deleteBtns = document.querySelectorAll('.deleteBtn');
const searchBar = document.querySelector('#search-bar');

const fetchContact = (url, method, headers = {}, body = undefined, fun) => {
  fetch(url, {
    method,
    headers,
    body,
  })
    .then((response) => {
      if (!response.ok) throw new Error('Response was not ok');
      return response.json();
    })
    .then((data) => {
      if (fun) return fun(data);
      console.log(data);
    })
    .catch((err) => {
      console.log('error : ' + err.message);
    });
};

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(addForm);
  const params = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    if (value.trim() !== '') params.append(key, value);
  }
  fetchContact(
    '/api/contact',
    'POST',
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    params.toString(),
    addContact
  );
  addForm.reset();
});

export const enableDeleteBtn = (deleteBtn) => {
  deleteBtn.addEventListener('click', () => {
    const id = deleteBtn.dataset.id;
    fetchContact(
      '/api/contact',
      'DELETE',
      { 'Content-Type': 'application/json', Accept: 'application/json' },
      JSON.stringify({ id }),
      deleteContact
    );
  });
};

deleteBtns.forEach((deleteBtn) => {
  enableDeleteBtn(deleteBtn);
});

searchBar.addEventListener('input', () => {
  const name = searchBar.value.trim();
  fetchContact(
    `/api/contact?name=${encodeURIComponent(name)}`,
    'GET',
    {},
    undefined,
    renderContacts
  );
});
