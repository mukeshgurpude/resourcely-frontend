import { useEffect, useState } from 'react'
import { Anchor, Button, Group, Text, Textarea, TextInput } from '@mantine/core'
import { Link } from 'react-router-dom'
import api from '../../services'

const max_length = 1024
type TextType = {
  text ?: string
  error ?: string
  shortcode ?: string
}

export default function TextUi() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TextType>({})

  useEffect(() => {
    if (content.length > max_length) {
      setResult({ error: `Text is too long. Max length is ${max_length} characters.` })
    } else {
      setResult((r) => ({ ...r, error: '' }))
    }
  }, [content])

  return <Group direction="column" align='center'>
    <form onSubmit={(event) => {
      event.preventDefault()
      setLoading(true)
      api.post('/text', { text: content, title })
        .then(res => setResult(res.data))
        .catch(({response: {data}}) => setResult(data))
        .finally(() => setLoading(false))
    }} style={{display: 'flex', flexFlow: 'column', gap: 5}}>
      <TextInput
        maxLength={30}
        placeholder='Text title' label='Title' required
        value={title} onChange={e => setTitle(e.target.value)}
      />
      <Textarea
        cols={50} minRows={5} maxLength={1024}
        placeholder='Enter text here to upload'
        label="Text content" required
        value={content} onChange={(e) => setContent(e.target.value)}
      />
      <Button style={{alignSelf: 'center'}} type='submit' children="Upload" {...{loading}} disabled={content.length > max_length} />
    </form>
    <Group direction="column">
    {
    result.shortcode
    && <Group>
      <Text>Shortcode: </Text>
      <Anchor component={Link} to={`/text/${result.shortcode}`}>{result.shortcode}</Anchor>
      <Button children='📋' onClick={() => {
        navigator.clipboard.writeText(`/text/${result.shortcode}`)
      }} />
    </Group>
    }
    {
      result.error && <Text color='red' children={result.error} />
    }
    </Group>
  </Group>
}
