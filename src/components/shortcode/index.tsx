import { Button, Group, Text, Tooltip } from "@mantine/core";
import { useClipboard } from '@mantine/hooks'
import { Link } from "react-router-dom";

type Props = {
  base_uri : string
  shortcode : string
  querystring ?: { [key: string] : string }
  external ?: boolean
}

export default function Shortcode({ base_uri, shortcode, external=false, querystring={} }: Props) {
  const clipboard = useClipboard({timeout: 3000})
  let full_url = `${base_uri.replace(/\/+$/, '')}/${shortcode}`
  if (Object.keys(querystring).length > 0) {
    full_url += '?' + Object.entries(querystring).map(([key, value]) => `${key}=${value}`).join('&')
  }
  const anchorCommonProps = { children: shortcode, style: {padding: 3} }

  return <Group align='center'>
    <Group direction='column' align='center' spacing={0}>
      <Text>Shortcode</Text>
      <Text style={{display: 'flex', alignItems: 'center', gap: 5}}>
        { external
          ? <Button component='a' target='_blank' href={full_url} variant='subtle' {...anchorCommonProps} />
          : <Button component={Link} to={full_url} variant='subtle' {...anchorCommonProps} />
        }
        <Tooltip label='Copied' opened={clipboard.copied}>
          <Button variant='outline' size='sm' onClick={() => clipboard.copy(full_url)} disabled={clipboard.copied}>
            {clipboard.copied ? 'Copied' : 'Copy'}
          </Button>
        </Tooltip>
      </Text>
    </Group>
  </Group>
}
