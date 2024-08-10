import { Box, Card, CardContent, Typography } from "@mui/material"
import { DashboardCardProps } from "./DashboardPage"
interface Props{
  content: DashboardCardProps,
}
const DashboardCard:React.FC<Props> = ({content}) => {
  return (
    <Card sx={{bgcolor:'#fefefe'}}>
      <CardContent>
        <Box display='flex' justifyContent='space-between' py={'3px'}>
          {content.icon}
          <Typography variant='h6' >{content.title}</Typography>
        </Box>
          <Typography variant='h4'>$ {content.value}</Typography>
      </CardContent>
    </Card>
  )
}
export default DashboardCard