export const getWeatherIcon = (condition) => {
    const baseUrl = "https://www.amcharts.com/lib/images/weather/animated/";
    switch (condition?.toLowerCase()) {
        case "clear": return `${baseUrl}day.svg`;
        case "clouds": return `${baseUrl}cloudy.svg`;
        case "rain": return `${baseUrl}rainy-1.svg`;
        case "drizzle": return `${baseUrl}rainy-2.svg`;
        case "thunderstorm": return `${baseUrl}thunder.svg`;
        case "snow": return `${baseUrl}snowy-1.svg`;
        case "mist":
        case "fog": return `${baseUrl}cloudy.svg`;
        default: return `${baseUrl}day.svg`;
    }
};
