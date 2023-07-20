export default function formatter(date) {
   let splitTime = date.split("T");

   let splitDate = splitTime[0].split("-");

   return splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0]

}
