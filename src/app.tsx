import Router from "preact-router";
import AsyncRoute from "preact-async-route";
import Home from "./routes/home";
import Error from "./routes/error";
import { Link } from "preact-router/match";
import CNT from "./constants";

export function App() {
  return (
    <>
      <header class="header">
        <div class="container">
          <Link class="header-logo" href={`${CNT.GH_REPO_URL}/`}>
            movies
          </Link>
          <div class="header-desc">смотрите фильмы онлайн, бесплатно</div>
        </div>
      </header>

      <div class="content container">
        <Router>
          <Home path={`${CNT.GH_REPO_URL}/`} />
          <AsyncRoute
            path={`${CNT.GH_REPO_URL}/:id`}
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
