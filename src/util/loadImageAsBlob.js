export default async function loadImageAsBlob(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    return blob;
};