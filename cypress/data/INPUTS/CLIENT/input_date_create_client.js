
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

const getCurrentDate = () => {
  var today  = new Date();
  var localeToday = today.toLocaleDateString("en-US", options).split(' ')
  var currentDate = localeToday[2].replace(',','') + " " + localeToday[1] + " " + localeToday[3]   
  return currentDate
}
 
var beforeDate = "01 January 2022"
var currentDate = getCurrentDate()
var afterDate = "01 January 2150"

export var inputs_date = [
    {date: new Date(beforeDate), testname:"Create Client Birthday Before Current Date", input_date: beforeDate},
    {date: new Date(), testname:"Create Client Birthday On Current Date", input_date:currentDate},
    {date: new Date(afterDate), testname:"Create Client Birthday After Current Date", input_date: afterDate}
  ]