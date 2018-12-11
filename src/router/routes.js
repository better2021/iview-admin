/**
 * 所有路由列表
 * 显示在菜单的条件 1.存在id，pid  2.不在dontShow里  3.登录用户的auth_id存在id和pid
 */

const routes = [
  {
    path: '/',
    name: '总览',
    component: () => import('../view/home')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/login')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../components/NoFound')
  }
];

const menuConfig = {
  1: {
    name: '影片',
    icon: 'iconfont icon-dianpudanganwangzhan'
  }
};

// 获取所有有效的一级菜单列表(tree)
function _getValidRouteTree(arr) {
  let tree = arr.filter(v => {
    return v.pid && !v.hide;
  });
  return tree.reduce((back, x) => {
    if (!back[x.pid]) {
      return back;
    }
    if (back[x.pid].children) {
      back[x.pid].children.push(x);
    } else {
      back[x.pid].children = [x];
    }
    return back;
  }, menuConfig);
}
function _getValidRouteList(arr) {
  const auth = window.localStorage.getItem('auth') || '';
  return arr.filter(x => {
    return (
      x.id &&
      x.pid &&
      ~auth.split(',').indexOf(String(x.pid)) &&
      ~auth.split(',').indexOf(String(x.id))
      //&&!~dontShow.indexOf(x.path)
    );
  });
}

// 所有路由
export const allRoutes = routes;

export const getRouteTree = () => {
  return _getValidRouteTree(JSON.parse(JSON.stringify(routes)));
};

export const getValidRouteTree = () => {
  return _getValidRouteTree(JSON.parse(JSON.stringify(routes)));
};

export const getValidRouteList = () => {
  return _getValidRouteList(JSON.parse(JSON.stringify(routes)));
};

// 获取路由的id和父pid {pid:'1',id:'11'}
export function getRouteId(name) {
  for (let i = 0; i < routes.length; i++) {
    if (name === routes[i].name) {
      return {
        pid: routes[i].pid,
        id: routes[i].id
      };
    }
  }
}

// 判断是否有页面权限
export function hasAuth(name) {
  return true;
}
