import { Button, Group, Loader, Text, Title } from '@mantine/core'
import { useParams } from 'react-router-dom'
import api, { base_url } from '../../services'

type mediaType = {
  error?: string
  title?: string
  password?: string
}
export function FileView(data: mediaType) {
  const { shortcode } = useParams()

  function download_file() {
    const url = `${base_url}/file/${shortcode}`
    const headers = {} as {[key: string]: string}
    if (data.password) {
      headers['password'] = data.password
    }
    api.get(url, { responseType: 'blob', headers })
      .then(res => {
        const obj = window.URL.createObjectURL(res.data)
        const dummy_anchor = document.createElement('a')
        dummy_anchor.setAttribute('href', obj)
        document.documentElement.appendChild(dummy_anchor)
        dummy_anchor.click()
        dummy_anchor.remove()
      })
  }

  if (Object.keys(data).length === 0) { return <Loader /> }

  return <Group position='center' align='center' direction='column' grow spacing={0}>
    { data.error && <Text color='red' children={data.error} /> }
    { data.title && <>
      <Title>{data.title}</Title>
      <Button onClick={download_file} children='Download file' />
    </> }
  </Group>
}
