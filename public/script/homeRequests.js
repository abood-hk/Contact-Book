import {
  formMode,
  addContact,
  renderContacts,
  deleteContact,
  modifyContact,
} from './homeDOM.js';

const inputForm = document.querySelector('#add-form');
const deleteBtns = document.querySelectorAll('.deleteBtn');
const searchBar = document.querySelector('#search-bar');
const errorsContainer = inputForm.querySelector('#errorsContainer');

const fetchContact = (url, method, headers = {}, body = undefined, fun) => {
  fetch(url, {
    method,
    headers,
    body,
  })
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok)
        throw new Error(
          data.error ||
            data.message ||
            data.errors?.[0]?.msg ||
            'Something went wrong'
        );
      errorsContainer.innerHTML = '';
      if (fun) return fun(data);
    })
    .catch((err) => {
      errorsContainer.innerHTML = '';
      const errorContianer = document.createElement('h3');
      errorContianer.classList.add('error');
      errorContianer.textContent = err.message;
      errorsContainer.append(errorContianer);
      console.error('error : ' + err.message);
    });
};

inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(inputForm);
  const params = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    if (value.trim() !== '') params.append(key, value);
  }
  if (formMode === 'add') {
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
  } else if (formMode === 'modify') {
    params.append('id', inputForm.dataset.id);
    fetchContact(
      'api/contact',
      'PUT',
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      params.toString(),
      modifyContact
    );
  }
  inputForm.reset();
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
