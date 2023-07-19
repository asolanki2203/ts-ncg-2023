import { root } from "postcss";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const AddView = () => {
    const [countryList, setCountryList] = useState([{ name: "India", id: 1 }]);
    const [countryName, setCountryName] = useState('');
    const [indicator, setIndicator] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        // You can access the input values via countryName, indicator, startDate, and endDate states
        console.log('Submitted:', countryName, indicator, startDate, endDate);
    };

    useEffect(() => {
        fetch('http://api.worldbank.org/v2/country')
            .then((res) => res.text()
                .then((data) => {
                const parser = new DOMParser();

                // Parse the XML string
                const xmlDoc = parser.parseFromString(data, 'application/xml');
                const rootElement = xmlDoc.documentElement;
                console.log(rootElement);
                
                const countries = Array.from(rootElement.querySelectorAll('country')).map((itemNode) => {
                    const name = itemNode.querySelector('name').textContent;
                    return {name};
                });
                setCountryList(countries);
                })
            )
    }, []);

    return (
        <div className="container">
            <Navbar pageName={"Add View"} />
            <div className="submit-form">
                <form className="my-form" onSubmit={handleSubmit}>
                    <label className="form-label">
                        <p>Country Name</p>
                        <input
                            className="form-input"
                            type="text"
                            value={countryName}
                            onChange={(e) => { setCountryName(e.target.value) }}
                            list="countries"
                        />
                        <datalist id="countries">
                            {countryList.map((c) => (
                                <option key={c.id} value={c.name} />
                            ))}
                        </datalist>
                    </label>

                    <label className="form-label">
                        <p>Indicator</p>
                        <input
                            className="form-input"
                            type="text"
                            value={indicator}
                            onChange={(e) => setIndicator(e.target.value)}
                        />
                    </label>

                    <label className="form-label">
                        <p>Date Range</p>
                        <input
                            className="form-input"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            className="form-input"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>

                    <button className="form-button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddView;

