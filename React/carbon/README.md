

# Carbon Design - React

## Getting started

Instalar o carbon:

```bash
yarn add carbon-components@10.25.0 carbon-components-react@7.25.0 @carbon/icons-react@10.22.0 carbon-icons@7.0.7
```

Instalar Rotas:

```
yarn add react-router-dom@5.0.0
```

Instalar SASS 

```bash
yarn add sass@1.29.0
```

All packages

```
yarn add carbon-components@10.25.0 carbon-components-react@7.25.0 @carbon/icons-react@10.22.0 carbon-icons@7.0.7 react-router-dom@5.0.0 sass@1.29.0
```



Para evitar adicionar `~` quando importarmos arquivos `scss`:

```javascript
// .env
SASS_PATH="node_modules"
```

* Carbon utiliza `scss` portanto devemos alterar o arquivo base `index.css` → `index.scss` e importe os styles do carbon;

  ```scss
  @import 'carbon-components/scss/globals/scss/styles.scss';
  ```

  * O processo de recompilar os estilos é demorado, por isso devemos criar um `scss` para o `App.js` para que não fiquemos mexendo no `index`
  * Alterar o import do `index.js` para utilizar o `index.scss`

Vamos importar o componente `Button` e utiliza-lo!

```react
// App.js
import React, { Component } from 'react';
import './app.scss';
import { Button } from 'carbon-components-react';

class App extends Component {
  render() {
    return (
      <div>
        <Button>Button</Button>
      </div>
    );
  }
}

export default App;
```

## UIShell - Menu

Por padrão, todo componente irá ter a estrutura:

```
src/components/TutorialHeader
├──_tutorial-header.scss
├──index.js
└──TutorialHeader.js
```

* No `app.scss` irá ser importado o `tutorial-header.scss` bem como os demais `scss`

  ```scss
  @import './components/TutorialHeader/tutorial-header.scss';
  ```

* No `index.js` iremos sempre importar o `js` e depois exportar

  * Isto facilita 
  
  ```js
  import TutorialHeader from './TutorialHeader';
  export default TutorialHeader;
  ```

Para o componente em si:

1. Importaremos tudo aquilo que é necessário para UIShell completa (more about [Carbon Components UIShell](https://react.carbondesignsystem.com/?path=/story/components-ui-shell--header-base-w-navigation));

```react
// TutorialHeader.js
import React from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from 'carbon-components-react';

const TutorialHeader = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="Carbon Tutorial">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName href="/" prefix="IBM">
          Carbon Tutorial
        </HeaderName>
        <HeaderNavigation aria-label="Carbon Tutorial">
          <HeaderMenuItem href="/repos">Repositories</HeaderMenuItem>
        </HeaderNavigation>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}>
          <SideNavItems>
            <HeaderSideNavItems>
              <HeaderMenuItem href="/repos">Repositories</HeaderMenuItem>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
        <HeaderGlobalBar />
      </Header>
    )}
  />
);

export default TutorialHeader;
```

* Note: When creating navigation headers, it’s important to have a `Skip to content` link so keyboard users can skip the navigation items and go straight to the main content.

### Icones no Menu

Para adicionar **icones a direita** devemos importar os icones desejados e utilizar o `HeaderGlobalBar`:

```react
import {
  AppSwitcher20,
  Notification20,
  UserAvatar20,
} from '@carbon/icons-react';
```

```react
// ao final do TutorialHeader
<HeaderGlobalBar>
  <HeaderGlobalAction aria-label="Notifications">
    <Notification20 />
  </HeaderGlobalAction>
  <HeaderGlobalAction aria-label="User Avatar">
    <UserAvatar20 />
  </HeaderGlobalAction>
  <HeaderGlobalAction aria-label="App Switcher">
    <AppSwitcher20 />
  </HeaderGlobalAction>
</HeaderGlobalBar>
```

### Renderizando no App

Agora basta importar o `TutorialHeader` e o component `Content`:

```react
import React, { Component } from 'react';
import './app.scss';
import { Button, Content } from 'carbon-components-react';
import TutorialHeader from './components/TutorialHeader';

class App extends Component {
  render() {
    return (
      <>
        <TutorialHeader />
        <Content>
          <Button>Button</Button>
        </Content>
      </>
    );
  }
}
```



## Creando Páginas

1. Criaremos pasta `content` com os arquivos padrões

```
src/content
├── LandingPage
└── RepoPage

src/content/LandingPage
├── _landing-page.scss
├── index.js
└── LandingPage.js

src/content/RepoPage
├── _repo-page.scss
├── index.js
└── RepoPage.js
```

2. Importaremos no `app.scss` os novos `scss`:

   ```scss
   @import './components/TutorialHeader/tutorial-header.scss';
   @import './content/LandingPage/landing-page.scss';
   @import './content/RepoPage/repo-page.scss';
   ```

3. Os `index.js` seguiram igual feito ao menu

   ```react
   import LandingPage from './LandingPage';
   export default LandingPage;
   ```

4. No arquivo `.js` iremos deixar somente uma div:

   ```react
   import React from 'react';
   
   const LandingPage = () => {
     return <div>LANDING PAGE</div>;
   };
   
   export default LandingPage;
   ```

### Rotas

#### Fix index

Com o `react-router-dom` instalado, precisamos declara-lo no `index.js`

```javascript
import { HashRouter as Router } from 'react-router-dom';
```

Substituir o `render()`:

```react
import { HashRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
```

#### Fix App

Agora no `App.js` iremos importar as novas páginas e o `react-router-dom` para fazer o switch das paginas

```react
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import RepoPage from './content/RepoPage';
```

Desta forma removeremos o button que existia e adicionaremos o link das rotas:

```react
<Content>
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/repos" component={RepoPage} />
  </Switch>
</Content>
```

#### Link component

No `TutorialHeader` iremos importar o component `Link` do `router-dom`, desta forma podemos utilizar o `to` no lugar do `href`:

```react
import { Link } from 'react-router-dom';
```

```react
<HeaderName element={Link} to="/" prefix="IBM">
  ...
<HeaderMenuItem element={Link} to="/repos">
```

