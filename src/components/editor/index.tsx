import { useMantineTheme } from '@mantine/core'
import Editor from '@monaco-editor/react'

type Props = {
  value: string
  setValue: (value: string) => void
  language: string
}

export default function MonacoEditor({ value, setValue, language }: Props) {
  const theme = useMantineTheme()
  return <Editor
    language={language} value={value} width={400}
    onChange={val => setValue(val ?? '')}
    height="150px" theme={theme.colorScheme === 'light' ? 'light' : 'vs-dark'}
    options={{
      contextmenu: false,
    }}
  />
}
