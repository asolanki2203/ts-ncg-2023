import { useSearchParams } from "react-router-dom/dist";
import Navbar from "./Navbar";
import { useState } from "react";

const AllViews = () => {

    const [views, addViews] = useState([
        {
            name: 'Table Entry 1',
            country: 'Country 1',
            indicator: 'Indicator 1',
            chartType: 'Chart Type 1',
            dateRange: 'Date Range 1',
            createdTimestamp: 'Timestamp 1'
        },
        {
            name: 'Table Entry 2',
            country: 'Country 2',
            indicator: 'Indicator 2',
            chartType: 'Chart Type 2',
            dateRange: 'Date Range 2',
            createdTimestamp: 'Timestamp 2'
        },
        // Add more objects as needed
    ]);

    return (
        <div className="container">
            <Navbar pageName={"All Views"} />
            <h1>All Views</h1>
            <table className="my-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Indicator</th>
                        <th>Chart Type</th>
                        <th>Date-Range</th>
                        <th>Created Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {views.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.country}</td>
                            <td>{item.indicator}</td>
                            <td>{item.chartType}</td>
                            <td>{item.dateRange}</td>
                            <td>{item.createdTimestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllViews;