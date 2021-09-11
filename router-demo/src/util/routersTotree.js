 function FormatToTree(data) {
        // console.log('data',data)
        //分开根路由和其下子路由
        let parents = data.filter(item => item.pId === 0)
        let childrens = data.filter(item => item.pId !== 0)
        //将子路由放进指定的父路由下
        routerToTree(parents, childrens)
        function routerToTree(parents, children) {
            // console.log('parents',parents)
            // console.log('childrens',children)
            parents.map(p => {
                children.map((c, i) => {
                    if (p.menuId === c.pId) {
                        let _c = JSON.parse(JSON.stringify(children))
                        _c.splice(i, 1)
                        routerToTree([c], _c)
                        if (p.menuChilds) {
                            p.menuChilds.push(c)
                        } else {
                            p.menuChilds = [c]
                        }
                    }
                })
            })
        }
        // console.log('parents',parents)
        return parents
    }
    export {FormatToTree}