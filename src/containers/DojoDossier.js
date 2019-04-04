import React from "react";
import { connect } from "react-redux";
import { addTab, addItem, changeTab } from "../redux";
import axios from "axios";

class DojoDossier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: null,
      action: "",
      tab: "",
      item: ""
    };
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  changeTab = (currentTab, index) => {
    this.props.changeTab(index);
    this.setState({ currentTab });
  };

  createTab = () => {
    let object = {
      name: this.state.tab,
      item: []
    };
    axios.post("http://localhost:1337/addTab", object).then({});
  };

  createItem = () => {
    console.log("hello");
    let x = this.props.tabs[this.props.tabIndex];
    x.item.push(this.state.item);
    console.log(this.props.tabs);
    axios.put(`http://localhost:1337/updateTab/${x.id}`, x).then({});
    this.setState({ action: "Item Created" });
  };
  render() {
    if (this.state.currentTab === null) {
      this.props.tabs.length > 0 && this.setState({ currentTab: this.props.tabs[0].name });
    }

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 style={{ margin: "20px" }}>Dojo Dossier</h1>
          <div style={{ margin: "20px" }}>
            <input onChange={this.handleChange} style={{ width: "200px", display: "inline-block" }} type="text" id="tab" className="form-control" placeholder="Title" />
            <button onClick={this.createTab} type="submit" className="btn btn-primary mb-2">
              Add New Tab
            </button>
          </div>
        </div>
        <div className="container">
          <ul className="nav nav-tabs">
            {this.props.tabs.length > 0 &&
              this.props.tabs.map((tab, index) => {
                return (
                  <li key={index} onClick={() => this.changeTab(tab.name, index)} className="nav-item" id={tab.name}>
                    <span className={this.state.currentTab === tab.name ? "nav-link active" : "nav-link"}>{tab.name}</span>
                  </li>
                );
              })}
          </ul>
          <div id="listcontent">
            <div id="list">
              <ul>
                {this.props.tabs.length > 0 &&
                  this.props.tabs[this.props.tabIndex].item.length > 0 &&
                  this.props.tabs[this.props.tabIndex].item.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
              </ul>
            </div>
            <hr />
            <div style={{ float: "right", margin: "20px" }}>
              <input onChange={this.handleChange} style={{ width: "200px", display: "inline-block" }} type="text" className="form-control" id="item" placeholder="Title" />
              <button onClick={this.createItem} type="submit" className="btn btn-primary mb-2">
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tabs: state.tabs,
  tabIndex: state.tabIndex
});

const mapDispatchToProps = dispatch => ({
  addTab: payload => dispatch(addTab(payload)),
  addItem: (payload, index) => dispatch(addItem(payload, index)),
  changeTab: index => dispatch(changeTab(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DojoDossier);
