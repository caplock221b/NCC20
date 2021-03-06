import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { getQuestions } from "../services/qdatabase";
import Button from "./button";
import axios from "axios";
import { connect } from "react-redux";
import "./mytable.css";

class QuestionH extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    };
  }
  async componentDidMount() {
    const username = localStorage.getItem('Username');
    axios({
      method: "get",
      url: "http://"+`${this.props.url}`+"/question/",
      headers: { Username: username}
    }).then(response => {
      this.setState({ questions: response.data });
     // console.log(response);
    });
  }
  render() {
    return (
      <div className="tdiv">
        {/* <h1>table created</h1> */}
        <table
          className="table mytable table-striped borderless"
          style={{ borderTop: "none" }}
        >
          <thead style={{ borderTop: "none", borderBottom: "none" }}>
            <tr style={{ borderTop: "none", borderBottom: "none" }}>
              <th>Sr No.</th>
              <th>Title</th>
              <th>Submissions</th>
              <th>Accuracy</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.questions.map(question => (
              <tr>
                <td className="align-middle">{question.sn}</td>
                <td className="align-middle">{question.title}</td>
                <td className="align-middle">{question.subm}</td>
                <td className="align-middle">
                  {/* {question.accuracy} */}
                  <div className="progress  pbar">
                    <div
                      className="progress-bar inner-pbar "
                      style={{ width: `${question.accuracy}%` }}
                    >
                      <div
                        className="justify-content-center d-flex position-absolute w-100"
                        style={{
                          margin: "auto",
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 15
                        }}
                      >
                        {question.accuracy}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <Button Srno={question.sn} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.root.userName,
    url : state.Url.url
  };
};

export default connect(mapStateToProps)(QuestionH);
