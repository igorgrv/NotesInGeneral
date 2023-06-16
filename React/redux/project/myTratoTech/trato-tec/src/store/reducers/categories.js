import { createSlice } from "@reduxjs/toolkit";
import automotivoHeader from "assets/categories/header/automotivo.png";
import eletronicosHeader from "assets/categories/header/eletronicos.png";
import escritorioHeader from "assets/categories/header/escritorio.png";
import jogosHeader from "assets/categories/header/jogos.png";
import somHeader from "assets/categories/header/som.png";
import automotivoThumb from "assets/categories/thumbnail/automotivo.png";
import eletronicosThumb from "assets/categories/thumbnail/eletronicos.png";
import escritorioThumb from "assets/categories/thumbnail/escritorio.png";
import jogosThumb from "assets/categories/thumbnail/jogos.png";
import somThumb from "assets/categories/thumbnail/som.png";

const initialState = [
  {
    title: "Eletronics",
    thumbnail: eletronicosThumb,
    header: eletronicosHeader,
    id: "eletronics",
    description: "Os melhores e mais atuais dispositivos eletrônicos estão aqui!",
  },
  {
    title: "Automotive",
    thumbnail: automotivoThumb,
    header: automotivoHeader,
    id: "automotive",
    description:
      "Encontre aqui equipamentos para deixar seu carro com a sua cara!",
  },
  {
    title: "Games",
    thumbnail: jogosThumb,
    header: jogosHeader,
    id: "games",
    description: "Adquira os consoles e jogos mais atuais do mercado !",
  },
  {
    title: "Office",
    thumbnail: escritorioThumb,
    header: escritorioHeader,
    id: "office",
    description: "Tudo para o que escritório ficar incrível!",
  },
  {
    title: "Sound and Image",
    thumbnail: somThumb,
    header: somHeader,
    id: "sound",
    description: "Curta suas músicas e seus filmes com a melhor qualidade!",
  },
];

const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
});

export default categoriesSlice.reducer;
