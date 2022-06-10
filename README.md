# re:quest

re:quest is a platform for creating digital Escape Games for educational institutions

## developer setup

**Prisma generation**

After initial setup, please run

```
npx prisma migrate
```

in order to generate Yup Validations for the API. You will need to run this again after making changes to the [schema.prisma](./prisma/schema.prisma)

**Dev server**

Then start your dev server with

```
yarn dev
```

## file structure

- `.husky`: hook to run lint staged on commit (see https://github.com/typicode/husky)
- `.vscode`: preferred setting to develop on vscode
- `assets`: all the assets (images, logos)
- `collections`: contains all quests / media modules and the corresponding types
- `components`: UI Components used in the app
- `features`: components and api communication functions for different features in the app
- `lang`: files for i18n, location of all translations
- `lib`: libraries used troughout the app
- `pages`: next.js pages folder, containing UI pages as well as the api
- `prisma`: prisma schema, migrations (see https://www.prisma.io/) and validators (see https://github.com/omar-dulaimi/prisma-yup-generator)
- `public`: stuff that will be published as is
- `stores`: stores used in the app (see https://github.com/pmndrs/zustand)
- `styles`: global styles, everyting else is done with https://tailwindcss.com/
- `types`: types used in the app
- `utils`: helpful functions
