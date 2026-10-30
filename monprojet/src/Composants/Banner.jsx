import Menu from "./Menu";
import styles from "./Banner.module.css"

export default function Banner() {
    return (
        <header className={styles.banner}>
        <h1>SkillHome</h1>
        <Menu/>
        </header>
        
    )
}