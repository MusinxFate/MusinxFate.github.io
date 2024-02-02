$(document).ready(function () {
    var app = new Vue({
        el: '#app',
        data: {
            lstTemperatures: [],
            useFahrenheit: false,
            userTemperature: {}
        },
        mounted: function () {
            this.requestWeather();
            this.findGeo();
        },
        methods: {
            requestWeather: function () {
                $.get("http://177.70.248.43:3002/WeatherForecast", (data, status) => {
                    this.lstTemperatures = data;
                });
            },
            findGeo: function () {
                const successCallback = (position) => {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    $.get(`http://177.70.248.43:3002/LocalWeather?latitude=${latitude}&longitude=${longitude}`, (data, status) => {
                        let x = data;
                        $.get(`http://177.70.248.43:3002/LocalWeatherInfos?country=${x}`, (data, status) => {
                            let newTemperature = { date: data.last_updated, temperatureC: data.feelslike_c, temperatureF: data.feelslike_f, summary: data.condition.text, userLocation: x }
                            this.userTemperature = newTemperature;
                        });
                    });
                };

                const errorCallback = (error) => {
                    console.log(error);
                };

                navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            },
            changeTemperature: function () {
                this.useFahrenheit = !this.useFahrenheit;
            }
        }
    });
});