// Styles
import styles from './class.module.scss'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';


const Class = () => {
  console.log("class rendered");

  // Hooks
  const { theme } = useTheme();

  //# Logs
  console.log('theme', theme)

  return (
    <div className={`${styles.class_container} ${styles[theme]}`}>
      <div className={styles.title}>Class Model</div>
      <div className={styles.divider}></div>
    </div>
  )
}

export default Class