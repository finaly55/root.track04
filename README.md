# root.Track
Root.Track est le front du projet Campus Network du groupe NANTES TEAM FORCE 04.

---
## 💿 Installation du projet
```
npm install
```

### Compilation pour le dev
```
npm run dev
```

### Compilation pour la prod
```
npm run build
```

--- 
## 🔧 Accès aux outils du projet :
### Mongo :
cloud.mongodb.com : connexion avec Google

---
## ⚠️ Les bonnes pratiques à adoptées ⚠️ 
### Git :
- Toujours se créer une branche pour développer **une et une seule** fonctionnalité, une tache ou un bug !
- Chaque branche devra être nommée avec son **type d'US et son numéro d'US**, exemple : feature/CN-24
- Chaque commit devra dire ce qui a été ajouter, exmemple :
```
git commit -m "[CN-12] Ajout de la page de connexion + modification du router pour faire la redirection vers la page de login si néccessaire"
```
- Ne jamais push sur la branche dev/prod/pre-prod, toujours faire un merge request 
- Relecture de code et testes obligatoires par un **autre** developpeur afin de valider une merge request

### Code :
- Nom de variable et fonction en **anglais** + explicite + respect du camel case ! <br/>*Exemple : **a**n**C**ar, **g**et**U**ser()  <br/> Contre-exemple : var1, Var2, ACAr, Getuser(), getuser() <br/>*
- Faire un commentaire en francais pour chaque fonction et partie de code complexe exemple : 
```
// fonction qui permet de recupérer un utilisateur via son id
getUserById(){
    ...
}
```
- utilisez de manière privligiée les `forEach` plutôt que des boucles `for`
- utilisez de manière privligiée les `switch case` plutôt que des `if, else if` à répétition
- optimiser votre code pour qu'il soit **le plus compact et lisible possible** (grâce aux `filter`, `findIndex`, `find` ...)
- utilisez des **composants** pour découper votre code 
- pensez **programmation orienté object** (si vous passez beaucoup d'attribut d'un object, passez à vos composants des objects entiers plutôt que chaque attribut par exemple)

<br/>

Exemple :

```
<Post 
    :article="article"
    :user="user">
```
<br/>
Plutôt que :

```
<Post 
    :id="article.id"
    :titre="article.titre"
    :description="article.description"
    ...
    :fistname="user.fisrname"
    :lastname="user.lastname"
    :friends="user.friends"
    ...>
```

<br/>
- Si un module doit être installé, faites en part à l'équipe, toujours prendre des modules populaires et sous licence libre de préférence (MIT ...)

## Outils conseillés
- VS Code + exentions : Vetur, GitLens
- Chrome + extension : Vue.js devtools
