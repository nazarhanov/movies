import "./card.css";
import cn from "classnames";

import { Link } from "preact-router/match";

interface IProps {
  class?: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

export default (props: IProps) => (
  <Link
    class={cn("card", { [props.class as string]: !!props.class })}
    href={props.url}
  >
    <div class="card-img" style={`background-image: url(${props.image})`}></div>
    <div class="card-title">{props.title}</div>
    <div class="card-desc">{props.description}</div>
  </Link>
);
