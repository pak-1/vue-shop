import Vue from "vue";
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  container,
  header,
  aside,
  main,
  menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  breadcrumb,
  BreadcrumbItem,
  card,
  row,
  col,
  table,
  TableColumn,
  Switch,
  tooltip,
  pagination,
  dialog,
  MessageBox,
  tag,
} from "element-ui";

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(container);
Vue.use(header);
Vue.use(aside);
Vue.use(main);
Vue.use(menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(breadcrumb);
Vue.use(card);
Vue.use(row);
Vue.use(col);
Vue.use(table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(tooltip);
Vue.use(pagination);
Vue.use(dialog);
Vue.use(tag);

Vue.use(BreadcrumbItem);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
