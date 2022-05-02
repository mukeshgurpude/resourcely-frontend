import { Button, Group, Image, Text, TextInput, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneStatus } from "@mantine/dropzone";
// @ts-ignore
import { IMAGE_MIME_TYPE } from '@mantine/dropzone/esm'
import { MouseEvent, useEffect, useState } from 'react';
import Password from '../../components/password';
import Shortcode from '../../components/shortcode';
import api from '../../services';


function is_image(file: File): boolean {
  return IMAGE_MIME_TYPE.includes(file.type);
}

function DropzoneChild(status: DropzoneStatus, media: File|null) {
  const theme = useMantineTheme()
  return <Group position={media ? 'apart' : 'center'} style={{minHeight: 200, minWidth: 400}}>
    {
    media ? <>
      <Group direction='column' spacing={0} position='center'>
        <Text>Uploaded file: </Text>
        <Text underline>{media.name}</Text>
        <Text weight='bold'>{(media.size/1024).toFixed(2)}Kb</Text>
      </Group>
      <Image width={200} height={200} radius='sm' fit='contain'
        src={URL.createObjectURL(media)} alt={media.name}
        style={{boxShadow: theme.shadows.lg}} withPlaceholder
        placeholder={<span>No preview available</span>}
      />
    </>
    : <Text inline>Drop a file or click here to select the file</Text>
    }
  </Group>
}

type stateType = {
  error?: string
  shortcode?: string
}
export default function MediaUploader() {
  const [media, setMedia] = useState<File|null>(null);
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<stateType>({});
  const [pass, setPass] = useState('')

  const onDrop = (acceptedFiles: File[]) => { setMedia(acceptedFiles[0]); }

  useEffect(() => setResult({}), [media])

  function upload_media(ev: MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    if (!media) {
      setResult({error: 'No file selected'})
      return;
    }
    if (!title) {
      setResult({error: 'Title is required'})
      return;
    }
    const data = new FormData();
    data.append('title', title);
    data.append(is_image(media) ? 'image' : 'file', media);
    if (pass.length) {
      data.append('password', pass)
    }
    setLoading(true)
    const endpoint = is_image(media) ? '/image' : '/file'
    api.post(endpoint, data, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => setResult(res.data))
      .catch(err => setResult(err.response.data))
      .finally(() => setLoading(false))
  }

  return <Group position='center' align='stretch' direction='column'>
    <TextInput name='title' label='Title' value={title} onChange={ev => setTitle(ev.target.value)} required />
    <Dropzone multiple={false} loading={loading}
      padding='md' onDrop={onDrop} maxSize={10 * 1024 * 1024}
      children={status => DropzoneChild(status, media)}
    />
    <Password name='password' label='Password' value={pass} onChange={(e) => setPass(e.target.value)} />
    { result?.error && <Text sx={{alignSelf: 'center'}} inline color='red'>{result.error}</Text> }
    <Button sx={{alignSelf: 'center'}} loading={loading} onClick={upload_media}>Upload</Button>
    { result?.shortcode && <Shortcode base_uri='/view' shortcode={result?.shortcode} /> }
  </Group>
}

export { MediaView } from './view'
export { FileView } from './file-view'
