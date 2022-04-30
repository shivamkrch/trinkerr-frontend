import { Component } from "react";
import "./App.css";

const BASE_URL = "http://3.108.244.88:5000";

function debounce(fn) {
    let timer;
    return function (e) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(e);
        }, 500);
    };
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined,
            stocks: []
        };
    }

    async componentDidMount() {
        const res = await fetch(`${BASE_URL}/api/user-access-token`);
        const { token } = await res.json();
        this.setState({ token });
    }

    searchStocks = async (e) => {
        const key = e.target.value;
        const res = await fetch(`${BASE_URL}/api/data?search_string=${key}`, {
            headers: {
                "user-access-token": this.state.token
            }
        });
        const stocks = await res.json();
        this.setState({ stocks });
    };

    render() {
        return (
            <div>
                <div className="App">
                    <h1>Search for stocks @Trinkerr</h1>
                    <input id="search" onChange={debounce(this.searchStocks)} />
                </div>
                <ol>
                    {this.state.stocks.map((stock) => (
                        <li key={stock[0]}>
                            <h3>{stock[0]}</h3>
                            <p>Previous day closing: {stock[1]}</p>
                            <p>Today opening: {stock[2]}</p>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default App;
