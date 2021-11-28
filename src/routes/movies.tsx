import "./movies.css";

import { Component } from "preact";
import { RouterProps } from "preact-router";
import Player from "../components/player";

interface IParams extends RouterProps {
  id: number;
}

export default class extends Component<IParams, {}> {
  state: IParams;

  constructor(props: IParams) {
    super(props);

    this.state = {
      id: props.id,
    };
  }

  render() {
    const params = {
      kinopoisk: this.state.id,
    };

    return (
      <>
        <Player {...params} />
      </>
    );
  }
}
