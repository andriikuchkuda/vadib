import React, { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import reportUrl from "assets/Report.xlsx";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox";

import customFetch from "utils/customFetch";

const Dashboard = () => {
  const [data, setData] = useState({
    totalCustomerStats : {
      counts : 0,
      increase : 0
    },
    thisTodayTotalSaleStats : {
      counts : 0,
      increase : 0
    },
    thisMonthTotalSaleStats : {
      counts : 0,
      increase : 0
    },
    thisYearTotalSaleStats : {
      counts : 0,
      increase : 0
    },
    transactions : [],
  })
  
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  
  useEffect(() => {
    const initFetch = async () => {
      try{
        const response = await customFetch('general/dashboard');
        setData(response);
      } catch (error) {
        console.log(error)
      }
    }
    initFetch();
  }, [])

  const columns = [
    {
      field: "userId",
      headerName: "Customer Name",
      flex: 0.7,
      valueGetter: (params) => {
        return  params.name;
      }
    },
    {
      field: "adminId",
      headerName: "Admin Name",
      flex: 0.7,
      sortable: false,
      valueGetter: (params) => {
        return  params.name;
      }
    },
    {
      field: "usePeriod",
      headerName: "Period of Use",
      flex: 1,
      valueGetter: (params) => {
        const inputDate = new Date(params);

        // Extract the date part in 'YYYY-MM-DD' format
        const formattedDate = inputDate.toISOString().split('T')[0];
        return  formattedDate;
      }
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
      valueGetter: (params) => {
        const inputDate = new Date(params);

        // Extract the date part in 'YYYY-MM-DD' format
        const formattedDate = inputDate.toISOString().split('T')[0];
        return  formattedDate;
      }
    },
  ];
  
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            onClick={() => {
              const link = document.createElement("a");
              link.href = reportUrl;
              link.download = "Report.xlsx";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Customers"
          value={data && data.totalCustomerStats.counts}
          icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <StatBox
          title="Sales Today"
          value={data && data.thisTodayTotalSaleStats.counts}
          increase={data && data.thisTodayTotalSaleStats.increase + "%"}
          description="Since yesterday"
          icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box> */}
        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthTotalSaleStats.counts}
          increase={data && data.thisMonthTotalSaleStats.increase + "%"}
          description="Since last month"
          icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <StatBox
          title="Yearly Sales"
          value={data && data.thisYearTotalSaleStats.counts}
          increase={data && data.thisYearTotalSaleStats.increase + "%"}
          description="Since last year"
          icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "0.2rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            // loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography p="0 0.6rem" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
            Breakdown of real states and information via category for revenue made for this year and
            total sales.
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
