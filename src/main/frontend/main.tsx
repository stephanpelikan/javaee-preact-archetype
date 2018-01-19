import React from "react";
import { title } from "./styles.scss";
import { Clock } from "./clock";

export default (): JSX.Element => (
    <div>
        <h2 className={title}>{( new Date() ).toString()}!</h2>
        <p>JUHU!!!</p>
          <Clock />
    </div>
);
