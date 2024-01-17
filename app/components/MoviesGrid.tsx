'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ColDef, ColGroupDef } from 'ag-grid-community';

import { Movies, Params } from '@/types';

const AnchorTag = (params: Params) => {
  return (
    <>
      {params.data.poster ? (
        <a href={params.data.poster} target='_blank' rel='noopener noreferrer'>
          {' '}
          {params.data.title}{' '}
        </a>
      ) : (
        params.data.title
      )}
    </>
  );
};

const MoviesGrid = ({ movies }: { movies: Movies[] }) => {
  const [rowData, setRowData] = useState(movies);

  const gridRef = useRef();

  useEffect(() => {
    setRowData((preValue) => [...preValue, ...movies]);
  }, [movies]);

  useEffect(() => {
    setRowData(movies);
  }, [movies]);

  const [columnDefs, setColumnDefs] = useState<
    (ColDef<Movies, any> | ColGroupDef<Movies>)[]
  >([
    {
      field: 'title',
      cellRenderer: AnchorTag,
    },
    { field: 'imbd.rating', width: 150 },
    {
      field: 'year',
      width: 100,
    },
    { field: 'cast', width: 400 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  return (
    <div className='ag-theme-quartz' style={{ height: 400, width: 1000 }}>
      <AgGridReact
        // ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
      />
    </div>
  );
};

export default MoviesGrid;
