import Home from './components/view/home/Home';
import Cadastro from './components/view/cadastro/Cadastro';

export const routes = [
  { path:'', component: Home, titulo:'home' },
  { path:'/cadastro' , component: Cadastro, titulo:'cadastro'}
]
