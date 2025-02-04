import { useEffect, useState } from "react";
import SearchInput from "./components/SearchInput";
import TableData from "./components/TableData";
import { tableColumn } from "./constants";
import { fetchNews } from "./services";

function App() {
  const [tableData, setTableData] = useState({
    articles: [],
    total: 0,
  });
  const [isSearching, setIsSearching] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
    search: "",
  });

  async function handleSearchNews() {
    try {
      setIsSearching(true);
      const { articles, total } = await fetchNews(params);
      setTableData({ articles, total });
    } catch (error) {
      console.log("Something went wrong! Please try again");
    } finally {
      setIsSearching(false);
    }
  }

  useEffect(() => {
    handleSearchNews();
  }, [params]);

  return (
    <div className="container mx-auto py-10">
      <div className="p-4">
        {/* search input  */}
        <SearchInput
          placeholder="Search news..."
          allowClear={true}
          loading={isSearching}
          size="large"
          title="Search"
          onSearch={(value) => {
            if (value !== "") {
              setParams((prev) => ({
                ...prev,
                search: value,
              }));
            }
          }}
        />
        <div className="my-4"></div>
        {/* table */}
        <TableData
          config={{
            columns: tableColumn,
            data: tableData.articles,
            loading: isSearching,
            onChange: (pagination) => {
              setParams((prev) => ({
                ...prev,
                page: pagination?.current,
                pageSize: pagination?.pageSize,
              }));
            },
            pagination: {
              position: ["bottom", "center"],
              pageSize: params?.pageSize,
              total: tableData?.total,
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
