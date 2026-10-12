"""Original 56-second score; no samples or third-party music."""
from pathlib import Path
import wave
import numpy as np

ROOT = Path(__file__).resolve().parent
SR, DURATION, BEAT = 48000, 56, 0.5
rng = np.random.default_rng(20261010)
audio = np.zeros((SR * DURATION, 2), dtype=np.float64)

def note(midi, start, length=1.8, amplitude=.12, pan=0, kind='pluck'):
    n = int(length*SR)
    t = np.arange(n)/SR
    hz = 440*2**((midi-69)/12)
    if kind == 'pad':
        tone = np.sin(2*np.pi*hz*t) + .12*np.sin(2*np.pi*hz*2.003*t)
        env = np.minimum(t/.7,1)*np.minimum((length-t)/.9,1)
    else:
        tone = np.sin(2*np.pi*hz*t)*np.exp(-t/1.1)
        tone += .28*np.sin(2*np.pi*hz*2*t)*np.exp(-t/.34)
        tone += .09*np.sin(2*np.pi*hz*3*t)*np.exp(-t/.18)
        env = np.minimum(t/.009,1)*np.minimum((length-t)/.1,1)
    mono=tone*env*amplitude
    offset=int(start*SR)
    end=min(len(audio),offset+n)
    if end<=offset:return
    gains=np.sqrt([(1-pan)/2,(1+pan)/2])
    audio[offset:end]+=mono[:end-offset,None]*gains

chords=[[48,55,59,64],[45,52,55,60],[41,48,52,57],[43,50,55,57]]
melodies=[[76,79,83,79,74,76,71,74],[72,76,79,76,71,72,67,71],[69,72,76,72,67,69,64,67],[74,79,81,79,76,74,71,67]]
for bar in range(28):
    start=bar*2
    chord=chords[(bar//2)%4]
    quiet=37<=start<49
    intensity=.55 if quiet else 1
    for i,m in enumerate(chord):
        note(m+12,start,2.7,.027*intensity,(i-1.5)/4,'pad')
    note(chord[0]-12,start,1.7,.12*intensity,0)
    for step in range(8):
        if quiet and step%2:continue
        m=chord[[1,2,3,2,1,3,2,3][step]]+12
        note(m,start+step*.25,1.35,.052*intensity,(-1)**step*.32)
    melody=melodies[(bar//2)%4]
    if bar>=2 and not quiet:
        for step in [0,3,5,7]:
            note(melody[(step+bar)%8],start+step*.25,1.8,.06,.15)
    if 6<=start<36 or 50<=start<54:
        for step in range(8):
            n=int(.065*SR);tt=np.arange(n)/SR
            noise=rng.normal(0,1,n)
            noise=np.concatenate([[0],np.diff(noise)])*.006*np.exp(-tt/ .012)
            at=int((start+step*.25)*SR)
            audio[at:at+n,0]+=noise*.7
            audio[at:at+n,1]+=noise
        for step in [0,2]:
            n=int(.16*SR);tt=np.arange(n)/SR
            kick=.022*np.sin(2*np.pi*(62*tt+12*.04*(1-np.exp(-tt/.04))))*np.exp(-tt/.045)
            at=int((start+step*.5)*SR)
            audio[at:at+n]+=kick[:,None]

# A short stereo room tail softens the exposed plucks without muddying text cuts.
dry=audio.copy()
for delay,gain in [(.113,.14),(.227,.10),(.347,.055)]:
    n=int(delay*SR)
    audio[n:]+=dry[:-n,::-1]*gain
fade=np.minimum(np.arange(len(audio))/(SR*.7),1)*np.minimum((len(audio)-1-np.arange(len(audio)))/(SR*2.5),1)
audio*=fade[:,None]
audio=np.tanh(audio*1.3)
audio*=.78/max(np.max(np.abs(audio)),.001)
out=ROOT/'out';out.mkdir(exist_ok=True)
with wave.open(str(out/'music.wav'),'wb') as w:
    w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR)
    w.writeframes((audio*32767).astype('<i2').tobytes())
print('Original score: 56s, 120 BPM, 48kHz stereo')
