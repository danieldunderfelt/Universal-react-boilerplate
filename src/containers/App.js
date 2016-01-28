import React from 'react'
import 'style/main.css' // Babel root import plugin in action

class App extends React.Component {

    render() {

        return (
            <div>
                App
                {this.props.children}
            </div>
        )
    }
}

export default App