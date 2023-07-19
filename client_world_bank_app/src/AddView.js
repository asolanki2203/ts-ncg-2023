import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AddView = () => {
    const [countryList, setCountryList] = useState([{ name: "India", id: 1 }]);
    const [indicatorList, setIndicatorList] = useState([{ name: "Poverty", id: 1 }]);
    const [countryName, setCountryName] = useState('');
    const [indicator, setIndicator] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [newData, setNewData] = useState(false);
    const [valuesPlot, setValuesPlot] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`https://api.worldbank.org/v2/country/all/indicator/${indicator}?date=${startDate}:${endDate}`)
            .then((res) => res.text()
                .then(data => {
                    const parser = new DOMParser();

                    // Parse the XML string
                    const xmlDoc = parser.parseFromString(data, 'application/xml');
                    const rootElement = xmlDoc.documentElement;
                    console.log(rootElement);
                    let i = 0;
                    const values = Array.from(rootElement.querySelectorAll('data')).map((itemNode) => {
                        i++;
                        const name = itemNode.querySelector('value').textContent;
                        const cnty = itemNode.querySelector('country').textContent;
                        return { value: name, id: i , country: cnty};
                    });
                    setValuesPlot(values);
                    setNewData(true);
                    console.log(values);
                })
            )
    };

    useEffect(() => {
        const countries_all = [];
        for (let i = 0; i < 6; i++) {
            fetch(`http://api.worldbank.org/v2/country?page=${i + 1}`)
                .then((res) => res.text()
                    .then((data) => {
                        const parser = new DOMParser();

                        // Parse the XML string
                        const xmlDoc = parser.parseFromString(data, 'application/xml');
                        const rootElement = xmlDoc.documentElement;
                        // console.log(rootElement);

                        const countries = Array.from(rootElement.querySelectorAll('country')).map((itemNode) => {
                            const name = itemNode.querySelector('name').textContent;
                            const id = itemNode.getAttribute('iso2Code');
                            return { name, id };
                        });
                        // console.log(countries);
                        countries_all.push(...countries);
                    })
                )
        }
        setCountryList(countries_all);
    }, []);

    useEffect(() => {
        const indicators_all = [];
        for (let i = 0; i < 4; i++) {
            fetch(`http://api.worldbank.org/v2/indicator?page=${i + 1}`)
                .then((res) => res.text()
                    .then((data) => {
                        const parser = new DOMParser();

                        // Parse the XML string
                        const xmlDoc = parser.parseFromString(data, 'application/xml');
                        const rootElement = xmlDoc.documentElement;
                        // console.log(rootElement);

                        const indicators = Array.from(rootElement.querySelectorAll('indicator')).map((itemNode) => {
                            const name = itemNode.querySelector('name').textContent;
                            const id = itemNode.getAttribute('id');
                            return { name, id };
                        });
                        // console.log(indicators);
                        indicators_all.push(...indicators);
                    })
                )
        }
        setIndicatorList(indicators_all);
        // console.log(indicators_all);
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
                            required
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
                            required
                            type="text"
                            value={indicator}
                            onChange={(e) => setIndicator(e.target.value)}
                            list="indicators"
                        />
                        <datalist id="indicators">
                            {indicatorList.map((c) => (
                                <option key={c.id} value={c.id} />
                            ))}
                        </datalist>
                    </label>

                    <label className="form-label">
                        <p>Year Range</p>
                        <input
                            className="form-input"
                            required
                            type="text"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            className="form-input"
                            required
                            type="text"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>

                    <button className="form-button" type="submit">Submit</button>
                </form>
            </div>
            {newData && <div className="new_data">
                <p className="value">Got required data for various countries</p>
                <BarChart
                    width={1000}
                    height={500}
                    data={valuesPlot}
                // margin={{
                //     top: 5,
                //     right: 30,
                //     left: 20,
                //     bottom: 5,
                // }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </div>}
        </div>
    );
}

export default AddView;