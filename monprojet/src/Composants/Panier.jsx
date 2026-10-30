import './style.css'
import styles from './Produit.module.css'

export default function Panier() {
    return(
        <aside className={styles.rightcolumn}>
                    <h2>Panier</h2>
                    <p>2 articles</p>
                    <p>Total : 74 €</p>
        </aside>
    )
}
