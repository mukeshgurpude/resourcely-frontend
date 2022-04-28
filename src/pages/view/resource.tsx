import { FileView } from '../media-uploader'
import { MediaView } from '../media-uploader'
import { TextView } from '../text'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Loader } from '@mantine/core'
import api from '../../services'

type Props = { shortcode?: string, type: 'file' | 'text' | 'media' } | {[key: string]: string}
interface Response {
  error ?: string
  message ?: string
  shortcode ?: string
}

type ResponseType = Response | { [key: string]: string }

export default function ResourceView() {
  const { shortcode } = useParams()
  const location = useLocation()
  // @ts-ignore
  const [ result, setResult ] = useState<ResponseType>(location.state?.response ?? {})

  useEffect(() => {
    if (Object.keys(result).length) return;
    api.get(`/resource/${shortcode}`)
      .then(res => setResult(res.data))
      .catch(({response: {data}}) => setResult(data))
  }, [shortcode])

  switch((shortcode as string)[0]) {
    case 't':
      return <TextView {...result} />
  }
  return <Loader/>
}
