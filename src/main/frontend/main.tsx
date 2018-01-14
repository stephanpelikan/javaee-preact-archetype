import { h, render } from "preact";
import { title } from "./styles.scss";
import Clock from "./clock";

export default () => (
    <div>
        <h2 className={title}>{( new Date() ).toString()}!</h2>
        <p>JUHU!!!</p>
        <Clock />
    </div>
);
