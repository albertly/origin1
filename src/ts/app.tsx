import * as React from "react";
import * as ReactDOM from "react-dom";

class HelloWorld extends React.Component<void, void> {
    public render () {
        return <h1>Hello, World!</h1>;
    }
}


import "../scss/styles.scss";

ReactDOM.render(<HelloWorld />, document.querySelector("main"));