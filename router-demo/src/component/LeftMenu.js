import { Component } from 'react'
import { Menu } from 'antd'
import * as icons from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom'
const { SubMenu } = Menu;
@inject('user')
@observer
class LeftMenu extends Component {
    bindMenu(menulist) {
        let menuarr = menulist.map((item, index) => {
            let IconMenu = icons[item.menuImgClass]
            if (item.menuChilds && item.menuChilds.length > 0) { //有子组件          
                return <SubMenu key={item.menuId} icon={<IconMenu />} title={item.menuName}>
                    {this.bindMenu(item.menuChilds)}
                </SubMenu>
            } else {
                if(item.menuIsShow) {
                    return <Menu.Item key={item.menuId} icon={< IconMenu />}>
                    <Link to={item.menuUrl}>{item.menuName}</Link>
                </Menu.Item>
                }               
            }           
        })
        return menuarr
    }
    render() {
        return (
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                {this.bindMenu(this.props.user.user.menuInfo)}
            </Menu>
        )
    }
}
export default LeftMenu
