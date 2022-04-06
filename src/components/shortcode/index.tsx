import { ActionIcon, Anchor, Group, Text, Tooltip } from "@mantine/core";
import { useClipboard } from '@mantine/hooks'
import { Link } from "react-router-dom";

type Props = {
  base_uri : string
  shortcode : string
  querystring ?: { [key: string] : string }
  external ?: boolean
}

export default function Shortcode({ base_uri, shortcode, external=false, querystring={} }: Props) {
  const clipboard = useClipboard({timeout: 1000})
  let full_url = `${base_uri.replace(/\/+$/, '')}/${shortcode}`
  if (Object.keys(querystring).length > 0) {
    full_url += '?' + Object.entries(querystring).map(([key, value]) => `${key}=${value}`).join('&')
  }
  const anchorCommonProps = {
    children: shortcode,
    style: {borderRight: '2px solid', padding: 3}
  }

  return <Group>
    <Group direction='column'>
      <Text>Shortcode</Text>
      <Text style={{display: 'flex', alignItems: 'center'}}>
        { external
          ? <Anchor target='_blank' href={full_url} {...anchorCommonProps} />
          : <Anchor component={Link} to={full_url} {...anchorCommonProps} />
        }
        <Tooltip label='Copied' opened={clipboard.copied}>
          <ActionIcon onClick={() => clipboard.copy(full_url)} children='📋' />
        </Tooltip>
      </Text>
    </Group>
  </Group>
}
