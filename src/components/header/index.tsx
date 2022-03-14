import Logo from "../logo";
import styles from './index.module.scss'

export default function Header() {
  return <header className={styles.header}><Logo link /></header>
}
