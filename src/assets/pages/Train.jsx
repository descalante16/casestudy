import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { useTable, useSortBy, useFilters, usePagination, useGlobalFilter } from "react-table";
import axios from "axios";

const Train = () => {
    const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/api/trainlist.php")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "TrainNumber",
      },
      {
        Header: "Train Name",
        accessor: "TrainName",
      },
      {
        Header: "Source",
        accessor: "Source",
      },
      {
        Header: "Destination",
        accessor: "Destination",
      },
      {
        Header: "AC Fare",
        accessor: "AC_Fare",
      },
      {
        Header: "General Fare",
        accessor: "General_Fare",
      },
      {
        Header: "Weekdays Available",
        accessor: "WeekdaysAvailable",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, globalFilter } = state;
  const isDataEmpty = data.length === 0;

  return (
    <div className={`bg-orange-400 w-full h-full bg-cover bg-center ${isDataEmpty ? "h-screen" : ""}`}>
      {/* Your header component */}
      <Header />
      <div className="trainlist p-5 pt-32 text-2xl font-bold ml-8 place-content-center">
        <h1 className="text-emerald-900">Train List Available</h1>
      </div>
      <div className="flex justify-start mb-4 ml-12">
        
        <input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="p-2 rounded-md border-gray-300  w-72"
         
        />
      </div>
      <div className="flex place-content-center overflow-auto px-12 rounded-lg">
        <div className="w-full mb-5 overflow-x-auto">
          <table className="w-full rounded-lg" {...getTableProps()}>
            <thead className="bg-emerald-400 whitespace-nowrap border-b-2 border-emerald-700">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="w-26 p-3 whitespace-nowrap text-sm font-bold tracking-wid text-left"
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="ml-1 fas fa-sort-down"></i>
                          ) : (
                            <i className="ml-1 fas fa-sort-up"></i>
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white bg-opacity-20" {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="border-b transition duration-300 ease-in-out hover:bg-opacity-50"
                  >
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="p-4">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
      </div>
      
    </div>
  );
};


export default Train;