import React from 'react'
import { Input } from "antd";
const { Search } = Input;

function SearchInput({placeholder, allowClear, size, title, onSearch, loading}) {
  return (
    <div >
        <Search
            loading={loading}
            placeholder={placeholder}
            allowClear={allowClear}
            enterButton={title}
            size={size}
            onSearch={onSearch}
          />
    </div>
  )
}

export default SearchInput