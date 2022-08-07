let txt =
`
<div id="aboutovr" class="overlay"></div>
<div id="aboutmain" class="main flex-col">
    <div id="abh" class="mintitle w100">About</div>
    <div id="abbody" class="flex-col jcc w100">
      <div id="abttext" class="w100">
        A JavaScript based two destination (India & London) clock.<br>
        Current features :<br><span>Analog/Digital clocks, Alarms (max 3), Stopwatch, Timer.</span><br>
        Find source code on my GitHub. Also feel free to report any bugs through mail.
      </div>
      <div id="social" class="flex-row w100 aic">
        <a href="" id="github"><i class="fa-brands fa-github"></i></i></a>
        <a href="mailto: chavanrohan.1105@gmail.com" id="mail"><i class="fa-regular fa-envelope"></i></a>
      </div>
    </div>
    <div id="closeab"><i class="fa-solid fa-xmark"></i>Close</div>
</div>
`
export const _about = {
  eid:'aboutpopup',
  name: 'About',
  matter: txt
}
