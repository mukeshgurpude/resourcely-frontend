import { Container, Loader, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Prism } from '@mantine/prism'
import { Language } from 'prism-react-renderer'

type TextType = {
  text ?: string
  title ?: string
  error ?: string
  shortcode ?: string
  language ?: string
}

export function TextView(result: TextType) {
  const { shortcode } = useParams()

  if (!Object.keys(result).length) {
    return <Loader />
  }
  if (result.error) {
    return <Text color='red' children={result.error} />
  }

  return <Container>
    <Prism withLineNumbers children={result?.text as string} language={result.language as Language} />
  </Container>
}
