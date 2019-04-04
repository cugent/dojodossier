import React, { Component } from "react";
import DojoDossier from "./containers/DojoDossier";
import axios from "axios";
import "./App.css";
import io from "socket.io-client";
import { connect } from "react-redux";
import { tabUpdate } from "./redux";

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = io("http://localhost:1337");
  }

  componentDidMount = () => {
    this.socket.on("greeting", data => {
      //4
      console.log("CLIENT > socket.on greeting");
      console.log(data.msg); //5
      this.socket.emit("thankyou", { msg: "Thank you for connecting me! -Client" });
    });

    this.socket.on("dataUpdated", data => {
      //4
      this.props.tabUpdate(data.data);
      console.log("dataUpdated");
    });

    axios.get("http://localhost:1337/getTab").then(resp => {
      this.props.tabUpdate(resp.data);
    });
  };
  render() {
    return (
      <div>
        <DojoDossier />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tabs: state.tabs,
  tabIndex: state.tabIndex
});

const mapDispatchToProps = dispatch => ({
  tabUpdate: payload => dispatch(tabUpdate(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
