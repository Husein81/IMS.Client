import { Box } from "@mui/material";
import { DashboardCardProps } from "./DashboardPage";
import DashboardCard from "./DashboardCard";

type Props = {
  contents: DashboardCardProps[];
};
const DashboardList: React.FC<Props> = ({ contents }) => {
  return (
    <Box className="grid grid-cols-4 gap-2">
      {contents.map((content, index) => (
        <Box key={index}>
          <DashboardCard content={content} />
        </Box>
      ))}
    </Box>
  );
};
export default DashboardList;
