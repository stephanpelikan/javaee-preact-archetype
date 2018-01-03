import { h, render } from "preact";
import { title } from "./styles.scss";

let root:Element;
function init() {
    
    const Main = () => (
                <h1  className={title}>Hello!</h1>
            );
    
    render(<Main />, document.body, root);

}

init();
