import { Form, Input, InputNumber, Select, Button, DatePicker, message , Radio } from 'antd';
import axios from "../../util/axios";
import api from "../../api";
import qs from "qs";
import '../../asset/addCoupon.css'
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const { Option } = Select;
const { RangePicker } = DatePicker;
const addCoupon = () => {
    Date.prototype.Format = function(fmt)
    { //author: meizz
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    }
    const onFinish = (values) => {
        // console.log('Success:', values);
        let tempCake = [];//适用范围
        let tempDate = [];//有效日期
        let tempCoupon_circulation = ''//总发行量
        let tempCoupon_restrictGet = ''//每人限领
        let tempCoupon_restrictUse= ''//使用门槛
        values.coupon_canUse.map((item)=> {
            tempCake +=item+'/'
        })
        values.coupon_validity.map((item)=> {
            tempDate += item._d.Format("yyyy-MM-dd hh:mm:ss") + '&'
        })
        if (values.coupon_circulation === 0){
            tempCoupon_circulation = '无限制'
        }else {
            tempCoupon_circulation = values.coupon_circulation
        }

        if (values.coupon_restrictGet === 0){
            tempCoupon_restrictGet = '无限制'
        }else {
            tempCoupon_restrictGet = values.coupon_restrictGet
        }

        if (values.coupon_restrictUse === 0){
            tempCoupon_restrictUse = '无限制'
        }else {
            tempCoupon_restrictUse = values.coupon_restrictUse
        }
        values.coupon_canUse = tempCake
        values.coupon_validity = tempDate
        values.coupon_circulation = tempCoupon_circulation
        values.coupon_restrictGet = tempCoupon_restrictGet
        values.coupon_restrictUse = tempCoupon_restrictUse
        axios({
            method:'post',
            url: api.user.addCouponMsg,
            data: qs.stringify(values)
        }).then(res=> {
            // console.log(res)
            console.log(res.data)
            if (res.data === 'success'){
                message.success("发布优惠券成功")
            }else {
                message.error('发布优惠券失败')
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };
    function handleChange(value) {
        // console.log(`selected ${value}`);
    }
    function onChange(event) {
        // console.log(event.target)
    }
    function disabledDate(current) {
        return current && current <moment().subtract(1, "days"); //当天之前的不可选，不包括当天
        // return current && current < moment().endOf('day');//当天之前的不可选，包括当天
    }
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="优惠券名称："
                name="coupon_name"
                rules={[{ required: true, message: '请输入优惠券名称' }]}
            >
                <Input maxLength={12} placeholder={'12个字以内'} className={'couponSize'}/>
            </Form.Item>

            <Form.Item
                label="总发行量："
                name="coupon_circulation"
                rules={[{ required: true, message: '请输入优惠券发行数量' }]}
            >
                <InputNumber placeholder={'请输入一个正整数，0为无限制'} className={'couponSize'}/>
            </Form.Item>
            <Form.Item
                label="有效期：日期范围"
                name="coupon_validity"
                rules={[{ required: true, message: '请选择优惠券有限期限' }]}
            >
                <RangePicker showTime locale={locale} disabledDate={disabledDate} />
            </Form.Item>
            <Form.Item
                label="可领用户："
                name="coupon_callableUser"
                rules={[{ required: true, message: '请选择发行用户群体' }]}
            >
                <Radio.Group defaultValue="全体用户" style={{ marginTop: 16 }}>
                    <Radio value="全体用户">全体用户</Radio>
                    <Radio value="vip用户">vip用户</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="每人限领："
                name="coupon_restrictGet"
                rules={[{ required: true, message: '请输入每人限领数量' }]}
            >
                <InputNumber min={0} placeholder={'请输入一个正整数，0为无限制'} className={'couponSize'}/>
            </Form.Item>
            <Form.Item
                label="使用门槛："
                name="coupon_restrictUse"
                rules={[{ required: true, message: '请输入使用门槛金额' }]}
            >
                <InputNumber size="large" min={0} onChange={onChange} className={'couponSize'} placeholder={'请输入一个正整数，0为无限制'}/>
            </Form.Item>
            <Form.Item
                label="面额："
                name="coupon_faceValue"
                rules={[{ required: true, message: '请输入优惠券的面额' }]}
            >
                <InputNumber min={0} className={'couponSize'} placeholder={'面额只能是数字'}/>
            </Form.Item>
            <Form.Item
                label="可使用商品："
                name="coupon_canUse"
                rules={[{ required: true, message: '请选择可使用优惠券的商品' }]}
            >
                <Select
                    mode="multiple"
                    style={{ width: '48.5%' }}
                    placeholder="请选择商品类型"
                    defaultValue={['cake']}
                    onChange={handleChange}
                    optionLabelProp="label"
                >
                    <Option value="cake" label="蛋糕">
                        <div className="demo-option-label-item">
                                <span role="img" aria-label="cake">
                                </span>
                            蛋糕
                        </div>
                    </Option>
                    <Option value="bread" label="面包">
                        <div className="demo-option-label-item">
                                <span role="img" aria-label="Bread">
                                </span>
                            面包
                        </div>
                    </Option>
                    <Option value="ice_cream" label="冰淇淋">
                        <div className="demo-option-label-item">
                                <span role="img" aria-label="Ice_cream">
                                </span>
                            冰淇淋
                        </div>
                    </Option>
                    <Option value="light_cake" label="冻与焗/轻蛋糕">
                        <div className="demo-option-label-item">
                                <span role="img" aria-label="Light_cake">
                                </span>
                            冻与焗/轻蛋糕
                        </div>
                    </Option>
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" className='submitStyle'>
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
};

export default addCoupon;
