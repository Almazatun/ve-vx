# 🔥 Super App | 🏗👷‍♂️ Athitect

## Flow of the App
![flow](/src/assets/flow.PNG/)

## Folder Structure
Top-level project architecture should be organized by type. Application structure will be clear and understandable also scaleable for the future. One of the most usefull systems that people have used in RealWorld projects is a module system which I have used in this application.

 ```
 - src/
  - api/
  - assets/
  - components/
  - features/
  - route/
  - store/
  - utils/
  - views/
 ```
 ### Store Folder: This folder will keep all data which shared across the application
```
store
    ├── index   
    ├── actions        
    ├── mutations     
    └── modules
        ├── todo lists
        ├── authorization
        └── todo items
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
