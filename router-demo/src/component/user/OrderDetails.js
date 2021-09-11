import React, {Component} from 'react';
import { Descriptions, Badge , Input, Space,Image} from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import '../../asset/OrderDetails.css'
import axios from "../../util/axios";
import api from "../../api";
import img from '../../asset/images/cake1.jpg'
const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
          fontSize: 16,
          color: '#1890ff',
        }}
    />
);


let detailsUI = null;


class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      data: {
        ProductId: '',
        RotationId: '',
        ProductName: '',
        OriginalPrice: '',
        MemberPrice: '',
        ProductSrc: '',
        ProductDes: '',
        ProductPlace: '',
        ShelfTime: '',
        SpecialOffer: '',
        ShelfLife: '',
        UnitPrice: ''
      }
    };

    // 这个绑定是必要的，使`this`在回调中起作用
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {

  }

  onSearch = (value) => {
    let id = Number(value);
    axios({
      method: 'post',
      url: api.user.OrderDetails,
      data:{id:id}
    }).then(res => {
      this.setState({data:res.data})
      console.log(this.state.data);
    });

  }
  handleClick() {
    this.setState(() => ({
      display: 'block'
    }));
  }

  render() {
   let data = this.state.data
    if (data.ProductId !== ''){
      detailsUI = <Descriptions title="订单详情" bordered className='order_details' style={{display: this.state.display}} data={data}>
        <Descriptions.Item label="产品id">{data.ProductId}</Descriptions.Item>
        <Descriptions.Item label="产品名称">{data.ProductName}</Descriptions.Item>
        <Descriptions.Item label="市场价">{data.OriginalPrice}</Descriptions.Item>
        <Descriptions.Item label="会员价">{data.MemberPrice}</Descriptions.Item>

        <Descriptions.Item label="上架时间">{data.ShelfTime}</Descriptions.Item>
        <Descriptions.Item label="保质期" span={2}>
          {data.ShelfLife}
        </Descriptions.Item>
        <Descriptions.Item label="商品图片" span={1}>
          <Image width={100} src={`http://localhost:3000/static/media/${data.ProductSrc}`}/>
        </Descriptions.Item>
        <Descriptions.Item label="商品描述" span={2}>
          {data.ProductDes}
        </Descriptions.Item>
        <Descriptions.Item label="产地">{data.ProductPlace}</Descriptions.Item>
        <Descriptions.Item label="有无特价">{data.SpecialOffer}</Descriptions.Item>
        <Descriptions.Item label="单价">{data.UnitPrice}</Descriptions.Item>
      </Descriptions>
    }
    return (
        <div>
          <Search placeholder="input search text" onSearch={this.onSearch} onClick={this.handleClick} enterButton className="search_details" />
          {detailsUI}
        </div>
    );
  }
}

export default OrderDetails;