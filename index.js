// Your code here

function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
   
}
 
function createEmployeeRecords(employeeData) {
    return employeeData.map((row) => {
        return createEmployeeRecord(row)
    })
}
 
function createTimeInEvent(employee, dateIn) {
    let [date, hour] = dateIn.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date,
    })
    return employee
}
 
function createTimeOutEvent(employee, dateOut) {
    let [date, hour] = dateOut.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date,
    })
    return employee
}
 
function hoursWorkedOnDate(employee, dateForEmp) {
    let inEvent = employee.timeInEvents.find((e) => {
        return e.date === dateForEmp
    })
 
    let outEvent = employee.timeOutEvents.find((e) => {
        return e.date === dateForEmp
    })
 
    return (outEvent.hour - inEvent.hour) / 100
}
 
function wagesEarnedOnDate(employee, dateForEmp) {
    let wage = hoursWorkedOnDate(employee, dateForEmp)
        * employee.payPerHour
    return parseFloat(wage.toString())
 
}
 
function allWagesFor(employee) {
    let dateArr = [];
    for (const punchOut of employee.timeOutEvents) {
      dateArr.push(punchOut["date"]);
    }
    let tote = 0;
    for (const date of dateArr) {
      tote += wagesEarnedOnDate(employee, date);
    }
    return tote;
  }
 
 
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((rec) => {
        return rec.firstName === firstName
    })
}
 
function calculatePayroll(array) {
    let payroll = 0;
    for (const emp of array) {
      payroll += allWagesFor(emp);
    }
    return payroll;
  }
