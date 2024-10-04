import { Box } from "@mui/material";
import { DashboardCardProps } from "../../app/layout/DashboardPage";
import DashboardCard from "./DashboardCard";

type Props = {
  contents: DashboardCardProps[];
};
const DashboardList: React.FC<Props> = ({ contents }) => {
  const list = contents.map((content, index) => (
    <Box key={index}>
      <DashboardCard content={content} />
    </Box>
  ));
  return (
    <Box className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 gap-2">
      {list}
    </Box>
  );
};
export default DashboardList;
