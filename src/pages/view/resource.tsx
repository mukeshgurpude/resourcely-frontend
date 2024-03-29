import { FileView } from '../media-uploader'
import { MediaView } from '../media-uploader'
import { TextView } from '../text'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Loader } from '@mantine/core'
import axios from 'axios'
import api from '../../services'

interface Response {
  error ?: string
  message ?: string
  shortcode ?: string
}

type ResponseType = Response | { [key: string]: string }

export default function ResourceView() {
  // TODO: Provide a modal for password in case 401 occurs
  const { shortcode } = useParams() as { shortcode: string }
  const location = useLocation()
  // @ts-ignore
  const [ result, setResult ] = useState<ResponseType>(location.state?.response ?? {})
  // @ts-ignore
  const [ pass, ] = useState<string|undefined>(location.state?.password)

  useEffect(() => {
    if (Object.keys(result).length) return;

    // Select base address based on resource type
    // TODO: Replace `base` with generic '/resource'
    let base = '/resource'
    switch(shortcode[0]) {
      case 't': base = '/text'; break;
      case 'i': base = '/image'; break;
      case 'f': base = '/file'; break;
    }
    const cancel_token = axios.CancelToken.source()

    api.get(`${base}/${shortcode}?meta=true`, { cancelToken: cancel_token.token })
      .then(res => setResult(res?.data))
      .catch(error => setResult(error?.response?.data ?? { error: error.message }))
    return cancel_token.cancel
  }, [shortcode, result])

  switch(shortcode[0]) {
    case 't':
      return <TextView {...result} />
    case 'i':
      return <MediaView {...{...result, password: pass}} />
    case 'f':
      return <FileView {...{...result, password: pass}} />
  }
  return <Loader/>
}
