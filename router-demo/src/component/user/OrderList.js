import React, { Component } from "react";
import { Table, Button, Input, message } from "antd";
import api from "../../api";
import axios from "../../util/axios";
import { AudioOutlined } from "@ant-design/icons";
import "../../asset/OrderList.css";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const columns = [
  {
    title: "订单id",
    dataIndex: "userorder_id",
  },
  {
    title: "订单编号",
    dataIndex: "userorder_num",
  },
  {
    title: "下单时间",
    dataIndex: "userorder_date",
  },
  {
    title: "订单状态",
    dataIndex: "userorder_status",
  },
  {
    title: "商品数量",
    dataIndex: "userorder_sum",
  },
];

const data = [];
const paginationProps = {
  pageSize: 5,
  position: ["bottomCenter"],
};

class OrderList extends Component {
  state = {
    selectedRowKeys: [],
  };
  componentWillMount() {
    axios({
      method: "post",
      url: api.user.OrderList,
      params: {},
    }).then((res) => {
      this.setState({ data: res.data });
      res.data.forEach((item) => {
        data.push(item);
      });
    });
  }
  //搜索
  onSearch = (value) => {
    let id = Number(value);
    data.forEach((item) => {
      if (item.userorder_id === id) {
        this.setState({ data: [item] });
      }
    });
  };
  //删除
  deleteOrder = () => {
    const { selectedRowKeys } = this.state;
    data.splice(selectedRowKeys[0] - 1, selectedRowKeys.length);
    if (selectedRowKeys.length !== 0) {
      this.setState({
        data: data,
      });
      let id = [];
      selectedRowKeys.forEach((item) => {
        let number = Number(`1000${item}`);
        id.push(number);
      });
      console.log(selectedRowKeys);
      console.log(id);
      axios({
        method: "post",
        url: api.user.DeleteOrder,
        data: {
          id: id,
        },
      }).then((res) => {});
      selectedRowKeys.splice(0, selectedRowKeys.length);
      message.success("删除成功！");
    } else {
      message.warning("请勾选需要删除的订单！");
    }
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: "odd",
          text: "Select Odd Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: "even",
          text: "Select Even Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    return (
      <div>
        <Search
          placeholder="请输入商品编号"
          onSearch={this.onSearch}
          enterButton
          className="search_input"
        />
        <Button
          className="delete"
          type="primary"
          danger
          key="1"
          onClick={this.deleteOrder}
        >
          删除
        </Button>
        <Table
          className="order_table"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.data}
          pagination={paginationProps}
        />
        ;
      </div>
    );
  }
}

export default OrderList;
