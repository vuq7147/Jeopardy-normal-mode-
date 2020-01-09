import React, { Component } from 'react';
//import our service
import JeopardyService from "../../jeopardyService";
class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {},
      score: 0,
      formData: { answer: "" }
    }
  }

  handleChange = (event) => {
    const formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;

    this.setState({ formData });
    // console.log(this.state.formData)
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      submitted: true
    })

    let tempScore = this.state.score

    if (this.state.data.answer === this.state.formData.answer) {
      tempScore = tempScore + this.state.data.value
    }
    else {
      tempScore = tempScore - this.state.data.value
    }

    this.getNewQuestion()
    this.setState({ score: tempScore, 
      formData: { answer: "" } })
    // } else {
    // categoryElement = <div>{this.state.data.category.title}
  }

  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then(result => {
      this.setState({
        data: result.data[0]
      })
    })
  }
  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }
  //display the results on the screen
  render() {
    let categoryElement
    if (this.state.data.category === undefined) {
      categoryElement = <div>no category</div>
    } else {
      categoryElement = <div>{this.state.data.category.title}</div>
    }
    return (
      <div>
        <div>
          {/* {JSON.stringify(this.state.data)} */}
        </div>
        <div>
          Score: {this.state.score}
        </div>
        <div>
          question: {this.state.data.question}
        </div>
        <div>
          value: {this.state.data.value}
        </div>
        category: {categoryElement}
        <form onSubmit={this.handleSubmit}>>
          <div>
            <label htmlFor="">Answer</label>
            <input type="text"
              name="answer"
              onChange={this.handleChange}
              value={this.state.formData.answer}
            />
          </div>
          <button>Submit Answer</button>
        </form>
      </div>
    );
  }
}
export default Jeopardy;