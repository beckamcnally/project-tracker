let date = $('#date')
let myModal = $('#myModal')

function displayDate() {
  let currentDate = dayjs().format('MMM DD, YYYY hh:mm:ss a')
  date.text(currentDate)
}
displayDate()
setInterval(displayDate, 1000)

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})