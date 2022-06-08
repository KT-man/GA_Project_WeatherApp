setInterval(myClock, 1000);

function myClock() {
  let timeNow = new Date();
  console.log(timeNow);

  timeNow.toISOString().split("T")[0];

  let hours = timeNow.getHours();
  let min = timeNow.getMinutes();
  let second = timeNow.getSeconds();
  console.log(`${hours}:${min}:${second}`);
}

myClock();
