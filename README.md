# Wails + shadcn/ui template

Use with: `wails init -n "Your Project Name" -t https://github.com/cilps/wails-template-shadcn`.

This is my interpretation of a _"good"_ Wails template.

It uses:

- React (with React compiler)
- Typescript
- Tailwindcss
- Base UI
- Lucide icons
- shadcn/ui

It also has a `theme-provider.tsx` that manages the current theme and variants. Variants can give your app a completely
different look, variants can be changed at runtime with the `useVariant` hook.

If you don't want variants, you can remove `variants.css` and `theme-provider.tsx` and use [
`next-themes`](https://github.com/pacocoursey/next-themes).

This template uses **pnpm**, if you use a different package manager update `wails.json` accordingly.
