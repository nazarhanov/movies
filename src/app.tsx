import Router from "preact-router";
import { useState } from "preact/hooks";
import { Link } from "preact-router/match";

import AsyncRoute from "preact-async-route";
import Home from "./routes/home";
import Error from "./routes/error";

import { route } from "./constants";
import cn from "classnames";

export function App() {
  let [loadingPage, setLoadingPage] = useState(true);

  setTimeout(() => {
    setLoadingPage(false);
  }, 1000);

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

        <div class={cn("loader loader-page", { loaded: !loadingPage })}>
          <div class="loader-wrapper">
            <div class="loader-item"></div>
            <div class="loader-item"></div>
            <div class="loader-item"></div>
          </div>
        </div>
      </div>
    </>
  );
}
