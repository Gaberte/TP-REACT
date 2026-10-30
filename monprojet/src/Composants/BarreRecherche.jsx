export default function BarreRecherche({ valeur, onChange, onEffacer, inputRef }) {
return (
<div style={{ display: "flex", gap: 8 }}>
<input
ref={inputRef}
type="text"
placeholder='Rechercher un produit… (touche "/")'
value={valeur}
onChange={(e) => onChange(e.target.value)}
style={{ flex: 1 }}
/>
<button type="button" onClick={onEffacer} disabled={!valeur}>
Effacer
</button>
</div>
);
}