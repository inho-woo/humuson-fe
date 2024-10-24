import DataGridCustom from "@/component/DataTable/DataTable";
import Layout from "@/component/layout";
import { GridColDef } from "@mui/x-data-grid";
import sampleData from "@/data/data.json";
import { Notice } from "./notice";

const NoticePage = () => {

  const rows : Notice[] = sampleData;
  console.log("Rows: ", rows); // rows의 타입 확인

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "제목", width: 400 },
    { field: "userId", headerName: "작성자(ID)", width: 300 },
    { field: "date", headerName: "날짜", width: 250 },
    { field: "count", headerName: "조회수", width: 100 },
  ];

  return (
    <Layout title= "공지사항" subTitle="게시판">
      <DataGridCustom columns={columns} rows={rows} searchField="notice" pageSize={5} />
    </Layout>
  );
};

export default NoticePage;
