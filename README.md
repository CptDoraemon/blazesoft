## Notes
- I understand the documentation has requirement that entire book item should be clickable, however I believe it's a better design to have a specific, clearly labeled 'Edit' button. This way, we maintain clear user navigation while respecting accessibility standards.
- Code splitting is enabled by default by Next.js for each route, and there is only one page for this app. The only improvement I could make is to lazily load the pop-ups, which is not needed on initial load.
- Unit test coverage for Redux slice
- E2e test coverage for BookStore (index) page

## Package Manager
[Install pnpm](https://pnpm.io/installation)

## Node.js version
```bash
v18.12.1
```

## Run the project
```bash
npm run dev
```