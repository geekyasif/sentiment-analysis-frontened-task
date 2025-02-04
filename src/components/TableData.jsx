import React from 'react'
import { Table } from "antd";


function TableData({config}) {
  const {columns, data, onChange, loading, pagination}= config
  return (
    <div className=''>
       <Table 
       dataSource={data} 
       columns={columns} 
       bordered={true} 
       loading={loading} 
       onChange={onChange}
       pagination={{ 
        pagination: pagination?.position || ["bottom", "center"], 
        pageSize: pagination?.pageSize, 
        total: pagination?.total, 
      }} />
    </div>
  )
}

export default TableData