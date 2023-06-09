import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "components/LandingPage";
import Home from "pages/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
