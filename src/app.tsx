import Router from "preact-router";
import AsyncRoute from "preact-async-route";
import Home from "./routes/home";
import Error from "./routes/error";
import { Link } from "preact-router/match";

export function App() {
  return (
    <>
      <header class="header">
        <div class="container">
          <Link class="header-logo" href="/">
            movies
          </Link>
          <div class="header-desc">смотрите фильмы онлайн, бесплатно</div>
        </div>
      </header>

      <div class="content container">
        <Router>
          <Home path="/" />
          <AsyncRoute
            path="/movies/:id"
            getComponent={() =>
              import("./routes/movies").then((module) => module.default)
            }
            loading={() => <span>Загрузка ...</span>}
          />
          <Error path="*" default />
        </Router>
      </div>
    </>
  );
}
