## Aurelia Global Binding

  * Demo / Playable code sandbox: https://codesandbox.io/s/mmy46056lx
  * Enable simple binding (one way, two way, one time) to global objects, such as `window`, `document` via custom element template. Example:

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

### Test

  * Run test task (Headless Chrome):

  ```
  npm run test
  ```

  * Run test task with debugger Chome
    
  ```
  npm run test:debugger
  ```