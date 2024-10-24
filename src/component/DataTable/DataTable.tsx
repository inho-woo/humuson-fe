import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Box,
  Select,
  MenuItem,
  Button,
  Typography,
  IconButton,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { DataTableInterface } from "./DataTable.d";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import SearchIcon from "@mui/icons-material/Search";
import sampleData from "@/data/data.json"; // 예시 데이터

const DataGridCustom = (props: DataTableInterface.DataGridProps) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [selectValue, setSelectValue] = useState<string>();
  const [textValue, setTextValue] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState(sampleData);

  const handleSearch = () => {
    const selectedDate = date ? dayjs(date).format('YYYY-MM-DD') : null; // 선택된 날짜
    const filteredData = sampleData.filter((row) => {
      const textMatch = selectValue === "title"
        ? row.title.toLowerCase().includes(textValue.toLowerCase())
        : selectValue === "userId"
        ? row.userId.toLowerCase().includes(textValue.toLowerCase())
        : selectValue === "count"
        ? row.count.toString().includes(textValue) // count는 숫자이므로 string으로 변환
        : true;
    

      const dateMatch = selectedDate ? row.date === selectedDate : true;

      return textMatch && dateMatch;
    });

    setFilteredRows(filteredData);
  };

  
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F4F4F4",
          width: "90%",
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 2,
            marginBottom: 3,
            alignItems: "center",
            backgroundColor: "#F4F4F4",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ko"}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minWidth: "100px",
                marginRight: 2,
              }}
            >
              <Typography sx={{ marginLeft: 1, marginRight: 2 }}>
                등록일 기준
              </Typography>
              <DatePicker
                label=""
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </Box>
          </LocalizationProvider>
          <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
            <Typography>검색조건</Typography>
          </Box>

          <Box sx={{ minWidth: "100px", marginRight: 2 }}>
            <Select
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              fullWidth
            >
              <MenuItem value="title">제목</MenuItem>
              <MenuItem value="userId">사용자 ID</MenuItem>
              <MenuItem value="count">조회수</MenuItem>
            </Select>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              minWidth: "100px",
              marginRight: 2,
            }}
          >
            <TextField
              label="검색어 입력"
              variant="outlined"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              sx={{ marginRight: 1 }} // TextField와 IconButton 사이의 간격 조정
            />
            <IconButton
              onClick={handleSearch}
              sx={{
                height: "30px",
                backgroundColor: "#78818C",
                borderRadius: 0,
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography>전체글: {props.rows.length}개</Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "green", height: "30px", marginRight: 1 }}
          >
            등록
          </Button>
        </Box>
        <DataGrid
          columns={props.columns}
          rows={filteredRows && filteredRows.length > 0 ? filteredRows : props.rows}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
    </>
  );
};

export default DataGridCustom;
