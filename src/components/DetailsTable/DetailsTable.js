// Import required libraries
import React from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';

// Create a functional component called DetailsTable that takes episodes as its props
const DetailsTable = ({ episodes }) => {

    // Define a function to format duration in the format hh:mm:ss
    function formatDuration(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60) % 60;
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Create a memoized array of objects with title, release date and track duration
    const data = React.useMemo(
        () =>
            episodes.map(episode => ({
                title: episode,
                releaseDate: episode.releaseDate,
                trackTimeMillis: episode.trackTimeMillis
            })),
        [episodes]
    );

    // Create a memoized array of column objects with Header, accessor and Cell for each column
    const columns = React.useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'title',
                Cell: ({ value }) => {
                    return (
                        // Use Link to make the title clickable and redirect to a specific URL
                        <Link to={`/podcast/${value.collectionId}/episode/${value.trackId}`} className='podcast__view__title'>{value.trackName}</Link>
                    )

                }
            },
            {
                Header: 'Date',
                accessor: 'releaseDate',
                Cell: ({ value }) => {
                    // Convert the release date to a localized string format
                    const date = new Date(value)
                    return date.toLocaleDateString("en-GB")
                }
            },
            {
                Header: 'Duration',
                accessor: 'trackTimeMillis',
                Cell: ({ value }) => (
                    // Format the track duration in the desired format
                    formatDuration(value)
                )
            }
        ],
        []
    );

    // Create a table instance with the memoized columns and data arrays
    const tableInstance = useTable({ columns, data });

    // Return the table with the headers and data
    return (
        <div className='podcast__view__table__container'>
            <table {...tableInstance.getTableProps()} className={"podcast__view__table"}>
                <thead>
                    {tableInstance.headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...tableInstance.getTableBodyProps()}>
                    {tableInstance.rows.map((row, index) => {
                        tableInstance.prepareRow(row);
                        return (
                            // Add an even-odd class to rows to distinguish them
                            <tr {...row.getRowProps()} className={index % 2 === 0 ? "odd-row" : ""}>
                                {
                                    row.cells.map((cell, index) => (
                                        // Render each cell
                                        <td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))
                                }
                            </tr>
                        );
                    })}
                </tbody>
            </table >
        </div>
    )
}

export default DetailsTable;
