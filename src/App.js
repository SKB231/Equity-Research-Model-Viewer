import { Paper, Stack } from "@mui/material";
import Content from "./Components/Content";
import LeftMenu from "./Components/LeftMenu";
import Navbar from "./Components/Navbar";
import { registerLicense } from "@syncfusion/ej2-base";

function App() {
  registerLicense(
    "Mgo+DSMBaFt+QHJqVk1hXk5Hd0BLVGpAblJ3T2ZQdVt5ZDU7a15RRnVfRF1iSXxQdURhUHxadQ==;Mgo+DSMBPh8sVXJ1S0R+X1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jT35SdkdgWn5ceXFRQw==;ORg4AjUWIQA/Gnt2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXhTd0VhWnxfcn1SQmU=;MjI3ODcyM0AzMjMxMmUzMDJlMzBpOExRMXhtQnBLelErS1B4RkczMVZmZCtzSkNoVHBhbmtmWmtreWpQOUlrPQ==;MjI3ODcyNEAzMjMxMmUzMDJlMzBZSzV6ajllZTAxSDNlTkJKeXpZSGhhL0tjNkQ1V0Y0eVZZNTRvWjdYWXJrPQ==;NRAiBiAaIQQuGjN/V0d+Xk9HfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5VdkRjW3xdcXdVQGhZ;MjI3ODcyNkAzMjMxMmUzMDJlMzBEaEwyQnY3RUQwQWg4bTByZWUvVEt6eWkyZ1haem9pcC9zbmRCbWxIa2xjPQ==;MjI3ODcyN0AzMjMxMmUzMDJlMzBVZ1lHMTVrK3d6RFFHWUFoN3JRbTBUMStGdkFDMnpDdmJHRVgxS3BIMFlRPQ==;Mgo+DSMBMAY9C3t2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXhTd0VhWnxfc3VSR2A=;MjI3ODcyOUAzMjMxMmUzMDJlMzBvR0Y4QTFZeUZuMFhhRnJsaFY5dWlVbE95L2ZQb3FITTlpN1NoUGFnQS9vPQ==;MjI3ODczMEAzMjMxMmUzMDJlMzBvYTlXY2VtalROV01jSkhRcDNtQkp4NVdSWXdLOXBqTkt6a0VrbmR5ZHFRPQ==;MjI3ODczMUAzMjMxMmUzMDJlMzBEaEwyQnY3RUQwQWg4bTByZWUvVEt6eWkyZ1haem9pcC9zbmRCbWxIa2xjPQ=="
  );

  return (
    <Paper sx={{ overflow: "auto" }}>
      <Stack height={"100%"}>
        <Navbar navBarHeight={2}></Navbar>
        <Stack direction={"row"} spacing={0.05} justifyContent="space-between">
          <LeftMenu />
          <Content />
        </Stack>
      </Stack>
    </Paper>
  );
}

export default App;
