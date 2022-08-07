import {Navigation, AnalogClock, DigitalClock, Alarms, Stopwatch, Timer, Settings, About, errorStat} from "./index.js";

if(!errorStat.includes(-1)){

  const music = {
    spiritedAway: new Audio('../audio/spiritedAway.mp3'),
    alarm: new Audio('../audio/alarm2.mp3')
  }

  const istobj = {
    analog : {
      hh : document.querySelector('#ist .hourhand'),
      mm : document.querySelector('#ist .minutehand'),
      ss : document.querySelector('#ist .secondhand'),
    },
    digital : {
      hh : document.querySelector('#isthh'),
      mm : document.querySelector('#istmm')
    }
  }

  const lnobj = {
    analog : {
      hh : document.querySelector('#ln .hourhand'),
      mm : document.querySelector('#ln .minutehand'),
      ss : document.querySelector('#ln .secondhand'),
    },
    digital : {
      hh : document.querySelector('#lnhh'),
      mm : document.querySelector('#lnmm')
    }
  }

  const alarmobj = {
    par : document.getElementById('alarmpopup'),
    ring:function(hh,mm,n){
      Alarms.hideme();
      Settings.hideme();
      About.hideme();
      Navigation.showme2();
      if(!timerobj.par.classList.contains('minimized')) Timer.hideme();
      else Timer.showme();
      if(!stopwatchobj.par.classList.contains('minimized')) Stopwatch.hideme();
      else Stopwatch.showme();
      closemenu();
      let ringpopup = document.getElementById('alarmRing');
      let ringmsg = document.querySelector('#alarmRing span');
      let ringclose = document.querySelector('#alarmRing i');
      music.alarm.play();
      ringmsg.innerHTML = `${hh}:${mm}`;
      ringpopup.style.transform = 'translateY(0)';
      setTimeout(()=>{
        music.alarm.pause();
        music.alarm.currentTime = 0;
        ringmsg.innerHTML = `-`;
        ringpopup.style.transform = 'translateY(-100%)';
        if(n==1){
          localStorage.setItem('alarm1stat','0');
          this.upcomingAlarms.buttons.b1.classList.remove('toggle-on');
        }
        else if(n==2){
          localStorage.setItem('alarm2stat','0');
          this.upcomingAlarms.buttons.b2.classList.remove('toggle-on');
        }
        else if(n==3){
          localStorage.setItem('alarm3stat','0');
          this.upcomingAlarms.buttons.b3.classList.remove('toggle-on');
        }
      },180000)
      ringclose.onclick = ()=>{
        music.alarm.pause();
        music.alarm.currentTime = 0;
        ringmsg.innerHTML = `-`;
        ringpopup.style.transform = 'translateY(-100%)';
        if(n==1) localStorage.setItem('alarm1stat','0');
        else if(n==2) localStorage.setItem('alarm2stat','0');
        else if(n==3) localStorage.setItem('alarm3stat','0');
      }
    },
    stopring:function(){
      let ringpopup = document.getElementById('alarmRing');
      let ringmsg = document.querySelector('#alarmRing span');
      music.alarm.pause();
      music.alarm.currentTime = 0;
      ringmsg.innerHTML = `-`;
      ringpopup.style.transform = 'translateY(-100%)';
    },
    currenttime:{
      par: document.getElementById('ctime'),
      hh: document.getElementById('chh'),
      mm: document.getElementById('cmm')
    },
    upcomingAlarms:{
      alarmsdesc:{
        p1:document.getElementById('alarm1'),
        p2:document.getElementById('alarm2'),
        p3:document.getElementById('alarm3'),
        a1:document.querySelector('#alarm1 .altime'),
        a2:document.querySelector('#alarm2 .altime'),
        a3:document.querySelector('#alarm3 .altime')
      },
      alarms:{
        hh:[],
        mm:[],
        stat:[]
      },
      buttons:{
        t1 : document.querySelectorAll('.alarmspan .altoggle')[0],
        t2 : document.querySelectorAll('.alarmspan .altoggle')[1],
        t3 : document.querySelectorAll('.alarmspan .altoggle')[2],
        b1 : document.querySelectorAll('.alarmspan .altoggle .blob')[0],
        b2 : document.querySelectorAll('.alarmspan .altoggle .blob')[1],
        b3 : document.querySelectorAll('.alarmspan .altoggle .blob')[2],
        d1 : document.querySelectorAll('.alarmspan .deleteal')[0],
        d2 : document.querySelectorAll('.alarmspan .deleteal')[1],
        d3 : document.querySelectorAll('.alarmspan .deleteal')[2]
      },
    },
    setAlarms:{
      hh: document.getElementById('sethh'),
      mm: document.getElementById('setmm'),
      par: document.getElementById('alarmlist'),
      limitdbox : document.getElementById('limitbox'),
      buttons:{
        hhplus: document.querySelectorAll('.plus i')[0],
        mmplus: document.querySelectorAll('.plus i')[1],
        hhminus: document.querySelectorAll('.minus i')[0],
        mmminus: document.querySelectorAll('.minus i')[1]
      },
    },
    buttons:{
      set: document.getElementById('setbtn'),
      cancel: document.getElementById('cancelbtn')
    },
    total:localStorage.getItem('totalAlarms'),
    initTotal:function(){
      if(localStorage.getItem('alarm3hh')==undefined || localStorage.getItem('alarm3hh')==null){
        if(localStorage.getItem('alarm2hh')==undefined || localStorage.getItem('alarm2hh')==null){
          if(localStorage.getItem('alarm1hh')==undefined || localStorage.getItem('alarm1hh')==null){
            this.total = 0;
          }
          else{this.total = 1;}
        }
        else{this.total = 2;}
      }
      localStorage.setItem('totalAlarms', this.total)
    },
    setTime: function(timezone){
      this.currenttime.hh.innerHTML = timezone.digital.hh.innerHTML;
      this.currenttime.mm.innerHTML = timezone.digital.mm.innerHTML;
      return timezone;
    },
    setAlarmCurrent: function(){
      this.setAlarms.hh.innerHTML = this.currenttime.hh.innerHTML;
      this.setAlarms.mm.innerHTML = this.currenttime.mm.innerHTML;
    },
    setNewAlarm: function(hh,mm){
      let stat = 0;
      if(localStorage.getItem('alarm1hh')===null){
        stat = 1;
        document.getElementById('noAlarm').style.display = 'none';
        this.upcomingAlarms.alarmsdesc.p1.style.display = 'flex';
        this.upcomingAlarms.alarmsdesc.a1.innerHTML = hh.innerHTML+':'+mm.innerHTML;
        this.upcomingAlarms.buttons.b1.classList.add('toggle-on');
        this.upcomingAlarms.alarms.hh.push(hh.innerHTML);
        this.upcomingAlarms.alarms.mm.push(mm.innerHTML);
        this.upcomingAlarms.alarms.stat.push(1);
        localStorage.setItem('alarm1hh',hh.innerHTML);
        localStorage.setItem('alarm1mm',mm.innerHTML);
        localStorage.setItem('alarm1stat',stat);
      }
      else if(localStorage.getItem('alarm2hh')===null){
        if((localStorage.getItem('alarm1hh')+localStorage.getItem('alarm1mm'))!==(hh.innerHTML+mm.innerHTML)){
          stat = 1;
          document.getElementById('noAlarm').style.display = 'none';
          this.upcomingAlarms.alarmsdesc.p2.style.display = 'flex';
          this.upcomingAlarms.alarmsdesc.a2.innerHTML = hh.innerHTML+':'+mm.innerHTML;
          this.upcomingAlarms.buttons.b2.classList.add('toggle-on');
          this.upcomingAlarms.alarms.hh.push(hh.innerHTML);
          this.upcomingAlarms.alarms.mm.push(mm.innerHTML);
          this.upcomingAlarms.alarms.stat.push(1);
          localStorage.setItem('alarm2hh',hh.innerHTML);
          localStorage.setItem('alarm2mm',mm.innerHTML);
          localStorage.setItem('alarm2stat',stat);
        }
        else{
          this.setAlarms.limitdbox.innerHTML = 'Alarm with that time already exist.'
          this.setAlarms.limitdbox.classList.add('pop');
          setTimeout(()=>{
            this.setAlarms.limitdbox.classList.remove('pop');
          },5000)
        }
      }
      else if(localStorage.getItem('alarm3hh')===null){
        let c1 = ((localStorage.getItem('alarm1hh')+localStorage.getItem('alarm1mm'))!==(hh.innerHTML+mm.innerHTML));
        let c2 = ((localStorage.getItem('alarm2hh')+localStorage.getItem('alarm2mm'))!==(hh.innerHTML+mm.innerHTML));

        if(c1 && c2){
          stat = 1;
          document.getElementById('noAlarm').style.display = 'none';
          this.upcomingAlarms.alarmsdesc.p3.style.display = 'flex';
          this.upcomingAlarms.alarmsdesc.a3.innerHTML = hh.innerHTML+':'+mm.innerHTML;
          this.upcomingAlarms.buttons.b3.classList.add('toggle-on');
          this.upcomingAlarms.alarms.hh.push(hh.innerHTML);
          this.upcomingAlarms.alarms.mm.push(mm.innerHTML);
          this.upcomingAlarms.alarms.stat.push(1);
          localStorage.setItem('alarm3hh',hh.innerHTML);
          localStorage.setItem('alarm3mm',mm.innerHTML);
          localStorage.setItem('alarm3stat',stat);
        }
        else{
          this.setAlarms.limitdbox.innerHTML = 'Alarm with that time already exist.'
          this.setAlarms.limitdbox.classList.add('pop');
          setTimeout(()=>{
            this.setAlarms.limitdbox.classList.remove('pop');
          },5000)
        }
      }
      else{
        this.setAlarms.limitdbox.innerHTML = 'Maximum number of alarms reached'
        this.setAlarms.limitdbox.classList.add('pop');
        setTimeout(()=>{
          this.setAlarms.limitdbox.classList.remove('pop');
        },5000)
      }
    },
    fetchAlarm: function(){
      // setInterval(()=>{
        if(localStorage.getItem('alarm1hh')!=null && localStorage.getItem('alarm1mm')!=null && localStorage.getItem('alarm1stat')!=null){
            let hh = localStorage.getItem('alarm1hh');
            let mm = localStorage.getItem('alarm1mm');
            let stat = localStorage.getItem('alarm1stat');
            this.upcomingAlarms.alarms.hh.push(hh);
            this.upcomingAlarms.alarms.mm.push(mm);
            this.upcomingAlarms.alarms.stat.push(parseInt(stat));
            this.upcomingAlarms.alarmsdesc.p1.style.display = 'flex';
            this.upcomingAlarms.alarmsdesc.a1.innerHTML = hh+':'+mm;
            (stat==1)?this.upcomingAlarms.buttons.b1.classList.add('toggle-on'):this.upcomingAlarms.buttons.b1.classList.remove('toggle-on');
            if(localStorage.getItem('alarm2hh')!=null && localStorage.getItem('alarm2mm')!=null && localStorage.getItem('alarm2stat')!=null){
              hh = localStorage.getItem('alarm2hh');
              mm = localStorage.getItem('alarm2mm');
              stat = localStorage.getItem('alarm2stat');
              this.upcomingAlarms.alarms.hh.push(hh);
              this.upcomingAlarms.alarms.mm.push(mm);
              this.upcomingAlarms.alarms.stat.push(parseInt(stat));
              this.upcomingAlarms.alarmsdesc.p2.style.display = 'flex';
              this.upcomingAlarms.alarmsdesc.a2.innerHTML = hh+':'+mm;
              (stat==1)?this.upcomingAlarms.buttons.b2.classList.add('toggle-on'):this.upcomingAlarms.buttons.b2.classList.remove('toggle-on');
              if(localStorage.getItem('alarm3hh')!=null && localStorage.getItem('alarm3mm')!=null && localStorage.getItem('alarm3stat')!=null){
                hh = localStorage.getItem('alarm3hh');
                mm = localStorage.getItem('alarm3mm');
                stat = localStorage.getItem('alarm3stat');
                this.upcomingAlarms.alarms.hh.push(hh);
                this.upcomingAlarms.alarms.mm.push(mm);
                this.upcomingAlarms.alarms.stat.push(parseInt(stat));
                this.upcomingAlarms.alarmsdesc.p3.style.display = 'flex';
                this.upcomingAlarms.alarmsdesc.a3.innerHTML = hh+':'+mm;
                (stat==1)?this.upcomingAlarms.buttons.b3.classList.add('toggle-on'):this.upcomingAlarms.buttons.b3.classList.remove('toggle-on');
              }
            }
          }
        else{document.getElementById('noAlarm').style.display = 'flex';}
      // },1000);
    },
    cancelAlarm: function(){
      Alarms.hideme();
    }
  }

  const stopwatchobj = {
    par: document.getElementById('stopwatchpopup'),
    int1:setInterval(()=>{}),
    numbers:{
      swhh: document.getElementById('swhh'),
      swmm: document.getElementById('swmm'),
      swss: document.getElementById('swss'),
      swms: document.getElementById('swms')
    },
    buttons:{
      play: document.getElementById('playsw'),
      pause: document.getElementById('pausesw'),
      reset: document.getElementById('resetsw'),
      cancel: document.getElementById('cancelsw'),
      minmax: document.getElementById('minsw'),
      switch: document.getElementById('stopwatchswitch')
    },
    playStopwatch:function(){
      this.buttons.play.style.opacity = '0';
      this.buttons.cancel.style.opacity = '0';
      setTimeout(()=>{
        this.buttons.pause.style.opacity = '1'
        this.buttons.reset.style.opacity = '1'
        this.buttons.play.classList.add('hidden');
        this.buttons.cancel.classList.add('hidden');
        this.buttons.pause.classList.remove('hidden');
        this.buttons.reset.classList.remove('hidden');
      },700)
      let ss = parseInt(this.numbers.swss.innerHTML);
      let mm = parseInt(this.numbers.swmm.innerHTML);
      let hh = parseInt(this.numbers.swhh.innerHTML);
      this.int1 = setInterval(()=>{
        ss++;
        if(ss>=59){
          ss=0;
          mm++;
          if(mm>=59){
            mm=0;
            hh++;
          }
        }
        (hh<=9)?(this.numbers.swhh.innerHTML='0'+hh):(this.numbers.swhh.innerHTML=hh);
        (mm<=9)?(this.numbers.swmm.innerHTML='0'+mm):(this.numbers.swmm.innerHTML=mm);
        (ss<=9)?(this.numbers.swss.innerHTML='0'+ss):(this.numbers.swss.innerHTML=ss);
      },1000)
    },
    pauseStopwatch:function(){
      clearInterval(this.int1);
      this.buttons.pause.style.opacity = '0'
      this.buttons.reset.style.opacity = '0'
      setTimeout(()=>{
        this.buttons.play.style.opacity = '1'
        this.buttons.cancel.style.opacity = '1'
        this.buttons.pause.classList.add('hidden');
        this.buttons.reset.classList.add('hidden');
        this.buttons.play.classList.remove('hidden');
        this.buttons.cancel.classList.remove('hidden');
      },500)
    },
    resetStopwatch:function(){
      clearInterval(this.int1);
      this.buttons.reset.style.animation = 'rot 1s ease-in-out 1 forwards';
      setTimeout(()=>{this.buttons.reset.style.animation = ''},1500)
      this.numbers.swss.innerHTML = '00';
      this.numbers.swmm.innerHTML = '00';
      this.numbers.swhh.innerHTML = '00';
      this.playStopwatch();
    },
    cancelStopwatch: function(){
      Stopwatch.hideme();
      this.numbers.swss.innerHTML = '00';
      this.numbers.swmm.innerHTML = '00';
      this.numbers.swhh.innerHTML = '00';
      setTimeout(()=>{this.par.classList.remove('minimized');},500)
    },
    minmaxStopwarch: function(){
      if(this.par.classList.contains('minimized')){
        this.par.classList.remove('minimized');
      }
      else{
        this.par.classList.add('minimized');
      }
    },
  }

  const timerobj={
    par: document.getElementById('timerpopup'),
    int1:setInterval(()=>{}),
    finishPopup: function(){
      closemenu();
      this.popup = document.getElementById('timerFinish');
      this.popupmsg = document.querySelector('#timerFinish span');
      this.popupclose = document.querySelector('#timerFinish i');
      this.popup.style.transform = 'translateY(0)';
      let t =0;
      let int = setInterval(()=>{
        t++;
        (t<=9)?this.popupmsg.innerHTML= '-0'+t+' s':this.popupmsg.innerHTML= '-'+t+' s';
        music.spiritedAway.onended = ()=>{
          t=0;
          this.popupmsg.innerHTML='';
          this.popup.style.transform = 'translateY(-100%)';
          clearInterval(int);
        }
        this.popupclose.onclick = ()=>{
          t=0;
          music.spiritedAway.pause();
          music.spiritedAway.currentTime=0;
          this.popupmsg.innerHTML='';
          this.popup.style.transform = 'translateY(-100%)';
          clearInterval(int);
        }
      },1000)
    },
    numbers:{
      hh: document.getElementById('sethhtm'),
      mm: document.getElementById('setmmtm'),
      ss: document.getElementById('setsstm'),
      warning: document.getElementById('warntimer')
    },
    buttons:{
      changers:{
        hhplus: document.querySelectorAll('#tmbody .plus i')[0],
        mmplus: document.querySelectorAll('#tmbody .plus i')[1],
        hhminus: document.querySelectorAll('#tmbody .minus i')[0],
        mmminus: document.querySelectorAll('#tmbody .minus i')[1],
      },
      minmax: document.getElementById('mintm'),
      play: document.getElementById('playtm'),
      cancel: document.getElementById('canceltm'),
      pause: document.getElementById('pausetm'),
      reset: document.getElementById('resettm'),
      switch: document.getElementById('timerswitch')
    },
    playTimer: function(){
      let hh = parseInt(this.numbers.hh.innerHTML);
      let mm = parseInt(this.numbers.mm.innerHTML);
      let ss = parseInt(this.numbers.ss.innerHTML);
      if(mm>0 || hh>0 || ss>0){
        this.buttons.play.style.opacity = '0';
        this.buttons.cancel.style.opacity = '0';
        setTimeout(()=>{
          this.buttons.changers.hhplus.style.opacity = '0';
          this.buttons.changers.mmplus.style.opacity = '0';
          this.buttons.changers.hhminus.style.opacity = '0';
          this.buttons.changers.mmminus.style.opacity = '0';
          setTimeout(()=>{
            this.buttons.minmax.style.display = 'flex';
            this.buttons.changers.hhplus.classList.add('hidden');
            this.buttons.changers.mmplus.classList.add('hidden');
            this.buttons.changers.hhminus.classList.add('hidden');
            this.buttons.changers.mmminus.classList.add('hidden');
          },200)

          this.buttons.pause.style.opacity = '1';
          this.buttons.reset.style.opacity = '1';
          this.buttons.play.classList.add('hidden');
          this.buttons.cancel.classList.add('hidden');
          this.buttons.pause.classList.remove('hidden');
          this.buttons.reset.classList.remove('hidden');
        },700)
        this.int1 = setInterval(()=>{
          if(hh===0 && mm===0 && ss===1){
            Timer.hideme();
            Alarms.hideme();
            Settings.hideme();
            About.hideme();
            if(!stopwatchobj.par.classList.contains('minimized')) Stopwatch.hideme();
            clearInterval(this.int1);
            this.finishPopup();
            try{music.spiritedAway.play();}
            catch(e){
              this.alert = document.getElementById('alertbox');
              this.alert.style.padding = '5px 10px';
              this.alert.innerHTML = 'Unable to play audio';
            }
            this.buttons.pause.style.opacity = '0';
            this.buttons.reset.style.opacity = '0';
            setTimeout(()=>{
              this.numbers.ss.innerHTML = '00';
              this.numbers.mm.innerHTML = '00';
              this.numbers.hh.innerHTML = '00';
              this.par.classList.remove('minimized');
              this.buttons.changers.hhplus.style.opacity = '1';
              this.buttons.changers.mmplus.style.opacity = '1';
              this.buttons.changers.hhminus.style.opacity = '1';
              this.buttons.changers.mmminus.style.opacity = '1';
              setTimeout(()=>{
                this.buttons.minmax.style.display = 'none';
                this.buttons.changers.hhplus.classList.remove('hidden');
                this.buttons.changers.mmplus.classList.remove('hidden');
                this.buttons.changers.hhminus.classList.remove('hidden');
                this.buttons.changers.mmminus.classList.remove('hidden');
              },200)

              this.buttons.play.style.opacity = '1';
              this.buttons.cancel.style.opacity = '1';
              this.buttons.play.classList.remove('hidden');
              this.buttons.cancel.classList.remove('hidden');
              this.buttons.pause.classList.add('hidden');
              this.buttons.reset.classList.add('hidden');
            },700)
          }
          ss--;
          if(ss<0){
            ss = 59;
            this.numbers.ss.innerHTML = ss;
            mm--;
            if(mm<0){
              mm=59;
              this.numbers.mm.innerHTML = mm;
              hh--;
              if(hh<0){
                this.numbers.hh.innerHTML = '00';
              }
              else{
                if(hh<=9){this.numbers.hh.innerHTML = '0'+hh;}
                else{this.numbers.hh.innerHTML = hh;}
              }
            }
            else{
              if(mm<=9){this.numbers.mm.innerHTML = '0'+mm;}
              else{this.numbers.mm.innerHTML = mm;}
            }
          }
          else{
            if(ss<=9){this.numbers.ss.innerHTML = '0'+ss;}
            else{this.numbers.ss.innerHTML = ss;}
          }
        },1000)
      }
      else{
        this.numbers.warning.classList.add('pop');
        setTimeout(()=>{
          this.numbers.warning.classList.remove('pop');
        },5000)
      }
    },
    pauseTimer:function(){
      clearInterval(this.int1);
      this.buttons.pause.style.opacity = '0';
      this.buttons.reset.style.opacity = '0';
      setTimeout(()=>{
        this.buttons.play.style.opacity = '1';
        this.buttons.cancel.style.opacity = '1';
        this.buttons.pause.classList.add('hidden');
        this.buttons.reset.classList.add('hidden');
        this.buttons.play.classList.remove('hidden');
        this.buttons.cancel.classList.remove('hidden');
      },700)
    },
    resetTimer: function(){
      this.pauseTimer();
      this.buttons.changers.hhplus.classList.remove('hidden');
      this.buttons.changers.mmplus.classList.remove('hidden');
      this.buttons.changers.hhminus.classList.remove('hidden');
      this.buttons.changers.mmminus.classList.remove('hidden');
      setTimeout(()=>{
        this.par.classList.remove('minimized');
        this.buttons.minmax.style.display = 'none';
        this.buttons.changers.hhplus.style.opacity = '1';
        this.buttons.changers.mmplus.style.opacity = '1';
        this.buttons.changers.hhminus.style.opacity = '1';
        this.buttons.changers.mmminus.style.opacity = '1';
      },200)
      this.numbers.ss.innerHTML = '00';
      this.numbers.mm.innerHTML = '00';
      this.numbers.hh.innerHTML = '00';
    },
    cancelTimer: function(){
      Timer.hideme();
      this.buttons.changers.hhplus.classList.remove('hidden');
      this.buttons.changers.mmplus.classList.remove('hidden');
      this.buttons.changers.hhminus.classList.remove('hidden');
      this.buttons.changers.mmminus.classList.remove('hidden');
      setTimeout(()=>{
        this.par.classList.remove('minimized');
        this.buttons.minmax.style.display = 'none';
        this.buttons.changers.hhplus.style.opacity = '1';
        this.buttons.changers.mmplus.style.opacity = '1';
        this.buttons.changers.hhminus.style.opacity = '1';
        this.buttons.changers.mmminus.style.opacity = '1';
      },200)
      this.numbers.ss.innerHTML = '00';
      this.numbers.mm.innerHTML = '00';
      this.numbers.hh.innerHTML = '00';
    },
    minmaxTimer: function(){
      if(this.par.classList.contains('minimized')){
        this.par.classList.remove('minimized');
      }
      else{
        this.par.classList.add('minimized');
      }
    },
  }

  const settingsobj = {
    par: document.getElementById('settingspopup'),
    type: document.getElementById('ctv'),
    warnsetclr: document.getElementById('warnsetclr'),
    colors:{
      a1par: document.querySelectorAll('.cval')[0],
      a2par: document.querySelectorAll('.cval')[1],
      accent1: document.getElementById('a1cv'),
      accent2: document.getElementById('a2cv'),
    },
    buttons:{
      save: document.getElementById('savesg'),
      close: document.getElementById('closesg'),
      reset: document.getElementById('resetsg')
    },
    setColors: function(){
      let c1 = localStorage.getItem("accent1");
      let c2 = localStorage.getItem("accent2");
      this.colors.accent1.value = c1;
      this.colors.accent2.value = c2;
      this.colors.accent1.style.color = '#'+c1;
      this.colors.accent2.style.color = '#'+c2;
      document.documentElement.style.setProperty('--accent1', '#'+c1);
      document.documentElement.style.setProperty('--accent2', '#'+c2);
    },
    changeColors: function(){
      let stat;
      let c1 = localStorage.getItem("accent1");
      let c2 = localStorage.getItem("accent2");
      let regex = /^([a-fA-F0-9]){6}$|^([a-fA-F0-9]){3}$/;
      this.colors.accent1.oninput = ()=>{
        let s = this.colors.accent1.value;
        if(regex.test(s)){
          this.colors.accent1.style.color = '#'+this.colors.accent1.value;
          this.colors.a1par.style.borderColor = 'transparent';
          stat = 1;
        }
        else{
          this.colors.a1par.style.borderColor = 'var(--error)';
          this.colors.accent1.style.color = 'var(--text)';
          stat = 0;
        }
      }
      this.colors.accent2.oninput = ()=>{
        let s = this.colors.accent2.value;
        if(regex.test(s)){
          this.colors.accent2.style.color = '#'+this.colors.accent2.value;
          this.colors.a2par.style.borderColor = 'transparent';
          stat = 1;
        }
        else{
          this.colors.a2par.style.borderColor = 'var(--error)';
          this.colors.accent2.style.color = 'var(--text)';
          stat = 0;
        }
      }
      return stat;
    },
    saveChanges: function(){
      let c1 = this.colors.accent1.value;
      let c2 = this.colors.accent2.value;
      let c3 = this.type.innerHTML;

      if(c3=='Analog'){
        localStorage.setItem('clocktype','0');
        DigitalClock.hideme();
        setTimeout(()=>{
          AnalogClock.showme();
        },1000)
      }
      else{
        localStorage.setItem('clocktype','1');
        AnalogClock.hideme();
        setTimeout(()=>{
          DigitalClock.showme();
        },1000)
      }

      if(this.colors.a1par.style.borderColor==='var(--error)'|| this.colors.a2par.style.borderColor==='var(--error)'){
        this.warnsetclr.classList.add('pop');
        setTimeout(()=>{
          this.warnsetclr.classList.remove('pop');
        },5000)
      }
      else{
        localStorage.setItem("accent1",c1);
        localStorage.setItem("accent2",c2);
        document.documentElement.style.setProperty('--accent1', '#'+c1);
        document.documentElement.style.setProperty('--accent2', '#'+c2);
      }
    },
    resetChanges: function(){
      localStorage.setItem("accent1",'33998F');
      localStorage.setItem("accent2",'E5A01A');
      this.colors.accent1.style.color = '#33998F';
      this.colors.accent2.style.color = '#E5A01A';
      this.colors.accent1.value = '33998F';
      this.colors.accent2.value = 'E5A01A';
      document.documentElement.style.setProperty('--accent1', '#33998F');
      document.documentElement.style.setProperty('--accent2', '#E5A01A');
      this.colors.a1par.style.borderColor = 'transparent';
      this.colors.a2par.style.borderColor = 'transparent';
    },
    closeSettings: function(){
      Settings.hideme();
      this.colors.accent1.value = localStorage.getItem('accent1');
      this.colors.accent2.value = localStorage.getItem('accent2');
      this.colors.accent1.style.color = '#'+this.colors.accent1.value;
      this.colors.accent2.style.color = '#'+this.colors.accent2.value;
      this.colors.a2par.style.borderColor = 'transparent';
    }
  }

  const aboutobj = {
    par: document.getElementById('aboutpopup'),
    buttons:{
      close: document.getElementById('closeab')
    },
    closeAbout: function(){
      About.hideme();
    }
  }

///* FUNCTIONING *///

  //* Cursor box movement *//
  window.onmousemove=e=>{
    if (!window.matchMedia("(any-hover: none)").matches) {
      setTimeout(()=>{
        cursorbox.style.opacity = '0.5';
      },300)
      let x=e.clientX;
      let y=e.clientY;
      let newX = x-(cursorbox.offsetHeight/2);
      let newY = y-(cursorbox.offsetHeight/2);
      cursorbox.style.transform = `translate3d(${newX}px, ${newY}px, 0px)`;
    }
  }

  body.onmouseleave = ()=>{
    setTimeout(()=>{
      cursorbox.style.opacity = '0';
    },400)
  }

  //* Clearing navigation bugs *//
  window.onresize=()=>{
    closemenu();
    if(window.innerWidth<=600){
      if(!alarmobj.par.classList.contains('hidden')){Navigation.hideme2();}
      if(!aboutobj.par.classList.contains('hidden')){Navigation.hideme2();}
      if(!settingsobj.par.classList.contains('hidden')){Navigation.hideme2();}
      else if(!stopwatchobj.par.classList.contains('hidden')){
        if(stopwatchobj.par.classList.contains('minimized')){Navigation.showme2();}
        else{Navigation.hideme2();}
      }
      else if(!timerobj.par.classList.contains('hidden')){
        if(timerobj.par.classList.contains('minimized')){Navigation.showme2();}
        else{Navigation.hideme2();}
      }
    }
    else{Navigation.showme2();}
  }

  //* Setting time *//
  let zone;
  setInterval(()=>{

    let date = new Date();

    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    istobj.analog.hh.style.transform = `rotate(${(hh*360/12)+(mm/2)}deg)`;
    istobj.analog.mm.style.transform = `rotate(${(mm*360/60)+(ss/10)}deg)`;
    istobj.analog.ss.style.transform = `rotate(${ss*6}deg)`;

    lnobj.analog.hh.style.transform = `rotate(${((hh-4)*360/12)+((mm-30)/2)}deg)`;
    lnobj.analog.mm.style.transform = `rotate(${((mm-30)*360/60)+((ss-7)/10)}deg)`;
    lnobj.analog.ss.style.transform = `rotate(${(ss-7)*6}deg)`;


    hh<=9?istobj.digital.hh.innerHTML = `0${hh}`:istobj.digital.hh.innerHTML = `${hh}`;
    mm<=9?istobj.digital.mm.innerHTML = `0${mm}`:istobj.digital.mm.innerHTML = `${mm}`;

    let hhd, mmd;
    if(hh-4<0){hhd = hh-4+24;}
    else{hhd = hh-4;}

    if(mm-30<0){
      mmd = mm-30+60;
      hhd -= 1;
    }
    else{mmd = mm-30;}

    hhd<=9?lnobj.digital.hh.innerHTML = '0'+hhd:lnobj.digital.hh.innerHTML = hhd;
    mmd<=9?lnobj.digital.mm.innerHTML = '0'+mmd:lnobj.digital.mm.innerHTML = mmd;

    /* setting alarm current time zone*/
    zone = alarmobj.setTime(istobj);

    /* repositioning switch buttons */
    if(timerobj.par.classList.contains('minimized') && stopwatchobj.par.classList.contains('minimized')){timerobj.buttons.switch.style.right = '130px';}
    else{timerobj.buttons.switch.style.right = '10px';}

  },1000)

  //* ringing alarms*//
  let a1h,a1m,a1s,a2h,a2m,a2s,a3h,a3m,a3s;
  setInterval(()=>{
    let hh = istobj.digital.hh.innerHTML;
    let mm = istobj.digital.mm.innerHTML;
    a1h = localStorage.getItem('alarm1hh');
    a1m = localStorage.getItem('alarm1mm');
    a1s = localStorage.getItem('alarm1stat');
    a2h = localStorage.getItem('alarm2hh');
    a2m = localStorage.getItem('alarm2mm');
    a2s = localStorage.getItem('alarm2stat');
    a3h = localStorage.getItem('alarm3hh');
    a3m = localStorage.getItem('alarm3mm');
    a3s = localStorage.getItem('alarm3stat');
    if(hh===a1h && mm===a1m && a1s==='1'){
      alarmobj.ring(a1h,a1m,1);
    }
    else if(hh===a2h && mm===a2m && a2s==='1'){
      alarmobj.ring(a2h,a2m,2);
    }
    else if(hh===a3h && mm===a3m && a3s==='1'){
      alarmobj.ring(a3h,a3m,3);
    }
  },1000)


  //* Selecting display clock *//
  AnalogClock.hideme();
  DigitalClock.hideme();
  if(localStorage.getItem('clocktype')===null){
    localStorage.setItem('clocktype','0')
    AnalogClock.showme();
    settingsobj.type.innerHTML = 'Analog';
  }
  else{
    if(localStorage.getItem('clocktype')==1){
      DigitalClock.showme();
      settingsobj.type.innerHTML = 'Digital';
    }
    else{
      AnalogClock.showme();
      settingsobj.type.innerHTML = 'Analog';
    }
  }

  //* Toggle mobile menu *//
  let mflag = false;
  let options = document.querySelectorAll('#navmenu>.option');

  function openmenu(){
    options.forEach(e=>{
      setTimeout(()=>{
        e.classList.add('optvis');
      },300)
    })
    setTimeout(()=>{options.forEach(e=>{e.style.transitionDelay = '0s';}),1000})
    menubtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    navbar.classList.remove('closed');
    mflag = true;
  }
  function closemenu(){
    options.forEach(e=>{e.classList.remove('optvis');})
    menubtn.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`;
    navbar.classList.add('closed');
    mflag = false;
  }

  menubtn.onclick = ()=>{
    !mflag?openmenu():closemenu();
  }

  //* Toggle extras *//
  let swvis = 0;
  let tmvis = 0;
  Alarms.hideme();
  Stopwatch.hideme();
  Timer.hideme();
  Settings.hideme();
  About.hideme();

  /* Alarms */
  alarmobj.fetchAlarm()

  alarm.onclick=()=>{
    if(window.innerWidth<=600){Navigation.hideme2();}
    if(!stopwatchobj.par.classList.contains('hidden')) swvis=1;
    if(!timerobj.par.classList.contains('hidden')) tmvis=1;
    Alarms.showme();
    Stopwatch.hideme();
    Timer.hideme();
    closemenu();

    // set alarm to current time
    alarmobj.currenttime.par.onclick = ()=>{
      alarmobj.setAlarmCurrent();
    }

    // change buttons
    // increasing HH
    alarmobj.setAlarms.buttons.hhplus.onclick=()=>{
      if(parseInt(alarmobj.setAlarms.hh.innerHTML)>=23){
        alarmobj.setAlarms.hh.innerHTML='00';
      }
      else{
        let hnew=parseInt(alarmobj.setAlarms.hh.innerHTML)+1;
        if(hnew<=9){
            alarmobj.setAlarms.hh.innerHTML = '0'+hnew;
        }
        else{alarmobj.setAlarms.hh.innerHTML = hnew;}
      }
    }
    // increasing MM
    alarmobj.setAlarms.buttons.mmplus.onclick=()=>{
      if(parseInt(alarmobj.setAlarms.mm.innerHTML)>=59){
        alarmobj.setAlarms.mm.innerHTML='00';
        let hnew=parseInt(alarmobj.setAlarms.hh.innerHTML)+1;
        if(hnew>=23){
          alarmobj.setAlarms.hh.innerHTML='00';
        }
        else{
          if(hnew<=9){
              alarmobj.setAlarms.hh.innerHTML = '0'+hnew;
          }
          else{alarmobj.setAlarms.hh.innerHTML = hnew;}
        }
      }
      else{
        let mnew=parseInt(alarmobj.setAlarms.mm.innerHTML)+1;
        if(mnew<=9){
            alarmobj.setAlarms.mm.innerHTML = '0'+mnew;
        }
        else{alarmobj.setAlarms.mm.innerHTML = mnew;}
      }
    }
    // decreasing HH
    alarmobj.setAlarms.buttons.hhminus.onclick=()=>{
      if(parseInt(alarmobj.setAlarms.hh.innerHTML)<=0){
        alarmobj.setAlarms.hh.innerHTML='23';
      }
      else{
        let hnew=parseInt(alarmobj.setAlarms.hh.innerHTML)-1;
        if(hnew<=9){
            alarmobj.setAlarms.hh.innerHTML = '0'+hnew;
        }
        else{alarmobj.setAlarms.hh.innerHTML = hnew;}
      }
    }
    // decreasing MM
    alarmobj.setAlarms.buttons.mmminus.onclick=()=>{
      if(parseInt(alarmobj.setAlarms.mm.innerHTML)<=0){
        alarmobj.setAlarms.mm.innerHTML='59';
        let hnew=parseInt(alarmobj.setAlarms.hh.innerHTML)-1;
        if(hnew<0){
          alarmobj.setAlarms.hh.innerHTML='23';
        }
        else{
          if(hnew<=9){
              alarmobj.setAlarms.hh.innerHTML = '0'+hnew;
          }
          else{alarmobj.setAlarms.hh.innerHTML = hnew;}
        }
      }
      else{
        let mnew=parseInt(alarmobj.setAlarms.mm.innerHTML)-1;
        if(mnew<=9){
            alarmobj.setAlarms.mm.innerHTML = '0'+mnew;
        }
        else{alarmobj.setAlarms.mm.innerHTML = mnew;}
      }
    }

    // toggling buttons
    // toggle alarm 1
    alarmobj.upcomingAlarms.buttons.t1.onclick=()=>{
      let x = alarmobj.upcomingAlarms.buttons.b1.classList;
      let check = Array.from(x).includes('toggle-on');
      if(!check){
        alarmobj.upcomingAlarms.buttons.b1.classList.add('toggle-on');
        alarmobj.upcomingAlarms.alarms.stat[0] = 1;
        localStorage.setItem('alarm1stat',1);
      }
      else{
        alarmobj.upcomingAlarms.buttons.b1.classList.remove('toggle-on');
        alarmobj.upcomingAlarms.alarms.stat[0] = 0;
        localStorage.setItem('alarm1stat',0);
      }
    }
    // toggle alarm 2
    alarmobj.upcomingAlarms.buttons.t2.onclick=()=>{
      let x = alarmobj.upcomingAlarms.buttons.b2.classList;
      let check = Array.from(x).includes('toggle-on');
      if(!check){
        alarmobj.upcomingAlarms.buttons.b2.classList.add('toggle-on');
        alarmobj.upcomingAlarms.alarms.stat[1] = 1;
        localStorage.setItem('alarm2stat',1);
      }
      else{
        alarmobj.upcomingAlarms.buttons.b2.classList.remove('toggle-on');
        alarmobj.upcomingAlarms.alarms.stat[1] = 0;
        localStorage.setItem('alarm2stat',0);
      }
    }
    // toggle alarm 3
    alarmobj.upcomingAlarms.buttons.t3.onclick=()=>{
      let x = alarmobj.upcomingAlarms.buttons.b3.classList;
      let check = Array.from(x).includes('toggle-on');
      if(!check){
        alarmobj.upcomingAlarms.buttons.b3.classList.add('toggle-on');
        alarmobj.upcomingAlarms.alarms.stat[2] = 1;
        localStorage.setItem('alarm3stat',1);
      }
      else{
        alarmobj.upcomingAlarms.buttons.b3.classList.remove('toggle-on');
        alarmobj.upcomingAlarms.alarms.stat[2] = 0;
        localStorage.setItem('alarm3stat',0);
      }
    }

    // delete buttons
    // delete alarm 1
    /*
      pop - Removes from the End of an Array
      shift - Removes from the beginning of an Array
      splice - removes from a specific Array index
      filter - allows you to programatically remove elements from an Array
    */
    alarmobj.upcomingAlarms.buttons.d1.onclick=()=>{
      if(localStorage.getItem('alarm2hh')!==null){
        alarmobj.upcomingAlarms.alarmsdesc.a1.innerHTML = alarmobj.upcomingAlarms.alarmsdesc.a2.innerHTML;
        (alarmobj.upcomingAlarms.alarms.stat[1]==1 && !('toggle-on' in alarmobj.upcomingAlarms.buttons.b1.classList))?(alarmobj.upcomingAlarms.buttons.b1.classList.add('toggle-on')):(alarmobj.upcomingAlarms.buttons.b1.classList.remove('toggle-on'));
        localStorage.setItem('alarm1hh',alarmobj.upcomingAlarms.alarms.hh[1]);
        localStorage.setItem('alarm1mm',alarmobj.upcomingAlarms.alarms.mm[1]);
        localStorage.setItem('alarm1stat',alarmobj.upcomingAlarms.alarms.stat[1]);
        if(localStorage.getItem('alarm3hh')!==null){
          alarmobj.upcomingAlarms.alarmsdesc.a2.innerHTML = alarmobj.upcomingAlarms.alarmsdesc.a3.innerHTML;
          (alarmobj.upcomingAlarms.alarms.stat[2]==1 && !('toggle-on' in alarmobj.upcomingAlarms.buttons.b2.classList))?(alarmobj.upcomingAlarms.buttons.b2.classList.add('toggle-on')):(alarmobj.upcomingAlarms.buttons.b2.classList.remove('toggle-on'));
          localStorage.setItem('alarm2hh',alarmobj.upcomingAlarms.alarms.hh[2]);
          localStorage.setItem('alarm2mm',alarmobj.upcomingAlarms.alarms.mm[2]);
          localStorage.setItem('alarm2stat',alarmobj.upcomingAlarms.alarms.stat[2]);
          alarmobj.upcomingAlarms.alarmsdesc.p3.style.display = 'none';
          alarmobj.upcomingAlarms.alarmsdesc.a3.innerHTML = '';
          localStorage.removeItem('alarm3hh');
          localStorage.removeItem('alarm3mm');
          localStorage.removeItem('alarm3stat');
        }
        else{
          alarmobj.upcomingAlarms.alarmsdesc.p2.style.display = 'none';
          alarmobj.upcomingAlarms.alarmsdesc.a2.innerHTML = '';
          localStorage.removeItem('alarm2hh');
          localStorage.removeItem('alarm2mm');
          localStorage.removeItem('alarm2stat');
        }
        alarmobj.upcomingAlarms.alarms.hh.shift(1,1);
        alarmobj.upcomingAlarms.alarms.mm.shift(1,1);
        alarmobj.upcomingAlarms.alarms.stat.shift(1,1);
      }
      else{
        document.getElementById('noAlarm').style.display = 'flex';
        alarmobj.upcomingAlarms.alarmsdesc.p1.style.display = 'none';
        alarmobj.upcomingAlarms.alarmsdesc.a1.innerHTML = '';
        alarmobj.upcomingAlarms.alarms.hh.pop();
        alarmobj.upcomingAlarms.alarms.mm.pop();
        alarmobj.upcomingAlarms.alarms.stat.pop();
        localStorage.removeItem('alarm1hh');
        localStorage.removeItem('alarm1mm');
        localStorage.removeItem('alarm1stat');
      }
    }
    // delete alarm 2
    alarmobj.upcomingAlarms.buttons.d2.onclick=()=>{
      if(localStorage.getItem('alarm3hh')!==null){
        alarmobj.upcomingAlarms.alarmsdesc.a2.innerHTML = alarmobj.upcomingAlarms.alarmsdesc.a3.innerHTML;
        (alarmobj.upcomingAlarms.alarms.stat[2]==1 && !('toggle-on' in alarmobj.upcomingAlarms.buttons.b2.classList))?(alarmobj.upcomingAlarms.buttons.b2.classList.add('toggle-on')):(alarmobj.upcomingAlarms.buttons.b2.classList.remove('toggle-on'));
        localStorage.setItem('alarm2hh',alarmobj.upcomingAlarms.alarms.hh[2]);
        localStorage.setItem('alarm2mm',alarmobj.upcomingAlarms.alarms.mm[2]);
        localStorage.setItem('alarm2stat',alarmobj.upcomingAlarms.alarms.stat[2]);
        localStorage.removeItem('alarm3hh');
        localStorage.removeItem('alarm3mm');
        localStorage.removeItem('alarm3stat');
        alarmobj.upcomingAlarms.alarmsdesc.p3.style.display = 'none';
        alarmobj.upcomingAlarms.alarmsdesc.a3.innerHTML = '';
      }
      else{
        alarmobj.upcomingAlarms.alarmsdesc.p2.style.display = 'none';
        alarmobj.upcomingAlarms.alarmsdesc.a2.innerHTML = '';
        alarmobj.upcomingAlarms.alarms.hh.pop();
        alarmobj.upcomingAlarms.alarms.mm.pop();
        alarmobj.upcomingAlarms.alarms.stat.pop();
        localStorage.removeItem('alarm2hh');
        localStorage.removeItem('alarm2mm');
        localStorage.removeItem('alarm2stat');
      }
      alarmobj.upcomingAlarms.alarms.hh.splice(1,1);
      alarmobj.upcomingAlarms.alarms.mm.splice(1,1);
      alarmobj.upcomingAlarms.alarms.stat.splice(1,1);
    }
    // delete alarm 3
    alarmobj.upcomingAlarms.buttons.d3.onclick=()=>{
      alarmobj.upcomingAlarms.alarmsdesc.p3.style.display = 'none';
      alarmobj.upcomingAlarms.alarmsdesc.a3.innerHTML = '';
      alarmobj.upcomingAlarms.alarms.hh.pop();
      alarmobj.upcomingAlarms.alarms.mm.pop();
      alarmobj.upcomingAlarms.alarms.stat.pop();
      localStorage.removeItem('alarm3hh');
      localStorage.removeItem('alarm3mm');
      localStorage.removeItem('alarm3stat');
    }

    // setting alarm
    alarmobj.buttons.set.onclick=()=>{
      alarmobj.setNewAlarm(alarmobj.setAlarms.hh, alarmobj.setAlarms.mm);
    }

    alarmobj.buttons.cancel.onclick=()=>{
      Navigation.showme2();
      alarmobj.cancelAlarm();
      if(stopwatchobj.par.classList.contains('minimized')){Stopwatch.showme();}
      if(timerobj.par.classList.contains('minimized')){Timer.showme();}
    }

  }

  /* Stopwatch */
  stopwatch.onclick=()=>{
    if(window.innerWidth<=600 && !stopwatchobj.par.classList.contains('minimized')){Navigation.hideme2();}
    Stopwatch.showme();
    if(!stopwatchobj.par.classList.contains('minimized')){Timer.hideme();}
    if(stopwatchobj.par.classList.contains('hidden')){Timer.hideme();}
    stopwatchobj.par.style.zIndex = '111';
    timerobj.par.style.zIndex = '110';
    closemenu();

    // buttons
    stopwatchobj.buttons.play.onclick=()=>{stopwatchobj.playStopwatch();}
    stopwatchobj.buttons.pause.onclick=()=>{stopwatchobj.pauseStopwatch();}
    stopwatchobj.buttons.reset.onclick=()=>{stopwatchobj.resetStopwatch();}
    stopwatchobj.buttons.cancel.onclick=()=>{
      Navigation.showme2();
      stopwatchobj.cancelStopwatch();
      if(timerobj.par.classList.contains('minimized')){Timer.showme();}
    }
    stopwatchobj.buttons.minmax.onclick=()=>{
      stopwatchobj.minmaxStopwarch();
      if(stopwatchobj.par.classList.contains('minimized')){
        Navigation.showme2();
        if(timerobj.par.classList.contains('minimized')){Timer.showme();}
      }
      else{
        if(window.innerWidth<=600){Navigation.hideme2();}
        if(timerobj.par.classList.contains('minimized')){
          Timer.hideme();
        }
      }
    }
    stopwatchobj.buttons.switch.onclick=()=>{
      stopwatchobj.par.style.zIndex = '111';
      timerobj.par.style.zIndex = '110';
    }
  }

  /* Timer */
  timer.onclick=()=>{
    if(window.innerWidth<=600  && !timerobj.par.classList.contains('minimized')){Navigation.hideme2();}
    timerobj.par.style.zIndex = '111';
    stopwatchobj.par.style.zIndex = '110';
    if(!stopwatchobj.par.classList.contains('hidden')) swvis=1;
    if(timerobj.par.classList.contains('hidden')){Stopwatch.hideme();}
    Timer.showme();
    closemenu();

    // change buttons
    // increasing HH
    timerobj.buttons.changers.hhplus.onclick=()=>{
      if(parseInt(timerobj.numbers.hh.innerHTML)<9){
        timerobj.numbers.hh.innerHTML = '0'+(parseInt(timerobj.numbers.hh.innerHTML)+1);
      }
      else if(parseInt(timerobj.numbers.hh.innerHTML)===10){}
      else{
        timerobj.numbers.hh.innerHTML = parseInt(timerobj.numbers.hh.innerHTML)+1;
      }
    }

    // decreasing HH
    timerobj.buttons.changers.hhminus.onclick=()=>{
      if(parseInt(timerobj.numbers.hh.innerHTML)===0){}
      else if(parseInt(timerobj.numbers.hh.innerHTML)<=10){
        timerobj.numbers.hh.innerHTML = '0'+(parseInt(timerobj.numbers.hh.innerHTML)-1);
      }
      else{
        timerobj.numbers.hh.innerHTML = parseInt(timerobj.numbers.hh.innerHTML)-1;
      }
    }

    // increasing MM
    timerobj.buttons.changers.mmplus.onclick=()=>{
      if(parseInt(timerobj.numbers.mm.innerHTML)<9){
        timerobj.numbers.mm.innerHTML = '0'+(parseInt(timerobj.numbers.mm.innerHTML)+1);
      }
      else{
        timerobj.numbers.mm.innerHTML = parseInt(timerobj.numbers.mm.innerHTML)+1;
        if(parseInt(timerobj.numbers.mm.innerHTML)>59){
          timerobj.numbers.mm.innerHTML = '00';
          let hhcross = parseInt(timerobj.numbers.hh.innerHTML)+1;
          if(hhcross<=9){
            timerobj.numbers.hh.innerHTML='0'+hhcross;
          }else{
            if(hhcross>10){timerobj.numbers.hh.innerHTML='10';}
            else{timerobj.numbers.hh.innerHTML=hhcross;}
          }
        }
      }
    }

    // decreasing MM
    timerobj.buttons.changers.mmminus.onclick=()=>{
      if(parseInt(timerobj.numbers.mm.innerHTML)===0){
        timerobj.numbers.mm.innerHTML = '59';
        let hhcross = parseInt(timerobj.numbers.hh.innerHTML)-1;
        if(hhcross<0){
          timerobj.numbers.hh.innerHTML = '00';
        }
        else if(hhcross<=9){
          timerobj.numbers.hh.innerHTML = '0'+hhcross;
        }
        else{
          timerobj.numbers.hh.innerHTML = hhcross;
        }
      }
      else if(parseInt(timerobj.numbers.mm.innerHTML)<9){
        timerobj.numbers.mm.innerHTML = '0'+(parseInt(timerobj.numbers.mm.innerHTML)-1);
      }
      else{
        timerobj.numbers.mm.innerHTML = parseInt(timerobj.numbers.mm.innerHTML)-1;
      }
    }

    // buttons
    timerobj.buttons.play.onclick=()=>{timerobj.playTimer();}
    timerobj.buttons.pause.onclick=()=>{timerobj.pauseTimer();}
    timerobj.buttons.reset.onclick=()=>{
      timerobj.resetTimer();
      Stopwatch.hideme();
      if(window.innerWidth<=600){Navigation.hideme2();}
    }
    timerobj.buttons.cancel.onclick=()=>{
      Navigation.showme2();
      timerobj.cancelTimer();
      if(stopwatchobj.par.classList.contains('minimized')){Stopwatch.showme();}
    }
    timerobj.buttons.minmax.onclick=()=>{
      timerobj.minmaxTimer();
      Navigation.showme2();
      if(timerobj.par.classList.contains('minimized')){
        Navigation.showme2();
        if(stopwatchobj.par.classList.contains('minimized')){Stopwatch.showme();}
      }
      else{
        if(window.innerWidth<=600){Navigation.hideme2();}
        if(stopwatchobj.par.classList.contains('minimized')){
          Stopwatch.hideme();
        }
      }
    }
    timerobj.buttons.switch.onclick=()=>{
      timerobj.par.style.zIndex = '111';
      stopwatchobj.par.style.zIndex = '110';
    }
  }

  /* Settings */
  let a1 = localStorage.getItem("accent1");
  let a2 = localStorage.getItem("accent2");
  if(a1===null) localStorage.setItem("accent1",'33998F');
  if(a2===null) localStorage.setItem("accent2",'E5A01A');
  settingsobj.setColors();
  settingsobj.changeColors();

  settings.onclick=()=>{
    if(window.innerWidth<=600){Navigation.hideme2();}
    if(!stopwatchobj.par.classList.contains('hidden')) swvis=1;
    if(!timerobj.par.classList.contains('hidden')) tmvis=1;
    Alarms.hideme();
    Stopwatch.hideme();
    Timer.hideme();
    About.hideme();
    closemenu();
    Settings.showme();

    /* saving changes*/
    settingsobj.type.onclick=()=>{
      if(settingsobj.type.innerHTML === 'Analog'){
        settingsobj.type.innerHTML = 'Digital';
      }
      else if(settingsobj.type.innerHTML === 'Digital'){
        settingsobj.type.innerHTML = 'Analog';
      }
    }
    settingsobj.buttons.save.onclick=()=>{
      settingsobj.saveChanges();
    }
    settingsobj.buttons.reset.onclick=()=>{
      settingsobj.resetChanges();
    }
    settingsobj.buttons.close.onclick=()=>{
      Navigation.showme2();
      settingsobj.closeSettings();
      if(stopwatchobj.par.classList.contains('minimized')){Stopwatch.showme();}
      if(timerobj.par.classList.contains('minimized')){Timer.showme();}
    }
  }

  /* About */
  about.onclick=()=>{
    if(window.innerWidth<=600){Navigation.hideme2();}
    About.showme();
    Stopwatch.hideme();
    Timer.hideme();
    closemenu();

    aboutobj.buttons.close.onclick = ()=>{
      Navigation.showme2();
      aboutobj.closeAbout();
      if(stopwatchobj.par.classList.contains('minimized')){Stopwatch.showme();}
      if(timerobj.par.classList.contains('minimized')){Timer.showme();}
    }
  }

}
else if(errorStat===0){
  errorbox.style.padding = '5px 10px';
  errorbox.innerHTML = `Components intitalization failed. Try again.`;
}
