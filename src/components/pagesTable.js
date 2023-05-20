import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';




function PagesTable({listObject, headers}) {
  
  return (
    <div style={{ height: "100%", width: '100%' }}>
      <DataGrid  getRowId={(row) => row.id_worker} columns={headers} rows={listObject} />
    </div>
  );
}


export {PagesTable}