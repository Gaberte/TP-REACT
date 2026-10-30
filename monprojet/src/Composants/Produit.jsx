import './style.css'
import styles from './Produit.module.css'

export default function Produit() {
    return(
        <div>
       
        <main className={styles.content}>
            <h2>Produits</h2>
            <div className={styles.carte}>
                <h3>Clavier</h3>
                <p>49 €</p>
            </div>
            <div className={styles.carte}>
                <h3>Souris</h3>
                <p>25 €</p>
            </div>
        </main>
       
        </div>
    )
}