import { Link, navigate } from "gatsby";
import React from "react";
import { 
  useSortBy,
  useTable,
  usePagination,
  useFlexLayout
} from "react-table";
import useTweetData from "../hooks/useTweetData";

const TweetTable = () => {
  const tableData = useTweetData();
  const columns = React.useMemo(() => [
    {
      Header: 'ID',
      accessor: 'node.id',
      hidden: true
    },
    {
      Header: 'Date',
      accessor: 'node.date',
    },
    {
      Header: 'Text',
      accessor: 'node.text',
    },
    {
      Header: 'Favorites',
      accessor: 'node.favorites',
    },
    {
      Header: 'Retweets',
      accessor: 'node.retweets',
    },
    {
      Header: 'Device',
      accessor: 'node.device',
      hidden: true
    },
    {
      Header: 'Deleted?',
      accessor: 'node.isDeleted',
      hidden: true
    },
    {
      Header: 'Retweet?',
      accessor: 'node.isRetweet',
      hidden: true
    },
    {
      Header: 'Flagged?',
      accessor: 'node.isFlagged',
      hidden: true
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    allColumns,
    prepareRow,
    // pagination
    pageOptions,
    page,
    pageCount,
    state: { 
      pageIndex,
      pageSize,
    },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns, 
      data: tableData,
      initialState: {
        hiddenColumns: columns.map(col => col.hidden ? col.accessor : "")
      }
    },
    useSortBy,
    usePagination,
    useFlexLayout,
  );

  return (
    <>
      {allColumns.map(column => (
        <div key={column.id}>
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
            {column.Header}
          </label>
        </div>
      ))}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr onDoubleClick={() => navigate(`/realDonaldTrump/status/${row.values["node.id"]}`)} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <div>
          Page{' '}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </div>
        <div>Go to page:</div>
        <input
          type="number"
          defaultValue={pageIndex + 1 || 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
        />
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[1, 5, 10, 25, 50, 100, 500, 1000].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default TweetTable;
