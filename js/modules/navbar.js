
let txt =
`
<div id="navmenu" class="flex-row jcsa aic w100">

  <div id="alarm" class="flex-row jcc aic option w100">
    <span id="alarm-txt" class="opt-txt">Alarms</span>
    <i id="alarm-ico" class="icon fa-solid fa-bell"></i>
  </div>
  <div id="stopwatch" class="flex-row jcc aic option w100">
    <span id="stopwatch-txt" class="opt-txt">Stopwatch</span>
    <i id="stopwatch-ico" class="icon fa-solid fa-stopwatch"></i>
  </div>
  <div id="timer" class="flex-row jcc aic option w100">
    <span id="timer-txt" class="opt-txt">Timer</span>
    <i id="timer-ico" class="icon fa-solid fa-hourglass-empty"></i>
  </div>
  <div id="settings" class="flex-row jcc aic option w100">
    <span id="settings-txt" class="opt-txt">Settings</span>
    <i id="settings-ico" class="icon fa-solid fa-gear"></i>
  </div>
  <div id="about" class="flex-row jcc aic option w100">
    <span id="about-txt" class="opt-txt">About</span>
    <i id="about-ico" class="icon fa-solid fa-circle-question"></i>
  </div>

  <div id="menubtn" class="flex-col jcc aic">
    <i class="fa-solid fa-ellipsis-vertical"></i>
  </div>

</div>
`

export const _navbar = {
  eid:'navbar',
  name: 'Navigation',
  matter: txt
}
