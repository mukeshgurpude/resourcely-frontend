import { Button, Code, Group, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import Shortcode from "../../components/shortcode";
import Password from "../../components/password";
import api, { base_url } from '../../services';

type UrlType = {
  original_url ?: string
  error ?: string
  shortcode ?: string
}

const shortner_url = base_url + '/shortener'

export default function Url() {
  const [url, setUrl] = useState('')
  const [pass, setPass] = useState('')
  const [result, setResult] = useState<UrlType>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => { setResult({}) }, [url])

  return <Group direction="column" align='center'>
    <form onSubmit={(event) => {
      event.preventDefault()
      setLoading(true)
      api.post('/shortener', { original_url: url, password: pass === '' ? undefined: pass })
        .then(res => { setResult(res.data);})
        .catch(err => setResult(err.response.data))
        .finally(() => setLoading(false))
    }} style={{padding: '1em'}}>

      <Group direction='column' align='stretch' style={{minWidth: 250}}>
        <TextInput
          name="url" value={url}
          label='Original Url' type="url"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Url to shorten" required
        />
        <Password name='password' label='Password' value={pass} onChange={(e) => setPass(e.target.value)} />
        <Button {...{ loading }} type="submit" style={{alignSelf: 'end'}} children="Shorten"/>
      </Group>
    </form>
    <Group direction="column">
    {
    result.shortcode
    &&<>
      <Group>
        <Text>Original URL: </Text>
        <Code>{result.original_url}</Code>
      </Group>
      <Shortcode base_uri={shortner_url} shortcode={result.shortcode} querystring={{mode: 'redirect'}} external />
    </>
    }
    {
      result.error && <Text color='red' children={result.error} />
    }
    </Group>
  </Group>
}
