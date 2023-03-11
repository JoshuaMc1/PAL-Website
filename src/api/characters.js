import axios from "axios";

export async function searchCharacter(character = "", page = 1) {
    const MAX_REQUESTS_PER_SECOND = 2;
    let requests = 0;
    let lastRequestTime = Date.now();

    const api = axios.create({
        baseURL: import.meta.env.VITE_ENDPOINT_CHARACTERS_SEARCH,
        timeout: 20000,
    });

    api.interceptors.request.use((config) => {
        const now = Date.now();
        if (requests >= MAX_REQUESTS_PER_SECOND) {
            const timeSinceLastRequest = now - lastRequestTime;
            const timeToWait = Math.max(0, 1000 - timeSinceLastRequest);
            return new Promise((resolve) => setTimeout(() => resolve(config), timeToWait));
        }
        requests++;
        lastRequestTime = now;
        return config;
    });

    try {
        const response = await api.get(`${character}/&limit=15&page=${page}`);
        const result = response.data;
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getCharacter(id) {
    const MAX_REQUESTS_PER_SECOND = 2;
    let requests = 0;
    let lastRequestTime = Date.now();

    const api = axios.create({
        baseURL: import.meta.env.VITE_ENDPOINT_GET_CHARACTER_BY_ID,
        timeout: 20000,
    });

    api.interceptors.request.use((config) => {
        const now = Date.now();
        if (requests >= MAX_REQUESTS_PER_SECOND) {
            const timeSinceLastRequest = now - lastRequestTime;
            const timeToWait = Math.max(0, 1000 - timeSinceLastRequest);
            return new Promise((resolve) => setTimeout(() => resolve(config), timeToWait));
        }
        requests++;
        lastRequestTime = now;
        return config;
    });

    try {
        const response = await api.get(`${id}/full`);
        const result = response.data;
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function searchAnime(anime = "") {
    const MAX_REQUESTS_PER_SECOND = 2;
    let requests = 0;
    let lastRequestTime = Date.now();

    const api = axios.create({
        baseURL: import.meta.env.VITE_ENDPOINT_ANIME_SEARCH,
        timeout: 20000,
    });

    api.interceptors.request.use((config) => {
        const now = Date.now();
        if (requests >= MAX_REQUESTS_PER_SECOND) {
            const timeSinceLastRequest = now - lastRequestTime;
            const timeToWait = Math.max(0, 1000 - timeSinceLastRequest);
            return new Promise((resolve) => setTimeout(() => resolve(config), timeToWait));
        }
        requests++;
        lastRequestTime = now;
        return config;
    });

    try {
        const response = await api.get(`anime?q=${anime}`);
        const result = response.data;
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getAnime(id) {
    const MAX_REQUESTS_PER_SECOND = 0;
    let requests = 0;
    let lastRequestTime = Date.now();

    const api = axios.create({
        baseURL: import.meta.env.VITE_ENDPOINT_ANIME_GET_ANIME_BY_ID,
        timeout: 20000,
    });

    api.interceptors.request.use((config) => {
        const now = Date.now();
        if (requests >= MAX_REQUESTS_PER_SECOND) {
            const timeSinceLastRequest = now - lastRequestTime;
            const timeToWait = Math.max(0, 1000 - timeSinceLastRequest);
            return new Promise((resolve) => setTimeout(() => resolve(config), timeToWait));
        }
        requests++;
        lastRequestTime = now;
        return config;
    });

    try {
        const response = await api.get(`${id}/full`);
        const result = response.data;
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getGenres() {
    try {
        const response = await fetch(import.meta.env.VITE_ENDPOINT_ANIME_GET_ANIME_GENRES);

        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}

export async function getDemographics() {
    const MAX_REQUESTS_PER_SECOND = 2;
    let requests = 0;
    let lastRequestTime = Date.now();

    const api = axios.create({
        baseURL: import.meta.env.VITE_ENDPOINT_ANIME_GET_ANIME_DEMOGRAPHICS,
        timeout: 20000,
    });

    api.interceptors.request.use((config) => {
        const now = Date.now();
        if (requests >= MAX_REQUESTS_PER_SECOND) {
            const timeSinceLastRequest = now - lastRequestTime;
            const timeToWait = Math.max(0, 1000 - timeSinceLastRequest);
            return new Promise((resolve) => setTimeout(() => resolve(config), timeToWait));
        }
        requests++;
        lastRequestTime = now;
        return config;
    });

    try {
        const response = await api.get();
        const result = response.data;
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getSeason(page = 1) {
    const MAX_REQUESTS_PER_SECOND = 2;
    let requests = 0;
    let lastRequestTime = Date.now();

    const api = axios.create({
        baseURL: import.meta.env.VITE_ENDPOINT_ANIME_GET_ANIME_SEASON_NOW,
        timeout: 20000,
    });

    api.interceptors.request.use((config) => {
        const now = Date.now();
        if (requests >= MAX_REQUESTS_PER_SECOND) {
            const timeSinceLastRequest = now - lastRequestTime;
            const timeToWait = Math.max(0, 1000 - timeSinceLastRequest);
            return new Promise((resolve) => setTimeout(() => resolve(config), timeToWait));
        }
        requests++;
        lastRequestTime = now;
        return config;
    });

    try {
        const response = await api.get(`now?page=${page}`);
        const result = response.data;
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getUpcoming(page = 1) {
    const MAX_REQUESTS_PER_SECOND = 2;
    let requests = 0;
    let lastRequestTime = Date.now();

    const api = axios.create({
        baseURL: import.meta.env.VITE_ENDPOINT_ANIME_GET_ANIME_UPCOMING,
        timeout: 20000,
    });

    api.interceptors.request.use((config) => {
        const now = Date.now();
        if (requests >= MAX_REQUESTS_PER_SECOND) {
            const timeSinceLastRequest = now - lastRequestTime;
            const timeToWait = Math.max(0, 1000 - timeSinceLastRequest);
            return new Promise((resolve) => setTimeout(() => resolve(config), timeToWait));
        }
        requests++;
        lastRequestTime = now;
        return config;
    });

    try {
        const response = await api.get(`upcoming?page=${page}`);
        const result = response.data;
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getCharactersAnime(anime = "") {
    const MAX_REQUESTS_PER_SECOND = 2;
    let requests = 0;
    let lastRequestTime = Date.now();

    const api = axios.create({
        baseURL: import.meta.env.VITE_ENDPOINT_ANIME_GET_ANIME_BY_ID,
        timeout: 20000,
    });

    api.interceptors.request.use((config) => {
        const now = Date.now();
        if (requests >= MAX_REQUESTS_PER_SECOND) {
            const timeSinceLastRequest = now - lastRequestTime;
            const timeToWait = Math.max(0, 1000 - timeSinceLastRequest);
            return new Promise((resolve) => setTimeout(() => resolve(config), timeToWait));
        }
        requests++;
        lastRequestTime = now;
        return config;
    });

    try {
        const response = await api.get(`${anime}/characters`);
        const result = response.data;

        return result;
    } catch (error) {
        console.log(error);
    }
}