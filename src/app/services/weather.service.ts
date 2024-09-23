import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    private apiUrl = 'https://api.openweathermap.org/data/3.0/onecall';
    private apiKey = '10a564d74fb25a8978f603af95e5e89f';

    constructor(private http: HttpClient) {}

    getWeatherForecast(lat: number, lon: number): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${this.apiKey}`
        );
    }
}
