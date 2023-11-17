export default async function loadImageAsFile(url, fileName) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const file = new File([arrayBuffer], fileName, { type: response.headers.get("content-type") });
    return file;
  }