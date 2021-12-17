function createEmployeeRecord(arrayOfEmployeeData) {
    return {
      firstName: arrayOfEmployeeData[0],
      familyName: arrayOfEmployeeData[1],
      title: arrayOfEmployeeData[2],
      payPerHour: arrayOfEmployeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  };
  
  function createEmployeeRecords(arrayOfArrays) {
    const arrayOfObjects = [];
    for (let record of arrayOfArrays) {
      let newRecord = createEmployeeRecord(record);
      arrayOfObjects.push(newRecord);
    };
    return arrayOfObjects;
  };
  
  function createTimeInEvent(dateStamp) {
    const date = dateStamp.split(" ")[0];
    const time = dateStamp.split(" ")[1];
    const timeInEntry = {
      type: "TimeIn",
      hour: parseInt(time),
      date: date
    }
    this.timeInEvents.push(timeInEntry);
    return this;
  }
  
  function createTimeOutEvent(dateStamp) {
    const date = dateStamp.split(" ")[0];
    const time = dateStamp.split(" ")[1];
    const timeOutEntry = {
      type: "TimeOut",
      hour: parseInt(time),
      date: date
    }
    this.timeOutEvents.push(timeOutEntry);
    return this;
  }
  
  function hoursWorkedOnDate(date = "all") {
    function sumTimeCardTimes(arrayOfTimePunches, date) {
      const arrayOfTimes = [];
      const reducer = (prevValue, currValue) => prevValue + currValue;
  
      for (let punch of arrayOfTimePunches) {
        if (date = "all") {
          arrayOfTimes.push(punch.hour)
        } else {
        ( punch.date === date ? arrayOfTimes.push(punch.hour) : null );
        }
      }
      const sumOfTimes = arrayOfTimes.reduce(reducer);
      return sumOfTimes;
    }
  
    // (Sum of all time out hours) - (Sum of all time in hours) = hours worked
    const sumOfTimeIn = sumTimeCardTimes(this.timeInEvents, date)
    const sumOfTimeOut = sumTimeCardTimes(this.timeOutEvents, date)
    return (sumOfTimeOut - sumOfTimeIn)/100;
  }
  
  function wagesEarnedOnDate(date = "all") {
    return this.payPerHour * hoursWorkedOnDate.call(this, date);
  }
  
  function allWagesFor() {
    return wagesEarnedOnDate.call(this);
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName )
  }
  
  function calculatePayroll(arrayOfEmployeeRecords) {
    let sum = 0;
    for (let currEmployee of arrayOfEmployeeRecords) {
      sum += allWagesFor.call(currEmployee);
    }
    return sum;
  }
  
  
  /*
   We're giving you this function. Take a look at it, you might see some usage
   that's new and different. That's because we're avoiding a well-known, but
   sneaky bug that we'll cover in the next few lessons!
   As a result, the lessons for this function will pass *and* it will be available
   for you to use if you need it!
   */
  
  // const allWagesFor = function () {
  //     const eligibleDates = this.timeInEvents.map(function (e) {
  //         return e.date
  //     })
  //
  //     const payable = eligibleDates.reduce(function (memo, d) {
  //         return memo + wagesEarnedOnDate.call(this, d)
  //     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
  //
  //     return payable
  // }

