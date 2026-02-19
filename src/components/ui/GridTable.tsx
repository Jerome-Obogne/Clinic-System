import { memo } from 'react'
import { DataGrid, type GridColDef, type GridRowModel } from "@mui/x-data-grid";


interface TableProps<T extends GridRowModel> {
    rows: T[],
    columns:  GridColDef[],

}

const GridTable =  <T extends GridRowModel,>({rows,columns}: TableProps<T>) => {

  return (
    <>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableColumnMenu={true}
          
        />
    </>
  );
}

export default memo(GridTable)