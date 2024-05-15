
export async function logoutUser() {

    // Clear JWT and User ID in the session storage.
    sessionStorage.clear();
}
