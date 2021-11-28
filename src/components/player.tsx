import "./player.css";

import { Component, createRef } from "preact";
import { RouterProps } from "preact-router";

interface IParams extends RouterProps {
  title?: string;
  player?: string;
  kinopoisk?: number;
  imdb?: number;
  tmdb?: number;
  bg?: string;
  language?: string;
  country?: string;
  param_ustore?: string;

  autoplay?: boolean;
  fast?: boolean;
  limit?: number;
  resize?: boolean;
  button_limit?: number;
  button_size?: number;
  loading?: string;
  separator?: string;

  season?: number;
  episode?: number;
  tv?: boolean;
  videospider_tv?: boolean;

  kodik?: string;
  videocdn?: string;
  collaps?: string;
  hdvb?: string;
  bazon?: string;
  ustore?: string;
  alloha?: string;
  youtube?: string;

  [key: string]: any;
}

export default class extends Component<IParams, {}> {
  state: IParams;
  refRoot = createRef();
  refVideo = createRef();

  constructor(props: IParams) {
    super(props);

    this.state = {
      trailer: false,
    };

    for (let key in props) {
      this.state[key] = props[key];
    }
  }

  async componentDidMount() {
    let options: IParams = Object(this.state);

    const url: string = options.url
      ? decodeURIComponent(options.url).trim() +
        (decodeURIComponent(options.url).indexOf("?") + 1 ? "&" : "?") +
        "cache" +
        Math.random().toString().substr(2, 3)
      : "https://ahoy.yohoho.cc?cache" + Math.random().toString().substr(2, 3);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(options).toString(),
    });

    interface IPlayer {
      iframe: string;
      quality: string;
      translate: string;
    }

    let players: {
      [key: string]: IPlayer;
    };

    try {
      if (!response.ok) throw new Error("Invalid status");
      players = await response.json();
    } catch (error) {
      console.error(error);
      return;
    }

    let player: IPlayer | undefined = players.collaps;
    if (!player) return;

    this.refVideo.current.setAttribute(
      "src",
      decodeURIComponent(player.iframe)
    );
  }

  render() {
    return (
      <div class="player" ref={this.refRoot}>
        <div class="player-loading"></div>
        <iframe
          class="player-video"
          ref={this.refVideo}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
}
