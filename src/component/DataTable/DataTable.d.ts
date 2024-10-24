import { GridColDef } from '@mui/x-data-grid';

export namespace DataTableInterface {
    export interface DataGridProps {
        pageSize: number;
        columns: GridColDef[];
        rows: T[];
        searchField?: Date | string;
    }
    export interface SearchBarProps {
        onSearch: (filters: {
          date: string | null;
          selectValue: string;
          textValue: string;
        }) => void;
      }
}

