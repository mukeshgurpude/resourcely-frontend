import { Container, Text } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { Language } from 'prism-react-renderer'
import { Navigate } from 'react-router-dom'

type TextType = {
  text ?: string
  title ?: string
  error ?: string
  shortcode ?: string
  language ?: string
}

export function TextView(result: TextType) {
  if (!Object.keys(result).length) {
    // TODO: Show 404 instead
    return <Navigate to='/' replace />
  }
  if (result.error) {
    return <Text color='red' children={result.error} />
  }

  return <Container>
    <Prism withLineNumbers children={result?.text as string} language={result.language as Language} />
  </Container>
}
