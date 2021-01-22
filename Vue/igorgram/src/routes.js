import Home from "./components/view/home/Home";
const Cadastro = () => System.import('./components/view/cadastro/Cadastro.vue')

export const routes = [
  { path: "", name: "home", component: Home, titulo:"Home", menu:true},
  { path: "/cadastro", name: "cadastro", component: Cadastro, titulo:"Cadastro", menu:true},
  { path: "/cadastro/:id", name: "alteracao", component: Cadastro, titulo:"Cadastro", menu:false},
  { path: '*', component: Home, menu:false }
];
