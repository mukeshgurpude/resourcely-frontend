import { Anchor, Button, Code, Group, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

const base_url = 'http://localhost:8000/api/v1/shortener'

type UrlType = {
  original_url ?: string
  error ?: string
  shortcode ?: string
}

export default function Url() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<UrlType>({})

  useEffect(() => { setResult({}) }, [url])

  return <Group direction="column" align='center'>
    <form onSubmit={(event) => {
      event.preventDefault()
      fetch(base_url, {
        method: 'post',
        body: JSON.stringify({ original_url: url }),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
      .then(setResult)
      .catch(setResult)
    }} style={{padding: '1em'}}>
      <Group align='center'>
        <TextInput
          name="url" value={url}
          label='Original Url' type="url"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Url to shorten" required
        />
        <Button type="submit" style={{alignSelf: 'end'}} children="Shorten"/>
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
      <Group>
        <Text>Shortcode: </Text>
        <Anchor target='_blank' href={`${base_url}/${result.shortcode}?mode=redirect`}>{result.shortcode}</Anchor>
        <Button children='📋' onClick={() => {
          navigator.clipboard.writeText(`${base_url}/${result.shortcode}?mode=redirect`)
        }} />
      </Group>
    </>
    }
    {
      result.error && <Text color='red' children={result.error} />
    }
    </Group>
  </Group>
}
