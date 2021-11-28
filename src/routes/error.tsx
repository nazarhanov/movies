import "./error.css";

import { Component } from "preact";
import { RouterProps } from "preact-router";

export default class extends Component<RouterProps, {}> {
  render() {
    return (
      <>
        <div class="error">404</div>
      </>
    );
  }
}
