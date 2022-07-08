import React, { useState } from 'react';
import classes from './Grid.module.css';
import '../../global.css';
import ReactDataGrid from "react-data-grid";

const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
    console.log(sortDirection);
    const comparer = (a, b) => {
        if (sortDirection === "ASC") {
          return a[sortColumn.key] > b[sortColumn.key] ? 1 : -1;
        } else if (sortDirection === "DESC") {
          return a[sortColumn.key] < b[sortColumn.key] ? 1 : -1;
        }
      };

    return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
  };

  const rowKeyGetter = (row) => {
    return row.id;
  }

const Grid = (props) => {
    const [rows, setRows] = useState(props.rows);

    const onSortHandler = (idx) => {
        let sortDir = props.columns[idx].sortDir;
        if (!sortDir || sortDir === "NONE") {
            props.columns[idx].sortDir = "ASC";
            setRows(sortRows(props.rows, props.columns[idx], props.columns[idx].sortDir));
            return;
        }
        if (sortDir === "ASC") {
            props.columns[idx].sortDir = "DESC";
            setRows(sortRows(props.rows, props.columns[idx], props.columns[idx].sortDir));
            return;
        }
        if (sortDir === "DESC") {
            props.columns[idx].sortDir = "NONE";
            setRows(sortRows(props.rows, props.columns[idx], props.columns[idx].sortDir));
            return;
        }
    };

    return (
        // <ReactDataGrid
        // className="rdg-light"
        //     columns={props.columns}
        //     rows={rows} 
        //     rowKeyGetter={rowKeyGetter}
        //     rowGetter={i => rows[i]}
        //     rowsCount={props.rowsCount}
        //     minHeight={props.height}
        //     onGridSort={(sortColumn, sortDirection) =>
        //         setRows(sortRows(rows, sortColumn, sortDirection))
        //     }
        // />
        <div className="w100 oAuto" style={
            { 
                backgroundColor: "#f5f6f6",
                height: props.height ? props.height+"px" : 'auto', 
                maxHeight: props.height ? props.height+"px" : props.maxHeight ? props.maxHeight+"px" : 'auto',
                position: "relative"
            }
        }>
            {rows.length === 0 && <p className={classes.noRows}>{props.noRowsMessage || 'Non ci sono elementi'}</p>}
            <table className={classes.grid}>
                <thead>
                    <tr key={-1} className={classes.header}>
                        {props.columns.map((col, colIdx) => <td key={-1+"-"+colIdx} onClick={() => onSortHandler(colIdx)}>{col.name}</td>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIdx) =>
                        <tr key={rowIdx} onClick={() => props.onRowClick(row, rowIdx)}>
                            {props.columns.map((col, colIdx) => <td key={rowIdx+"-"+colIdx}>{row[col.key]}</td>)}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Grid;