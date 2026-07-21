import { T } from "./constants";

export const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
`;

export const GLOBAL_CSS = `
${FONTS}

*{
box-sizing:border-box;
}

.gt-root{
font-family:'Inter',sans-serif;
color:${T.ink};
}

.gt-display{
font-family:'Fraunces',serif;
}

.gt-mono{
font-family:'Space Mono',monospace;
}

@keyframes gt-fade-up{
from{
opacity:0;
transform:translateY(10px);
}
to{
opacity:1;
transform:translateY(0);
}
}

@keyframes gt-dash{
to{
stroke-dashoffset:0;
}
}

@keyframes gt-plane-fly{
0%{
offset-distance:0%;
opacity:0;
}
8%{
opacity:1;
}
92%{
opacity:1;
}
100%{
offset-distance:100%;
opacity:0;
}
}

@keyframes gt-scan{
0%{
transform:translateY(-100%);
}
100%{
transform:translateY(600%);
}
}

@keyframes gt-stamp-in{
0%{
transform:scale(2.4) rotate(-14deg);
opacity:0;
}
60%{
transform:scale(.95) rotate(-8deg);
opacity:1;
}
100%{
transform:scale(1) rotate(-6deg);
opacity:1;
}
}

@keyframes gt-spin{
to{
transform:rotate(360deg);
}
}

.gt-animate-in{
animation:gt-fade-up .5s ease both;
}

.gt-stamp{
animation:gt-stamp-in .4s cubic-bezier(.2,.8,.3,1.3) both;
}

.gt-spin{
animation:gt-spin 1s linear infinite;
}

.gt-chip{
transition:
transform .15s ease,
box-shadow .15s ease,
background-color .15s ease,
border-color .15s ease;
}

.gt-chip:hover{
transform:translateY(-2px);
}

.gt-chip:active{
transform:translateY(0) scale(.98);
}

.gt-notch{
position:absolute;
width:26px;
height:26px;
border-radius:50%;
background:#EDEDE4;
left:50%;
transform:translateX(-50%);
}

@media(min-width:860px){
.gt-notch{
left:auto;
top:50%;
transform:translateY(-50%);
}
}

@media(prefers-reduced-motion:reduce){

.gt-animate-in,
.gt-stamp,
.gt-spin,
[style*="animation"]{
animation:none!important;
}

.gt-chip:hover{
transform:none;
}

}
`;