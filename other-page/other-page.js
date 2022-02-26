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
    console.log(consoles);
    consoleListEl.textContent = '';
    
    for (let console of consoles) {
        const consoleEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const gamersEl = document.createElement('div');

        consoleEl.classList.add('workshop');

        nameEl.textContent = console.name;

        consoleEl.append(nameEl, gamersEl);
        // console.log(console.gamers);

        for (let gamer of console.gamers) {
            const gamerEl = document.createElement('p');

            gamerEl.classList.add('gamer');
            gamerEl.addEventListener('click', async () => {
                await deleteGamer(gamer.id);
                
                fetchAndDisplayConsoles();
            });
            gamerEl.textContent = `${gamer.gamer} : ${gamer.contact}`;

            gamersEl.append(gamerEl);
        }
        consoleListEl.append(consoleEl);
    }
}