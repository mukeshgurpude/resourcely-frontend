import { Button, Group, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { useClipboard } from '@mantine/hooks'
import { Link } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';

type Props = {
  base_uri : string
  shortcode : string
  querystring ?: { [key: string] : string }
  external ?: boolean
}

export default function Shortcode({ base_uri, shortcode, external=false, querystring={} }: Props) {
  const clipboard = useClipboard({timeout: 3000})
  const theme = useMantineTheme()
  let full_url = `${base_uri.replace(/\/+$/, '')}/${shortcode}`
  if (Object.keys(querystring).length > 0) {
    full_url += '?' + Object.entries(querystring).map(([key, value]) => `${key}=${value}`).join('&')
  }
  const anchorCommonProps = { children: shortcode, style: {padding: 3} }

  let colors = {
    fgcolor: theme.colorScheme === 'light' ? theme.colors.dark[9] : theme.colors.gray[0],
    bgcolor: theme.colorScheme === 'light' ? theme.colors.gray[0] : theme.colors.dark[9],
  }

  return <Group align='center' style={{boxShadow: theme.shadows.xl, padding: theme.spacing.md}}>
    <Group direction='column' align='center' spacing='sm'>
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
    <Tooltip label='Scan this QR to open resource' withArrow>
      <QRCodeSVG value={full_url} size={150} {...colors}
        style={{ boxShadow: theme.shadows.md, padding: theme.spacing.xs }} />
    </Tooltip>
  </Group>
}
