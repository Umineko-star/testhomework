import React, { Component } from "react";
class LeaveWordsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    console.log(this.props.history.location.data);
    this.setState({
      data: this.props.history.location.data,
    });
  }

  render() {
    return (
      <>
        <div>
          <h2>公司名称</h2>
          <p>{this.state.data.companyName}</p>
          <h2>联系人</h2>
          <p>{this.state.data.contacts}</p>
          <h2>联系电话</h2>
          <p>{this.state.data.phoneNum}</p>
          <h2>邮箱</h2>
          <p>{this.state.data.email}</p>
          <h2>留言内容</h2>
          <p>{this.state.data.content}</p>
        </div>
      </>
    );
  }
}

export default LeaveWordsDetail;
