document.addEventListener('DOMContentLoaded', function () {
    swiper = new Swiper('.swiper', {
        speed: 400,
        slidesPerView: 3,
        breakpoints: {
            0: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            750: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            1000: {
                slidesPerView: 4,
                spaceBetween: 40
            },
            1600: {
                slidesPerView: 5,
                spaceBetween: 50
            }
          }
    });
});

const app = Vue.createApp({
    data() {
        return {
            lstTemperatures: [],
            useFahrenheit: false,
            userTemperature: {},
            userLocation: '',
            useSearch: false,
            imgUrl: '',
            isNight: false,
            logoUrl: ''
        }
    },

    methods: {
        requestWeather: function () {
            fetch('https://musinx.duckdns.org:3002/WeatherForecast').then(response =>
                response.text()).then(data => {
                    data = JSON.parse(data);
                    data.forEach(a => {
                        const parsedDate = new Date(a.date);
                        a.date = parsedDate.toLocaleDateString('en-US', { weekday: 'long' });
                    });
                    this.userTemperature = data[0];
                    this.imgUrl = data[0].imgUrl;
                    data.shift();
                    this.lstTemperatures = data;
                });
        },
        findGeo: function () {
            fetch('https://musinx.duckdns.org:3002/LocalWeather').then(response => response.text()).then(data => {
                this.userLocation = data;
                console.log(data);
            });
        },
        changeTemperature: function () {
            this.useFahrenheit = !this.useFahrenheit;
        },
        changeSearch: function () {
            this.useSearch = this.useSearch === false ? true : false;
        },
        checkTimeDay: function() {
            let date = new Date();
            if (date.getHours() < 5 || date.getHours() > 18) {
                this.imgUrl = 'assets/sky assets/clear-night.png';
                this.isNight = true;
                this.logoUrl = 'assets/logon.png';
                let backgroundimg = document.getElementById('clouds');
                backgroundimg.classList.add('body-mask-night');
                document.body.classList.add('body-night');
            } else{
                this.imgUrl = '/assets/sunny.png';
                this.isNight = false;
                this.logoUrl = 'assets/logo.png';
            }
        }
    },

    beforeMount() {
        this.checkTimeDay();
        this.requestWeather();
        this.findGeo();
    }
})

app.mount('#app');