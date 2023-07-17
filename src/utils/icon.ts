import {
  PieChartOutlined,
  HeatMapOutlined,
  EditOutlined,
  FundOutlined,
  AlertOutlined,
  BuildOutlined,
  DeploymentUnitOutlined
} from "@ant-design/icons-vue";
// 所有图标
function changeIcon(icon: string | undefined) {
  let value;
  switch (icon) {
    case "PieChartOutlined":
      value = PieChartOutlined;
      break;
    case "HeatMapOutlined":
      value = HeatMapOutlined;
      break;
    case "EditOutlined":
      value = EditOutlined;
      break;
    case "FundOutlined":
      value = FundOutlined;
      break;
    case "AlertOutlined":
      value = AlertOutlined;
      break;
    case "BuildOutlined":
      value = BuildOutlined;
      break;
    case "DeploymentUnitOutlined":
      value = DeploymentUnitOutlined;
      break;
    default:
      value = PieChartOutlined;
      break;
  }
  return value;
}

const allIcon: string[] = [
  "PieChartOutlined",
  "HeatMapOutlined",
  "EditOutlined",
  "FundOutlined",
  "AlertOutlined",
  "BuildOutlined",
  "DeploymentUnitOutlined"
];

export { changeIcon, allIcon };
