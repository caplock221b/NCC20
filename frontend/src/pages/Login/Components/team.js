import React, { Component } from "react";
import "../styles/team.css";
import axios from "axios";
import {Link} from "react-router-dom";
import { connect } from "react-redux";

class team extends Component {
  constructor(props) {
    super(props);

    this.state = {
      check: this.props.check,
      exit: "",
      positiont: this.props.team !== "" ? "upt" : "downt",
      positionp: this.props.team !== "" ? "upp" : "downp",
      teamname: this.props.team,
      password: this.props.pass,
      errort: "noBorder",
      errorp: "noBorder",
      exists: true
    };
  }

  handleFocust(e) {
    this.setState({
      positiont: "upt"
    });
  }

  handleFocusp(e) {
    this.setState({
      positionp: "upp"
    });
  }

  handleBlurt(e) {
    if (e.target.value === "") {
      this.setState({
        positiont: "downt"
      });
    } else {
      this.setState({
        positiont: "upt"
      });
    }
  }

  handleBlurp(e) {
    if (e.target.value === "") {
      this.setState({
        positionp: "downp"
      });
    } else {
      this.setState({
        positionp: "upp"
      });
    }
  }

  checkPassword(value) {
    if (value.length < 6 || value.length > 20) {
      this.props.changeCheck("red");
    } else {
      this.props.changeCheck("green");
    }
  }

  handlePassChange(e) {
    this.checkPassword(e.target.value);
    this.props.changePassword(e.target.value);
    this.setState({
      password: e.target.value
    });
    this.props.changePassWord(e.target.value);
  }

  checkTeamname(value) {
    if (value.length === 0) {
      this.props.changeCheckT("Username cannot be empty");
    } else if (value.length < 3) {
      this.props.changeCheckT("Username should be minimum 3 characters");
    } else if (value.includes(" ")) {
      this.props.changeCheckT("Username cannot contain a space character");
    } else {
      this.props.changeCheckT("");
    }
  }

  handleTeamChange(e) {
    this.checkTeamname(e.target.value);

    this.props.changeTeamName(e.target.value);
    this.setState({
      teamname: e.target.value
    });
    this.props.changeUsername(e.target.value);
  }
  checkUser = () => {
    axios
      .post("http://" + `${this.props.url}` + "/checkusername/", {
        username: this.props.username
      })
      .then(response => {
        if (response.data.exist !== true) {
          this.props.changeCheckT("Username does not exist");
        } else {
          this.props.changeCheckT("");
        }
      });
  };
  handleClick() {
    // Post Username and Password to server
    axios
      .post("http://" + `${this.props.url}` + "/signup/", {
        username: this.props.username,
        password: this.props.password
      })
      .then(res => {
        // if status is true then route to instruction page
        //console.log(res);
        if(res.data.flag) {
          localStorage.setItem("Username", this.props.username);
          this.props.changeModePL();
        } else {
          //else show the error
          this.props.changeCheckT(res.data.message);
        }
      });
     
  
  
  }

  render() {
//    console.log(this.props.username, this.props.password);
    return (
      <div className={`team entry ${this.state.exit}`}>
        <div className="reg"> Register </div>{" "}
        <div className="inputbox in1">
          <label className={`teaml ${this.state.positiont}`}> Team Name </label>{" "}
          <input
            type="text"
            maxLength="30"
            className={`TeamName ${this.state.errort}`}
            onFocus={this.handleFocust.bind(this)}
            onBlur={this.handleBlurt.bind(this)}
            onChange={this.handleTeamChange.bind(this)}
            onKeyUp={this.checkUser.bind(this)}
            value={this.props.username}
            spellCheck="false"
          ></input>{" "}
          <p className="teamCheck"> {this.props.checkt} </p>{" "}
        </div>{" "}
        <div className="inputbox in2">
          <label className={`passl ${this.state.positionp}`}> Password </label>{" "}
          <input
            type="password"
            maxLength="30"
            className={`password ${this.state.errorp}`}
            onFocus={this.handleFocusp.bind(this)}
            onBlur={this.handleBlurp.bind(this)}
            onChange={this.handlePassChange.bind(this)}
            value={this.props.password}
            spellCheck="false"
          ></input>{" "}
        </div>{" "}
        <div className={`condition`}>
          Password must contain:
          <p className={`charCondition ${this.props.check}`}>
            1) 6 to 20 characters{" "}
          </p>{" "}
        </div>{" "}
        <div className="in3">
          <button className="next" onClick={this.handleClick.bind(this)}>
            NEXT{" "}
          </button>{" "}
        </div>{" "}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.root.username,
    password: state.root.password,
    year: state.root.year,
    url: state.Url.url
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeUsername: username => {
      dispatch({
        type: "CHANGE_USERNAME",
        username: username
      });
    },
    changePassWord: password => {
      dispatch({
        type: "CHANGE_PASSWORD",
        password: password
      });
    },
    changeYear: year => {
      dispatch({
        type: "CHANGE_YEAR",
        year: year
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(team);
