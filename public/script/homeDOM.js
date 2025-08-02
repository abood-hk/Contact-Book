import { enableDeleteBtn } from './homeRequests.js';

const addBtn = document.querySelector('#add-button');
const inputForm = document.querySelector('#add-form');
const overlay = document.querySelector('#overlay');
const infoBtns = document.querySelectorAll('.infoBtn');
const contactsContainer = document.querySelector('#contacts-container');
const modifyBtns = document.querySelectorAll('.modifyBtn');
const formBtn = inputForm.querySelector('#formBtn');
const errorsContainer = inputForm.querySelector('#errorsContainer');

export let formMode;

formBtn.addEventListener('click', (e) => {
  e.preventDefault();
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
    });
  } else {
    errorsContainer.innerHTML = '';
    inputForm.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
  }
});

addBtn.addEventListener('click', () => {
  formMode = 'add';
  errorsContainer.innerHTML = '';
  const formBtn = inputForm.querySelector('#formBtn');
  formBtn.textContent = 'Add Contact';
  inputForm.removeAttribute('data-id');
  inputForm.reset();
  inputForm.classList.add('visible');
  overlay.classList.add('visible');
});

inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  inputForm.classList.remove('visible');
  overlay.classList.remove('visible');
});

export const enableInfoBtn = (infoBtn) => {
  infoBtn.addEventListener('click', () => {
    const infoContainer = infoBtn.parentElement.nextElementSibling;
    infoContainer.classList.add('visible');
    overlay.classList.add('visible');
  });
};

infoBtns.forEach((infoBtn) => {
  enableInfoBtn(infoBtn);
});

const enableModifyBtn = (modifyBtn) => {
  formMode = 'modify';
  modifyBtn.addEventListener('click', () => {
    errorsContainer.innerHTML = '';
    inputForm.reset();
    const formBtn = inputForm.querySelector('#formBtn');
    formBtn.textContent = 'Modify Contact';
    const infoContainer = modifyBtn.parentElement;

    const getValue = (selector) => {
      if (selector === '.info-phone') {
        const rawNumber = infoContainer
          .querySelector(selector)
          ?.textContent.split(':')[1]
          ?.trim();
        const numberParts = rawNumber.split('-');
        const fullNumber = numberParts[0] + numberParts[1] + numberParts[2];
        return fullNumber;
      }
      const value = infoContainer
        .querySelector(selector)
        ?.textContent.split(':')[1]
        ?.trim();
      if (value === '—') {
        return '';
      }
      return value;
    };

    inputForm.querySelector('#name').value = getValue('.info-name');
    inputForm.querySelector('#phone').value = getValue('.info-phone');
    inputForm.querySelector('#email').value = getValue('.info-email');
    inputForm.querySelector('#adress').value = getValue('.info-adress');
    inputForm.querySelector('#notes').value = getValue('.info-notes');

    inputForm.dataset.id = modifyBtn.dataset.id;
    inputForm.classList.add('visible');
    overlay.classList.add('visible');
    modifyBtn.parentElement.classList.remove('visible');
  });
};

modifyBtns.forEach((modifyBtn) => {
  enableModifyBtn(modifyBtn);
});

document.body.addEventListener('click', (e) => {
  if (e.target.id === 'cancelBtn' && inputForm.classList.contains('visible')) {
    inputForm.classList.remove('visible');
    overlay.classList.remove('visible');
  }
  if (e.target === overlay && document.querySelector('.more-info.visible')) {
    document.querySelector('.more-info.visible').classList.remove('visible');
    overlay.classList.remove('visible');
  }
});

const contactHTML = (contact) => {
  return `
       <div class="contact-card">
          <h2>${contact.name}</h2>
          <p>${contact.email || '—'}</p>
          <h2>${contact.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</h2>
          <button type="button" class="infoBtn">Show more</button>
          <button type="button" data-id="${contact._id}" class="deleteBtn">
            Delete
          </button>
        </div>
        <div class="more-info">
          <h2>Contact's info</h2>
          <h3 class="info-name">Name : ${contact.name}</h3>
          <h3 class="info-phone">Phone number : ${contact.phone.replace(
            /(\d{3})(\d{3})(\d{4})/,
            '$1-$2-$3'
          )}</h3>
          <h3 class="info-email">Email adress: ${contact.email || '—'}</h3>
          <h3 class="info-adress">Adress : ${contact.adress || '—'}</h3>
          <h3 class="info-notes">Note : ${contact.notes || '—'}</h3>
          <button type="button" data-id='${
            contact._id
          }' class="modifyBtn">Modify</button>
        </div>
    `;
};

export const addContact = (contact) => {
  const contactDiv = document.createElement('div');
  contactDiv.classList.add('contact-container');
  contactDiv.innerHTML = contactHTML(contact);
  contactsContainer.appendChild(contactDiv);

  const card = contactDiv.querySelector('.contact-card');
  const moreInfo = card.nextElementSibling;

  enableDeleteBtn(card.querySelector('.deleteBtn'));
  enableInfoBtn(card.querySelector('.infoBtn'));
  enableModifyBtn(moreInfo.querySelector('.modifyBtn'));
};

export const deleteContact = (id) => {
  const cards = contactsContainer.querySelectorAll('.contact-card');
  cards.forEach((card) => {
    const deleteBtn = card.querySelector('.deleteBtn');
    if (deleteBtn && deleteBtn.dataset.id === id) {
      card.parentElement.remove();
    }
  });
};

export const renderContacts = (filteredContacts) => {
  contactsContainer.innerHTML = ``;
  filteredContacts.forEach((contact) => addContact(contact));
};

export const modifyContact = (modifiedContact) => {
  const cards = contactsContainer.querySelectorAll('.contact-card');
  cards.forEach((card) => {
    const id = card.querySelector('.deleteBtn').dataset.id;
    if (id === modifiedContact._id) {
      const container = card.parentElement;
      container.innerHTML = contactHTML(modifiedContact);

      const updatedCard = container.querySelector('.contact-card');
      const moreInfo = updatedCard.nextElementSibling;
      enableDeleteBtn(updatedCard.querySelector('.deleteBtn'));
      enableInfoBtn(updatedCard.querySelector('.infoBtn'));
      enableModifyBtn(moreInfo.querySelector('.modifyBtn'));
    }
  });
};
