import{mkdirSync as A,readdirSync as E,readFileSync as F,writeFileSync as G}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
for(const id of E(I)){
const p=F(I+'/'+id+'/program.bin'),g=F(I+'/'+id+'/input.bin');
const D=[],C=[],M=[],o=[];
let s=0,t=0,f=0,q=0,u=0,v,w,r,e;
const n=p.length;
try{
for(;;){
if(u===1e6)throw 10;
if(q<0||q>=n)throw 9;
const op=p[q];
if(!(0xF0003001F00077FFF00FFn>>BigInt(op)&1n))throw 5;
const m=op==1?1:op==2?4:op>47&&op<52?2:0;
if(q+m>=n)throw 9;
u++;
q+=1+m;
if(op<16){
if(op==0)throw 0;
if(op==1){if(s>255)throw 3;D[s++]=(p[q-1]<<24)>>24;}
else if(op==2){if(s>255)throw 3;D[s++]=p[q-4]|p[q-3]<<8|p[q-2]<<16|p[q-1]<<24;}
else if(op==3){if(s<1)throw 2;s--;}
else if(op==4){if(s<1)throw 2;if(s>255)throw 3;D[s]=D[s-1];s++;}
else if(op==5){if(s<2)throw 2;v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;}
else if(op==6){if(s<2)throw 2;if(s>255)throw 3;D[s]=D[s-2];s++;}
else{if(s<3)throw 2;v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v;}
}else if(op<35){
if(op==23||op==27){if(s<1)throw 2;D[s-1]=op==23?-D[s-1]|0:~D[s-1];}
else{
if(s<2)throw 2;
v=D[s-1];w=D[s-2];
if(op==16)r=(w+v)|0;
else if(op==17)r=(w-v)|0;
else if(op==18)r=Math.imul(w,v);
else if(op==19){if(v==0)throw 4;r=(w/v)|0;}
else if(op==20){if(v==0)throw 4;r=(w%v)|0;}
else if(op==21){if(v==0)throw 4;r=(w>>>0)/(v>>>0)|0;}
else if(op==22){if(v==0)throw 4;r=(w>>>0)%(v>>>0)|0;}
else if(op==24)r=w&v;
else if(op==25)r=w|v;
else if(op==26)r=w^v;
else if(op==28)r=w<<(v&31);
else if(op==29)r=w>>(v&31);
else if(op==30)r=w>>>(v&31)|0;
else if(op==32)r=w==v?1:0;
else if(op==33)r=w<v?1:0;
else r=(w>>>0)<(v>>>0)?1:0;
s-=2;D[s++]=r;
}
}else if(op<53){
if(op==48)q+=(((p[q-2]|p[q-1]<<8)<<16)>>16);
else if(op==49||op==50){if(s<1)throw 2;v=D[--s];if((op==49)==(v==0))q+=(((p[q-2]|p[q-1]<<8)<<16)>>16);}
else if(op==51){if(t==64)throw 7;C[t++]=q;q=p[q-2]|p[q-1]<<8;}
else{if(t==0)throw 8;q=C[--t];}
}else if(op<66){
if(op==64){if(s<1)throw 2;v=D[s-1];if(v<0||v>255)throw 6;D[s-1]=M[v]|0;}
else{if(s<2)throw 2;v=D[s-1];w=D[s-2];if(v<0||v>255)throw 6;s-=2;M[v]=w;}
}else{
if(op==80){if(s<1)throw 2;v=String(D[s-1]);if(o.length+v.length>65536)throw 11;s--;o.push(...Buffer.from(v));}
else if(op==81){if(s<1)throw 2;if(o.length>65535)throw 11;o.push(D[--s]&255);}
else if(op==82){if(s>255)throw 3;D[s++]=f<g.length?g[f++]:-1;}
else{if(s<1)throw 2;throw D[--s]&255;}
}
}
}catch(z){e=z;}
A(O+'/'+id,{recursive:true});
G(O+'/'+id+'/stdout.bin',Buffer.from(o));
G(O+'/'+id+'/exit.txt',e+'\n');
}
