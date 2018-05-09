const buttons = [...document.querySelectorAll(".btn")];
const clockValue = document.querySelector(".clock__value__time");
const STEPS = 1000

buttons.map(btn => btn.addEventListener("click", handlerButton));

clock = new Clock();

function handlerButton(event) {
  switch (event.target.dataset.type) {
    case "clock:start":
      clock.start();
      break;
    case "clock:stop":
      clock.stop();
      break;
    case "clock:reset":
      clock.reset();
      break;
    default:
      [action ,type ] = event.target.dataset.type.split(":");
     
      clock.changeTime(type, action);
  }
}

function Clock(time_init = 25, time_break = 8) {
  let TIME_SESSION = time_init * 60;
  let TIME_BREAK = time_break * 60;
  let time = time_init * 60;
  let id = undefined;
  let next_break = true;
  this.changeTime = function(type, action) {
    switch (type) {
      case "break":
        TIME_BREAK =  action == "left" ? --TIME_BREAK: ++TIME_BREAK;
      break
      case "session":
        TIME_SESSION = action  == "left" ? --TIME_SESSION : ++TIME_SESSION;
    }
  
    this.updateValue()
    this.stop();
    this.reset();
     
  };

  this.start = function() {
     
    if (time > 0) {
      id = setTimeout(() => {
        time--;
        this.updateClock();
        this.start();
      }, STEPS);
    } else {
      time = next_break ? TIME_BREAK : TIME_SESSION;
      next_break = !next_break;
      this.updateTitle();
      this.start();
    }
  };

  this.stop = function() {
    clearTimeout(id);
  };
  this.reset = function() {
    this.stop();
    time = TIME_SESSION;
    this.updateClock();
  };

  function formatTime(literal, ...substitute) {
    string = literal.slice(0, substitute.length);
    let number = x => x.toString().padStart(2, 0);
    return (
      string[0] +
      Math.round(substitute[0]) +
      string[1] +
      number(Math.round(substitute[1]))
    );
  }

 
 

 
     this.updateClock = function() {
    clockValue.innerHTML = formatTime`${time / 60}:${time % 60}`;
  };

  this.updateTitle=function(){
     const  title_break = document.querySelector (".title__break")
     const title_session = document.querySelector (".title__session")
      if (next_break) {
          title_session.classList.add("menu__box-active")
          title_break.classList.remove("menu__box-active")
      }
      else {
        title_break.classList.add("menu__box-active")
        title_session.classList.remove("menu__box-active")
      }
  }

  this.updateValue=function(){
     const value_session = document.querySelector(".value-session")
     const value_break = document.querySelector(".value-break")
     const updateTime = time => formatTime`${time / 60}:${time % 60}`
     value_session.innerHTML = updateTime(TIME_SESSION)
     value_break.innerHTML = updateTime(TIME_BREAK)
  }

  this.updateClock();
  this.updateValue();
}




