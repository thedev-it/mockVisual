# mockVisual — Spécification : user stories de la phase 1 (MVP)

Source : `docs/vision.md` et phase 1 de `docs/roadmap.md`.
Périmètre : mode **site web** uniquement, série de 5 visuels, génération asynchrone, essai gratuit, filigrane, crédits prépayés par mobile money, interface en français.

## Hypothèses à confirmer

Ces valeurs sont des paramètres de configuration, pas des décisions définitives.

| Paramètre                       | Valeur supposée                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------- |
| Coût d'une série en crédits     | **N crédits** (valeur configurable, fixée après mesure du coût réel par série)                    |
| Essai gratuit                   | 1 série de 5 visuels par compte, 1 numéro de téléphone = 1 essai                                  |
| Durée maximale d'une génération | 5 minutes                                                                                         |
| Formats de la série             | 2 visuels 1:1, 1 visuel mobile, 1 visuel multi-appareils 16:9, 1 visuel au choix de l'application |
| Captures acceptées              | PNG, JPG, WebP, 10 Mo maximum chacune, 8 captures maximum                                         |
| Agrégateur de paiement          | [https://www.maishapay.net/](https://www.maishapay.net/)                                          |

## Vue d'ensemble

| ID    | Titre                                            | Domaine    |
| ----- | ------------------------------------------------ | ---------- |
| US-01 | Inscription                                      | Compte     |
| US-02 | Connexion et déconnexion                         | Compte     |
| US-03 | Vérification du numéro de téléphone              | Compte     |
| US-04 | Utiliser l'essai gratuit                         | Essai      |
| US-05 | Créer un projet à partir d'une URL               | Projet     |
| US-06 | Créer un projet à partir de captures             | Projet     |
| US-07 | Lancer la génération d'une série de 5 visuels    | Génération |
| US-08 | Suivre la progression et quitter la page         | Génération |
| US-09 | Consulter les visuels d'une série                | Résultats  |
| US-10 | Retrouver mes projets                            | Résultats  |
| US-11 | Télécharger les visuels avec filigrane           | Export     |
| US-12 | Voir mon solde de crédits                        | Crédits    |
| US-13 | Acheter un pack de crédits par mobile money      | Paiement   |
| US-14 | Télécharger sans filigrane après achat           | Export     |
| US-15 | Être averti et remboursé en cas d'échec          | Génération |
| US-16 | Utiliser l'application en français et un anglais | Transverse |

---

## Compte

### US-01 — Inscription

**En tant que** visiteur, **je veux** créer un compte avec mon e-mail et un mot de passe **afin de** accéder à l'application et à mon essai gratuit.

**Critères d'acceptation**

- [ ] Étant donné un e-mail valide et non utilisé et un mot de passe d'au moins 8 caractères, quand je valide le formulaire, alors un compte est créé et je suis connecté.
- [ ] Étant donné un e-mail déjà utilisé, quand je valide, alors le compte n'est pas créé et un message d'erreur en français l'indique.
- [ ] Étant donné un e-mail invalide ou un mot de passe de moins de 8 caractères, quand je valide, alors chaque champ en erreur affiche un message précis.
- [ ] Le mot de passe est stocké haché et n'apparaît jamais en clair en base ni dans les journaux.
- [ ] Un compte nouvellement créé n'a aucun crédit payant et un essai gratuit non consommé.

### US-02 — Connexion et déconnexion

**En tant que** utilisateur inscrit, **je veux** me connecter et me déconnecter **afin de** retrouver mes projets en sécurité.

**Critères d'acceptation**

- [ ] Étant donné des identifiants corrects, quand je me connecte, alors j'arrive sur la liste de mes projets.
- [ ] Étant donné des identifiants incorrects, quand je me connecte, alors un message générique est affiché sans préciser si c'est l'e-mail ou le mot de passe qui est faux.
- [ ] Après 5 tentatives échouées en 10 minutes, la connexion est temporairement bloquée et un message l'indique.
- [ ] Quand je clique sur « Se déconnecter », ma session est invalidée et l'accès aux pages privées me redirige vers la connexion.
- [ ] Un visiteur non connecté qui ouvre une page privée est redirigé vers la connexion.

### US-03 — Vérification du numéro de téléphone

**En tant que** utilisateur, **je veux** vérifier mon numéro de téléphone **afin de** débloquer mon essai gratuit.

**Critères d'acceptation**

- [ ] Étant donné un numéro valide, quand je le saisis, alors un code à usage unique m'est envoyé par SMS.
- [ ] Étant donné le bon code saisi avant son expiration (10 minutes), alors mon numéro est marqué comme vérifié.
- [ ] Étant donné un code erroné ou expiré, alors le numéro reste non vérifié et un message l'indique.
- [ ] Étant donné un numéro déjà vérifié sur un autre compte, alors la vérification est refusée avec un message explicite.
- [ ] Le renvoi du code est limité à 3 envois par heure et par numéro.

---

## Essai gratuit

### US-04 — Utiliser l'essai gratuit

**En tant que** nouvel utilisateur, **je veux** générer une série de 5 visuels gratuitement **afin de** juger la qualité avant de payer.

**Critères d'acceptation**

- [ ] Étant donné un compte au téléphone vérifié et un essai non consommé, quand je lance une série, alors elle est générée sans débit de crédits.
- [ ] Étant donné un compte au téléphone non vérifié, quand je tente de lancer l'essai, alors je suis invité à vérifier mon numéro (US-03) et aucune génération ne démarre.
- [ ] Une fois l'essai consommé (série terminée), toute nouvelle série exige des crédits.
- [ ] Si la série de l'essai échoue, l'essai n'est pas considéré comme consommé (voir US-15).
- [ ] Les visuels de l'essai sont exportés avec filigrane.

---

## Projet

### US-05 — Créer un projet à partir d'une URL

**En tant que** développeur, **je veux** coller l'adresse de mon site **afin de** obtenir des visuels sans préparer de captures.

**Critères d'acceptation**

- [ ] Étant donné une URL publique valide (avec ou sans `https://`), quand je valide, alors l'application capture le site et crée un projet.
- [ ] Étant donné une URL invalide, inaccessible ou pointant vers une adresse locale ou privée, alors aucun projet n'est créé et un message d'erreur en français l'indique.
- [ ] La capture réelle du site (version ordinateur et version mobile) est conservée sans aucune modification de contenu.
- [ ] Si la capture échoue ou dépasse 60 secondes, un message propose de réessayer ou d'envoyer mes captures (US-06).
- [ ] Le secteur et l'ambiance détectés à partir du site sont affichés sous forme de tags.

### US-06 — Créer un projet à partir de captures

**En tant que** développeur, **je veux** envoyer mes propres captures **afin de** choisir ce qui est mis en scène (site non public, version privée).

**Critères d'acceptation**

- [ ] Étant donné 1 à 8 fichiers PNG, JPG ou WebP de 10 Mo maximum, quand je les envoie, alors un projet est créé avec ces captures.
- [ ] Étant donné un fichier d'un autre format ou trop lourd, alors il est refusé avec un message précis, sans bloquer les autres fichiers.
- [ ] Je peux indiquer pour chaque capture s'il s'agit d'une version ordinateur ou mobile.
- [ ] Je peux retirer une capture avant de lancer la série.
- [ ] Les captures sont utilisées telles quelles lors de l'incrustation.

---

## Génération

### US-07 — Lancer la génération d'une série de 5 visuels

**En tant que** utilisateur, **je veux** lancer la génération de ma série **afin de** obtenir 5 visuels réalistes de mon site.

**Critères d'acceptation**

- [ ] Étant donné un projet valide et un solde suffisant (ou un essai disponible), quand je lance la série, alors N crédits sont débités (aucun pour l'essai) et la génération démarre en tâche de fond.
- [ ] Étant donné un solde insuffisant et aucun essai disponible, alors la génération ne démarre pas et je suis invité à acheter un pack (US-13).
- [ ] Une série terminée contient exactement 5 visuels respectant les formats prévus.
- [ ] La scène de chaque visuel est générée par l'IA avec un emplacement vierge, et la capture est incrustée en perspective par l'application : **la capture n'est jamais envoyée au modèle d'IA ni redessinée**.
- [ ] Un double clic ou deux requêtes simultanées ne créent qu'une seule série et un seul débit.

### US-08 — Suivre la progression et quitter la page

**En tant que** utilisateur, **je veux** voir l'avancement et pouvoir fermer la page **afin de** ne pas attendre devant l'écran.

**Critères d'acceptation**

- [ ] Pendant la génération, la page affiche un pourcentage et le nombre de visuels terminés sur 5.
- [ ] Si je ferme la page puis reviens, la progression réelle est affichée et la génération n'a pas été interrompue.
- [ ] Quand un visuel est prêt, il apparaît sans recharger la page.
- [ ] Une série qui dépasse 10 minutes passe en état d'échec (US-15).
- [ ] La progression est visible en moins de 5 secondes après le lancement.



**Critères d'acceptation**

- [ ] Étant donné une série qui échoue entièrement, alors les N crédits sont recrédités automatiquement (ou l'essai est restitué).
- [ ] Étant donné une série où seuls certains visuels échouent, alors les visuels réussis restent disponibles et la partie échouée peut être relancée sans nouveau débit.
- [ ] Un message en français explique l'échec et propose de relancer.
- [ ] Le remboursement est tracé dans l'historique des crédits (US-12).
- [ ] Un échec n'est jamais remboursé deux fois.

---

## Résultats

### US-09 — Consulter les visuels d'une série

**En tant que** utilisateur, **je veux** voir mes 5 visuels **afin de** choisir ceux que je publie.

**Critères d'acceptation**

- [ ] Étant donné une série terminée, quand j'ouvre le projet, alors les 5 visuels sont affichés avec leur format (1:1, mobile, 16:9).
- [ ] Je peux ouvrir un visuel en grand pour contrôler la lisibilité du texte de mon site.
- [ ] Le contenu incrusté correspond à ma capture d'origine, sans déformation autre que la perspective de la scène.
- [ ] Les tags de secteur et d'ambiance sont affichés en tête de projet.

### US-10 — Retrouver mes projets

**En tant que** utilisateur, **je veux** voir la liste de mes projets **afin de** revenir à mes séries plus tard.

**Critères d'acceptation**

- [ ] La liste affiche chaque projet avec son titre, sa date et son état (en cours, terminé, échoué).
- [ ] Un utilisateur ne voit jamais les projets d'un autre utilisateur, même en modifiant l'URL.
- [ ] Étant donné aucun projet, alors un message vide propose de créer le premier projet.
- [ ] Je peux supprimer un projet ; ses fichiers sont alors retirés du stockage.

---

## Export

### US-11 — Télécharger les visuels avec filigrane

**En tant que** utilisateur en essai, **je veux** télécharger mes visuels **afin de** les évaluer hors de l'application.

**Critères d'acceptation**

- [ ] Étant donné un compte sans achat de pack, quand je télécharge un visuel, alors le fichier contient un filigrane visible.
- [ ] Je peux télécharger un visuel seul ou « Tout télécharger » dans une archive ZIP.
- [ ] Le filigrane est appliqué côté serveur : l'image sans filigrane n'est pas accessible par une URL publique.
- [ ] Un bandeau indique que les exports sont filigranés et propose d'acheter des crédits.

### US-14 — Télécharger sans filigrane après achat

**En tant que** utilisateur ayant acheté un pack, **je veux** exporter sans filigrane **afin de** utiliser les visuels dans mon portfolio ou mes présentations.

**Critères d'acceptation**

- [ ] Étant donné un compte avec au moins un achat de pack confirmé, quand je télécharge, alors le fichier est sans filigrane.
- [ ] Les visuels déjà générés pendant l'essai deviennent téléchargeables sans filigrane après le premier achat.
- [ ] Étant donné un paiement non confirmé, alors les exports restent filigranés.

---

## Crédits et paiement

### US-12 — Voir mon solde de crédits

**En tant que** utilisateur, **je veux** voir mon solde et mon historique **afin de** savoir combien de séries je peux encore lancer.

**Critères d'acceptation**

- [ ] Le solde est visible en permanence dans l'en-tête.
- [ ] L'historique liste chaque achat, débit et remboursement avec sa date et son montant en crédits.
- [ ] Le solde ne peut jamais devenir négatif.
- [ ] Le solde affiché correspond à la somme de l'historique.

### US-13 — Acheter un pack de crédits par mobile money

**En tant que** utilisateur, **je veux** payer par mobile money **afin de** obtenir des crédits sans carte bancaire.

**Critères d'acceptation**

- [ ] Je peux choisir un pack parmi les packs proposés, avec son prix en monnaie locale et le nombre de séries équivalent.
- [ ] Quand je valide, je suis guidé vers la confirmation sur mon téléphone via l'agrégateur de paiement.
- [ ] Les crédits ne sont ajoutés qu'**après réception de la confirmation du paiement** par l'agrégateur, et jamais sur la seule action du navigateur.
- [ ] Une même confirmation reçue deux fois n'ajoute les crédits qu'une fois.
- [ ] Étant donné un paiement refusé, annulé ou expiré, alors aucun crédit n'est ajouté et un message en français le signale avec la possibilité de réessayer.
- [ ] Chaque achat apparaît dans l'historique (US-12).

---

## Transverse

### US-16 — Utiliser l'application en français 

**En tant que** utilisateur francophone, **je veux** une interface entièrement en français **afin de** l'utiliser sans barrière de langue.

**Critères d'acceptation**

- [ ] Tous les textes visibles (pages, boutons, messages d'erreur, e-mails, SMS) sont en français.
- [ ] Aucune clé de traduction ni texte anglais brut n'est visible à l'écran.
- [ ] Les prix s'affichent dans la monnaie locale avec le format adapté.
- [ ] Les textes sont centralisés dans les fichiers de traduction de l'application.

---

## Hors périmètre de cette spécification

Mode logo, abonnements, avant/après, éditeur de scènes, API publique, équipes, vidéo, application mobile (voir `docs/vision.md`).
