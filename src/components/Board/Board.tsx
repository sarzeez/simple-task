import { Table, Input, Alert } from "antd";

import { BoardProps } from "../../types/boardTypes";
import "./board.css";
const { Search } = Input;

const Board = (props: BoardProps) => {
  const {
    loading,
    getListTable,
    filteredListTable,
    isSearched,
    onSearch,
    onChangeSearch,
  } = props;
  const { rows } = getListTable;
  const data = rows.map(
    (
      item: {
        id: number;
        name: string;
        barcode: number;
        lastUpdateTime: number;
      },
      index: number
    ) => ({
      key: index,
      id: item.id,
      name: item.name,
      barcode: item.barcode,
      lastUpdateTime: item.lastUpdateTime,
    })
  );

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      columnKey: 1,
    },
    {
      title: "barcode",
      dataIndex: "barcode",
      columnKey: 2,
    },
    {
      title: "product name",
      dataIndex: "name",
      columnKey: 3,
    },
    {
      title: "time",
      dataIndex: "lastUpdateTime",
      columnKey: 3,
    },
  ];

  return (
    <div>
      <div className="bank-header">
        <Search
          style={{ width: "300px" }}
          placeholder="input search text"
          onSearch={onSearch}
          onChange={onChangeSearch}
          enterButton
          size="middle"
        />
        {isSearched ? (
          filteredListTable.total > 0 ? (
            <Alert
              message={`${filteredListTable.total} items are found`}
              type="success"
            />
          ) : (
            <Alert
              message={`${filteredListTable.total} items are found`}
              type="warning"
            />
          )
        ) : (
          ""
        )}
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </div>
  );
};

export default Board;
