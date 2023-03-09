export async function translate(query) {
    try {
        const encodedParams = new URLSearchParams();
        encodedParams.append("q", query);

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': import.meta.env.VITE_ENDPOINT_TRANSLATE_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_ENDPOINT_TRANSLATE_HOST
            },
            body: encodedParams
        };

        const response = await fetch(import.meta.env.VITE_ENDPOINT_TRANSLATE, options);
        const result = await response.json();

        console.log(result)
    } catch (e) {
        console.log(e)
    }
}