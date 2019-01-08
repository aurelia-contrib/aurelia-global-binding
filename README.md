## Aurelia Global Binding

  * Enable simple binding to global objects, such as `window`, `document` via custom element template. Example:

  ```html
  <template>
    <document-binding
      title="Hello worldasdasd"
      click.trigger="hello()"></document-binding>
    <window-binding
      online.trigger="hello(message = 'online or offline')"></window-binding>
  </template>
  ```
    
### Dev

  * Install dependencies:
  ```
  npm install
  ```

  * Run build task:
  ```
  npm run build
  ```

  * Run build, with auto rebuild:
  ```
  npm run build:watch
  ```

  * Run development server with `webpack-dev-server`:
  ```
  npm install webpack-dev-server --save-dev
  npm run dev
  ```

### Build the code

  * After installing dependencies, run `build` or `build:prod`:

  ```
  npm run build
  ```

  or

  ```
  npm run build:prod
  ```
    