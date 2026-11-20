# AGENTS.md — mockVisual

À lire avant de modifier le code. Ce fichier dit avec quoi on construit et où va chaque chose. Le comportement produit est dans `docs/spec.md`, le ton dans `docs/brand.md`.

## Stack

| Rôle | Choix |
|---|---|
| Langage | TypeScript |
| Frontend `apps/web` | Next.js (App Router) |
| Backend `apps/api` | Next.js (App Router, route handlers uniquement) |
| Base | Supabase Postgres, schéma et migrations Drizzle dans `packages/db` |
| Auth | Supabase Auth (e-mail + mot de passe, OTP téléphone) |
| Fichiers | Supabase Storage, buckets privés |
| Validation | Zod dans `packages/validation`, partagé par l'API et le web |
| Interface | `packages/ui` (composants et tokens) |
| Monorepo | pnpm + Turborepo |

Le backend est Next.js pour rester sur un seul runtime. Un handler HTTP ne contient pas de logique : il délègue à un controller, qui délègue à un service.

Le navigateur ne parle à Postgres que pour la session (clé anon). Les requêtes métier passent par `apps/api` et Drizzle.

## Architecture

```
apps/api/src/app/api/<ressource>/route.ts  →  src/controllers/  →  src/services/
apps/web/src/app/                          pages et layouts
apps/web/src/features/<module>/            components/, hooks/, api/
packages/db/                               schéma Drizzle, migrations
packages/validation/                       schémas Zod
packages/ui/                               composants partagés, tokens
```

- Une feature web (compte, projet, génération, crédits, paiement) vit dans `features/<module>/`. La page dans `src/app/` ne fait qu'assembler.
- L'appel HTTP vers l'API vit dans `features/<module>/api/`. Pas de `fetch` dispersé dans un composant.
- Les types partagés sortent des schémas Zod (`z.infer`). On ne les réécrit pas à la main.
- `apps/web` n'importe ni `packages/db`, ni un service, ni une clé serveur.

## Commandes

À la racine, Turborepo orchestre :

- `pnpm dev`
- `pnpm test`
- `pnpm lint`

Dépendance limitée à un package : `pnpm --filter <nom> add <paquet>` (`api`, `web`, `db`, `validation`, `ui`).

pnpm uniquement. Pas npm, pas yarn.

## Règles

- Un changement suit `docs/spec.md`. Pas de mode logo, d'abonnement, d'éditeur de scène, d'API publique ni d'application mobile.
- L'interface est en français, tutoiement, textes centralisés. Aucune clé de traduction visible.
- La capture d'écran est incrustée telle quelle. Le modèle d'IA ne reçoit que la demande de scène à emplacement vierge.
- La génération ne s'exécute pas dans le handler HTTP : le service lance une tâche de fond et la requête répond tout de suite. La file n'est pas choisie : ne l'invente pas dans le handler.
- Crédits, filigrane et confirmation de paiement se décident dans `apps/api`, jamais dans le navigateur.

## Sécurité

- Secrets (`DATABASE_URL`, clé service Supabase, clé du modèle, secret de l'agrégateur) uniquement dans `apps/api`. Jamais dans `apps/web`, jamais commités.
- Chaque service filtre par l'utilisateur authentifié. Un id dans l'URL ne donne aucun accès.
- Mot de passe géré par Supabase Auth. Jamais en clair en base, dans les logs ou dans une réponse.
- Échec de connexion : message générique, sans dire si l'e-mail ou le mot de passe est faux. Blocage après 5 échecs en 10 minutes.
- Téléphone : code à usage unique, 10 minutes, 3 envois par heure et par numéro. Un numéro vérifié n'appartient qu'à un compte.
- Capture d'URL : refuser une adresse locale, une IP privée ou un endpoint de métadonnées. PNG, JPG, WebP, 10 Mo, 8 fichiers.
- L'image sans filigrane n'a pas d'URL publique. Le filigrane est appliqué dans l'API.
- Les crédits n'augmentent qu'après la confirmation de l'agrégateur (hypothèse actuelle : MaishaPay), une seule fois pour la même confirmation. Le solde ne devient pas négatif. Un remboursement n'est fait qu'une fois.
- Deux requêtes simultanées ne créent qu'une série et qu'un débit.

## Interdits

- `npm`, `yarn`, ou un autre gestionnaire de paquets.
- De la logique métier dans `route.ts` ou dans un composant React.
- Un second schéma Zod, un second ORM, ou du SQL en dehors de `packages/db`.
- Importer `packages/db` depuis `apps/web`.
- Envoyer une capture au modèle, ou redessiner le site de l'utilisateur.
- Ajouter des crédits sur la seule action du navigateur.
- Exposer la clé service Supabase ou une image sans filigrane.
