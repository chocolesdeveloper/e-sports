//1080 -> 18:00

export function convertMinutesToHourString(minutesmount: number) {
    const hours = Math.floor(minutesmount / 60);
    const minutes = minutesmount % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}