import "./Section.css";
import { MouseEventHandler } from "react";

interface IPropsSection {
  name: string,
  onClick: MouseEventHandler | undefined,
}

export default function Section(props: IPropsSection) {
  return (
    <div className="section" onClick={props.onClick}>
      <p>{props.name}</p>
    </div>
  );
}
