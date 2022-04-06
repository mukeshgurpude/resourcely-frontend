import { Container, Loader, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Prism } from '@mantine/prism'
import { Language } from 'prism-react-renderer'
import api from '../../services'

type TextType = {
  text ?: string
  title ?: string
  error ?: string
  shortcode ?: string
  language ?: string
}

export function TextView() {
  const { shortcode } = useParams()
  const [result, setResult] = useState<TextType>({})

  useEffect(() => {
    api.get(`/text/${shortcode}`)
      .then(res => setResult(res.data))
      .catch(({response: {data}}) => setResult(data))
  }, [shortcode])

  if (!Object.keys(result).length) {
    return <Loader />
  }
  if (result.error) {
    return <Text color='red' children={result.error} />
  }

  return <Container>
    <Prism withLineNumbers children={result?.text} language={result.language as Language} />
  </Container>
}
