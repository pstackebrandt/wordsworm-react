// file App.js
// path: src\routes\App.js

//ReactRouter Imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"

import GameProvider from '../pages/GameProvider';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.css';

//Layouts
import RootLayout from "../layouts/RootLayout";
import ImpressLayout from "../layouts/ImpressLayout";

// Pages
import Impress from '../pages/Impress';
import Welcome from "../pages/Welcome";
import Game from "../pages/Game";
import GameEnd from "../pages/GameEnd";

import Error from "../pages/errors/Error";
import NotFound from "../pages/NotFound";
import PlayerChoice from "../pages/PlayerChoice";

/*
* Welcome == Hauptseite
* NotFound == Wenn eine URL angefragt wird die nicht existiert wird diese Seite aufgerufen.
* errors == Error wird immer dann aufgerufen wenn ein Servefehler auftritt
* ImpressLayout == Impressum, ggf. später auch Datenschutz
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<Welcome />} />

      <Route path="welcome" element={<Welcome />}></Route>
      <Route path="player-choice" element={<PlayerChoice />}></Route>
      <Route path="game" element={<Game />}></Route>
      <Route path="game-end" element={<GameEnd />}></Route>

      <Route path="impress" element={<ImpressLayout />}>
        <Route index element={<Impress />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  {
    basename: '/wordsworm-react'
  }
)

function App() {

  return (
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  );
}

export default App;
