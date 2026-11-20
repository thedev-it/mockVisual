# MockVisual — Identité de marque

Sources : `docs/vision.md`, `docs/spec.md` (écrans déduits des user stories) et l'image de référence fournie (carrousel « OSI vs TCP/IP »). Les tokens se trouvent dans `packages/ui/tokens.css`.

> **Hypothèses à confirmer.** Les couleurs et les polices ci-dessous sont **estimées à l'œil** depuis l'image de référence, je n'ai pas accès à ses valeurs exactes. Si tu as les codes d'origine, remplace-les dans `tokens.css` : tout le reste suit. Le public visé est celui de la vision (développeurs freelances et graphistes francophones), avec un registre adapté aux juniors et intermédiaires.

## 1. Positionnement

**MockVisual transforme ton site en visuels réalistes, sans toucher à ton design.**
Il se distingue par le français, le prix bas, le mobile money, et la promesse que le design de l'utilisateur n'est jamais redessiné.

**Personnalité :** précis, pédagogue, direct, sobre. L'image de référence donne la règle : une phrase courte pose l'idée, la suivante la précise (« OSI sert à comprendre. TCP/IP est ce qu'Internet utilise vraiment. »).

## 2. Ton de voix

- **Tutoiement**, phrases courtes, un sujet par phrase.
- **Pédagogue sans condescendance** : on explique un terme technique la première fois qu'il apparaît.
- **Concret** : on dit ce qui s'est passé, ce que ça change, ce que tu peux faire.
- **Sobre** : pas de jeux de mots dans les erreurs, pas de points d'exclamation en série.

| À éviter | À écrire |
|---|---|
| « Oups ! Quelque chose s'est mal passé 😅 » | « La capture a échoué. Ton site n'a pas répondu en 60 secondes. » |
| « Erreur 422 » | « Ce fichier dépasse 10 Mo. Compresse-le ou choisis-en un autre. » |
| « Optimisez votre workflow visuel » | « Colle ton lien, récupère 5 visuels. » |

## 3. Palette (sombre par défaut)

Tous les ratios sont calculés (WCAG 2.1). Seuils : texte ≥ 4,5:1, texte large et éléments d'interface ≥ 3:1.

### Fonds et bordures

| Token | Valeur | Usage |
|---|---|---|
| `--mv-bg` | `#0B0D12` | Fond de page |
| `--mv-bg-sunken` | `#0F1319` | Blocs de code, champs |
| `--mv-surface` | `#141922` | Cartes |
| `--mv-surface-raised` | `#1B2230` | Survol, menus |
| `--mv-border` | `#2A3242` | Séparateurs décoratifs |
| `--mv-border-strong` | `#5B667C` | Contours de champs (3,05:1 sur surface) |

### Texte et accent

| Combinaison | Ratio | Verdict |
|---|---|---|
| Texte `#F4F6FA` sur fond `#0B0D12` | 17,96 | AAA |
| Texte `#F4F6FA` sur surface `#141922` | 16,28 | AAA |
| Secondaire `#9AA3B5` sur fond | 7,66 | AAA |
| Secondaire `#9AA3B5` sur surface | 6,95 | AA |
| Atténué `#8791A6` sur surface | 5,56 | AA |
| Accent `#C8F52E` sur fond | 15,32 | AAA |
| Texte `#0B0D12` sur aplat accent `#C8F52E` | 15,32 | AAA |

### États

| État | Couleur (sombre) | Ratio sur surface | Couleur (clair) | Ratio sur blanc |
|---|---|---|---|---|
| Succès | `#4ADE80` | 10,11 | `#067647` | 5,69 |
| Avertissement | `#FBBF24` | 10,55 | `#8A5A00` | 5,93 |
| Erreur | `#FF7A7A` | 6,98 | `#B42318` | 6,57 |
| Information | `#7DB8FF` | 8,53 | `#1D5FBF` | 6,10 |

**Règle :** l'état n'est jamais porté par la couleur seule. Chaque message d'état a aussi une icône et un texte.

### Thème clair

Il n'est activé que par `data-theme="light"`. Le lime est illisible sur fond clair : l'accent en texte devient un olive foncé `#4D6B00` (6,14:1 sur blanc), et le lime reste utilisé en aplat avec un texte sombre.

## 4. Typographie

| Rôle | Police | Pourquoi |
|---|---|---|
| Interface et titres | **Space Grotesk** | Proche de la police de ton image ; lisible, avec du caractère |
| Code et étiquettes | **JetBrains Mono** | Lisible à petite taille, signes distincts (0/O, 1/l) |

Les deux sont sous licence libre (OFL). À **auto-héberger** en `.woff2` pour la rapidité et la confidentialité. Piles de secours dans `tokens.css`.

| Échelle | Taille | Usage |
|---|---|---|
| xs | 12 px | Étiquettes mono en majuscules (ex. `OSI · TCP/IP`, `02/08`) |
| sm | 14 px | Texte secondaire |
| md | 16 px | Texte courant |
| lg | 20 px | Sous-titres |
| xl | 24 px | Titres de section |
| 2xl | 32 px | Titres de page |
| 3xl | 48 px | Accroches, avec interlettrage serré (-0,02 em) |

**Mise en valeur :** dans un titre, le mot clé passe en accent (« OSI vs **TCP/IP** »). Un seul mot ou groupe par titre.

## 5. Espacement et rayons

**Espacement, base 4 px :** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 (`--mv-space-1` à `-9`). Padding de carte : 24. Écart entre cartes : 16.

**Rayons :** 4 (étiquettes) · 8 (champs) · 12 (boutons, code) · 16 (cartes) · 24 (grandes surfaces) · pleine pilule (barres de progression, tags).

## 6. Composants

Les écrans viennent de `spec.md`. Deux composants demandés sont **adaptés au produit** : la « carte de post » devient la carte de projet/visuel, et les « boutons de vote » deviennent le retour sur la qualité d'un visuel.

### 6.1 Carte de projet et de visuel (US-09, US-10)

- **Structure :** vignette en haut (ratio du visuel : 1:1, mobile ou 16:9), puis titre du projet, étiquette mono (`SITE WEB · 5 VISUELS`), date, état.
- **Style :** fond `--mv-surface`, bordure 1 px `--mv-border`, rayon 16, padding 24, comme les lignes de l'image de référence.
- **Survol et focus :** fond `--mv-surface-raised` ; contour d'accent au focus clavier.
- **États :** *en cours* (badge info + barre de progression), *terminé* (badge succès), *échoué* (badge erreur).
- **Accessibilité :** toute la carte est un lien unique ; l'état est écrit en toutes lettres, pas seulement en couleur ; le texte alternatif de la vignette décrit le visuel.

### 6.2 Bloc de code

Sert à afficher une URL, un identifiant de support ou un extrait technique, que le public développeur copie souvent.

- **Style :** fond `--mv-code-bg`, police mono 14 px, rayon 12, padding 16, bordure `--mv-border`.
- **En-tête :** étiquette de langage en mono majuscule 12 px à gauche, bouton **Copier** à droite.
- **Copie :** le bouton annonce « Copié » pendant 2 secondes (région `aria-live="polite"`), sans changer de largeur.
- **Débordement :** défilement horizontal, jamais de retour à la ligne forcé. Le conteneur est focusable au clavier.
- **Coloration :** commentaire 5,88:1, chaîne 9,02:1, nombre 11,16:1, mot-clé 14,68:1 sur `#0F1319`. Le sens ne dépend pas de la couleur.

### 6.3 Boutons de retour sur un visuel (« j'aime » et « à améliorer »)

Ils alimentent l'indicateur « zéro réclamation d'altération » de la roadmap.

- **Deux boutons icône + texte**, groupés, hauteur 44 px (cible tactile), rayon 12, fond `--mv-surface-raised`.
- **Sélection :** le bouton choisi passe en aplat accent avec texte `--mv-on-accent` ; l'autre reste neutre. Un seul actif à la fois, annulable par un second clic.
- **Après « à améliorer » :** une courte liste de raisons s'ouvre (design altéré, scène irréaliste, mauvais cadrage). Elle permet de repérer les altérations.
- **Accessibilité :** `aria-pressed` sur chaque bouton, libellés explicites (« Ce visuel me convient », « Ce visuel est à améliorer »), jamais une icône seule.

### 6.4 Boutons principaux (rappel)

Primaire : aplat accent, texte sombre, 44 px, rayon 12. Secondaire : fond `--mv-surface-raised`, bordure `--mv-border`. Désactivé : texte `--mv-text-disabled`, avec une explication visible de la raison quand c'est utile.

### 6.5 Squelette de chargement (US-08)

- **Écran de génération :** 5 tuiles aux proportions réelles des formats de la série (1:1, 1:1, mobile, 16:9, au choix), pour éviter tout saut de mise en page à l'arrivée des visuels.
- **Style :** fond `--mv-skeleton-base` avec un reflet `--mv-skeleton-shine` qui défile lentement (animation `mv-shimmer`, 1,6 s), rayon 16.
- **Progression :** pourcentage en grand, avec « 2 visuels sur 5 » en texte secondaire. La barre fine en pilule reprend celle de l'image de référence (segments accent pour l'avancement, `--mv-border` pour le reste).
- **Accessibilité :** `role="progressbar"` avec `aria-valuenow`, texte de statut en `aria-live="polite"` ; l'animation s'arrête si `prefers-reduced-motion` est actif.
- **Message :** « Tu peux fermer cette page, la génération continue. »

