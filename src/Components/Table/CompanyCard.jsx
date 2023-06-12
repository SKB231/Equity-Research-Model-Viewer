import React, {useRef, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import { Workbook } from '@syncfusion/ej2-react-spreadsheet';
import { Spreadsheet } from '@syncfusion/ej2-react-spreadsheet';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function CompanyCard({CompanyName}) {
  const [expanded, setExpanded] = React.useState(false);
  const spreadsheetRef = useRef(null)


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const beforeCellRenderHandler = (args) => {
    const lockedCell = 'C3'; // Replace with the cell reference you want to make non-mutable

    if (args.address === lockedCell) {
      args.style.isLocked = true;
    }
  };

  return (
    <Card sx={{
      margin: '0.05rem',
      height: '100%',
      overflow: 'scroll'
    }}>
      <CardHeader
        title={CompanyName}
        subheader="September 14, 2016"
      />
      <CardContent>
          <h2>Company Info: </h2>
          <Typography paragraph>
          Delta Air Lines is one of the major airlines of the United States and a legacy carrier. One of the world's oldest airlines in operation, Delta is headquartered in Atlanta, Georgia.[1] The airline, along with its subsidiaries and regional affiliates, including Delta Connection, operates over 5,400 flights daily and serves 325 destinations in 52 countries on six continents.[5][6] Delta is a founding member of the SkyTeam airline alliance.[6] As of the end of 2022, it had 90,000 employees.[7]
          </Typography>
          <SpreadsheetComponent 
          ></SpreadsheetComponent>
        </CardContent>     
    </Card>
  );
}