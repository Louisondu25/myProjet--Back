# myProjet--Back

## Etat du programme:
    Fonctionnalité a coder en cours: Api Terminés All Test Passed =D.
    etat  du Projet: Api Terminés All Test Passed =D.

# Arboresence fichier et dossier:
  - controllers       (Il recois les requetes - UserController -> recois les requetes verifier 
                      les droits et le retour des code erreur puis diriger vers les services)
  - services          (Les fonctionnent qui interagise directment avec la base de donnée Chercher
                      modifier supprimer, etc.. (login))
  - schemas           (Ils contients des informations de structure de votre base de données 
                      par schema ou table)
  - middlewares       (Les fonctions HTTP de middleware qui verifier que les conditions sont 
                      requises pour acceder au controllers)
  - utils             (Tous les fonctions annexes et reutilisable de votre code)
  - tests             (Il contient les tests de tous les fonctions)
    - services        (Les tests des fonctions services)
    - controllers     (Les tests des fonctions de controllers)
    index.js          (Il pilote tous les tests)
  - events            (Il contient tous les evenements qui peuvent se produit dans le logiciel
                      (connexion a la base de donnée),modification, ou creation d'element dans
                      la base de données)
  - logs              (Ils contient les logs de l'application)
  config.js           (Ils contient les configurations de l'application (secret_key, port, etc..))
  server.js           (Le  point d'entre de l'application ils contient tous les endpoint 
                      qui diriger vers les bons controllers, il initialise aussi les middlewares 
                      et autre systeme de l'application)