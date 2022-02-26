import { checkAuth, createGamer, getConsoles, logout } from '../fetch-utils.js';

checkAuth();

const form = document.querySelector('form');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get('name');
    const contact = data.get('contact');
    const console_id = data.get('console_id');

    await createGamer({
        gamer: name,
        contact: contact,
        console_id: console_id
    });
    window.location.href = '../other-page';
});

window.addEventListener('load', async () => {
    const dropdown = document.querySelector('select');
    const consoles = await getConsoles();

    for (let console of consoles) {
        const optionEl = document.createElement('option');

        optionEl.value = console.id;
        optionEl.textContent = console.name;

        dropdown.append(optionEl);
    }
});