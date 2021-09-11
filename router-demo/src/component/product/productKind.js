import React, { Component } from "react";
import { Table, Button, Input, Space } from "antd";
import { EditOutlined, DeleteOutlined, AudioOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
@inject("productStore", "user")
@observer
class ProductKind extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "ID",
        dataIndex: "ProductOtherId",
        align: "center",
      },
      {
        title: "Name",
        dataIndex: "ProductName",
        align: "center",
      },
      {
        title: "图片路径",
        dataIndex: "ProductSrc",
        align: "center",
        width: 200,
      },
      {
        title: "描述",
        dataIndex: "ProductDes",
        align: "center",
        width: 300,
      },
      {
        title: "操作",
        dataIndex: "",
        // key: 'x',
        align: "center",
        render: (text, record, index) => (
          <div
            style={{
              width: "240px",
              height: "30px",
              display: "flex",
              marginRight: "-300px",
              justifyContent: "space-around",
            }}
          >
            <Button
              size="small"
              jj="5555"
              type="primary"
              shape="round"
              icon={<EditOutlined />}
              onClick={this.editProduct.bind(this, record["ProductOtherId"])}
            >
              编辑
            </Button>
            <Button
              style={{
                display: this.props.user.btnCtrl.productEdit ? "block" : "none",
              }}
              size="small"
              type="primary"
              shape="round"
              icon={<DeleteOutlined />}
              onClick={this.deleteProduct.bind(this, record)}
            >
              删除
            </Button>
          </div>
        ),
      },
    ];
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      data1: [],
      searchdata: [],
      alldata: [],
    };
  }
  componentWillMount() {
    // for(let i=0;i<)
    console.log(" this.props", this.props);
    this.props.productStore.getAllproduct().then((res) => {
      console.log(res.length);
      for (let i = 0; i < res.length; i++) {
        res[i].key = i + 1;
      }
      this.state.alldata = JSON.parse(JSON.stringify(res));
      this.setState({
        data1: res,
      });
    });
  }

  //点击编辑
  editProduct = (record) => {
    console.log(record);
    let productall = this.state.data1;
    console.log(productall);
    this.state.data1.map((item, index) => {
      if (record === item.ProductOtherId) {
        console.log(this.props.history);
        this.props.history.push({
          pathname: "/index/productEdit",
          state: {
            ProductOtherId: item.ProductOtherId,
            productall: productall,
          },
        });
      }
    });
  };

  //搜索按钮
  onSearch = (data) => {
    let mysearch = document.getElementById("mysearch").value;
    console.log(mysearch);
    console.log(data);
    if (!mysearch) {
      this.setState({
        data1: this.state.alldata,
      });
    } else {
      this.state.searchdata = this.state.data1;
      console.log(this.state.data1[0].ProductCategoryId);
      this.setState({
        data1: this.state.searchdata.filter(
          (data) =>
            !mysearch ||
            data.ProductDes.includes(mysearch) ||
            data.ProductName.includes(mysearch) ||
            data.ProductCategory.includes(mysearch)
        ),
      });
    }
  };

  addproduct = () => {
    this.props.history.push("/index/productAdd");
  };
  //点击删除
  deleteProduct = () => {
    console.log(222);
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  render() {
    console.log(this.state.data1);
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <Button type="primary" onClick={this.addproduct.bind(this)}>
            新增
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
          <Space
            style={{ marginLeft: "80%" }}
            direction="vertical"
            align="center"
          >
            <Search
              id="mysearch"
              placeholder="输入名称可查找"
              allowClear
              enterButton="Search"
              size="middle"
              onSearch={this.onSearch.bind(this, this.state.data1)}
            />
          </Space>
          ,
        </div>
        {/*<Table  rowSelection={rowSelection} columns={this.columns} dataSource={data} />*/}
        <Table
          rowSelection={rowSelection}
          columns={this.columns}
          dataSource={this.state.data1}
          onRow={(record) => {
            return {
              onClick: (event) => {
                // console.log(record)
              }, // 点击行
              onDoubleClick: (event) => {},
              onContextMenu: (event) => {},
              onMouseEnter: (event) => {}, // 鼠标移入行
              onMouseLeave: (event) => {},
            };
          }}
          onHeaderRow={(columns, index) => {
            return {
              onClick: () => {
                console.log(222);
              }, // 点击表头行
            };
          }}
        />
      </div>
    );
  }
}

export default ProductKind;
