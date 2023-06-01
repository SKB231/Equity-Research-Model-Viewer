import React, {useState, useRef, useEffect} from 'react';
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
import { InputLabel, Input, FormControl, FormHelperText, Stack } from '@mui/material';
import {Button, TextField} from '@mui/material';


import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import { Workbook } from '@syncfusion/ej2-react-spreadsheet';


export default function AddTable() {
    const [spreadsheetJSON, setSpreadsheetJSON] = useState('')
    const spreadsheetRef = useRef(null)
    const [formValues, setFormValues] = useState({
        companyName: '',
        companyInformation: '',
      });
    const [file, setFile] = useState(null)

      useEffect(() => {
        const fetchDataAsync = async () => {
            if(file) {              
                console.log(file)
                let spreadsheet = spreadsheetRef.current
                if (spreadsheet) {
                    spreadsheet.open({file});
                }
    
            }

        }
        fetchDataAsync();
        
      }, [file])


      const handleChange = (event) => {
        const { name, value } = event.target;
        // New form values = (Prev_Form_Values) <Union> (New Form Values)
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));


      };

      const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        setFile(file)
      }

  const handleSubmit =async (event) => {
    event.preventDefault()
    let response = await spreadsheetRef.current.saveAsJson()
    let jsonResp = await JSON.stringify(response)
    console.log(jsonResp)
    console.log(response)
    }

  return (
    <Card sx={{
      margin: '0.05rem',
      height: '100%',
      overflow: 'scroll'
    }}>
      <CardHeader
        title="Add New Company"
        subheader="September 14, 2016"
      />
      <CardContent>



      <form onSubmit={handleSubmit}>
        <Stack direction={'column'} spacing={2} alignItems={'center'}>
        <TextField
        name='companyName'
        label="Company Name"
        variant="outlined"
        sx={{
            width: '100%'
        }}
        value={formValues.companyName}
        onChange={handleChange}
        required
      />
      <TextField
        name='companyInformation'

        label="Company Information"
        variant="outlined"
        value={formValues.companyInformation}
        onChange={handleChange}

        multiline
        sx={{
            width: '100%'
        }}
        rows={4}
      />
      <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    onChange={handleFileChange}
    name='filePath'

    type="file"
    hidden
  />
</Button>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{
            maxWidth: '50%'
        }}
      >
        Add Table
      </Button>
        </Stack>
    </form>

      <SpreadsheetComponent ref={spreadsheetRef}  openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open' saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save'>

      </SpreadsheetComponent>
      </CardContent>
       
    </Card>
  );
}