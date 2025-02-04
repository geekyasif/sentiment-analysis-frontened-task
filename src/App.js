import { useEffect, useState } from "react";
import SearchInput from "./components/SearchInput";
import TableData from "./components/TableData";
import { tableColumn } from "./constants";
import { fetchNews } from "./services";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [tableData, setTableData] = useState({
    articles: [],
    total: 0,
  });
  const [isSearching, setIsSearching] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
    search: "",
  });

  async function handleSearchNews(isFromSearch = false) {
    try {
      if (isFromSearch) {
        setIsSearching(true);
      } else {
        setIsTableLoading(true);
      }
      const { articles, total } = await fetchNews(params);

      if (total === 0 || articles.legth === 0) {
        toast.error("No News Found!");
      }

      setTableData({ articles, total });
    } catch (error) {
      toast.error(error?.message || "Something went wrong! Please try again");
    } finally {
      if (isFromSearch) {
        setIsSearching(false);
      } else {
        setIsTableLoading(false);
      }
    }
  }

  useEffect(() => {
    if (params?.search !== "") {
      handleSearchNews(true);
    }
  }, [params.search]);

  useEffect(() => {
    handleSearchNews(false);
  }, [params.page, params.pageSize]);

  return (
    <div className="container mx-auto py-10">
      <Toaster />
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
            loading: isTableLoading,
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
