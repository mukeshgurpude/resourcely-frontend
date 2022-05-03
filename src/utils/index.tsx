import api from './services'

export function download_file(base_url: string, password?: string, noDownload=false) {
  return async function () {
    const headers = {} as {[key: string]: string}
    if (password) {
      headers['password'] = password
    }
    return api
      .get(base_url, { responseType: 'blob', headers })
      .then(res => {
        // Create URL from blob
        const url = window.URL.createObjectURL(res.data)

        if (!noDownload) {
          // Prepare dummy anchor element for downloading
          const dummy_anchor = document.createElement('a')
          dummy_anchor.setAttribute('href', url)

          // Append anchor to dom
          document.documentElement.appendChild(dummy_anchor)
          dummy_anchor.click()
          dummy_anchor.remove() // Remove dummy element
        }
        return url // Return blob url for optional further use
      })
  }
}
