import { checkAuth, deleteGamer, getConsoles, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const consoleListEl = document.querySelector('.consoles-list');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async () => {
    fetchAndDisplayConsoles();
});

async function fetchAndDisplayConsoles() {
    const consoles = await getConsoles();

    consoleListEl.textContent = '';
    
    for (let console of consoles) {
        const consoleEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const gamersEl = document.createElement('div');

        consoleEl.classList.add('workshop');

        nameEl.textContent = console.name;

        consoleEl.append(nameEl, gamersEl);

        for (let gamer of console.console_gamers) {
            const gamerEl = document.createElement('p');

            gamerEl.classList.add('gamer');
            gamerEl.addEventListener('click', async () => {
                await deleteGamer(gamer.id);
                
                fetchAndDisplayConsoles();
            });
            gamerEl.textContent = `${gamer.name} : ${gamer.contact}`;

            gamersEl.append(gamerEl);
        }
        consoleListEl.append(consoleEl);
    }
}