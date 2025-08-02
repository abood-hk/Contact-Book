import {
  formMode,
  addContact,
  renderContacts,
  deleteContact,
  modifyContact,
} from './homeDOM.js';

const overlay = document.querySelector('#overlay');
const inputForm = document.querySelector('#add-form');
const deleteBtns = document.querySelectorAll('.deleteBtn');
const searchBar = document.querySelector('#search-bar');
const errorsContainer = inputForm.querySelector('#errorsContainer');

const clientValidations = () => {
  const name = inputForm.querySelector('#name').value.trim();
  const phone = inputForm.querySelector('#phone').value.trim();
  const email = inputForm.querySelector('#email').value.trim();
  const adress = inputForm.querySelector('#adress').value.trim();
  const notes = inputForm.querySelector('#notes').value.trim();

  const errors = [];

  if (!name) {
    errors.push('Name is required.');
  } else if (name.length > 40) {
    errors.push('The name is too long.');
  }

  if (!phone) {
    errors.push('Phone number is required.');
  } else if (!/^\d{10}$/.test(phone)) {
    errors.push('Phone number must be 10 digits.');
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('The email is invalid.');
  }

  if (adress && adress.length > 100) {
    errors.push('The address is too long.');
  }

  // Notes
  if (notes && notes.length > 250) {
    errors.push('The note is too long.');
  }

  if (errors.length > 0) {
    errorsContainer.innerHTML = '';
    errors.forEach((error) => {
      const errorContianer = document.createElement('h3');
      errorContianer.classList.add('error');
      errorContianer.textContent = error;
      errorsContainer.append(errorContianer);
      return false;
    });
  } else {
    errorsContainer.innerHTML = '';
    return true;
  }
};

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
      inputForm.classList.remove('visible');
      overlay.classList.remove('visible');
      inputForm.reset();
      if (fun) return fun(data);
    })
    .catch((err) => {
      errorsContainer.innerHTML = '';
      const errorContianer = document.createElement('h3');
      errorContianer.classList.add('error');
      errorContianer.textContent = err.message;
      errorsContainer.append(errorContianer);
      console.error('error : ' + err.message);
      throw err;
    });
};

inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(inputForm);
  const params = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    if (value.trim() !== '') params.append(key, value);
  }

  if (!clientValidations()) return;

  try {
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
  } catch (err) {
    return;
  }
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
