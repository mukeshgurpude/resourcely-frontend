import { Button, Code, Group, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import Shortcode from "../../components/shortcode";
import api, { base_url } from '../../services';

type UrlType = {
  original_url ?: string
  error ?: string
  shortcode ?: string
}

const shortner_url = base_url + '/shortener'

export default function Url() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<UrlType>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => { setResult({}) }, [url])

  return <Group direction="column" align='center'>
    <form onSubmit={(event) => {
      event.preventDefault()
      setLoading(true)
      api.post('/shortener', { original_url: url })
        .then(res => setResult(res.data))
        .catch(setResult)
        .finally(() => setLoading(false))
    }} style={{padding: '1em'}}>

      <Group align='center'>
        <TextInput
          name="url" value={url}
          label='Original Url' type="url"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Url to shorten" required
        />
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
