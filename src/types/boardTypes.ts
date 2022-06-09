export type boardGetListProps = {
  size?: number;
  page?: number;
};

export type BoardProps = {
  loading: boolean;
  getListTable: {
    rows: {
      id: number;
      name: string;
      barcode: number;
      lastUpdateTime: number;
    }[];
    total: number;
  };
  filteredListTable: {
    rows: {
      id: number;
      name: string;
      barcode: number;
      lastUpdateTime: number;
    }[];
    total: number;
  };
  isSearched: boolean;
  onSearch: () => void;
  onChangeSearch: any;
};
