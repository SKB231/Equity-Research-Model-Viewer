import { Paper } from "@mui/material";
import CompanyCard from "./CompanyCard";
import AddTable from "./AddTable";

const Content = () => {
    return (
        <Paper bgcolor={"grey"} flex={10} sx={{
            overflow: 'scroll',
            maxHeight: '100vh',
            width: '100%'
        }}>
            {/* <CompanyCard CompanyName={"DAL"}/> */}
            <AddTable/>
        </Paper>
    )
}

export default Content;