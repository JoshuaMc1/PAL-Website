import axios from 'axios';

export async function login(data) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Connection': 'keep-alive',
                'User-Agent': navigator.userAgent
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/login`, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}

export async function register(data) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Connection': 'keep-alive',
                'User-Agent': navigator.userAgent
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/register`, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}

export async function logout(token) {
    try {
        const options = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Connection': 'keep-alive',
                'User-Agent': navigator.userAgent
            }
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/logout`, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}

export async function getList(token) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/list`, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}

export async function getRecently(token) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/recently`, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}

export async function getHighestRating(token) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/highest`, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}

export async function getRecommendations(token) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/recommendations`, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}

export async function getUserData(token) {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL_PAL_API}/user`, config);
        const result = response.data;

        return result;
    } catch (error) {
        sessionStorage.setItem("token", null);
        window.location = "/";
    }
}

export async function updateProfile(token, data) {
    try {
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Connection': 'keep-alive',
                'Authorization': 'Bearer ' + token,
                'User-Agent': navigator.userAgent
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/profile`, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}

export async function updateProfilePhoto(token, file) {
    try {
        const options = {
            method: 'POST',
            headers: {
                ContentType: 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
            body: file,
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/image`, options);
        const result = await response.json();

        return result;
    } catch (error) {
        window.location = '/';
    }
}

export async function changePassword(token, data) {
    try {
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Connection': 'keep-alive',
                'Authorization': 'Bearer ' + token,
                'User-Agent': navigator.userAgent
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/change`, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}

export async function addList(token, data) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Connection': 'keep-alive',
                'Authorization': 'Bearer ' + token,
                'User-Agent': navigator.userAgent
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/create`, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}

export async function showAnime(token, slug) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/anime/${slug}`, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}

export async function getAnime(token, slug) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/anime/${slug}/get`, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}

export async function deleteUser(token) {
    try {
        const options = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Connection': 'keep-alive',
                'Authorization': 'Bearer ' + token,
                'User-Agent': navigator.userAgent
            }
        };
        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/user`, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}

export async function updateAnime(token, data) {
    try {
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Accept-Encoding': 'application/gzip',
                'Accept': 'application/json',
                'Connection': 'keep-alive',
                'Authorization': 'Bearer ' + token,
                'User-Agent': navigator.userAgent
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_PAL_API}/anime`, options);

        const result = await response.json();

        return result;
    } catch (error) {
        window.location = "/";
    }
}