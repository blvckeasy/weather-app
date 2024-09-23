import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Chart } from 'chart.js/auto';
import dateformat from 'dateformat';

@Component({
    selector: 'app-weather-chart',
    standalone: true,
    templateUrl: './weather-chart.component.html',
    styleUrls: ['./weather-chart.component.css'],
})
export class WeatherChartComponent implements OnInit {
    chart: any;
    location: Array<number> = [41.2995, 69.2401]

    constructor(private weatherService: WeatherService) {}

    ngOnInit() {
        const [lat, lon] = this.location;

        this.weatherService
            .getWeatherForecast(lat, lon)
            .subscribe((data) => {
                this.createChart(data.daily);
            });
    }

    createChart(dailyData: any) {
        const labels = dailyData.map((day: any) => {
            const date = new Date(day.dt * 1000)
            const formattedDate = dateformat(date, "dd-mmmm")

            return formattedDate;
        });
        const temperatures = dailyData.map((day: any) => {
            const temp = day.temp.day
            return temp;
        });
        const precipitation = dailyData.map((day: any) => {
            const pre = day.pop * 100
            return pre;
        });

        this.chart = new Chart('canvas', {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Temperature (C)',
                        data: temperatures,
                        borderColor: 'red',
                        tension: 0.2,
                    },
                    {
                        label: 'Precipitation (%)',
                        data: precipitation,
                        borderColor: 'blue',
                        tension: 0.2,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
}
