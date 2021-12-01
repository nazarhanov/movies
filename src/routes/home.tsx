import "./home.css";
import cn from "classnames";
import cnt from "../constants";

import { Component, createRef } from "preact";
import { RouterProps } from "preact-router";
import Card from "../components/card";

interface IMovieData {
  title: string;
  description: string;
  url: string;
  image: string;
}

interface IState {
  movies: Array<IMovieData>;

  loadingLazy: boolean;
}

export default class extends Component<RouterProps, {}> {
  state: IState;
  refInput = createRef();

  constructor(props: RouterProps) {
    super(props);

    this.state = {
      movies: [],
      loadingLazy: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  timeout: ReturnType<typeof setTimeout> = 0;

  handleInput(e: any) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.handleSubmit(e);
    }, 1000);
  }

  handleSubmit(e: any) {
    clearTimeout(this.timeout);
    e.preventDefault();
    this.searchMovieByName(this.refInput.current.value);
  }

  async api(url: string) {
    const response = await fetch(cnt.API_BASE + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": cnt.API_KEY,
      },
    });

    let movies = null;

    try {
      if (!response.ok) throw new Error("Invalid status");
      let { films: data } = await response.json();

      movies = data.map((item: any) => ({
        title: item.nameRu,
        description: item.year,
        url: `/movies/${item.filmId}`,
        image: item.posterUrlPreview,
      }));
    } catch (error) {
      console.error(error);
      return;
    }

    return movies;
  }

  async searchMovieByName(name: string) {
    const movies = await this.api(
      `/api/v2.1/films/search-by-keyword?keyword=${name}`
    );

    this.setState({
      movies,
    });

    this.page = 1;
  }

  async searchMovieTop(page: number) {
    const movies = await this.api(
      `/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`
    );

    if (!movies.length) return true;

    this.setState({
      movies: [...this.state.movies, ...movies],
    });

    return false;
  }

  page: number = 1;

  async componentDidMount() {
    let wait: boolean = false;

    const load = async () => {
      this.setState({ loadingLazy: true });

      let stop: boolean = await this.searchMovieTop(this.page++);

      this.setState({ loadingLazy: false });

      if (stop) return;
      wait = false;
    };

    window.onscroll = async (e) => {
      if (wait) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 120
      ) {
        load();
        wait = true;
      }
    };

    await load();
  }

  render() {
    const { loadingLazy } = this.state;

    return (
      <>
        <form class="home-search" onSubmit={this.handleSubmit}>
          <label class="home-label">
            <input
              class="home-input"
              type="text"
              name="search"
              placeholder="Введите название фильма ..."
              onInput={this.handleInput}
              ref={this.refInput}
            />
            <svg class="home-icon" width="24" height="24">
              <use xlinkHref="#icon-search" />
            </svg>
          </label>
        </form>

        <div class="cards">
          <div class="cards-wrapper">
            {this.state.movies.map((movie) => (
              <Card class="cards-item" {...movie} />
            ))}
          </div>
        </div>

        <div class={cn("loader loader-lazy", { loaded: !loadingLazy })}>
          <div class="loader-wrapper">
            <div class="loader-item"></div>
            <div class="loader-item"></div>
            <div class="loader-item"></div>
          </div>
        </div>
      </>
    );
  }
}
