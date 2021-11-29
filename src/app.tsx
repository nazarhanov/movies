import Router from "preact-router";
import AsyncRoute from "preact-async-route";
import Home from "./routes/home";
import Error from "./routes/error";
import { Link } from "preact-router/match";
import CNT, { route } from "./constants";

export function App() {
  return (
    <>
      <header class="header">
        <div class="container">
          <Link class="header-logo" href={route("/")}>
            movies
          </Link>
          <div class="header-desc">смотрите фильмы онлайн, бесплатно</div>
        </div>
      </header>

      <div class="content container">
        <Router>
          <Home path={route("/")} default />
          <Error path={route("/error")} />

          <AsyncRoute
            path={route("/:id")}
            getComponent={() =>
              import("./routes/movies").then((module) => module.default)
            }
            loading={() => <span>Загрузка ...</span>}
          />
        </Router>
      </div>
    </>
  );
}
