import {_navbar} from "./modules/navbar.js"
import {_analogClock} from "./modules/analog-clocks.js"
import {_digitalClock} from "./modules/digital-clocks.js"
import {_alarms} from "./modules/alarms.js"
import {_stopwatch} from "./modules/stopwatch.js"
import {_timer} from "./modules/timer.js"
import {_settings} from "./modules/settings.js"
import {_about} from "./modules/about.js"

// Default component class
let errorStat = [];
class Component{
  constructor(elementid,elementname,matter){
    try {
      this.elementid = elementid;
      this.elementname = elementname;
      this.element = document.getElementById(elementid);
      this.element.innerHTML=matter;
      this.status = 1;
      console.log(`${this.elementname} #${this.element.id} - intitalization status: ${this.status}`);
      errorStat.push(1);
    } catch (e) {
      this.error = document.getElementById('errorbox');
      this.error.style.padding = '5px 10px';
      this.error.innerHTML += `Component with given id not found : ${elementid}<br>`;
      this.status = -1;
      console.log(`${elementname} #${elementid} - intitalization status: ${this.status}`);
      errorStat.push(-1);
    }
  }
  hideme(){this.element.classList.add('hidden');}
  hideme2(){this.element.classList.add('hidden2');}
  showme(){this.element.classList.remove('hidden');}
  showme2(){this.element.classList.remove('hidden2');}
}

// Initializing components
const Navigation = new Component(_navbar.eid,_navbar.name,_navbar.matter);
const AnalogClock = new Component(_analogClock.eid,_analogClock.name,_analogClock.matter);
const DigitalClock = new Component(_digitalClock.eid,_digitalClock.name,_digitalClock.matter);
const Alarms = new Component(_alarms.eid,_alarms.name,_alarms.matter);
const Stopwatch = new Component(_stopwatch.eid,_stopwatch.name,_stopwatch.matter);
const Timer = new Component(_timer.eid,_timer.name,_timer.matter);
const Settings = new Component(_settings.eid,_settings.name,_settings.matter);
const About = new Component(_about.eid,_about.name,_about.matter);

export {Navigation, AnalogClock, DigitalClock, Alarms, Stopwatch, Timer, Settings, About, errorStat}
