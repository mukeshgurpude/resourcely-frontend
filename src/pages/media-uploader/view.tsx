import { useParams } from 'react-router-dom'
import { Anchor, Group, Image, Loader, Text, Title } from '@mantine/core'
import { base_url } from '../../services'

type mediaType = {
  error?: string
  title?: string
}
export function MediaView(data: mediaType) {
  const { shortcode } = useParams()

  if (Object.keys(data).length === 0) { return <Loader /> }

  return <Group position='center' align='center' direction='column' grow spacing={0}>
    { data.error && <Text color='red' children={data.error} /> }
    { data.title && <>
      <Title>{data.title}</Title>
      <Image
        width={300} height={300} radius='sm' fit='contain'
        src={`${base_url}/image/${shortcode}`} alt={data.title}
      />
      <Anchor href={`${base_url}/image/${shortcode}`} download children='Download image' />
    </> }
  </Group>
}
