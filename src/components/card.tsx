import "./card.css";
import cn from "classnames";

import { useState, useRef } from "preact/hooks";
import { Link } from "preact-router/match";

interface IProps {
  class?: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

export default (props: IProps) => {
  const refImage: { current: HTMLDivElement | null } = useRef(null);
  const [loading, setLoading] = useState(true);

  var bcg = new Image();

  bcg.addEventListener("load", () => {
    if (!refImage.current) return;
    refImage.current.style.backgroundImage = `url("${bcg.src}")`;
    setLoading(false);
  });

  bcg.src = props.image;

  return (
    <Link class={cn("card", [props.class])} href={props.url}>
      <div class={cn("card-img", { loading })} ref={refImage}></div>
      <div class="card-title">{props.title}</div>
      <div class="card-desc">{props.description}</div>
    </Link>
  );
};
