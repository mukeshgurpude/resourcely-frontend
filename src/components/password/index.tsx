import { Accordion, PasswordInput, PasswordInputProps } from "@mantine/core"

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/** A reusable component for use in passwords that includes password */
export default function Password({ value, onChange, ...props }: Props | PasswordInputProps) {
  return <Accordion offsetIcon={false}>
    <Accordion.Item label='Advanced options'>
      <PasswordInput {...props} value={value} onChange={onChange} />
    </Accordion.Item>
  </Accordion>
}
