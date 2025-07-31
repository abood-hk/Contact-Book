import { enableDeleteBtn } from './homeRequests.js';

const addBtn = document.querySelector('#add-button');
const addForm = document.querySelector('#add-form');
const overlay = document.querySelector('#overlay');
const infoBtns = document.querySelectorAll('.infoBtn');
const contactsContainer = document.querySelector('#contacts-container');
const modifyBtns = document.querySelectorAll('.modify-btn');

let formMode;
let infoContainer;

modifyBtns.forEach((modifyBtn) => {
  formMode = 'modify';
  modifyBtn.addEventListener('click', () => {});
});

addBtn.addEventListener('click', () => {
  formMode = 'add';
  addForm.classList.add('visible');
  overlay.classList.add('visible');
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addForm.classList.remove('visible');
  overlay.classList.remove('visible');
});

export const enableInfoBtn = (infoBtn) => {
  infoBtn.addEventListener('click', () => {
    infoContainer = infoBtn.parentElement.nextElementSibling;
    infoContainer.classList.add('visible');
    overlay.classList.add('visible');
  });
};

infoBtns.forEach((infoBtn) => {
  enableInfoBtn(infoBtn);
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

export const addContact = (contact) => {
  const contactDiv = document.createElement('div');
  contactDiv.classList.add('contact-container');
  contactDiv.innerHTML = `
<div class="contact-card">
          <h2>${contact.name}</h2>
          <p>${contact.email || '—'}</p>
          <h2>${contact.phone}</h2>
          <button type="button" class="infoBtn">Show more</button>
          <button type="button" data-id="${contact._id}" class="deleteBtn">
            Delete
          </button>
        </div>
        <div class="more-info">
          <h2>Contact's info</h2>
          <h3>Name : ${contact.name}</h3>
          <h3>Phone number : ${contact.phone}</h3>
          <h3>Email adress: ${contact.email || '—'}</h3>
          <h3>Adress : ${contact.adress || '—'}</h3>
          <h3>Note : ${contact.notes || '—'}</h3>
          <button type="button" class="modify-btn">Modify</button>
        </div>
    `;
  contactsContainer.appendChild(contactDiv);
  const card = contactDiv.querySelector('.contact-card');
  enableDeleteBtn(card.querySelector('.deleteBtn'));
  enableInfoBtn(card.querySelector('.infoBtn'));
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
