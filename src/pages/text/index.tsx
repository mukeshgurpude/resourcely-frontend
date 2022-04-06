import { useEffect, useState } from 'react'
import { Button, Group, InputWrapper, Select, Text, TextInput } from '@mantine/core'
import { Language } from 'prism-react-renderer'
import MonacoEditor from '../../components/editor'
import Shortcode from '../../components/shortcode'
import api from '../../services'

export type Lang = Language | 'plain';
const languages: Lang[] = [ "markup", "bash", "clike", "c", "cpp", "css", "javascript",
  "jsx", "coffeescript", "actionscript", "css-extr", "diff", "git", "go", "graphql", "handlebars",
  "json", "less", "makefile", "markdown", "objectivec", "ocaml", "plain", "python", "reason", "sass",
  "scss", "sql", "stylus", "tsx", "typescript", "wasm", "yaml" ];

const max_length = 1024
export type TextType = {
  text ?: string
  error ?: string
  shortcode ?: string
}

export default function TextUi() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [language, setLang] = useState<Lang>('plain')
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
      api.post('/text', { text: content, title, language })
        .then(res => setResult(res.data))
        .catch(({response: {data}}) => setResult(data))
        .finally(() => setLoading(false))
    }} style={{display: 'flex', flexFlow: 'column', gap: 15}}>
      <TextInput
        maxLength={30}
        placeholder='Text title' label='Title' required
        value={title} onChange={e => setTitle(e.target.value)}
      />
      <Select label='Language' searchable value={language} onChange={data => setLang(data as Lang)} data={languages} required />
      <InputWrapper label='Text' required>
        <MonacoEditor value={content} setValue={setContent} language={language} />
      </InputWrapper>
      <Button style={{alignSelf: 'center'}} type='submit' children="Upload" {...{loading}} disabled={content.length > max_length} />
    </form>
    <Group direction="column">
      { result.shortcode && <Shortcode base_uri={'/text/'} shortcode={result.shortcode} /> }
      {
        result.error && <Text color='red' children={result.error} />
      }
    </Group>
  </Group>
}

export { TextView } from './view'
