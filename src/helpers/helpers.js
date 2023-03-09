export function getYear() {
    return new Date().getFullYear();
}

export const generateId = () =>
    Math.random().toString(36).substr(2) + Date.now().toString(36);