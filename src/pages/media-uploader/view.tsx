import { useParams } from 'react-router-dom'
import { Anchor, Group, Image, Loader, Text, Title } from '@mantine/core'
import { base_url } from '../../services'
import { useEffect, useState } from 'react'
import { download_file } from '../../utils'

type mediaType = {
  error?: string
  title?: string
  password?: string
}
export function MediaView(data: mediaType) {
  const { shortcode } = useParams()
  const [image, setImage] = useState('')

  useEffect(() => {
    const url = `${base_url}/image/${shortcode}`
    download_file(url, data.password, true)()
      .then(setImage)
  }, [data.password, shortcode])

  // TODO: replace with 404
  if (Object.keys(data).length === 0) { return <Loader /> }

  return <Group position='center' align='center' direction='column' grow spacing={0}>
    { data.error && <Text color='red' children={data.error} /> }
    { data.title && <>
      <Title>{data.title}</Title>
      <Image
        width={300} height={300} radius='sm' fit='contain'
        src={image} alt={data.title}
      />
      <Anchor href={image} download children='Download image' />
    </> }
  </Group>
}
