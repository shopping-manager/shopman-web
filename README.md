# Shop Busy Or Not (shopman-web)

App that shows the current patronage level at supermarkets. Helps planning to avoid busy times.

## Install the dependencies
```bash
npm install
```

### Configure API keys

In the .quasar.env.json, add your personal API key for Google Maps. Make sure to name the variable as GMAPS_API_KEY.

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
yarn dev
```
For now, do not use quasar dev directly. The command run through yarn sets the necessary API keys in the environment
variables. Unless you explicitly want the map view to fail!

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
yarn build
```
Do not use quasar build here for the same reason as above.

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
