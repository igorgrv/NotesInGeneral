import Home from "./components/view/home/Home";
import Cadastro from "./components/view/cadastro/Cadastro";

export const routes = [
  { path: "", name: "home", component: Home, titulo:"Home", menu:true},
  { path: "/cadastro", name: "cadastro", component: Cadastro, titulo:"Cadastro", menu:true},
  { path: '*', component: Home, menu:false }
];
