import { Button, Group, Image, Text, TextInput, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { MouseEvent, useEffect, useState } from 'react';
import Shortcode from '../../components/shortcode';
import api from '../../services';


function DropzoneChild(status: DropzoneStatus, media: File|null) {
  const theme = useMantineTheme()
  return <Group position={media ? 'apart' : 'center'} style={{minHeight: 200, minWidth: 400}}>
    {
    media ? <>
      <Group direction='column' spacing={0} position='center'>
        <Text>Uploaded Image: </Text>
        <Text underline>{media.name}</Text>
      </Group>
      <Image width={200} height={200} radius='sm' fit='contain'
        src={URL.createObjectURL(media)} alt={media.name}
        style={{boxShadow: theme.shadows.lg}} withPlaceholder
      />
    </>
    : <Text inline>Drop an image or click here to select image</Text>
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
  const onDrop = (acceptedFiles: File[]) => {
    setMedia(acceptedFiles[0]);
  }

  useEffect(() => setResult({}), [media])

  function upload_media(ev: MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    if (!media) {
      setResult({error: 'No image selected'})
      return;
    }
    if (!title) {
      setResult({error: 'No title entered'})
      return;
    }
    const data = new FormData();
    data.append('title', title);
    data.append('image', media);
    setLoading(true)
    api.post('/image', data, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => setResult(res.data))
      .catch(err => setResult(err.data))
      .finally(() => setLoading(false))
  }

  return <Group position='center' align='stretch' direction='column'>
    <TextInput name='title' label='Title' value={title} onChange={ev => setTitle(ev.target.value)} required />
    <Dropzone accept={IMAGE_MIME_TYPE} multiple={false} loading={loading}
      padding='md' onDrop={onDrop} maxSize={10 * 1024 * 1024}
      children={status => DropzoneChild(status, media)}
    />
    { result?.error && <Text sx={{alignSelf: 'center'}} inline color='red'>{result.error}</Text> }
    <Button sx={{alignSelf: 'center'}} loading={loading} onClick={upload_media}>Upload</Button>
    { result?.shortcode && <Shortcode base_uri='/media' shortcode={result?.shortcode} /> }
  </Group>
}

export { MediaView } from './view'
