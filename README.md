# Webpack Frontend Starterkit

Стартерпак для фронта

* обязательно должен быть установлен [`NodeJs`](https://nodejs.org/en/)
* рекомендуется использовать пакетный менеджер [`yarn`](https://yarnpkg.com/)

### если `yarn` не установлен
```
npm i yarn -g
```

---

### Установка

```
yarn install
```

### Старт dev разработки

```
yarn run dev
```

### Собрать релизную версию
Релизная версия страницы собирается в `/build`

```
yarn run build
```

---

### Фитчи:

* Поддержка ES6 - [babel](https://babeljs.io/) (v7)
* Поддержка препроцессора Stylus - [stylus-loader](https://github.com/shama/stylus-loader)
* Подсветка синтаксиса - [eslint-loader](https://github.com/MoOx/eslint-loader). Настаятельно рекомендуется настроить его в своём IDE
* Автоформатирование кода - [Prettier](https://github.com/prettier/prettier). Настаятельно рекомендуется настроить и использовать его в своём IDE

---

При выполнении `npm run build` используется [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin), чтобы переместить стили в отдельный файл. Этот **css**-файл автоматически вставляется в **head** `index.html`.
