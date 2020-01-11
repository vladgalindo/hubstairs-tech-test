import React, {Fragment, useState, useRef, useEffect} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import CSVReader from 'react-csv-reader'

const __safeCsvData = (data, labels)  => {
    if (!Array.isArray(data)) {
        throw new TypeError(`the data must an Array, received value: ${JSON.stringify(data)}`)
    }

    return data.reduce((series, currentRow, index) => {
        if(currentRow.length !== 4) {
            if (index === data.length - 1) {
                return series;
            }
            throw new Error(`Each row must have 4 columns , received value: ${JSON.stringify(currentRow)} at index: ${index}`)
        }

        if (index === 0) {
            return {
                [labels[0]]: [],
                [labels[1]]: [],
                [labels[2]]: [],
                categories: []
            }
        } else {
            return {
                [labels[0]]: [...series[labels[0]], {name: currentRow[0], y: parseInt(currentRow[1])}],
                [labels[1]]: [...series[labels[1]], {name: currentRow[0], y: parseInt(currentRow[2])}],
                [labels[2]]: [...series[labels[2]], {name: currentRow[0], y: parseInt(currentRow[3])}],
                categories: [...series.categories, currentRow[0]]
            }
        }
    }, {});
};

const DEFAULT_CHART_OPTIONS = {
    title: {
        text: 'Financial Data'
    }
};

const useChartOptions = storageKey => {
    const [chartOptions, setChartOptions] = useState(JSON.parse(localStorage.getItem(storageKey)) || DEFAULT_CHART_OPTIONS);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(chartOptions));
    }, [chartOptions]);

    return [chartOptions, setChartOptions];
};

export const Graph = () => {

    const loadCsvForm = useRef();

    const [chartOptions, setChartOptions] = useChartOptions('chartOptions');

    const LoadChartData = (data) => {
        if(data[0].length !== 4) {
            throw new Error(`The first row must have 4 columns , received value: ${JSON.stringify(data[0])}`)
        }

        const seriesLabel1 = data[0][1];
        const seriesLabel2 = data[0][2];
        const seriesLabel3 = data[0][3];

        const formatedSeries = __safeCsvData(data, [seriesLabel1, seriesLabel2, seriesLabel3]);

        const safeSeries = [
            {
                name: seriesLabel1,
                data: formatedSeries[seriesLabel1]
            },
            {
                name: seriesLabel2,
                data: formatedSeries[seriesLabel2]
            },
            {
                name: seriesLabel3,
                data: formatedSeries[seriesLabel3]
            },
        ];

        setChartOptions((prevState) => {
            return {
                ...prevState,
                xAxis: {
                    categories: formatedSeries.categories
                },
                series: safeSeries
            }
        })
    };

    return (
        <Fragment>
            <h1 className="title">Graph</h1>
            <div className="columns">
                <div className="column is-3">
                    Load an csv file to render the Chart...
                    <section>
                        <form ref={loadCsvForm}>
                            <CSVReader
                                onFileLoaded={data => LoadChartData(data)} />
                        </form>
                    </section>
                </div>
                <div className="column is-8">
                    <section id={'playlist'}>
                        { chartOptions.series && <HighchartsReact
                            highcharts={Highcharts}
                            options={chartOptions}
                        />}
                    </section>
                </div>
            </div>
        </Fragment>
    )
};
