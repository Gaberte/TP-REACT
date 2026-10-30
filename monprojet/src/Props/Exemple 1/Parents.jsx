import Somme from "./Enfant"


export default function Parents() 
{
    return(
        <div>
        <h1> composant parent </h1>
        <Somme a={5} b={4}/>
        </div>
    )
}