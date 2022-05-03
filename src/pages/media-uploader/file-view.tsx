import { Button, Group, Loader, Text, Title } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { base_url } from '../../services'
import { download_file } from '../../utils'

type mediaType = {
  error?: string
  title?: string
  password?: string
}
export function FileView(data: mediaType) {
  const { shortcode } = useParams()
  const url = `${base_url}/file/${shortcode}`
  if (Object.keys(data).length === 0) { return <Loader /> }

  return <Group position='center' align='center' direction='column' grow spacing={0}>
    { data.error && <Text color='red' children={data.error} /> }
    { data.title && <>
      <Title>{data.title}</Title>
      <Button onClick={download_file(url, data.password)} children='Download file' />
    </> }
  </Group>
}
