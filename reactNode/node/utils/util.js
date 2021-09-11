const FormatToTree = function (data) {
    //分开根路由和其下子路由
    let parents = data.filter(item => item.pId === 0)
    let childrens = data.filter(item => item.pId !== 0)
    console.log('parents', parents)
    console.log('cildren', childrens)
    //将子路由放进指定的父路由下
    routerToTree(parents, childrens)
    function routerToTree(parents, children) {
        parents.map(p => {
            children.map((c, i) => {
                if (p.menuId === c.pId) {
                    let _c = JSON.parse(JSON.stringify(children))
                        _c.splice(i, 1)
                        // console.log('_c',_c)
                        routerToTree([c], children)
                    if (p.menuChilds) {                      
                        p.menuChilds.push(c)
                    } else {
                        p.menuChilds = [c]
                    }
                }
            })
        })
    }
    console.log('parents',parents)
    return parents
}
// const removeIdentical = function (data) {
//     for (const key in data) {
//         if (data[key].menuChilds) {
//             for (let i = 0; i < data[key].menuChilds.length; i++) {
//                 for (let j = i + 1; j < data[key].menuChilds.length; j++) {
//                     if (data[key].menuChilds[i].menuId == data[key].menuChilds[j].menuId) {
//                         if (data[key].menuChilds[i].menuChilds) {
//                             removeIdentical(data[key].menuChilds[i])                                                 
//                         }
//                         data[key].menuChilds.splice(j, 1)
//                         j--;                          
//                     }
//                 }
//             }
//         }
//         console.log(data[key])
//     }
// }
module.exports = { FormatToTree }