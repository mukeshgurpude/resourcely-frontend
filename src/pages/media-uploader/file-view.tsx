import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Anchor, Group, Loader, Text, Title } from '@mantine/core'
import api, { base_url } from '../../services'

type mediaType = {
  error?: string
  title?: string
}
export function FileView() {
  const [data, setData] = useState<mediaType>({})
  const { shortcode } = useParams()
  useEffect(() => {
    api.get(`/file/${shortcode}?meta=true`)
      .then(res => setData(res.data))
      .catch(err => {
        setData(err.response.data)
      })
  }, [shortcode])

  if (Object.keys(data).length === 0) { return <Loader /> }

  return <Group position='center' align='center' direction='column' grow spacing={0}>
    { data.error && <Text color='red' children={data.error} /> }
    { data.title && <>
      <Title>{data.title}</Title>
      <Anchor href={`${base_url}/file/${shortcode}`} download children='Download file' />
    </> }
  </Group>
}
