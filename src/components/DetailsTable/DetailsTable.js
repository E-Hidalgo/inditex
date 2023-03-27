import React from 'react'
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';

const DetailsTable = ({ episodes }) => {

    function formatDuration(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60) % 60;
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    const data = React.useMemo(
        () =>
            episodes.map(episode => ({
                title: episode,
                releaseDate: episode.releaseDate,
                trackTimeMillis: episode.trackTimeMillis
            })),
        [episodes]
    );


    const columns = React.useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'title',
                Cell: ({ value }) => {
                    return (
                        <Link to={`/podcast/${value.collectionId}/episode/${value.trackId}`} className='podcast__view__title'>{value.trackName}</Link>
                    )

                }
            },
            {
                Header: 'Date',
                accessor: 'releaseDate',
                Cell: ({ value }) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("en-GB")
                }
            },
            {
                Header: 'Duration',
                accessor: 'trackTimeMillis',
                Cell: ({ value }) => (
                    formatDuration(value)
                )
            }
        ],
        []
    );

    const tableInstance = useTable({ columns, data });

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
                            <tr {...row.getRowProps()} className={index % 2 === 0 ? "odd-row" : ""}>
                                {
                                    row.cells.map((cell, index) => (
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

export default DetailsTable