import { Link } from 'react-router-dom'
// import styles from './index.module.scss'

type Props = {
  link ?: boolean
}

export default function Logo({ link }: Props) {
  return <span>
    {link ? <Link to='/'>Resourcely</Link> : 'Resourcely'}
  </span>
}
