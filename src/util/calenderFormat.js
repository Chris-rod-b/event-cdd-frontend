export default function calenderFormat(date) {
    let splitTime = date.split("T");

    let splitDate = splitTime[0].split("-");

    return splitDate[0] + "-" + splitDate[1] + "-" + splitDate[2]
}
