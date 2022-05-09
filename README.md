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
