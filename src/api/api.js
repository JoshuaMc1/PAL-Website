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

        const response = await fetch(import.meta.env.VITE_ENDPOINT_API_PAL_LOGIN, options);

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

        const response = await fetch(import.meta.env.VITE_ENDPOINT_API_PAL_REGISTER, options);

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

        const response = await fetch(import.meta.env.VITE_ENDPOINT_API_PAL_LOGOUT, options);

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

        const response = await fetch(import.meta.env.VITE_ENDPOINT_API_PAL_LIST, options);

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

        const response = await fetch(import.meta.env.VITE_ENDPOINT_API_PAL_RECENTLY, options);

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

        const response = await fetch(import.meta.env.VITE_ENDPOINT_API_PAL_HIGHEST, options);

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

        const response = await fetch(import.meta.env.VITE_ENDPOINT_API_PAL_RECOMMENDATIONS, options);

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

        const response = await axios.get(import.meta.env.VITE_ENDPOINT_API_PAL_GET_USER, config);
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

        const response = await fetch(import.meta.env.VITE_ENDPOINT_API_PAL_UPDATE_PROFILE, options);

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

        const response = await fetch(import.meta.env.VITE_ENDPOINT_API_PAL_UPDATE_PROFILE_PHOTO, options);
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

        const response = await fetch(import.meta.env.VITE_ENDPOINT_API_PAL_CHANGE_PASSWORD, options);

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
        const response = await fetch(import.meta.env.VITE_ENDPOINT_API_PAL_CREATE, options);

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
        const response = await fetch(import.meta.env.VITE_ENDPOINT_API_PAL_GET_USER, options);

        const result = await response.json();
        return result;
    } catch (error) {
        window.location = "/";
    }
}