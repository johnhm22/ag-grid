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
    {
      field: 'imdb.rating',
      width: 150,
      headerName: 'IMDb Rating',
    },
    {
      field: 'year',
      width: 100,
      filter: 'agNumberColumnFilter',
    },
    { field: 'cast', width: 400 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      filterParams: { buttons: ['apply', 'reset'] },
    }),
    []
  );

  const onBtnSave = () => {
    window.alert('Sorry, this requires an enterprise licence');
  };

  const onBtnApply = () => {
    window.alert('Sorry, this requires an enterprise licence');
  };

  return (
    <div className='ag-theme-quartz' style={{ height: 400, width: 1000 }}>
      {/* <div className='mb-2'>
        <span className='mr-2'>Filter:</span>
        <button
          onClick={onBtnSave}
          className='rounded-md bg-slate-200 px-2 py-1 mr-3'
        >
          Save
        </button>
        <button
          onClick={onBtnApply}
          className='rounded-md bg-slate-200 px-2 py-1 mr-3'
        >
          Apply
        </button>
      </div> */}
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
