export default function secondsToTime(seconds: number, full = false): string {
    const time = new Date(seconds * 1000).toISOString().substr(11, 8);
    return full ? time : time.replace(/^(00:){2}|^(00:){1}/, '');
}
