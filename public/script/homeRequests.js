const addForm = document.querySelector('#add-form');
const deleteBtns = document.querySelectorAll('.deleteBtn');

const fetchContact = (url, method, headers, body) => {
  fetch(url, {
    method,
    headers,
    body,
  })
    .then((responce) => {
      if (!responce.ok) throw new Error('Response was not ok');
      return responce.text();
    })
    .then((data) => {
      window.location.href = '/public';
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
    { 'Content-Type': 'application/x-www-form-urlencoded' },
    params.toString()
  );
});

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', () => {
    const id = deleteBtn.dataset.id;
    fetchContact(
      '/api/contact',
      'DELETE',
      { 'Content-Type': 'application/json' },
      JSON.stringify({ id })
    );
  });
});
