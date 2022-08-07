let txt =
`
<div id="settingsovr" class="overlay"></div>
<div id="settingsmain" class="main flex-col aic">
    <div id="sgh" class="mintitle w100">Settings</div>
    <div id="sgbody" class="flex-col jcc w100">
      <div id="clocktype" class="flex-col jcc w100">
        <div id="cth" class="mintitle">Clock Type -</div>
        <div id="ctv" class="value"></div>
      </div>
      <div id="accent1" class="flex-col jcc w100">
        <div id="a1ch" class="mintitle">IST clock color (HEX) -</div>
        <div class="cval flex-row aic">#-<input id="a1cv" class="value" value="" maxlength="6"></div>
      </div>
      <div id="accent2" class="flex-col jcc w100">
        <div id="a2ch" class="mintitle">GMT+1 clock color (HEX) -</div>
        <div class="cval flex-row aic">#-<input id="a2cv" class="value" value="" maxlength="6"></div>
      </div>
      <div class="buttons flex-col">
        <div id="savesg"><i class="fa-solid fa-check"></i>Save</div>
        <div id="resetsg"><i class="fa-solid fa-rotate-left"></i>Reset colours</div>
        <div id="closesg"><i class="fa-solid fa-xmark"></i>Close</div>
      </div>
    </div>
    <div id="warnsetclr">Please add a valid colour.</div>
</div>
`
export const _settings = {
  eid:'settingspopup',
  name: 'Settings',
  matter: txt
}
