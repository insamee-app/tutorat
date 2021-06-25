# tutorat (insamee service)

## Build Setup

```bash
# install dependencies
$ yarn install

# Install the lib of components and register it as a local package
$ cd ..
$ git clone https://github.com/insamee-app/components.git
$ yarn link

# Link the lib of components to your projet
$ yarn link insamee-components

# fill the .env file from .env.example, you need to link the URL to the API !!
```

From this point, you are all setup ! Have fun :)

```bash
# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
