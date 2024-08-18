export function generateRandomBase64() {
  const array = new Uint8Array(16)
  window.crypto.getRandomValues(array)
  const base64String = btoa(String.fromCharCode(...array))
  return base64String
}
