import { checkAuth, createGamer, logout } from '../fetch-utils.js';

checkAuth();

const form = document.querySelector('form');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get('name')
    const contact = data.get('contact');
    const console_id = data.get('console_id');

    await createGamer({
        name: name,
        contact: contact,
        console_id: console_id
    });
    window.location.href = '../other-page'
});