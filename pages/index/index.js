import { h, render, Component } from "preact";
import "../global.css"

class App extends Component {
    render() {
        return (
            <div class="prose">
                <h1>hello</h1>
            </div>
        );
    }
}

render(<App />, document.getElementsByTagName("body")[0]);
