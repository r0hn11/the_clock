let txt =
`
<div id="alarmovr" class="overlay"></div>
<div id="alarmmain" class="main flex-col aic">
  <div class="ct flex-col w100">
    <div id="cth" class="mintitle">Current time:</div>
    <div id="ctime" class="flex-row aic">
      <div id="chh" class="nums">00</div>:
      <div id="cmm" class="nums">00</div>
    </div>
  </div>
  <div class="upalarms flex-col w100">
    <div id="upah" class="mintitle">Upcoming alarms:</div>
    <div id="alarmlist">

      <div id="noAlarm">--</div>

      <div id="alarm1" class="alarmspan flex-row aic">
        <div class="altoggle flex-row aic"><span class="blob"></span></div>
        <div class="altime nums"></div>
        <i class="fa-solid fa-ban deleteal"></i>
      </div>
      <div id="alarm2" class="alarmspan flex-row aic">
        <div class="altoggle flex-row aic"><span class="blob"></span></div>
        <div class="altime nums"></div>
        <i class="fa-solid fa-ban deleteal"></i>
      </div>
      <div id="alarm3" class="alarmspan flex-row aic">
        <div class="altoggle flex-row aic"><span class="blob"></span></div>
        <div class="altime nums"></div>
        <i class="fa-solid fa-ban deleteal"></i>
      </div>

    </div>
  </div>
  <div class="setalarm flex-col w100">
    <div id="seth" class="mintitle">Set alarm:</div>
    <div class="plus changers flex-row jcc aic">
      <i class="fa-solid fa-caret-up"></i>
      <i class="fa-solid fa-caret-up"></i>
    </div>
    <div class="setter flex-row jcc aic">
      <div id="sethh" class="nums">00</div>:
      <div id="setmm" class="nums">00</div>
    </div>
    <div class="minus changers flex-row jcc aic">
      <i class="fa-solid fa-caret-down"></i>
      <i class="fa-solid fa-caret-down"></i>
    </div>
  </div>
  <div class="buttons flex-row jcc aic">
    <div id="setbtn" class="pri btn flex-row jcc aic"><i class="fa-solid fa-check"></i></div>
    <div id="cancelbtn" class="sec btn flex-row jcc aic"><i class="fa-solid fa-xmark"></i></div>
  </div>
  <div id="limitbox"></div>
</div>
`

export const _alarms = {
  eid:'alarmpopup',
  name: 'Alarms',
  matter: txt
}
