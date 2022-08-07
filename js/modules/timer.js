let txt =
`
<div id="timerovr" class="overlay"></div>
<div id="timerswitch" class="switch flex-row jcc aic">Timer</div>
<div id="timermain" class="main flex-col aic">
  <div class="theader flex-row jcsb aic w100">
    <div id="tmh" class="mintitle">Timer</div>
    <div id="mintm" class="minopt"></div>
  </div>
  <div id="tmbody" class="flex-col jcc aic w100">
    <div class="plus changers flex-row jcc aic">
      <i class="fa-solid fa-caret-up"></i>
      <i class="fa-solid fa-caret-up"></i>
    </div>
    <div class="setter flex-row jcc aic">
      <div id="sethhtm" class="nums">00</div>
      <div id="setmmtm" class="nums">00</div>
      <div id="setsstm" class="nums">00</div>
    </div>
    <div class="minus changers flex-row jcc aic">
      <i class="fa-solid fa-caret-down"></i>
      <i class="fa-solid fa-caret-down"></i>
    </div>
    <div class="buttons flex-row aic jcc w100">
      <div id="playtm" class="pri btn flex-row jcc aic"><i class="fa-solid fa-play"></i></div>
      <div id="canceltm" class="sec btn flex-row jcc aic"><i class="fa-solid fa-xmark"></i></div>
      <div id="pausetm" class="pri hidden btn flex-row jcc aic"><i class="fa-solid fa-pause"></i></div>
      <div id="resettm" class="sec hidden btn flex-row jcc aic"><i class="fa-solid fa-clock-rotate-left"></i></div>
    </div>
  </div>
  <div id="warntimer">Add a timer.</div>
</div>
`
export const _timer = {
  eid:'timerpopup',
  name: 'Timer',
  matter: txt
}
