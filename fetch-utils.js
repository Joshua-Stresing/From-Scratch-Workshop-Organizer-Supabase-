const SUPABASE_URL = 'https://hivhhethskjbmsiiuepr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpdmhoZXRoc2tqYm1zaWl1ZXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ0MzU1ODUsImV4cCI6MTk2MDAxMTU4NX0.3tUMXfEr4bDY-62YnajMALVtGgKdGMrYB3yDPPU19qM';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createGamer(gamer) {
    const response = await client
        .from('gamers')
        .insert(gamer);
    return checkError(response);    
}

export async function deleteGamer(gamerId) {
    const response = await client
        .from('gamers')
        .delete()
        .match({ id: gamerId })
        .single();
    return checkError(response);    
}

export async function getConsoles() {
    const response = await client
        .from('consoles')
        .select('*,gamers (*)');
    return checkError(response);    
}

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}