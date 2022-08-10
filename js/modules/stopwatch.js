let txt =
`
<div id="stopwatchovr" class="overlay"></div>
<div id="stopwatchswitch" class="switch flex-row jcc aic">Stopwatch</div>
<div id="stopwatchmain" class="main flex-col aic">
  <div class="theader flex-row jcsb aic w100">
    <div id="swh" class="mintitle">Stopwatch</div>
    <div id="minsw" class="minopt"></div>
  </div>
  <div id="swbody" class="flex-col jcc aic w100">
    <div id="stopwatchNum" class="flex-row jcc aic">
      <div id="swhh" class="nums">00</div>
      <div id="swmm" class="nums">00</div>
      <div id="swss" class="nums">00</div>
      <div id="swms" class="nums">000</div>
    </div>
    <div class="buttons flex-row aic jcc w100">
      <div id="playsw" class="pri btn flex-row jcc aic"><i class="fa-solid fa-play"></i></div>
      <div id="resetsw" class="sec btn flex-row jcc aic"><i class="fa-solid fa-rotate-left"></i></div>
      <div id="cancelsw" class="sec btn flex-row jcc aic"><i class="fa-solid fa-xmark"></i></div>
      <div id="pausesw" class="pri hidden btn flex-row jcc aic"><i class="fa-solid fa-pause"></i></div>
      <div id="lapsw" class="sec hidden btn flex-row jcc aic"><i class="fa-solid fa-circle-notch"></i></i></div>
    </div>
    <div id="lapspar" class="flex-col aic w100">
      <div id="o1" class="scrollovr"></div>
      <div id="o2" class="scrollovr"></div>
      <div id="laps"></div>
    </div>
  </div>
</div>
<div id="minlapswarn">Maximize to view laps.</div>
`

export const _stopwatch = {
  eid:'stopwatchpopup',
  name: 'Stopwatch',
  matter: txt
}
