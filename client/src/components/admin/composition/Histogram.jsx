import React, {useEffect, useRef, useState} from 'react';
import {Chart} from 'react-chartjs-2';

const Histogram = ({rating, theme}) => {
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartInstance) {
            chartInstance.destroy();
        }

        if (rating.length === 0) {
            return;
        }

        const ctx = chartRef.current.getContext('2d');
        const newChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(rating),
                datasets: [
                    {
                        label: 'Количество устройств к каждому рейтингу',
                        data: Object.values(rating),
                        backgroundColor: `${theme === 'dark' ? 'rgb(13,0,255)' : 'rgba(75, 192, 192, 0.6)'}`,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                options: {
                    maintainAspectRatio: false, // Отключаем поддержку соотношения сторон для сохранения фиксированной высоты
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    color: 'blue', // Задаем цвет текста для оси y
                                },
                            },
                        ],
                        xAxes: [
                            {
                                ticks: {
                                    color: 'red', // Задаем цвет текста для оси x
                                },
                            },
                        ],
                    },
                },
            }});

        setChartInstance(newChartInstance);
    }, [rating]);

    return <canvas ref={chartRef} style={{height: '10px', width: '100%', color: '#000'}}/>;
};

export default Histogram;
