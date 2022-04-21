import { Alert, Button, Checkbox, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from '@mantine/hooks'
import { useState } from "react"
import api, { prefixes } from '../../services'

type field = 'shortcode' | 'password'
type initials = 'u' | 't' | 'i' | 'f'
interface Response {
  error ?: string
  message ?: string
  shortcode ?: string
}

type ResponseType = Response | { [key: string]: string }

export default function View() {
  const form = useForm({
    initialValues: {
      shortcode: '',
      password: '',
      hasPassword: false
    }, validationRules: {
      shortcode: (value) => value.length >= 6 && new RegExp('^[utif]').test(value)
    }, errorMessages: {
      shortcode: 'Invalid shortcode'
    }
  })
  const [result, setResult] = useState<ResponseType>({})

  function get_resource(values: typeof form.values) {
    const pre = values.shortcode[0] as initials
    const extra_headers = {} as { [key: string]: string }
    if (values.hasPassword) {
      extra_headers['password'] = values.password
    }

    api.get(`${prefixes[pre]}/${values.shortcode}`, { headers: extra_headers })
      .then(res => {
        setResult(res.data)
        if (res.data.original_url) {
          window.location.href = res.data.original_url
        }
      })
      .catch(err => {
        setResult({ error: err.response.data.error ?? err.response.data.message })
      })
  }

  function validate_field(name: field) {
    return function() {
      form.validateField(name)
    }
  }

  return <Group direction='column' align='center'>
    {
      result.error
      && <Alert color='red' children={result.error} variant='filled' />
    }
    <form style={{
      gap: 5, display: 'flex',
      flexDirection: 'column', minWidth: 250
    }} onSubmit={form.onSubmit(get_resource)}>
      <TextInput
        label='Shortcode' name='shortcode'
        required placeholder='Enter shortcode'
        onBlur={validate_field('shortcode')}
        {...form.getInputProps('shortcode')}
      />
      <Checkbox label='Password' {...form.getInputProps('hasPassword')}/>
      {
        form.values.hasPassword
          && <PasswordInput
          name='password' required
          placeholder='Enter password'
          onBlur={validate_field('password')}
          {...form.getInputProps('password')}
        />
      }
      <Button style={{alignSelf: 'center'}} type='submit' children='View resource' />
    </form>
  </Group>

}
