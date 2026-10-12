/** Browser-generated ambient audio: no tracking, network or sample assets. */
export class Soundscape {
 private context:AudioContext|null=null;
 private gain:GainNode|null=null;
 private voices:OscillatorNode[]=[];
 async start(){if(!this.context){this.context=new AudioContext();this.gain=this.context.createGain();this.gain.gain.value=0;this.gain.connect(this.context.destination);for(const frequency of [55,82.41,110.12]){const voice=this.context.createOscillator();voice.type='sine';voice.frequency.value=frequency;voice.connect(this.gain);voice.start();this.voices.push(voice);}}await this.context.resume();this.gain!.gain.setTargetAtTime(.012,this.context.currentTime,.8);}
 async mute(){if(this.context)await this.context.suspend();}
 tune(state:string){if(!this.context||!this.gain)return;const quiet=state==='lael';this.gain.gain.setTargetAtTime(quiet?.003:.012,this.context.currentTime,1);const base=state==='unirag'?61.74:state==='neural-network'?65.41:55;this.voices.forEach((v,i)=>v.frequency.setTargetAtTime(base*[1,1.498,2.002][i],this.context!.currentTime,1.5));}
 async close(){if(this.context&&this.context.state!=='closed')await this.context.close();this.context=null;this.voices=[];this.gain=null;}
}
