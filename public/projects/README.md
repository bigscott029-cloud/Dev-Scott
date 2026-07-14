# Project Images

Put verified screenshots, diagrams, and media for each project in these folders:

- `public/projects/campushub/`
- `public/projects/telegram-automation-platform/`
- `public/projects/adb-hydra/`
- `public/projects/valuxchange/`

Then update the matching project object in `src/App.tsx`.

Use paths like:

```ts
images: {
  hero: '/projects/campushub/hero.png',
  gallery: [
    {
      label: 'Product Screen',
      src: '/projects/campushub/product-screen.png',
      note: 'Main interface screenshot.',
    },
  ],
}
```

Recommended names:

- `hero.png`
- `product-screen.png`
- `architecture.png`
- `deployment.png`
- `workflow.png`
- `testing.png`

Keep private user data, credentials, tokens, transaction details, and NDA-sensitive information out of screenshots.
