/* 

	ATTENZIONE PER LA COMPRESSIONE USA https://jscompress.com/

	Nome db + sign + nome tabella = "Negozio-Clienti" ; "Negozio-"
	
	CODICI DI ERRORE : 
	
		1 : Si sta aggiungendo un valore che deve essere univoco e non lo è
		2 : Si sta tentando di aggiornare un record senza id '#' o con univoco errato		
		3 : Durante la rimozione alcuni records non sono stati trovati
		4 : Si sta muovendo un elemento verso un indice inesistente
		5 : Non si riesce a trovare l'indice del record da muovere
		6 : Si vuole spostare un record sullo stesso indice reale
		
		100 : Errore di decrittazzione mentre si preleva il db
		101 : Errore di crittazzione mentre si salva il db

*/


/// --> CryptoJS

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();


// <-- CryptoJs


/// --> Promise ( lie.js )

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.Promise=e()}}(function(){return function e(t,n,r){function o(u,s){if(!n[u]){if(!t[u]){var c="function"==typeof require&&require;if(!s&&c)return c(u,!0);if(i)return i(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var a=n[u]={exports:{}};t[u][0].call(a.exports,function(e){var n=t[u][1][e];return o(n?n:e)},a,a.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){(function(e){"use strict";function n(){a=!0;for(var e,t,n=l.length;n;){for(t=l,l=[],e=-1;++e<n;)t[e]();n=l.length}a=!1}function r(e){1!==l.push(e)||a||o()}var o,i=e.MutationObserver||e.WebKitMutationObserver;if(i){var u=0,s=new i(n),c=e.document.createTextNode("");s.observe(c,{characterData:!0}),o=function(){c.data=u=++u%2}}else if(e.setImmediate||"undefined"==typeof e.MessageChannel)o="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script");t.onreadystatechange=function(){n(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(n,0)};else{var f=new e.MessageChannel;f.port1.onmessage=n,o=function(){f.port2.postMessage(0)}}var a,l=[];t.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,t,n){"use strict";function r(){}function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=j,this.queue=[],this.outcome=void 0,e!==r&&c(this,e)}function i(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}function u(e,t,n){d(function(){var r;try{r=t(n)}catch(t){return v.reject(e,t)}r===e?v.reject(e,new TypeError("Cannot resolve promise with itself")):v.resolve(e,r)})}function s(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function c(e,t){function n(t){i||(i=!0,v.reject(e,t))}function r(t){i||(i=!0,v.resolve(e,t))}function o(){t(r,n)}var i=!1,u=f(o);"error"===u.status&&n(u.value)}function f(e,t){var n={};try{n.value=e(t),n.status="success"}catch(e){n.status="error",n.value=e}return n}function a(e){return e instanceof this?e:v.resolve(new this(r),e)}function l(e){var t=new this(r);return v.reject(t,e)}function h(e){function t(e,t){function r(e){u[t]=e,++s!==o||i||(i=!0,v.resolve(f,u))}n.resolve(e).then(r,function(e){i||(i=!0,v.reject(f,e))})}var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var o=e.length,i=!1;if(!o)return this.resolve([]);for(var u=new Array(o),s=0,c=-1,f=new this(r);++c<o;)t(e[c],c);return f}function p(e){function t(e){n.resolve(e).then(function(e){i||(i=!0,v.resolve(s,e))},function(e){i||(i=!0,v.reject(s,e))})}var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var o=e.length,i=!1;if(!o)return this.resolve([]);for(var u=-1,s=new this(r);++u<o;)t(e[u]);return s}var d=e(1),v={},y=["REJECTED"],m=["FULFILLED"],j=["PENDING"];t.exports=o,o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===m||"function"!=typeof t&&this.state===y)return this;var n=new this.constructor(r);if(this.state!==j){var o=this.state===m?e:t;u(n,o,this.outcome)}else this.queue.push(new i(n,e,t));return n},i.prototype.callFulfilled=function(e){v.resolve(this.promise,e)},i.prototype.otherCallFulfilled=function(e){u(this.promise,this.onFulfilled,e)},i.prototype.callRejected=function(e){v.reject(this.promise,e)},i.prototype.otherCallRejected=function(e){u(this.promise,this.onRejected,e)},v.resolve=function(e,t){var n=f(s,t);if("error"===n.status)return v.reject(e,n.value);var r=n.value;if(r)c(e,r);else{e.state=m,e.outcome=t;for(var o=-1,i=e.queue.length;++o<i;)e.queue[o].callFulfilled(t)}return e},v.reject=function(e,t){e.state=y,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e},o.resolve=a,o.reject=l,o.all=h,o.race=p},{1:1}]},{},[2])(2)});

// <-- Promise

( function(){
	
	"use strict";
	
/// --> Global, opzioni e strumenti di classe

	var sign = ":"
	
	,dev = {
		
		version : "1.0.0.6"
		
		,
		
		author  : "Leonardo Ciaccio"
		
		,
		
		contact : "leonardo.ciaccio@gmail.com"
		
		,
		
		license : "MIT" 
		
		,
		
		credits : [
			
			"code.google.com/p/crypto-js"
			
			,
			
			"https://github.com/calvinmetcalf/lie"
			
		]
		
	}	
	
	,tools = { // --> tools
		
	// --> Incapsula un processo di cifratura

		encrypt : function( self, decrypted, mypass ){

			if( !mypass )mypass = self.password;
			if( !mypass )return decrypted;

			return CryptoJS.AES.encrypt( decrypted, mypass );

		}

		,
		
	// --> Incapsula un processo di decifratura

		decrypt : function( self, encrypted, mypass ){

			if( !mypass )mypass = self.password;
			if( !mypass )return encrypted;

			return CryptoJS.AES.decrypt( encrypted, mypass ).toString( CryptoJS.enc.Utf8 );

		}
 
		,
		
	// --> Genero un nuovo ID
		
		getNextID : function( self, tablename ){

			var mytable = tools.getDBtable( self, tablename );

			if( !mytable )return null;

			return ( mytable.length > 0 ) 
				   ? mytable.sort( function( a, b ){

						return ( b[ "#" ] - a[ "#" ] );

				   } )[ 0 ][ "#" ] + 1 
				   : 0 ;

		}
		
 		,
 
	// --> Controlla se una stringa può essere un oggetto JSON, in sintesi controlla se è coerente/cryptato
		
		isJSON : function( test ){
			
			try{
				
				return JSON.parse( test() );
				
			}catch( e ){
				
				return null;
				
			}
			
		} // <-- isJSON
		
		,
		
	// --> Controlla che un record sia univoco in una tabella
		
		isUnique : function( table, record ){
			
			return ( !record.unique || record.unique == "" || table.every( function( element, index, array ){
				
				return ( !element.unique || element.unique != record.unique );
				
			} ) );
			
		} // <-- isUnique
		
		,
		
	// --> Aggiorna i dati dello storage
		
		setDBtable : function( self, tablename, data ){
			
			data = data || [];
			
			var storage = self.storage
				
				,db 	= self.name
			
				,name 	= db + sign + tablename
			
				;
			
		// --> Ad ogni modo sovrascrivo se non ci sono errori
			
			try{						
				
				var encryme = tools.encrypt( self, JSON.stringify( data ) );
				
				if( !encryme )encryme = JSON.stringify( data );
			
				storage[ name ] = encryme;
				
				return true;
				
			}catch( e ){
				
				return false;	
				
			}
												
		} // <-- getDB
		
		,
		
	// --> Preleva i dati dallo storage
		
		getDBtable : function( self, tablename ){
			
			var storage  = self.storage
				
				,db 	 = self.name
			
				,name	 = db + sign + tablename
			
				;
			
		// --> Potrei non avere la tabella
			
			if( typeof storage[ name ] === "undefined" )return [];
				
			return this.isJSON( function test(){
						
				try{

					var decryme = tools.decrypt( self, storage[ name ] );

					return ( !decryme ) ? storage[ name ] : decryme;

				}catch( e ){

					return storage[ name ];

				}

			} );
			
		} // <-- getDB
		
		,
		
	 // --> Aggiorna un oggetto con dei nuovi valori
		
		deepMerge : function( to, from ){
			
			for ( var key in from) {
				
				try {
					
				// --> Compatibile con Firefox
					
					if ( from[ key ].constructor == Object ){
						
						to[ key ] = deepMerge( to[ key ], from[ key ] );

					}else{
						  
						to[ key ] = from[ key ];

					}

				}catch( e ){
					  
					to[ key ] = from[ key ];

				}
			}

			return to;
			
		} // <-- deepMerge
		
	}; // <-- tools;
	
/// --> La variabile globale con cui lavorare
	
	var localdbclass = function( newoptions ){
			
	// --> Se ho l'oggetto adeguato aggiorno le opzioni
		
		if( typeof newoptions !== "object" )newoptions = {};
		
	// --> Se per errore resetto lo storage lo riporto al local
		
		if( newoptions.storage != localStorage && newoptions.storage != sessionStorage ){
			
			this.storage = localStorage;
		
		}else{
			
			this.storage = newoptions.storage;
			
		}
		
	// --> Il nome del db è obbligatorio
		
		this.name = ( typeof newoptions.name !== "string" || newoptions.name == "" )
					? "localdbclass"
					: newoptions.name
					;
		
	// --> L'evento change deve essere una funzione
		
		this.change = ( typeof newoptions.change !== "function" )
					  ? function( tablename, recordschanged, eventname, mytableobj ){}
					  : newoptions.change
					  ;
		
	// --> Inizializzo la password
	
		this.password = null;
		
	// --> Riferimento globale allo sviluppatore
	
		this.dev = dev;
		
	// --> Restituisco me stesso per concatenare funzioni
		
		return this;
		
	};
		
/// --> Aggiungo record ed eseguo un callback alla fine
	
	localdbclass.prototype.add = function( tablename, records ){
			
		if( !tablename )throw new Error( "localdbclass.prototype.add : 'tablename' required !" );
			
		var self = this;
		
		return new Promise( function( resolve, reject ){
		
			records = ( Array.isArray( records ) ) ? records : [ records ];

		// --> Prelevo la tabella, potrebbe essere []

			var mytable = tools.getDBtable( self, tablename );

			if( !mytable )return reject( 100 );

		// --> Mi faccio un giro per ogni record

			var newrecords = [];

			for( var i = 0; i < records.length; i++ ){

				var record = records[ i ];

			// --> Potrei avere un valore unique, devo controllare

				if( !tools.isUnique( mytable, record ) )continue;

			// --> Aggiungo l'ID consecutivo al record

				var newid = tools.getNextID( self, tablename );
				
				if( newid !== null ){
					
					var newrecord = tools.deepMerge( record, { "#" : newid } ); 

				// --> Aggiungo il record alla tabella

					mytable.push( newrecord );

					newrecords.push( newrecord );
					
				}

			} // <-- forEach

		// --> Inserisco la tabella nel database

			var response = tools.setDBtable( self, tablename, mytable );

			if( !response )return reject( 101 );

		// --> Eseguo l'evento change con i records in questione

			self.change( tablename, newrecords, "add", mytable );

			return resolve( newrecords );
			
		} );
			
	};
	
/// --> Aggiorno un record
	
	localdbclass.prototype.update = function( tablename, records ){
			
		if( !tablename )throw new Error( "localdbclass.prototype.update : 'tablename' required !" );
		
		var self = this;
		
		return new Promise( function( resolve, reject ){
		
			records = ( Array.isArray( records ) ) ? records : [ records ];

		// --> Prelevo la tabella, potrebbe essere []

			var mytable = tools.getDBtable( self, tablename );

			if( !mytable )return reject( 100 );

		// --> Un ciclo per aggiornare

			var updated = []

				,count	= 0;

			for( var i = 0; i < mytable.length && count < records.length; i++ ){

				for( var ii = 0; ii < records.length; ii++ ){

					var record = records[ ii ];

					if( mytable[ i ][ "#" ] == record[ "#" ] ){

						count++;

					// --> Ok, ma se l'unique è diverso non si va avanti, inizio con il clonare il db

						var mytablecloned = mytable.slice();

					// --> Rimuovo l'oggetto in esame e vedo se esiste un unique simile

						mytablecloned.splice( i, 1 );

						if( !tools.isUnique( mytablecloned, record ) )continue;

						mytable[ i ] = tools.deepMerge( mytable[ i ], record );

						updated.push( mytable[ i ] );

					}

				} // <-- for records

			} // <-- for mytable

		// --> Inserisco la tabella nel database

			var response = tools.setDBtable( self, tablename, mytable );

			if( !response )return reject( 101 );

		// --> Eseguo l'evento change con il record in questione

			self.change( tablename, updated, "update", mytable );

			return resolve( updated );
			
		} );
		
	};
	
/// --> Effettuo una ricerca nel database
	
	localdbclass.prototype.remove = function( tablename, ids ){
		
		if( !tablename )throw new Error( "localdbclass.prototype.remove : Table name required !" );
		
		var self = this;
		
		return new Promise( function( resolve, reject ){
			
			ids = ( Array.isArray( ids ) ) ? ids : [ ids ]; 

		// --> Prelevo la tabella, potrebbe essere []

			var mytable = tools.getDBtable( self, tablename );

			if( !mytable )return reject( 100 );

		// --> Un ciclo per rimuovere

			var deleted = [];

			for( var i = 0; i < ids.length; i++ ){

			// --> Devo trovare l'indice array nella tabella

				var index = mytable.findIndex( function( record ){

					return ( record[ "#" ] == ids[ i ] );

				} );

				deleted.push( mytable[ index ] );

				mytable.splice( index, 1 );


			} // <-- for ids

		// --> Inserisco la tabella nel database

			var response = tools.setDBtable( self, tablename, mytable );

			if( !response )return reject( 101 );

		// --> Eseguo l'evento change con il record in questione

			self.change( tablename, deleted, "remove", mytable );

		// --> Restituisco me stesso per concatenare funzioni

			return resolve( deleted );
			
		} );
		
	};
	
/// --> Sposto un record in una nuova posizione
	
	localdbclass.prototype.move = function( tablename, idfrom, idto ){
		
		if( !tablename )throw new Error( "localdbclass.prototype.move : Table name required !" );
				
		if( !( idfrom > -1 ) || !( idto > -1 ) )throw new Error( "localdbclass.prototype.move : ID required !" );
		
		var self = this;
		
		return new Promise( function( resolve, reject ){
			
		// --> Prelevo la tabella, potrebbe essere []
		
			var mytable = tools.getDBtable( self, tablename );

			if( !mytable )return reject( 100 );

		// --> Mi Assicuro che le posizioni sia intercambiabile

			var to = mytable.findIndex( function( record ){

				return ( idto == record[ "#" ] );

			} );

			if( to < 0 )return reject( 4 );

		// --> Devo conoscere l'indice effettivo del record

			var from = mytable.findIndex( function( record ){

				return ( idfrom == record[ "#" ] );

			} );

			if( from < 0 )return reject( 5 );

			if( from == to )return reject( 6 );

		// --> Sposto il record

			var moved = mytable.splice( from, 1 );

			mytable.splice( to, 0, moved[ 0 ] );

		// --> Inserisco la tabella nel database

			var response = tools.setDBtable( self, tablename, mytable );

			if( !response )return reject( 101 );
			
		// --> Eseguo l'evento change con il record in questione

			self.change( tablename, moved, "move", mytable );

		// --> Restituisco me stesso per concatenare funzioni

			return resolve( moved );
			
		} );
		
	};
	
/// --> Sposto di posizione 2 record
	
	localdbclass.prototype.invert = function( tablename, idfrom, idto ){
		
		if( !tablename )throw new Error( "localdbclass.prototype.invert : Table name required !" );
		
		if( !( idfrom > -1 ) || !( idto > -1 ) )throw new Error( "localdbclass.prototype.invert : ID required !" );
		
		var self = this;
		
		return new Promise( function( resolve, reject ){
			
		// --> Prelevo la tabella, potrebbe essere []
		
			var mytable = tools.getDBtable( self, tablename );

			if( !mytable )return reject( 100 );

		// --> Mi Assicuro che le posizioni sia intercambiabile

			var to = mytable.findIndex( function( record ){

				return ( idto == record[ "#" ] );

			} );

			if( to < 0 )return reject( 4 );

		// --> Devo conoscere l'indice effettivo del record

			var from = mytable.findIndex( function( record ){

				return ( idfrom == record[ "#" ] );

			} );

			if( from < 0 )return reject( 5 );

			if( from == to )return reject( 6 );

		// --> Sposto i records

			var movedfrom, movedto;

			if( from > to ){

				movedfrom = mytable.splice( from, 1 );

				movedto   = mytable.splice( to, 1 );

				mytable.splice( to, 0, movedfrom[ 0 ] );

				mytable.splice( from, 0, movedto[ 0 ] );

			}else{

				movedto   = mytable.splice( to, 1 );

				movedfrom = mytable.splice( from, 1 );

				mytable.splice( from, 0, movedto[ 0 ] );

				mytable.splice( to, 0, movedfrom[ 0 ] );

			}

		// --> Inserisco la tabella nel database

			var response = tools.setDBtable( self, tablename, mytable );

			if( !response )return reject( 101 );

		// --> Eseguo l'evento change con il record in questione

		self.change( tablename, [ movedfrom, movedto ], "invert", mytable );

		// --> Restituisco me stesso per concatenare funzioni

			return resolve( [ movedfrom, movedto ] );
			
		} );
				
	};
	
/// --> Effettuo un giro in una tabella
	
	localdbclass.prototype.query = function( tablename, condition, opt ){
		
		if( !tablename )throw new Error( "localdbclass.prototype.query : Table name required !" );
		
		var self = this;
		
		return new Promise( function( resolve, reject ){
			
			if( typeof condition !== "function" )condition = function(){ return true; };

			if( !opt )opt = {};

			opt.offset = ( !opt.offset ) ? 0 : ( parseInt( opt.offset ) > 0 ) ? parseInt( opt.offset ) : 0;

			opt.limit = ( !opt.limit ) ? -1 : ( parseInt( opt.limit ) > 0 ) ? parseInt( opt.limit ) : -1;

			if( opt.sort !== "disc" )opt.sort = "asc";

			//if( !opt.sortby )opt.sortby = "#";

			var response = [];

		// --> Prelevo la tabella, potrebbe essere []

			var mytable = tools.getDBtable( self, tablename );

			if( !mytable )return reject( 100 );

			var originaltable = mytable.slice();

		// --> Organizzo i dati per come richiesti

			if( opt.sortby && typeof opt.sortby === "string" ){

				if( opt.sort == "asc" ){

					mytable.sort( function( a, b ){

						if( typeof a[ opt.sortby ] === "string" && typeof b[ opt.sortby ] === "string" ){

						// --> Per i caratteri non ascii

							return a[ opt.sortby ].localeCompare( b[ opt.sortby ] );

						}

						return ( parseInt( a[ opt.sortby ] ) - parseInt( b[ opt.sortby ] ) );

					} );

				}else{

					mytable.sort( function( a, b ){

						if( typeof a[ opt.sortby ] === "string" && typeof b[ opt.sortby ] === "string" ){

						// --> Per i caratteri non ascii

							return b[ opt.sortby ].localeCompare( a[ opt.sortby ] );

						}

						return ( parseInt( b[ opt.sortby ] ) - parseInt( a[ opt.sortby ] ) );

					} );

				} // <-- if asc

			} // <-- if sortby

		// --> Un ciclo per la ricerca

			for( var i = opt.offset; i < mytable.length && ( opt.limit < 0 || i < opt.limit ); i++ ){

				var record = mytable[ i ];

				if( condition( record ) === true )response.push( record );

			}

			return resolve( response );
			
		} );
		
	};
	
/// --> Crypto tutto il mio db
	
	localdbclass.prototype.encryptdb = function( mypass ){
		
		var self = this;
		
		return new Promise( function( resolve, reject ){
			
			var storage 	 = self.storage

			,teststorage = {};
		
		// --> Faccio un giro di prova per valutare che tutti i db si possano cifrare, altrimenti non cambio nulla

			for( var key in storage ){

				if( key.match( new RegExp( "^" + self.name , "g" ) ) ){

					try{

						var encrypted = tools.encrypt( self, storage[ key ], mypass );

						if( !encrypted )return reject();

						teststorage[ key ] = encrypted;

					}catch( e ){

						return reject();

					}

				} // <-- if match

			} // <-- for storage

		// <-- Sembra tutto ok

			for( var key in teststorage ){

				storage[ key ] = teststorage[ key ];

			} // <-- for storage

			return resolve();
			
		} );
		
	};
	
/// --> Decrypto tutto il mio db
	
	localdbclass.prototype.decryptdb = function( mypass ){
		
		var self = this;
						
		return new Promise( function( resolve, reject ){
			
			var storage      = self.storage

			,teststorage = {};

		// --> Faccio un giro di prova per valutare che tutti i db si possano decifrare, altrimenti non cambio nulla

			for( var key in storage ){

				if( key.match( new RegExp( "^" + self.name , "g" ) ) ){

				// --> Potrebbe essere in chiaro

					try{

						if( JSON.parse( storage[ key ] ) ){

							teststorage[ key ] = storage[ key ];

							continue;

						}

					}catch( e ){}

					try{

						var decrypted = tools.decrypt( self, storage[ key ], mypass );

					// --> Faccio un test, potrebbe essere in chiaro

						if( !decrypted ){

							return reject();

						}else if( JSON.parse( decrypted ) ){

							teststorage[ key ] = decrypted;

							continue;

						}else{

							return reject();

						}								

					}catch( e ){

						return reject();

					}

				} // <-- if match

			} // <-- for storage

		// <-- Sembra tutto ok

			for( var key in teststorage ){

				storage[ key ] = teststorage[ key ];

			} // <-- for storage

			return resolve();
			
		} );
		
	};
	
/// --> Restituisco il numero di record in una tabella
	
	localdbclass.prototype.countRecords = function( tablename ){
		
		if( !tablename )throw new Error( "localdbclass.prototype.countRecords : Table name required !" );
		
		var self = this;
		
		return new Promise( function( resolve, reject ){
			
			var mytable = tools.getDBtable( self, tablename );
		
			if( !mytable )return reject( 100 );

			return resolve( mytable.length );
			
		} );
				
	};
	
/// --> Esporta il database
	
	localdbclass.prototype.export = function(){
		
		var self = this;
				
		return new Promise( function( resolve, reject ){
			
			var storage = self.storage

			,alltable 	= [];

		// --> Raccolgo tutte le tabelle di questo DB

			for( var key in storage ){

				if( key.match( new RegExp( "^" + self.name , "g" ) ) ){

					var table = {};

					table[ key ] = storage[ key ];

					alltable.push( table );

				} // <-- if match

			} // <-- for storage	

			if( alltable.length < 1 )resolve( null );

			resolve( JSON.stringify( alltable ) );
			
		} );
		
	};
	
/// --> Importa un db database
	
	localdbclass.prototype.import = function( alldb ){
		
		var self = this;
			
		return new Promise( function( resolve, reject ){
    	
			var storage = self.storage;

		// --> Raccolgo tutte le tabelle di questo DB

			if( typeof alldb !== "string" )throw new Error( "localdbclass.prototype.import : require text format alldb" );

			try{

				var allmydb = JSON.parse( alldb );

				allmydb.forEach( function( table ){

					try{

						storage[ Object.keys( table ) ] = table[ Object.keys( table ) ];

					}catch( e ){}

				} );

			}catch( e ){

				reject( "localdbclass.prototype.import : problems on import" );

			}
			
			resolve();
			
  		} ); // <-- Promise
				
	};
	
/// --> Rimuove tutto il database
	
	localdbclass.prototype.clear = function(){
		
		var self = this;
		
		return new Promise( function( resolve, reject ){
			
			var storage = self.storage;

		// --> Raccolgo tutte le tabelle di questo DB

			for( var key in storage ){

				if( key.match( new RegExp( "^" + self.name , "g" ) ) ){

					storage.removeItem( key );

				} // <-- if match

			} // <-- for storage
			
			resolve( self.name );
			
		} );
		
	};
	
/// --> Controlla se il db è cryptato
	
	localdbclass.prototype.isEncrypted = function(){
		
		var self = this;
		
		return new Promise( function( resolve, reject ){
			
			var storage = self.storage
			
			,count   = 0
			
			,cripted = 0
			
			;

		// --> Raccolgo tutte le tabelle di questo DB

			for( var key in storage ){

				if( key.match( new RegExp( "^" + self.name , "g" ) ) ){
					
					count++;
					
					if( tools.isJSON( function test(){
						
						try{
							
							var decryme = decrypt( storage[ key ] );
							
							return ( !decryme ) ? storage[ key ] : decryme;
							
						}catch( e ){
							
							return storage[ key ];
							
						}
						
					} ) === null )cripted++;

				} // <-- if match

			} // <-- for storage
						
			resolve( [ count, cripted ] );
			
		} );
		
	};
		
/// --> Rendo disponibile l'oggetto
	
	window.localdb = localdbclass;
	
} )();








