import { Anchor, Group, Loader, Text, Title } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { base_url } from '../../services'

type mediaType = {
  error?: string
  title?: string
}
export function FileView(data: mediaType) {
  const { shortcode } = useParams()

  if (Object.keys(data).length === 0) { return <Loader /> }

  return <Group position='center' align='center' direction='column' grow spacing={0}>
    { data.error && <Text color='red' children={data.error} /> }
    { data.title && <>
      <Title>{data.title}</Title>
      <Anchor href={`${base_url}/file/${shortcode}`} download children='Download file' />
    </> }
  </Group>
}
