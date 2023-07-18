declare namespace menu {
  interface MenuList {
    key: string;
    title: string;
    icon: string;
    rank: number;
    children?: MenuList[];
  }

  interface State {
    collapsed: boolean;
    selectedKeys: string[];
    openKeys: string[];
    preOpenKeys: string[];
  }
}
