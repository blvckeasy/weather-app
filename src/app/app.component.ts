import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, WeatherChartComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'weather-app';
}
