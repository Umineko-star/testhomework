import React, {Component} from 'react';

class Order extends Component {
  render() {
    return (
        <div>
          {this.props.children}
        </div>
    );
  }
}

export default Order;