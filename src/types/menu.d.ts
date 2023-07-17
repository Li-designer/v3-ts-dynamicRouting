declare namespace menu {
  interface MenuList {
    key: string;
    title: string;
    icon: string;
    children?: MenuList[];
  }
}