### 6.6 État d'erreur (US-05, US-06, US-15)

- **Structure :** icône d'alerte, titre qui nomme le problème, une phrase qui explique la cause, un message sur les crédits si pertinent, une action principale et une action de secours.
- **Style :** fond `--mv-error-bg`, bordure d'erreur, titre en `--mv-error-text` (8,49:1 sur le fond d'erreur), rayon 16, padding 24.
- **Exemple (échec de capture) :** « La capture a échoué. Ton site n'a pas répondu en 60 secondes. [Réessayer] [Envoyer mes captures] »
- **Exemple (échec de génération) :** « La génération a échoué. Tes crédits ont été recrédités. [Relancer la série] »
- **Accessibilité :** `role="alert"` pour une erreur qui apparaît après une action ; le focus est placé sur le message ; en formulaire, l'erreur est liée au champ par `aria-describedby`.

## 7. Règles d'accessibilité transverses

- Contraste AA minimum partout, vérifié par calcul (sections 3 et 6).
- Focus visible : anneau de 2 px en accent, décalé de 2 px.
- Cibles tactiles de 44 px minimum.
- Mouvements réduits respectés (`prefers-reduced-motion`).
- Aucun état porté par la couleur seule.

## 8. À valider

1. Les codes exacts de couleurs et de polices de ton image de référence.
2. L'adaptation des composants : carte de projet/visuel et retour qualité, à la place de la carte de post et des boutons de vote.
3. Le nom d'usage du produit : « MockVisual » (ton message) ou « mockVisual » (`vision.md`).
