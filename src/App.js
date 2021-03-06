import React, { Component } from "react";
import DynamicForm from "./components/DynamicForm";
import "./App.css";

class App extends Component {
  state = {
    data: [
      {
        id: 1,
        name: "A",
        age: 29,
        qualification: "B.Com",
        rating: 3
      },
      {
        id: 2,
        name: "B",
        age: 35,
        qualification: "B.Sc",
        rating: 5
      },
      {
        id: 3,
        name: "C",
        age: 42,
        qualification: "B.E",
        rating: 4
      }
    ]
  };

  constructor(props) {
    super(props);

    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  checkState = () => {
    console.log(this.state);
  };

  updateInput(event) {
    this.setState({ json: event.target.value });
  }

  handleSubmit = () => {
    this.setState(JSON.parse(this.state.json));
    console.log(this.state);
  };

  downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(this.state)], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  onSubmit = model => {
    model.id = +new Date();
    this.setState({
      data: [model, ...this.state.data]
    });
    alert(
      "Name: " +
        JSON.stringify(this.state.data[0].name).replace(/^"(.+)"$/, "$1") +
        "     Age: " +
        JSON.stringify(this.state.data[0].age) +
        "     Rating: " +
        JSON.stringify(this.state.data[0].rating) +
        "     Qualification: " +
        JSON.stringify(this.state.data[0].qualification).replace(
          /^"(.+)"$/,
          "$1"
        )
    );
  };

  render() {
    return (
      <div className="App">
        <DynamicForm
          className="form"
          title="Registration"
          model={[
            { key: "name", label: "Name", props: { required: true } },
            { key: "age", label: "Age", type: "number" },
            {
              key: "rating",
              label: "Rating",
              type: "number",
              props: { min: 0, max: 5 }
            },
            { key: "qualification", label: "Qualification" }
          ]}
          onSubmit={model => {
            this.onSubmit(model);
          }}
        />

        <pre>
          <h2>Result 1:</h2>
          {JSON.stringify(this.state.data[0].name).replace(/^"(.+)"$/, "$1")}
          <br />
          {JSON.stringify(this.state.data[0].age).replace(/^"(.+)"$/, "$1")}
          <br />
          {JSON.stringify(this.state.data[0].rating).replace(/^"(.+)"$/, "$1")}
          <br />
          {JSON.stringify(this.state.data[0].qualification).replace(
            /^"(.+)"$/,
            "$1"
          )}
          <h2>Result 2:</h2>
          {JSON.stringify(this.state.data[1].name).replace(/^"(.+)"$/, "$1")}
          <br />
          {JSON.stringify(this.state.data[1].age).replace(/^"(.+)"$/, "$1")}
          <br />
          {JSON.stringify(this.state.data[1].rating).replace(/^"(.+)"$/, "$1")}
          <br />
          {JSON.stringify(this.state.data[1].qualification).replace(
            /^"(.+)"$/,
            "$1"
          )}
          <h2>Result 3:</h2>
          {JSON.stringify(this.state.data[2].name).replace(/^"(.+)"$/, "$1")}
          <br />
          {JSON.stringify(this.state.data[2].age).replace(/^"(.+)"$/, "$1")}
          <br />
          {JSON.stringify(this.state.data[2].rating).replace(/^"(.+)"$/, "$1")}
          <br />
          {JSON.stringify(this.state.data[2].qualification).replace(
            /^"(.+)"$/,
            "$1"
          )}
        </pre>
        <button onClick={this.downloadTxtFile}>Download JSON</button>
        <br />
        <input type="text" onChange={this.updateInput} />
        <button onClick={this.handleSubmit}>Submit raw JSON</button>
        <br />
        <button onClick={this.checkState}>Check State</button>
        <br />
        <h2>Raw JSON example</h2>
        <p>{`{
  "data": [
    {
      "id": 1,
      "name": "D",
      "age": 60,
      "qualification": "B.G",
      "rating": 5
    },
    {
      "id": 2,
      "name": "E",
      "age": 65,
      "qualification": "B.N",
      "rating": 3
    },
    {
      "id": 3,
      "name": "F",
      "age": 70,
      "qualification": "B.Q",
      "rating": 1
    }
  ]
}`}</p>
      </div>
    );
  }
}

export default App;
