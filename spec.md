# Digital Evidence Protection System

## Current State
App has 7 pages: Home, About, Evidence Upload (with scam types), Evidence Verification, Case Dashboard, Admin Panel, Contact. Role selection exists in Signup. All pages share a single view regardless of role.

## Requested Changes (Diff)

### Add
- `RolePortal` page (`/role-portal`): Animated role selection hub — 3 animated cards for Investigator, Officer, User with role descriptions, icons, glow effects, floating particles, enter button per card.
- `InvestigatorDashboard` page (`/investigator`): Full investigator view with — assigned cases list, evidence under investigation, chain-of-custody timeline, quick-seal actions, detailed stats (pending/active/closed), animated counters, staggered card reveals, parallax header.
- `OfficerDashboard` page (`/officer`): Officer field view — submitted evidence list, assigned cases (read-only), file a new report button (links to upload), mission status badges, animated progress rings, field notes section.
- `UserPortal` page (`/user-portal`): Citizen/user complaint portal — submit complaint form (name, contact, scam type, description), track case by ID input, evidence verification shortcut, animated stepper showing complaint process, status tracking card.
- All 4 pages: Heavy framer-motion animations — staggered entrance, floating glowing orbs, animated counters, scan-line overlays, pulsing badges, parallax backgrounds, page-transition fade-slide.

### Modify
- `App.tsx`: Add routes for `/role-portal`, `/investigator`, `/officer`, `/user-portal` (all protected).
- `Navbar.tsx`: Add "My Portal" link that routes to `/role-portal` when authenticated, replacing or supplementing existing dashboard link.
- Login redirect: after login, redirect to `/role-portal` instead of `/dashboard`.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/pages/RolePortal.tsx` — animated 3-card role selection
2. Create `src/pages/InvestigatorDashboard.tsx` — investigator-specific detailed view
3. Create `src/pages/OfficerDashboard.tsx` — officer field dashboard
4. Create `src/pages/UserPortal.tsx` — citizen complaint + tracking portal
5. Update `App.tsx` to add 4 new routes
6. Update `Navbar.tsx` to add Portal link
7. Update `Login.tsx` redirect to `/role-portal`
