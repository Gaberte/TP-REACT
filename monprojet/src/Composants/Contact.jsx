import { useState } from "react"
import styles from './Contact.module.css'

export default function Contact(){
const [formData, setFormData] = useState({nom: "", prenom: "", email: "", telephone: ""});
    return(
 <form action="" className={styles.formulaire}>
    <h2>Contactez-nous</h2>
    <p className={styles.soustitre}>Remplissez le formulaire ci-dessous</p>
    <div className={styles.ligne}>
    <div className={styles.champ}>
        <label htmlFor="Nom">Nom</label>
        <input placeholder="votrenom"
            id="nom"
            type="text"
            value={formData.nom}
            onChange={(e)=> {setFormData((prev)=>({...prev,nom: e.target.value}))}}
        />
        <p></p>
    </div>
    <div className={styles.champ}>
        <label htmlFor="prenom">Prénom</label>
        <input placeholder="votreprenom"
            id="prenom"
            type="text"
            value={formData.prenom}
            onChange={(e)=> {setFormData((prev)=>({...prev,prenom: e.target.value}))}}
        />
        <p></p>
    </div>
    <div className={styles.champ}>
        <label htmlFor="email">Email</label>
        <input placeholder="votrecom"
            id="email"
            type="text"
            value={formData.email}
            onChange={(e)=> {setFormData((prev)=>({...prev,email: e.target.value}))}}
        />
        <p></p>
    </div>
    <div className={styles.champ}>
        <label htmlFor="telephone">Telephone</label>
        <input placeholder="votretelephone"
            id="telephone"
            type="text"
            value={formData.telephone}
            onChange={(e)=> {setFormData((prev)=>({...prev,telephone: e.target.value}))}}
        />
        <p></p>
    </div>
    </div>
    <p></p>
    <button>Envoyez</button>
 </form>
    )

}