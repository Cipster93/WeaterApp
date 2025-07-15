export const getTimeOfDay = (weatherData) => {
    if (!weatherData) return 'day';

    const currentTime = Date.now() / 1000;
    const { sunrise, sunset } = weatherData.sys;

    if (currentTime >= sunrise - 1800 && currentTime <= sunrise + 1800) return 'sunrise';
    if (currentTime >= sunset - 1800 && currentTime <= sunset + 1800) return 'sunset';
    if (currentTime >= sunrise && currentTime <= sunset) return 'day';

    return 'night';
};
