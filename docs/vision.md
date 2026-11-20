# mockVisual — Vision (MVP)

## Problème

Avant de livrer ou de présenter un projet, un développeur ou un graphiste veut voir son rendu en situation réelle. Fabriquer un prototype ou organiser un shooting coûte du temps et de l'argent. Les outils de mockup existants sont en anglais, chers pour le marché visé et payables surtout par carte bancaire, ce qui exclut une partie des freelances francophones.

## Cible

- **Prioritaire** : développeurs web freelances et agences qui veulent des visuels portfolio de leurs sites.
- **Secondaire** : graphistes (logo, identité), traités après le MVP.
- **Marché** : francophone, avec un paiement par mobile money.

## Proposition de valeur

> Colle l'adresse de ton site, récupère 5 visuels réalistes en quelques minutes, sans aucune altération de ton design, pour un prix accessible et payable en mobile money.

**Différenciation**

1. Marché francophone : interface, support et communication en français.
2. Prix bas : crédits prépayés, sans abonnement obligatoire.
3. Paiement local : mobile money.
4. Fidélité garantie : le design de l'utilisateur n'est jamais redessiné par l'IA.

## Principe technique clé : approche hybride

1. L'IA génère **la scène** (bureau, appareil, lumière) avec un écran ou un emplacement vierge.
2. L'application détecte les 4 coins de l'emplacement.
3. Elle y **incruste la vraie capture du site** par transformation de perspective, avec un ajustement léger des reflets et des ombres.

La capture est faite par l'application (`apps/api`) ou fournie par l'utilisateur. Le design reste donc identique pixel pour pixel.

## Périmètre du MVP

- **Un seul mode : site web**, par URL ou par envoi de captures (ordinateur, mobile).
- **Une série = 5 visuels**, avec des formats variés (1:1, mobile, multi-appareils 16:9).
- **Génération asynchrone** : l'utilisateur peut fermer la page, la progression est conservée.
- **Essai gratuit** : 1 série de 5 visuels par compte, avec vérification du numéro de téléphone.
- **Exports filigranés** en gratuit, sans filigrane après achat.
- **Crédits prépayés** : packs achetés par mobile money.
- **Génération avec un modèle d'IA gratuit** pour valider le produit.
- **Interface 100 % en français.**

## Exclu volontairement du MVP

- Mode logo et identité (prévu en phase 2).
- Éditeur de scènes ou personnalisation manuelle.
- Paire avant/après.
- Abonnements récurrents (mal adaptés au mobile money).
- API publique, équipes et collaboration.
- Vidéo et animations.
- Application mobile native.

## Indicateurs de succès

- Taux de séries terminées avec succès.
- Conversion de l'essai gratuit vers un premier achat.
- Coût moyen par série comparé au prix d'un pack.
- Satisfaction sur la fidélité du design (aucune réclamation d'altération).

## Risques et hypothèses à vérifier

| Risque | Vérification prévue |
|---|---|
| Le modèle gratuit ne produit pas de scènes avec un emplacement propre et détectable | Prototype de 10 scènes avant tout développement du produit |
| Limites de débit ou licence d'usage commercial du modèle gratuit | Lire les conditions du fournisseur avant le lancement |
| Coût par série supérieur au prix de vente | Mesurer le coût réel sur le prototype avant de fixer les prix |
| Abus de l'essai gratuit | Vérification du téléphone, 1 série par compte |
| Couverture du mobile money selon les pays | Choisir l'agrégateur de paiement avant la phase de développement |

## Prochaines étapes

1. Prototyper la génération de scènes et l'incrustation (10 scènes).
2. Choisir l'agrégateur de paiement mobile money.
3. Développer le MVP (Next.js, Supabase, Drizzle, file d'attente, stockage objet). La stack est détaillée dans `AGENTS.md`.
4. Tester avec 5 à 10 développeurs francophones, puis ouvrir les ventes.
