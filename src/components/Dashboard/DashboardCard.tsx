import { Box, Card, CardContent, Typography } from "@mui/material";
import { DashboardCardProps } from "../../app/layout/DashboardPage";
interface Props {
  content: DashboardCardProps;
}
const DashboardCard: React.FC<Props> = ({ content }) => {
  return (
    <Card sx={{ bgcolor: "#fefefe" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" py={"3px"}>
          {content.icon}
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: 10, sm: 12, md: 16 } }}
          >
            {content.title}
          </Typography>
        </Box>
        <Typography variant="h4">{content.value}</Typography>
      </CardContent>
    </Card>
  );
};
export default DashboardCard;
