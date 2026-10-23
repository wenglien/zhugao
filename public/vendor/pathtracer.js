var ks=Object.defineProperty;var Os=(o,e)=>{for(var t in e)ks(o,t,{get:e[t],enumerable:!0})};import{BufferGeometry as aa}from"three";import{BufferAttribute as An,Box3 as ao,FrontSide as so}from"three";var gr=Math.pow(2,-24),lt=Symbol("SKIP_GENERATION");import{BufferAttribute as zs}from"three";function xi(o){return o.index?o.index.count:o.attributes.position.count}function K(o){return xi(o)/3}function yi(o,e=ArrayBuffer){return o>65535?new Uint32Array(new e(4*o)):new Uint16Array(new e(2*o))}function vr(o,e){if(!o.index){let t=o.attributes.position.count,i=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,s=yi(t,i);o.setIndex(new zs(s,1));for(let n=0;n<t;n++)s[n]=n}}function bi(o,e){let t=K(o),i=e||o.drawRange,s=i.start/3,n=(i.start+i.count)/3,r=Math.max(0,s),c=Math.min(t,n)-r;return[{offset:Math.floor(r),count:Math.floor(c)}]}function Ti(o,e){if(!o.groups||!o.groups.length)return bi(o,e);let t=[],i=new Set,s=e||o.drawRange,n=s.start/3,r=(s.start+s.count)/3;for(let l of o.groups){let m=l.start/3,f=(l.start+l.count)/3;i.add(Math.max(n,m)),i.add(Math.min(r,f))}let c=Array.from(i.values()).sort((l,m)=>l-m);for(let l=0;l<c.length-1;l++){let m=c[l],f=c[l+1];t.push({offset:Math.floor(m),count:Math.floor(f-m)})}return t}function xr(o,e){let t=K(o),i=Ti(o,e).sort((r,c)=>r.offset-c.offset),s=i[i.length-1];s.count=Math.min(t-s.offset,s.count);let n=0;return i.forEach(({count:r})=>n+=r),t!==n}function ut(o,e,t,i,s){let n=1/0,r=1/0,c=1/0,l=-1/0,m=-1/0,f=-1/0,u=1/0,a=1/0,d=1/0,v=-1/0,y=-1/0,h=-1/0;for(let p=e*6,g=(e+t)*6;p<g;p+=6){let x=o[p+0],T=o[p+1],b=x-T,w=x+T;b<n&&(n=b),w>l&&(l=w),x<u&&(u=x),x>v&&(v=x);let S=o[p+2],_=o[p+3],A=S-_,R=S+_;A<r&&(r=A),R>m&&(m=R),S<a&&(a=S),S>y&&(y=S);let F=o[p+4],I=o[p+5],P=F-I,M=F+I;P<c&&(c=P),M>f&&(f=M),F<d&&(d=F),F>h&&(h=F)}i[0]=n,i[1]=r,i[2]=c,i[3]=l,i[4]=m,i[5]=f,s[0]=u,s[1]=a,s[2]=d,s[3]=v,s[4]=y,s[5]=h}function yr(o,e=null,t=null,i=null){let s=o.attributes.position,n=o.index?o.index.array:null,r=K(o),c=s.normalized,l;e===null?(l=new Float32Array(r*6*4),t=0,i=r):(l=e,t=t||0,i=i||r);let m=s.array,f=s.offset||0,u=3;s.isInterleavedBufferAttribute&&(u=s.data.stride);let a=["getX","getY","getZ"];for(let d=t;d<t+i;d++){let v=d*3,y=d*6,h=v+0,p=v+1,g=v+2;n&&(h=n[h],p=n[p],g=n[g]),c||(h=h*u+f,p=p*u+f,g=g*u+f);for(let x=0;x<3;x++){let T,b,w;c?(T=s[a[x]](h),b=s[a[x]](p),w=s[a[x]](g)):(T=m[h+x],b=m[p+x],w=m[g+x]);let S=T;b<S&&(S=b),w<S&&(S=w);let _=T;b>_&&(_=b),w>_&&(_=w);let A=(_-S)/2,R=x*2;l[y+R+0]=S+A,l[y+R+1]=A+(Math.abs(S)+A)*gr}}return l}function B(o,e,t){return t.min.x=e[o],t.min.y=e[o+1],t.min.z=e[o+2],t.max.x=e[o+3],t.max.y=e[o+4],t.max.z=e[o+5],t}function wi(o){let e=-1,t=-1/0;for(let i=0;i<3;i++){let s=o[i+3]-o[i];s>t&&(t=s,e=i)}return e}function Si(o,e){e.set(o)}function _i(o,e,t){let i,s;for(let n=0;n<3;n++){let r=n+3;i=o[n],s=e[n],t[n]=i<s?i:s,i=o[r],s=e[r],t[r]=i>s?i:s}}function Ve(o,e,t){for(let i=0;i<3;i++){let s=e[o+2*i],n=e[o+2*i+1],r=s-n,c=s+n;r<t[i]&&(t[i]=r),c>t[i+3]&&(t[i+3]=c)}}function ye(o){let e=o[3]-o[0],t=o[4]-o[1],i=o[5]-o[2];return 2*(e*t+t*i+i*e)}var ee=32,Us=(o,e)=>o.candidate-e.candidate,re=new Array(ee).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),ft=new Float32Array(6);function Sr(o,e,t,i,s,n){let r=-1,c=0;if(n===0)r=wi(e),r!==-1&&(c=(e[r]+e[r+3])/2);else if(n===1)r=wi(o),r!==-1&&(c=Ws(t,i,s,r));else if(n===2){let l=ye(o),m=1.25*s,f=i*6,u=(i+s)*6;for(let a=0;a<3;a++){let d=e[a],h=(e[a+3]-d)/ee;if(s<ee/4){let p=[...re];p.length=s;let g=0;for(let T=f;T<u;T+=6,g++){let b=p[g];b.candidate=t[T+2*a],b.count=0;let{bounds:w,leftCacheBounds:S,rightCacheBounds:_}=b;for(let A=0;A<3;A++)_[A]=1/0,_[A+3]=-1/0,S[A]=1/0,S[A+3]=-1/0,w[A]=1/0,w[A+3]=-1/0;Ve(T,t,w)}p.sort(Us);let x=s;for(let T=0;T<x;T++){let b=p[T];for(;T+1<x&&p[T+1].candidate===b.candidate;)p.splice(T+1,1),x--}for(let T=f;T<u;T+=6){let b=t[T+2*a];for(let w=0;w<x;w++){let S=p[w];b>=S.candidate?Ve(T,t,S.rightCacheBounds):(Ve(T,t,S.leftCacheBounds),S.count++)}}for(let T=0;T<x;T++){let b=p[T],w=b.count,S=s-b.count,_=b.leftCacheBounds,A=b.rightCacheBounds,R=0;w!==0&&(R=ye(_)/l);let F=0;S!==0&&(F=ye(A)/l);let I=1+1.25*(R*w+F*S);I<m&&(r=a,m=I,c=b.candidate)}}else{for(let x=0;x<ee;x++){let T=re[x];T.count=0,T.candidate=d+h+x*h;let b=T.bounds;for(let w=0;w<3;w++)b[w]=1/0,b[w+3]=-1/0}for(let x=f;x<u;x+=6){let w=~~((t[x+2*a]-d)/h);w>=ee&&(w=ee-1);let S=re[w];S.count++,Ve(x,t,S.bounds)}let p=re[ee-1];Si(p.bounds,p.rightCacheBounds);for(let x=ee-2;x>=0;x--){let T=re[x],b=re[x+1];_i(T.bounds,b.rightCacheBounds,T.rightCacheBounds)}let g=0;for(let x=0;x<ee-1;x++){let T=re[x],b=T.count,w=T.bounds,_=re[x+1].rightCacheBounds;b!==0&&(g===0?Si(w,ft):_i(w,ft,ft)),g+=b;let A=0,R=0;g!==0&&(A=ye(ft)/l);let F=s-g;F!==0&&(R=ye(_)/l);let I=1+1.25*(A*g+R*F);I<m&&(r=a,m=I,c=T.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${n} used.`);return{axis:r,pos:c}}function Ws(o,e,t,i){let s=0;for(let n=e,r=e+t;n<r;n++)s+=o[n*6+i*2];return s/t}var be=class{constructor(){this.boundingData=new Float32Array(6)}};function _r(o,e,t,i,s,n){let r=i,c=i+s-1,l=n.pos,m=n.axis*2;for(;;){for(;r<=c&&t[r*6+m]<l;)r++;for(;r<=c&&t[c*6+m]>=l;)c--;if(r<c){for(let f=0;f<3;f++){let u=e[r*3+f];e[r*3+f]=e[c*3+f],e[c*3+f]=u}for(let f=0;f<6;f++){let u=t[r*6+f];t[r*6+f]=t[c*6+f],t[c*6+f]=u}r++,c--}else return r}}function Ar(o,e,t,i,s,n){let r=i,c=i+s-1,l=n.pos,m=n.axis*2;for(;;){for(;r<=c&&t[r*6+m]<l;)r++;for(;r<=c&&t[c*6+m]>=l;)c--;if(r<c){let f=o[r];o[r]=o[c],o[c]=f;for(let u=0;u<6;u++){let a=t[r*6+u];t[r*6+u]=t[c*6+u],t[c*6+u]=a}r++,c--}else return r}}function L(o,e){return e[o+15]===65535}function k(o,e){return e[o+6]}function O(o,e){return e[o+14]}function U(o){return o+8}function H(o,e){return e[o+6]}function Te(o,e){return e[o+7]}var Ir,Ge,mt,Rr,Vs=Math.pow(2,32);function ht(o){return"count"in o?1:1+ht(o.left)+ht(o.right)}function Fr(o,e,t){return Ir=new Float32Array(t),Ge=new Uint32Array(t),mt=new Uint16Array(t),Rr=new Uint8Array(t),Ai(o,e)}function Ai(o,e){let t=o/4,i=o/2,s="count"in e,n=e.boundingData;for(let r=0;r<6;r++)Ir[t+r]=n[r];if(s)if(e.buffer){let r=e.buffer;Rr.set(new Uint8Array(r),o);for(let c=o,l=o+r.byteLength;c<l;c+=32){let m=c/2;L(m,mt)||(Ge[c/4+6]+=t)}return o+r.byteLength}else{let r=e.offset,c=e.count;return Ge[t+6]=r,mt[i+14]=c,mt[i+15]=65535,o+32}else{let r=e.left,c=e.right,l=e.splitAxis,m;if(m=Ai(o+32,r),m/4>Vs)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return Ge[t+6]=m/4,m=Ai(m,c),Ge[t+7]=l,m}}function Gs(o,e){let t=(o.index?o.index.count:o.attributes.position.count)/3,i=t>2**16,s=i?4:2,n=e?new SharedArrayBuffer(t*s):new ArrayBuffer(t*s),r=i?new Uint32Array(n):new Uint16Array(n);for(let c=0,l=r.length;c<l;c++)r[c]=c;return r}function qs(o,e,t,i,s){let{maxDepth:n,verbose:r,maxLeafTris:c,strategy:l,onProgress:m,indirect:f}=s,u=o._indirectBuffer,a=o.geometry,d=a.index?a.index.array:null,v=f?Ar:_r,y=K(a),h=new Float32Array(6),p=!1,g=new be;return ut(e,t,i,g.boundingData,h),T(g,t,i,h),g;function x(b){m&&m(b/y)}function T(b,w,S,_=null,A=0){if(!p&&A>=n&&(p=!0,r&&(console.warn(`MeshBVH: Max depth of ${n} reached when generating BVH. Consider increasing maxDepth.`),console.warn(a))),S<=c||A>=n)return x(w+S),b.offset=w,b.count=S,b;let R=Sr(b.boundingData,_,e,w,S,l);if(R.axis===-1)return x(w+S),b.offset=w,b.count=S,b;let F=v(u,d,e,w,S,R);if(F===w||F===w+S)x(w+S),b.offset=w,b.count=S;else{b.splitAxis=R.axis;let I=new be,P=w,M=F-w;b.left=I,ut(e,P,M,I.boundingData,h),T(I,P,M,h,A+1);let C=new be,N=F,Q=S-M;b.right=C,ut(e,N,Q,C.boundingData,h),T(C,N,Q,h,A+1)}return b}}function Pr(o,e){let t=o.geometry;e.indirect&&(o._indirectBuffer=Gs(t,e.useSharedArrayBuffer),xr(t,e.range)&&!e.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),o._indirectBuffer||vr(t,e);let i=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,s=yr(t),n=e.indirect?bi(t,e.range):Ti(t,e.range);o._roots=n.map(r=>{let c=qs(o,s,r.offset,r.count,e),l=ht(c),m=new i(32*l);return Fr(0,c,m),m})}import{Vector3 as se,Matrix4 as Cr,Line3 as Dr}from"three";import{Vector3 as $s}from"three";var G=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let i=1/0,s=-1/0;for(let n=0,r=e.length;n<r;n++){let l=e[n][t];i=l<i?l:i,s=l>s?l:s}this.min=i,this.max=s}setFromPoints(e,t){let i=1/0,s=-1/0;for(let n=0,r=t.length;n<r;n++){let c=t[n],l=e.dot(c);i=l<i?l:i,s=l>s?l:s}this.min=i,this.max=s}isSeparated(e){return this.min>e.max||e.min>this.max}};G.prototype.setFromBox=function(){let o=new $s;return function(t,i){let s=i.min,n=i.max,r=1/0,c=-1/0;for(let l=0;l<=1;l++)for(let m=0;m<=1;m++)for(let f=0;f<=1;f++){o.x=s.x*l+n.x*(1-l),o.y=s.y*m+n.y*(1-m),o.z=s.z*f+n.z*(1-f);let u=t.dot(o);r=Math.min(u,r),c=Math.max(u,c)}this.min=r,this.max=c}}();var wl=function(){let o=new G;return function(t,i){let s=t.points,n=t.satAxes,r=t.satBounds,c=i.points,l=i.satAxes,m=i.satBounds;for(let f=0;f<3;f++){let u=r[f],a=n[f];if(o.setFromPoints(a,c),u.isSeparated(o))return!1}for(let f=0;f<3;f++){let u=m[f],a=l[f];if(o.setFromPoints(a,s),u.isSeparated(o))return!1}}}();import{Triangle as Ks,Vector3 as $,Line3 as we,Sphere as Zs,Plane as Js}from"three";import{Vector3 as fe,Vector2 as js,Plane as Ys,Line3 as Xs}from"three";var Qs=function(){let o=new fe,e=new fe,t=new fe;return function(s,n,r){let c=s.start,l=o,m=n.start,f=e;t.subVectors(c,m),o.subVectors(s.end,s.start),e.subVectors(n.end,n.start);let u=t.dot(f),a=f.dot(l),d=f.dot(f),v=t.dot(l),h=l.dot(l)*d-a*a,p,g;h!==0?p=(u*a-v*d)/h:p=0,g=(u+p*a)/d,r.x=p,r.y=g}}(),qe=function(){let o=new js,e=new fe,t=new fe;return function(s,n,r,c){Qs(s,n,o);let l=o.x,m=o.y;if(l>=0&&l<=1&&m>=0&&m<=1){s.at(l,r),n.at(m,c);return}else if(l>=0&&l<=1){m<0?n.at(0,c):n.at(1,c),s.closestPointToPoint(c,!0,r);return}else if(m>=0&&m<=1){l<0?s.at(0,r):s.at(1,r),n.closestPointToPoint(r,!0,c);return}else{let f;l<0?f=s.start:f=s.end;let u;m<0?u=n.start:u=n.end;let a=e,d=t;if(s.closestPointToPoint(u,!0,e),n.closestPointToPoint(f,!0,t),a.distanceToSquared(u)<=d.distanceToSquared(f)){r.copy(a),c.copy(u);return}else{r.copy(f),c.copy(d);return}}}}(),Mr=function(){let o=new fe,e=new fe,t=new Ys,i=new Xs;return function(n,r){let{radius:c,center:l}=n,{a:m,b:f,c:u}=r;if(i.start=m,i.end=f,i.closestPointToPoint(l,!0,o).distanceTo(l)<=c||(i.start=m,i.end=u,i.closestPointToPoint(l,!0,o).distanceTo(l)<=c)||(i.start=f,i.end=u,i.closestPointToPoint(l,!0,o).distanceTo(l)<=c))return!0;let y=r.getPlane(t);if(Math.abs(y.distanceToPoint(l))<=c){let p=y.projectPoint(l,e);if(r.containsPoint(p))return!0}return!1}}();var en=1e-15;function Ii(o){return Math.abs(o)<en}var W=class extends Ks{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new $),this.satBounds=new Array(4).fill().map(()=>new G),this.points=[this.a,this.b,this.c],this.sphere=new Zs,this.plane=new Js,this.needsUpdate=!0}intersectsSphere(e){return Mr(e,this)}update(){let e=this.a,t=this.b,i=this.c,s=this.points,n=this.satAxes,r=this.satBounds,c=n[0],l=r[0];this.getNormal(c),l.setFromPoints(c,s);let m=n[1],f=r[1];m.subVectors(e,t),f.setFromPoints(m,s);let u=n[2],a=r[2];u.subVectors(t,i),a.setFromPoints(u,s);let d=n[3],v=r[3];d.subVectors(i,e),v.setFromPoints(d,s),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(c,e),this.needsUpdate=!1}};W.prototype.closestPointToSegment=function(){let o=new $,e=new $,t=new we;return function(s,n=null,r=null){let{start:c,end:l}=s,m=this.points,f,u=1/0;for(let a=0;a<3;a++){let d=(a+1)%3;t.start.copy(m[a]),t.end.copy(m[d]),qe(t,s,o,e),f=o.distanceToSquared(e),f<u&&(u=f,n&&n.copy(o),r&&r.copy(e))}return this.closestPointToPoint(c,o),f=c.distanceToSquared(o),f<u&&(u=f,n&&n.copy(o),r&&r.copy(c)),this.closestPointToPoint(l,o),f=l.distanceToSquared(o),f<u&&(u=f,n&&n.copy(o),r&&r.copy(l)),Math.sqrt(u)}}();W.prototype.intersectsTriangle=function(){let o=new W,e=new Array(3),t=new Array(3),i=new G,s=new G,n=new $,r=new $,c=new $,l=new $,m=new $,f=new we,u=new we,a=new we,d=new $;function v(y,h,p){let g=y.points,x=0,T=-1;for(let b=0;b<3;b++){let{start:w,end:S}=f;w.copy(g[b]),S.copy(g[(b+1)%3]),f.delta(r);let _=Ii(h.distanceToPoint(w));if(Ii(h.normal.dot(r))&&_){p.copy(f),x=2;break}let A=h.intersectLine(f,d);if(!A&&_&&d.copy(w),(A||_)&&!Ii(d.distanceTo(S))){if(x<=1)(x===1?p.start:p.end).copy(d),_&&(T=x);else if(x>=2){(T===1?p.start:p.end).copy(d),x=2;break}if(x++,x===2&&T===-1)break}}return x}return function(h,p=null,g=!1){this.needsUpdate&&this.update(),h.isExtendedTriangle?h.needsUpdate&&h.update():(o.copy(h),o.update(),h=o);let x=this.plane,T=h.plane;if(Math.abs(x.normal.dot(T.normal))>1-1e-10){let b=this.satBounds,w=this.satAxes;t[0]=h.a,t[1]=h.b,t[2]=h.c;for(let A=0;A<4;A++){let R=b[A],F=w[A];if(i.setFromPoints(F,t),R.isSeparated(i))return!1}let S=h.satBounds,_=h.satAxes;e[0]=this.a,e[1]=this.b,e[2]=this.c;for(let A=0;A<4;A++){let R=S[A],F=_[A];if(i.setFromPoints(F,e),R.isSeparated(i))return!1}for(let A=0;A<4;A++){let R=w[A];for(let F=0;F<4;F++){let I=_[F];if(n.crossVectors(R,I),i.setFromPoints(n,e),s.setFromPoints(n,t),i.isSeparated(s))return!1}}return p&&(g||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),p.start.set(0,0,0),p.end.set(0,0,0)),!0}else{let b=v(this,T,u);if(b===1&&h.containsPoint(u.end))return p&&(p.start.copy(u.end),p.end.copy(u.end)),!0;if(b!==2)return!1;let w=v(h,x,a);if(w===1&&this.containsPoint(a.end))return p&&(p.start.copy(a.end),p.end.copy(a.end)),!0;if(w!==2)return!1;if(u.delta(c),a.delta(l),c.dot(l)<0){let P=a.start;a.start=a.end,a.end=P}let S=u.start.dot(c),_=u.end.dot(c),A=a.start.dot(c),R=a.end.dot(c),F=_<A,I=S<R;return S!==R&&A!==_&&F===I?!1:(p&&(m.subVectors(u.start,a.start),m.dot(c)>0?p.start.copy(u.start):p.start.copy(a.start),m.subVectors(u.end,a.end),m.dot(c)<0?p.end.copy(u.end):p.end.copy(a.end)),!0)}}}();W.prototype.distanceToPoint=function(){let o=new $;return function(t){return this.closestPointToPoint(t,o),t.distanceTo(o)}}();W.prototype.distanceToTriangle=function(){let o=new $,e=new $,t=["a","b","c"],i=new we,s=new we;return function(r,c=null,l=null){let m=c||l?i:null;if(this.intersectsTriangle(r,m))return(c||l)&&(c&&m.getCenter(c),l&&m.getCenter(l)),0;let f=1/0;for(let u=0;u<3;u++){let a,d=t[u],v=r[d];this.closestPointToPoint(v,o),a=v.distanceToSquared(o),a<f&&(f=a,c&&c.copy(o),l&&l.copy(v));let y=this[d];r.closestPointToPoint(y,o),a=y.distanceToSquared(o),a<f&&(f=a,c&&c.copy(y),l&&l.copy(o))}for(let u=0;u<3;u++){let a=t[u],d=t[(u+1)%3];i.set(this[a],this[d]);for(let v=0;v<3;v++){let y=t[v],h=t[(v+1)%3];s.set(r[y],r[h]),qe(i,s,o,e);let p=o.distanceToSquared(e);p<f&&(f=p,c&&c.copy(o),l&&l.copy(e))}}return Math.sqrt(f)}}();var z=class{constructor(e,t,i){this.isOrientedBox=!0,this.min=new se,this.max=new se,this.matrix=new Cr,this.invMatrix=new Cr,this.points=new Array(8).fill().map(()=>new se),this.satAxes=new Array(3).fill().map(()=>new se),this.satBounds=new Array(3).fill().map(()=>new G),this.alignedSatBounds=new Array(3).fill().map(()=>new G),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),i&&this.matrix.copy(i)}set(e,t,i){this.min.copy(e),this.max.copy(t),this.matrix.copy(i),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};z.prototype.update=function(){return function(){let e=this.matrix,t=this.min,i=this.max,s=this.points;for(let m=0;m<=1;m++)for(let f=0;f<=1;f++)for(let u=0;u<=1;u++){let a=1*m|2*f|4*u,d=s[a];d.x=m?i.x:t.x,d.y=f?i.y:t.y,d.z=u?i.z:t.z,d.applyMatrix4(e)}let n=this.satBounds,r=this.satAxes,c=s[0];for(let m=0;m<3;m++){let f=r[m],u=n[m],a=1<<m,d=s[a];f.subVectors(c,d),u.setFromPoints(f,s)}let l=this.alignedSatBounds;l[0].setFromPointsField(s,"x"),l[1].setFromPointsField(s,"y"),l[2].setFromPointsField(s,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();z.prototype.intersectsBox=function(){let o=new G;return function(t){this.needsUpdate&&this.update();let i=t.min,s=t.max,n=this.satBounds,r=this.satAxes,c=this.alignedSatBounds;if(o.min=i.x,o.max=s.x,c[0].isSeparated(o)||(o.min=i.y,o.max=s.y,c[1].isSeparated(o))||(o.min=i.z,o.max=s.z,c[2].isSeparated(o)))return!1;for(let l=0;l<3;l++){let m=r[l],f=n[l];if(o.setFromBox(m,t),f.isSeparated(o))return!1}return!0}}();z.prototype.intersectsTriangle=function(){let o=new W,e=new Array(3),t=new G,i=new G,s=new se;return function(r){this.needsUpdate&&this.update(),r.isExtendedTriangle?r.needsUpdate&&r.update():(o.copy(r),o.update(),r=o);let c=this.satBounds,l=this.satAxes;e[0]=r.a,e[1]=r.b,e[2]=r.c;for(let a=0;a<3;a++){let d=c[a],v=l[a];if(t.setFromPoints(v,e),d.isSeparated(t))return!1}let m=r.satBounds,f=r.satAxes,u=this.points;for(let a=0;a<3;a++){let d=m[a],v=f[a];if(t.setFromPoints(v,u),d.isSeparated(t))return!1}for(let a=0;a<3;a++){let d=l[a];for(let v=0;v<4;v++){let y=f[v];if(s.crossVectors(d,y),t.setFromPoints(s,e),i.setFromPoints(s,u),t.isSeparated(i))return!1}}return!0}}();z.prototype.closestPointToPoint=function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}}();z.prototype.distanceToPoint=function(){let o=new se;return function(t){return this.closestPointToPoint(t,o),t.distanceTo(o)}}();z.prototype.distanceToBox=function(){let o=["x","y","z"],e=new Array(12).fill().map(()=>new Dr),t=new Array(12).fill().map(()=>new Dr),i=new se,s=new se;return function(r,c=0,l=null,m=null){if(this.needsUpdate&&this.update(),this.intersectsBox(r))return(l||m)&&(r.getCenter(s),this.closestPointToPoint(s,i),r.closestPointToPoint(i,s),l&&l.copy(i),m&&m.copy(s)),0;let f=c*c,u=r.min,a=r.max,d=this.points,v=1/0;for(let h=0;h<8;h++){let p=d[h];s.copy(p).clamp(u,a);let g=p.distanceToSquared(s);if(g<v&&(v=g,l&&l.copy(p),m&&m.copy(s),g<f))return Math.sqrt(g)}let y=0;for(let h=0;h<3;h++)for(let p=0;p<=1;p++)for(let g=0;g<=1;g++){let x=(h+1)%3,T=(h+2)%3,b=p<<x|g<<T,w=1<<h|p<<x|g<<T,S=d[b],_=d[w];e[y].set(S,_);let R=o[h],F=o[x],I=o[T],P=t[y],M=P.start,C=P.end;M[R]=u[R],M[F]=p?u[F]:a[F],M[I]=g?u[I]:a[F],C[R]=a[R],C[F]=p?u[F]:a[F],C[I]=g?u[I]:a[F],y++}for(let h=0;h<=1;h++)for(let p=0;p<=1;p++)for(let g=0;g<=1;g++){s.x=h?a.x:u.x,s.y=p?a.y:u.y,s.z=g?a.z:u.z,this.closestPointToPoint(s,i);let x=s.distanceToSquared(i);if(x<v&&(v=x,l&&l.copy(i),m&&m.copy(s),x<f))return Math.sqrt(x)}for(let h=0;h<12;h++){let p=e[h];for(let g=0;g<12;g++){let x=t[g];qe(p,x,i,s);let T=i.distanceToSquared(s);if(T<v&&(v=T,l&&l.copy(i),m&&m.copy(s),T<f))return Math.sqrt(T)}}return Math.sqrt(v)}}();var ne=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}};var Ri=class extends ne{constructor(){super(()=>new W)}},V=new Ri;import{Box3 as rn}from"three";var Fi=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=i=>{t&&e.push(t),t=i,this.float32Array=new Float32Array(i),this.uint16Array=new Uint16Array(i),this.uint32Array=new Uint32Array(i)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},D=new Fi;var ae,_e,Se=[],pt=new ne(()=>new rn);function Br(o,e,t,i,s,n){ae=pt.getPrimitive(),_e=pt.getPrimitive(),Se.push(ae,_e),D.setBuffer(o._roots[e]);let r=Pi(0,o.geometry,t,i,s,n);D.clearBuffer(),pt.releasePrimitive(ae),pt.releasePrimitive(_e),Se.pop(),Se.pop();let c=Se.length;return c>0&&(_e=Se[c-1],ae=Se[c-2]),r}function Pi(o,e,t,i,s=null,n=0,r=0){let{float32Array:c,uint16Array:l,uint32Array:m}=D,f=o*2;if(L(f,l)){let a=k(o,m),d=O(f,l);return B(o,c,ae),i(a,d,!1,r,n+o,ae)}else{let R=function(I){let{uint16Array:P,uint32Array:M}=D,C=I*2;for(;!L(C,P);)I=U(I),C=I*2;return k(I,M)},F=function(I){let{uint16Array:P,uint32Array:M}=D,C=I*2;for(;!L(C,P);)I=H(I,M),C=I*2;return k(I,M)+O(C,P)},a=U(o),d=H(o,m),v=a,y=d,h,p,g,x;if(s&&(g=ae,x=_e,B(v,c,g),B(y,c,x),h=s(g),p=s(x),p<h)){v=d,y=a;let I=h;h=p,p=I,g=x}g||(g=ae,B(v,c,g));let T=L(v*2,l),b=t(g,T,h,r+1,n+v),w;if(b===2){let I=R(v),M=F(v)-I;w=i(I,M,!0,r+1,n+v,g)}else w=b&&Pi(v,e,t,i,s,n,r+1);if(w)return!0;x=_e,B(y,c,x);let S=L(y*2,l),_=t(x,S,p,r+1,n+y),A;if(_===2){let I=R(y),M=F(y)-I;A=i(I,M,!0,r+1,n+y,x)}else A=_&&Pi(y,e,t,i,s,n,r+1);return!!A}}import{Vector3 as Er}from"three";var $e=new Er,Mi=new Er;function Lr(o,e,t={},i=0,s=1/0){let n=i*i,r=s*s,c=1/0,l=null;if(o.shapecast({boundsTraverseOrder:f=>($e.copy(e).clamp(f.min,f.max),$e.distanceToSquared(e)),intersectsBounds:(f,u,a)=>a<c&&a<r,intersectsTriangle:(f,u)=>{f.closestPointToPoint(e,$e);let a=e.distanceToSquared($e);return a<c&&(Mi.copy($e),c=a,l=u),a<n}}),c===1/0)return null;let m=Math.sqrt(c);return t.point?t.point.copy(Mi):t.point=Mi.clone(),t.distance=m,t.faceIndex=l,t}import{Vector3 as te,Vector2 as je,Triangle as vt,DoubleSide as on,BackSide as sn}from"three";var Ae=new te,Ie=new te,Re=new te,xt=new je,yt=new je,bt=new je,Nr=new te,kr=new te,Or=new te,Tt=new te;function nn(o,e,t,i,s,n,r,c){let l;if(n===sn?l=o.intersectTriangle(i,t,e,!0,s):l=o.intersectTriangle(e,t,i,n!==on,s),l===null)return null;let m=o.origin.distanceTo(s);return m<r||m>c?null:{distance:m,point:s.clone()}}function an(o,e,t,i,s,n,r,c,l,m,f){Ae.fromBufferAttribute(e,n),Ie.fromBufferAttribute(e,r),Re.fromBufferAttribute(e,c);let u=nn(o,Ae,Ie,Re,Tt,l,m,f);if(u){i&&(xt.fromBufferAttribute(i,n),yt.fromBufferAttribute(i,r),bt.fromBufferAttribute(i,c),u.uv=vt.getInterpolation(Tt,Ae,Ie,Re,xt,yt,bt,new je)),s&&(xt.fromBufferAttribute(s,n),yt.fromBufferAttribute(s,r),bt.fromBufferAttribute(s,c),u.uv1=vt.getInterpolation(Tt,Ae,Ie,Re,xt,yt,bt,new je)),t&&(Nr.fromBufferAttribute(t,n),kr.fromBufferAttribute(t,r),Or.fromBufferAttribute(t,c),u.normal=vt.getInterpolation(Tt,Ae,Ie,Re,Nr,kr,Or,new te),u.normal.dot(o.direction)>0&&u.normal.multiplyScalar(-1));let a={a:n,b:r,c,normal:new te,materialIndex:0};vt.getNormal(Ae,Ie,Re,a.normal),u.face=a,u.faceIndex=n}return u}function Fe(o,e,t,i,s,n,r){let c=i*3,l=c+0,m=c+1,f=c+2,u=o.index;o.index&&(l=u.getX(l),m=u.getX(m),f=u.getX(f));let{position:a,normal:d,uv:v,uv1:y}=o.attributes,h=an(t,a,d,v,y,l,m,f,e,n,r);return h?(h.faceIndex=i,s&&s.push(h),h):null}import{Vector2 as Kl,Vector3 as Zl,Triangle as Jl}from"three";function E(o,e,t,i){let s=o.a,n=o.b,r=o.c,c=e,l=e+1,m=e+2;t&&(c=t.getX(c),l=t.getX(l),m=t.getX(m)),s.x=i.getX(c),s.y=i.getY(c),s.z=i.getZ(c),n.x=i.getX(l),n.y=i.getY(l),n.z=i.getZ(l),r.x=i.getX(m),r.y=i.getY(m),r.z=i.getZ(m)}function zr(o,e,t,i,s,n,r,c){let{geometry:l,_indirectBuffer:m}=o;for(let f=i,u=i+s;f<u;f++)Fe(l,e,t,f,n,r,c)}function Hr(o,e,t,i,s,n,r){let{geometry:c,_indirectBuffer:l}=o,m=1/0,f=null;for(let u=i,a=i+s;u<a;u++){let d;d=Fe(c,e,t,u,null,n,r),d&&d.distance<m&&(f=d,m=d.distance)}return f}function Ur(o,e,t,i,s,n,r){let{geometry:c}=t,{index:l}=c,m=c.attributes.position;for(let f=o,u=e+o;f<u;f++){let a;if(a=f,E(r,a*3,l,m),r.needsUpdate=!0,i(r,a,s,n))return!0}return!1}function Wr(o,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=o.geometry,i=t.index?t.index.array:null,s=t.attributes.position,n,r,c,l,m=0,f=o._roots;for(let a=0,d=f.length;a<d;a++)n=f[a],r=new Uint32Array(n),c=new Uint16Array(n),l=new Float32Array(n),u(0,m),m+=n.byteLength;function u(a,d,v=!1){let y=a*2;if(c[y+15]===65535){let p=r[a+6],g=c[y+14],x=1/0,T=1/0,b=1/0,w=-1/0,S=-1/0,_=-1/0;for(let A=3*p,R=3*(p+g);A<R;A++){let F=i[A],I=s.getX(F),P=s.getY(F),M=s.getZ(F);I<x&&(x=I),I>w&&(w=I),P<T&&(T=P),P>S&&(S=P),M<b&&(b=M),M>_&&(_=M)}return l[a+0]!==x||l[a+1]!==T||l[a+2]!==b||l[a+3]!==w||l[a+4]!==S||l[a+5]!==_?(l[a+0]=x,l[a+1]=T,l[a+2]=b,l[a+3]=w,l[a+4]=S,l[a+5]=_,!0):!1}else{let p=a+8,g=r[a+6],x=p+d,T=g+d,b=v,w=!1,S=!1;e?b||(w=e.has(x),S=e.has(T),b=!w&&!S):(w=!0,S=!0);let _=b||w,A=b||S,R=!1;_&&(R=u(p,d,b));let F=!1;A&&(F=u(g,d,b));let I=R||F;if(I)for(let P=0;P<3;P++){let M=p+P,C=g+P,N=l[M],Q=l[M+3],J=l[C],ie=l[C+3];l[a+P]=N<J?N:J,l[a+P+3]=Q>ie?Q:ie}return I}}}function j(o,e,t,i,s){let n,r,c,l,m,f,u=1/t.direction.x,a=1/t.direction.y,d=1/t.direction.z,v=t.origin.x,y=t.origin.y,h=t.origin.z,p=e[o],g=e[o+3],x=e[o+1],T=e[o+3+1],b=e[o+2],w=e[o+3+2];return u>=0?(n=(p-v)*u,r=(g-v)*u):(n=(g-v)*u,r=(p-v)*u),a>=0?(c=(x-y)*a,l=(T-y)*a):(c=(T-y)*a,l=(x-y)*a),n>l||c>r||((c>n||isNaN(n))&&(n=c),(l<r||isNaN(r))&&(r=l),d>=0?(m=(b-h)*d,f=(w-h)*d):(m=(w-h)*d,f=(b-h)*d),n>f||m>r)?!1:((m>n||n!==n)&&(n=m),(f<r||r!==r)&&(r=f),n<=s&&r>=i)}function Vr(o,e,t,i,s,n,r,c){let{geometry:l,_indirectBuffer:m}=o;for(let f=i,u=i+s;f<u;f++){let a=m?m[f]:f;Fe(l,e,t,a,n,r,c)}}function Gr(o,e,t,i,s,n,r){let{geometry:c,_indirectBuffer:l}=o,m=1/0,f=null;for(let u=i,a=i+s;u<a;u++){let d;d=Fe(c,e,t,l?l[u]:u,null,n,r),d&&d.distance<m&&(f=d,m=d.distance)}return f}function qr(o,e,t,i,s,n,r){let{geometry:c}=t,{index:l}=c,m=c.attributes.position;for(let f=o,u=e+o;f<u;f++){let a;if(a=t.resolveTriangleIndex(f),E(r,a*3,l,m),r.needsUpdate=!0,i(r,a,s,n))return!0}return!1}function $r(o,e,t,i,s,n,r){D.setBuffer(o._roots[e]),Ci(0,o,t,i,s,n,r),D.clearBuffer()}function Ci(o,e,t,i,s,n,r){let{float32Array:c,uint16Array:l,uint32Array:m}=D,f=o*2;if(L(f,l)){let a=k(o,m),d=O(f,l);zr(e,t,i,a,d,s,n,r)}else{let a=U(o);j(a,c,i,n,r)&&Ci(a,e,t,i,s,n,r);let d=H(o,m);j(d,c,i,n,r)&&Ci(d,e,t,i,s,n,r)}}var cn=["x","y","z"];function jr(o,e,t,i,s,n){D.setBuffer(o._roots[e]);let r=Di(0,o,t,i,s,n);return D.clearBuffer(),r}function Di(o,e,t,i,s,n){let{float32Array:r,uint16Array:c,uint32Array:l}=D,m=o*2;if(L(m,c)){let u=k(o,l),a=O(m,c);return Hr(e,t,i,u,a,s,n)}else{let u=Te(o,l),a=cn[u],v=i.direction[a]>=0,y,h;v?(y=U(o),h=H(o,l)):(y=H(o,l),h=U(o));let g=j(y,r,i,s,n)?Di(y,e,t,i,s,n):null;if(g){let b=g.point[a];if(v?b<=r[h+u]:b>=r[h+u+3])return g}let T=j(h,r,i,s,n)?Di(h,e,t,i,s,n):null;return g&&T?g.distance<=T.distance?g:T:g||T||null}}import{Box3 as ln,Matrix4 as un}from"three";var wt=new ln,Pe=new W,Me=new W,Ye=new un,Yr=new z,St=new z;function Xr(o,e,t,i){D.setBuffer(o._roots[e]);let s=Bi(0,o,t,i);return D.clearBuffer(),s}function Bi(o,e,t,i,s=null){let{float32Array:n,uint16Array:r,uint32Array:c}=D,l=o*2;if(s===null&&(t.boundingBox||t.computeBoundingBox(),Yr.set(t.boundingBox.min,t.boundingBox.max,i),s=Yr),L(l,r)){let f=e.geometry,u=f.index,a=f.attributes.position,d=t.index,v=t.attributes.position,y=k(o,c),h=O(l,r);if(Ye.copy(i).invert(),t.boundsTree)return B(o,n,St),St.matrix.copy(Ye),St.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:g=>St.intersectsBox(g),intersectsTriangle:g=>{g.a.applyMatrix4(i),g.b.applyMatrix4(i),g.c.applyMatrix4(i),g.needsUpdate=!0;for(let x=y*3,T=(h+y)*3;x<T;x+=3)if(E(Me,x,u,a),Me.needsUpdate=!0,g.intersectsTriangle(Me))return!0;return!1}});for(let p=y*3,g=(h+y)*3;p<g;p+=3){E(Pe,p,u,a),Pe.a.applyMatrix4(Ye),Pe.b.applyMatrix4(Ye),Pe.c.applyMatrix4(Ye),Pe.needsUpdate=!0;for(let x=0,T=d.count;x<T;x+=3)if(E(Me,x,d,v),Me.needsUpdate=!0,Pe.intersectsTriangle(Me))return!0}}else{let f=o+8,u=c[o+6];return B(f,n,wt),!!(s.intersectsBox(wt)&&Bi(f,e,t,i,s)||(B(u,n,wt),s.intersectsBox(wt)&&Bi(u,e,t,i,s)))}}import{Matrix4 as fn,Vector3 as At}from"three";var _t=new fn,Ei=new z,Xe=new z,mn=new At,hn=new At,dn=new At,pn=new At;function Qr(o,e,t,i={},s={},n=0,r=1/0){e.boundingBox||e.computeBoundingBox(),Ei.set(e.boundingBox.min,e.boundingBox.max,t),Ei.needsUpdate=!0;let c=o.geometry,l=c.attributes.position,m=c.index,f=e.attributes.position,u=e.index,a=V.getPrimitive(),d=V.getPrimitive(),v=mn,y=hn,h=null,p=null;s&&(h=dn,p=pn);let g=1/0,x=null,T=null;return _t.copy(t).invert(),Xe.matrix.copy(_t),o.shapecast({boundsTraverseOrder:b=>Ei.distanceToBox(b),intersectsBounds:(b,w,S)=>S<g&&S<r?(w&&(Xe.min.copy(b.min),Xe.max.copy(b.max),Xe.needsUpdate=!0),!0):!1,intersectsRange:(b,w)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:_=>Xe.distanceToBox(_),intersectsBounds:(_,A,R)=>R<g&&R<r,intersectsRange:(_,A)=>{for(let R=_,F=_+A;R<F;R++){E(d,3*R,u,f),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let I=b,P=b+w;I<P;I++){E(a,3*I,m,l),a.needsUpdate=!0;let M=a.distanceToTriangle(d,v,h);if(M<g&&(y.copy(v),p&&p.copy(h),g=M,x=I,T=R),M<n)return!0}}}});{let S=K(e);for(let _=0,A=S;_<A;_++){E(d,3*_,u,f),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let R=b,F=b+w;R<F;R++){E(a,3*R,m,l),a.needsUpdate=!0;let I=a.distanceToTriangle(d,v,h);if(I<g&&(y.copy(v),p&&p.copy(h),g=I,x=R,T=_),I<n)return!0}}}}}),V.releasePrimitive(a),V.releasePrimitive(d),g===1/0?null:(i.point?i.point.copy(y):i.point=y.clone(),i.distance=g,i.faceIndex=x,s&&(s.point?s.point.copy(p):s.point=p.clone(),s.point.applyMatrix4(_t),y.applyMatrix4(_t),s.distance=y.sub(s.point).length(),s.faceIndex=T),i)}function Kr(o,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=o.geometry,i=t.index?t.index.array:null,s=t.attributes.position,n,r,c,l,m=0,f=o._roots;for(let a=0,d=f.length;a<d;a++)n=f[a],r=new Uint32Array(n),c=new Uint16Array(n),l=new Float32Array(n),u(0,m),m+=n.byteLength;function u(a,d,v=!1){let y=a*2;if(c[y+15]===65535){let p=r[a+6],g=c[y+14],x=1/0,T=1/0,b=1/0,w=-1/0,S=-1/0,_=-1/0;for(let A=p,R=p+g;A<R;A++){let F=3*o.resolveTriangleIndex(A);for(let I=0;I<3;I++){let P=F+I;P=i?i[P]:P;let M=s.getX(P),C=s.getY(P),N=s.getZ(P);M<x&&(x=M),M>w&&(w=M),C<T&&(T=C),C>S&&(S=C),N<b&&(b=N),N>_&&(_=N)}}return l[a+0]!==x||l[a+1]!==T||l[a+2]!==b||l[a+3]!==w||l[a+4]!==S||l[a+5]!==_?(l[a+0]=x,l[a+1]=T,l[a+2]=b,l[a+3]=w,l[a+4]=S,l[a+5]=_,!0):!1}else{let p=a+8,g=r[a+6],x=p+d,T=g+d,b=v,w=!1,S=!1;e?b||(w=e.has(x),S=e.has(T),b=!w&&!S):(w=!0,S=!0);let _=b||w,A=b||S,R=!1;_&&(R=u(p,d,b));let F=!1;A&&(F=u(g,d,b));let I=R||F;if(I)for(let P=0;P<3;P++){let M=p+P,C=g+P,N=l[M],Q=l[M+3],J=l[C],ie=l[C+3];l[a+P]=N<J?N:J,l[a+P+3]=Q>ie?Q:ie}return I}}}function Zr(o,e,t,i,s,n,r){D.setBuffer(o._roots[e]),Li(0,o,t,i,s,n,r),D.clearBuffer()}function Li(o,e,t,i,s,n,r){let{float32Array:c,uint16Array:l,uint32Array:m}=D,f=o*2;if(L(f,l)){let a=k(o,m),d=O(f,l);Vr(e,t,i,a,d,s,n,r)}else{let a=U(o);j(a,c,i,n,r)&&Li(a,e,t,i,s,n,r);let d=H(o,m);j(d,c,i,n,r)&&Li(d,e,t,i,s,n,r)}}var gn=["x","y","z"];function Jr(o,e,t,i,s,n){D.setBuffer(o._roots[e]);let r=Ni(0,o,t,i,s,n);return D.clearBuffer(),r}function Ni(o,e,t,i,s,n){let{float32Array:r,uint16Array:c,uint32Array:l}=D,m=o*2;if(L(m,c)){let u=k(o,l),a=O(m,c);return Gr(e,t,i,u,a,s,n)}else{let u=Te(o,l),a=gn[u],v=i.direction[a]>=0,y,h;v?(y=U(o),h=H(o,l)):(y=H(o,l),h=U(o));let g=j(y,r,i,s,n)?Ni(y,e,t,i,s,n):null;if(g){let b=g.point[a];if(v?b<=r[h+u]:b>=r[h+u+3])return g}let T=j(h,r,i,s,n)?Ni(h,e,t,i,s,n):null;return g&&T?g.distance<=T.distance?g:T:g||T||null}}import{Box3 as vn,Matrix4 as xn}from"three";var It=new vn,Ce=new W,De=new W,Qe=new xn,eo=new z,Rt=new z;function to(o,e,t,i){D.setBuffer(o._roots[e]);let s=ki(0,o,t,i);return D.clearBuffer(),s}function ki(o,e,t,i,s=null){let{float32Array:n,uint16Array:r,uint32Array:c}=D,l=o*2;if(s===null&&(t.boundingBox||t.computeBoundingBox(),eo.set(t.boundingBox.min,t.boundingBox.max,i),s=eo),L(l,r)){let f=e.geometry,u=f.index,a=f.attributes.position,d=t.index,v=t.attributes.position,y=k(o,c),h=O(l,r);if(Qe.copy(i).invert(),t.boundsTree)return B(o,n,Rt),Rt.matrix.copy(Qe),Rt.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:g=>Rt.intersectsBox(g),intersectsTriangle:g=>{g.a.applyMatrix4(i),g.b.applyMatrix4(i),g.c.applyMatrix4(i),g.needsUpdate=!0;for(let x=y,T=h+y;x<T;x++)if(E(De,3*e.resolveTriangleIndex(x),u,a),De.needsUpdate=!0,g.intersectsTriangle(De))return!0;return!1}});for(let p=y,g=h+y;p<g;p++){let x=e.resolveTriangleIndex(p);E(Ce,3*x,u,a),Ce.a.applyMatrix4(Qe),Ce.b.applyMatrix4(Qe),Ce.c.applyMatrix4(Qe),Ce.needsUpdate=!0;for(let T=0,b=d.count;T<b;T+=3)if(E(De,T,d,v),De.needsUpdate=!0,Ce.intersectsTriangle(De))return!0}}else{let f=o+8,u=c[o+6];return B(f,n,It),!!(s.intersectsBox(It)&&ki(f,e,t,i,s)||(B(u,n,It),s.intersectsBox(It)&&ki(u,e,t,i,s)))}}import{Matrix4 as yn,Vector3 as Pt}from"three";var Ft=new yn,Oi=new z,Ke=new z,bn=new Pt,Tn=new Pt,wn=new Pt,Sn=new Pt;function io(o,e,t,i={},s={},n=0,r=1/0){e.boundingBox||e.computeBoundingBox(),Oi.set(e.boundingBox.min,e.boundingBox.max,t),Oi.needsUpdate=!0;let c=o.geometry,l=c.attributes.position,m=c.index,f=e.attributes.position,u=e.index,a=V.getPrimitive(),d=V.getPrimitive(),v=bn,y=Tn,h=null,p=null;s&&(h=wn,p=Sn);let g=1/0,x=null,T=null;return Ft.copy(t).invert(),Ke.matrix.copy(Ft),o.shapecast({boundsTraverseOrder:b=>Oi.distanceToBox(b),intersectsBounds:(b,w,S)=>S<g&&S<r?(w&&(Ke.min.copy(b.min),Ke.max.copy(b.max),Ke.needsUpdate=!0),!0):!1,intersectsRange:(b,w)=>{if(e.boundsTree){let S=e.boundsTree;return S.shapecast({boundsTraverseOrder:_=>Ke.distanceToBox(_),intersectsBounds:(_,A,R)=>R<g&&R<r,intersectsRange:(_,A)=>{for(let R=_,F=_+A;R<F;R++){let I=S.resolveTriangleIndex(R);E(d,3*I,u,f),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let P=b,M=b+w;P<M;P++){let C=o.resolveTriangleIndex(P);E(a,3*C,m,l),a.needsUpdate=!0;let N=a.distanceToTriangle(d,v,h);if(N<g&&(y.copy(v),p&&p.copy(h),g=N,x=P,T=R),N<n)return!0}}}})}else{let S=K(e);for(let _=0,A=S;_<A;_++){E(d,3*_,u,f),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let R=b,F=b+w;R<F;R++){let I=o.resolveTriangleIndex(R);E(a,3*I,m,l),a.needsUpdate=!0;let P=a.distanceToTriangle(d,v,h);if(P<g&&(y.copy(v),p&&p.copy(h),g=P,x=R,T=_),P<n)return!0}}}}}),V.releasePrimitive(a),V.releasePrimitive(d),g===1/0?null:(i.point?i.point.copy(y):i.point=y.clone(),i.distance=g,i.faceIndex=x,s&&(s.point?s.point.copy(p):s.point=p.clone(),s.point.applyMatrix4(Ft),y.applyMatrix4(Ft),s.distance=y.sub(s.point).length(),s.faceIndex=T),i)}function ro(){return typeof SharedArrayBuffer<"u"}import{Box3 as Je,Matrix4 as _n}from"three";var Ze=new D.constructor,Mt=new D.constructor,ce=new ne(()=>new Je),Be=new Je,Ee=new Je,zi=new Je,Hi=new Je,Ui=!1;function oo(o,e,t,i){if(Ui)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Ui=!0;let s=o._roots,n=e._roots,r,c=0,l=0,m=new _n().copy(t).invert();for(let f=0,u=s.length;f<u;f++){Ze.setBuffer(s[f]),l=0;let a=ce.getPrimitive();B(0,Ze.float32Array,a),a.applyMatrix4(m);for(let d=0,v=n.length;d<v&&(Mt.setBuffer(n[d]),r=Y(0,0,t,m,i,c,l,0,0,a),Mt.clearBuffer(),l+=n[d].length,!r);d++);if(ce.releasePrimitive(a),Ze.clearBuffer(),c+=s[f].length,r)break}return Ui=!1,r}function Y(o,e,t,i,s,n=0,r=0,c=0,l=0,m=null,f=!1){let u,a;f?(u=Mt,a=Ze):(u=Ze,a=Mt);let d=u.float32Array,v=u.uint32Array,y=u.uint16Array,h=a.float32Array,p=a.uint32Array,g=a.uint16Array,x=o*2,T=e*2,b=L(x,y),w=L(T,g),S=!1;if(w&&b)f?S=s(k(e,p),O(e*2,g),k(o,v),O(o*2,y),l,r+e,c,n+o):S=s(k(o,v),O(o*2,y),k(e,p),O(e*2,g),c,n+o,l,r+e);else if(w){let _=ce.getPrimitive();B(e,h,_),_.applyMatrix4(t);let A=U(o),R=H(o,v);B(A,d,Be),B(R,d,Ee);let F=_.intersectsBox(Be),I=_.intersectsBox(Ee);S=F&&Y(e,A,i,t,s,r,n,l,c+1,_,!f)||I&&Y(e,R,i,t,s,r,n,l,c+1,_,!f),ce.releasePrimitive(_)}else{let _=U(e),A=H(e,p);B(_,h,zi),B(A,h,Hi);let R=m.intersectsBox(zi),F=m.intersectsBox(Hi);if(R&&F)S=Y(o,_,t,i,s,n,r,c,l+1,m,f)||Y(o,A,t,i,s,n,r,c,l+1,m,f);else if(R)if(b)S=Y(o,_,t,i,s,n,r,c,l+1,m,f);else{let I=ce.getPrimitive();I.copy(zi).applyMatrix4(t);let P=U(o),M=H(o,v);B(P,d,Be),B(M,d,Ee);let C=I.intersectsBox(Be),N=I.intersectsBox(Ee);S=C&&Y(_,P,i,t,s,r,n,l,c+1,I,!f)||N&&Y(_,M,i,t,s,r,n,l,c+1,I,!f),ce.releasePrimitive(I)}else if(F)if(b)S=Y(o,A,t,i,s,n,r,c,l+1,m,f);else{let I=ce.getPrimitive();I.copy(Hi).applyMatrix4(t);let P=U(o),M=H(o,v);B(P,d,Be),B(M,d,Ee);let C=I.intersectsBox(Be),N=I.intersectsBox(Ee);S=C&&Y(A,P,i,t,s,r,n,l,c+1,I,!f)||N&&Y(A,M,i,t,s,r,n,l,c+1,I,!f),ce.releasePrimitive(I)}}return S}var Ct=new z,no=new ao,In={strategy:0,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null},et=class o{static serialize(e,t={}){t={cloneBuffers:!0,...t};let i=e.geometry,s=e._roots,n=e._indirectBuffer,r=i.getIndex(),c;return t.cloneBuffers?c={roots:s.map(l=>l.slice()),index:r?r.array.slice():null,indirectBuffer:n?n.slice():null}:c={roots:s,index:r?r.array:null,indirectBuffer:n},c}static deserialize(e,t,i={}){i={setIndex:!0,indirect:!!e.indirectBuffer,...i};let{index:s,roots:n,indirectBuffer:r}=e,c=new o(t,{...i,[lt]:!0});if(c._roots=n,c._indirectBuffer=r||null,i.setIndex){let l=t.getIndex();if(l===null){let m=new An(e.index,1,!1);t.setIndex(m)}else l.array!==s&&(l.array.set(s),l.needsUpdate=!0)}return c}get indirect(){return!!this._indirectBuffer}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(t=Object.assign({...In,[lt]:!1},t),t.useSharedArrayBuffer&&!ro())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,t[lt]||(Pr(this,t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new ao))),this.resolveTriangleIndex=t.indirect?i=>this._indirectBuffer[i]:i=>i}refit(e=null){return(this.indirect?Kr:Wr)(this,e)}traverse(e,t=0){let i=this._roots[t],s=new Uint32Array(i),n=new Uint16Array(i);r(0);function r(c,l=0){let m=c*2,f=n[m+15]===65535;if(f){let u=s[c+6],a=n[m+14];e(l,f,new Float32Array(i,c*4,6),u,a)}else{let u=c+32/4,a=s[c+6],d=s[c+7];e(l,f,new Float32Array(i,c*4,6),d)||(r(u,l+1),r(a,l+1))}}}raycast(e,t=so,i=0,s=1/0){let n=this._roots,r=this.geometry,c=[],l=t.isMaterial,m=Array.isArray(t),f=r.groups,u=l?t.side:t,a=this.indirect?Zr:$r;for(let d=0,v=n.length;d<v;d++){let y=m?t[f[d].materialIndex].side:u,h=c.length;if(a(this,d,y,e,c,i,s),m){let p=f[d].materialIndex;for(let g=h,x=c.length;g<x;g++)c[g].face.materialIndex=p}}return c}raycastFirst(e,t=so,i=0,s=1/0){let n=this._roots,r=this.geometry,c=t.isMaterial,l=Array.isArray(t),m=null,f=r.groups,u=c?t.side:t,a=this.indirect?Jr:jr;for(let d=0,v=n.length;d<v;d++){let y=l?t[f[d].materialIndex].side:u,h=a(this,d,y,e,i,s);h!=null&&(m==null||h.distance<m.distance)&&(m=h,l&&(h.face.materialIndex=f[d].materialIndex))}return m}intersectsGeometry(e,t){let i=!1,s=this._roots,n=this.indirect?to:Xr;for(let r=0,c=s.length;r<c&&(i=n(this,r,e,t),!i);r++);return i}shapecast(e){let t=V.getPrimitive(),i=this.indirect?qr:Ur,{boundsTraverseOrder:s,intersectsBounds:n,intersectsRange:r,intersectsTriangle:c}=e;if(r&&c){let u=r;r=(a,d,v,y,h)=>u(a,d,v,y,h)?!0:i(a,d,this,c,v,y,t)}else r||(c?r=(u,a,d,v)=>i(u,a,this,c,d,v,t):r=(u,a,d)=>d);let l=!1,m=0,f=this._roots;for(let u=0,a=f.length;u<a;u++){let d=f[u];if(l=Br(this,u,n,r,s,m),l)break;m+=d.byteLength}return V.releasePrimitive(t),l}bvhcast(e,t,i){let{intersectsRanges:s,intersectsTriangles:n}=i,r=V.getPrimitive(),c=this.geometry.index,l=this.geometry.attributes.position,m=this.indirect?v=>{let y=this.resolveTriangleIndex(v);E(r,y*3,c,l)}:v=>{E(r,v*3,c,l)},f=V.getPrimitive(),u=e.geometry.index,a=e.geometry.attributes.position,d=e.indirect?v=>{let y=e.resolveTriangleIndex(v);E(f,y*3,u,a)}:v=>{E(f,v*3,u,a)};if(n){let v=(y,h,p,g,x,T,b,w)=>{for(let S=p,_=p+g;S<_;S++){d(S),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let A=y,R=y+h;A<R;A++)if(m(A),r.needsUpdate=!0,n(r,f,A,S,x,T,b,w))return!0}return!1};if(s){let y=s;s=function(h,p,g,x,T,b,w,S){return y(h,p,g,x,T,b,w,S)?!0:v(h,p,g,x,T,b,w,S)}}else s=v}return oo(this,e,t,s)}intersectsBox(e,t){return Ct.set(e.min,e.max,t),Ct.needsUpdate=!0,this.shapecast({intersectsBounds:i=>Ct.intersectsBox(i),intersectsTriangle:i=>Ct.intersectsTriangle(i)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,i={},s={},n=0,r=1/0){return(this.indirect?io:Qr)(this,e,t,i,s,n,r)}closestPointToPoint(e,t={},i=0,s=1/0){return Lr(this,e,t,i,s)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(i=>{B(0,new Float32Array(i),no),e.union(no)}),e}};import{DataTexture as mo,FloatType as Nn,UnsignedIntType as kn,RGBAFormat as On,RGIntegerFormat as zn,NearestFilter as Lt,BufferAttribute as Hn}from"three";import{DataTexture as Rn,FloatType as Dt,IntType as Wi,UnsignedIntType as Bt,ByteType as co,UnsignedByteType as lo,ShortType as Fn,UnsignedShortType as Pn,RedFormat as Mn,RGFormat as Cn,RGBAFormat as Vi,RedIntegerFormat as Dn,RGIntegerFormat as Bn,RGBAIntegerFormat as Gi,NearestFilter as uo}from"three";function En(o){switch(o){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function Ln(o){switch(o){case 1:return Mn;case 2:return Cn;case 3:return Vi;case 4:return Vi}}function fo(o){switch(o){case 1:return Dn;case 2:return Bn;case 3:return Gi;case 4:return Gi}}var Et=class extends Rn{constructor(){super(),this.minFilter=uo,this.magFilter=uo,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){let t=this.overrideItemSize,i=e.itemSize,s=e.count;if(t!==null){if(i*s%t!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=t,e.count=s*i/t}let n=e.itemSize,r=e.count,c=e.normalized,l=e.array.constructor,m=l.BYTES_PER_ELEMENT,f=this._forcedType,u=n;if(f===null)switch(l){case Float32Array:f=Dt;break;case Uint8Array:case Uint16Array:case Uint32Array:f=Bt;break;case Int8Array:case Int16Array:case Int32Array:f=Wi;break}let a,d,v,y,h=En(n);switch(f){case Dt:v=1,d=Ln(n),c&&m===1?(y=l,h+="8",l===Uint8Array?a=lo:(a=co,h+="_SNORM")):(y=Float32Array,h+="32F",a=Dt);break;case Wi:h+=m*8+"I",v=c?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,d=fo(n),m===1?(y=Int8Array,a=co):m===2?(y=Int16Array,a=Fn):(y=Int32Array,a=Wi);break;case Bt:h+=m*8+"UI",v=c?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,d=fo(n),m===1?(y=Uint8Array,a=lo):m===2?(y=Uint16Array,a=Pn):(y=Uint32Array,a=Bt);break}u===3&&(d===Vi||d===Gi)&&(u=4);let p=Math.ceil(Math.sqrt(r))||1,g=u*p*p,x=new y(g),T=e.normalized;e.normalized=!1;for(let b=0;b<r;b++){let w=u*b;x[w]=e.getX(b)/v,n>=2&&(x[w+1]=e.getY(b)/v),n>=3&&(x[w+2]=e.getZ(b)/v,u===4&&(x[w+3]=1)),n>=4&&(x[w+3]=e.getW(b)/v)}e.normalized=T,this.internalFormat=h,this.format=d,this.type=a,this.image.width=p,this.image.height=p,this.image.data=x,this.needsUpdate=!0,this.dispose(),e.itemSize=i,e.count=s}},Le=class extends Et{constructor(){super(),this._forcedType=Bt}};var Ne=class extends Et{constructor(){super(),this._forcedType=Dt}};var Nt=class{constructor(){this.index=new Le,this.position=new Ne,this.bvhBounds=new mo,this.bvhContents=new mo,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){let{geometry:t}=e;if(Wn(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){let i=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==i.length)if(t.index)this._cachedIndexAttr=t.index.clone();else{let s=yi(xi(t));this._cachedIndexAttr=new Hn(s,1,!1)}Un(t,i,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){let{index:e,position:t,bvhBounds:i,bvhContents:s}=this;e&&e.dispose(),t&&t.dispose(),i&&i.dispose(),s&&s.dispose()}};function Un(o,e,t){let i=t.array,s=o.index?o.index.array:null;for(let n=0,r=e.length;n<r;n++){let c=3*n,l=3*e[n];for(let m=0;m<3;m++)i[c+m]=s?s[l+m]:l+m}}function Wn(o,e,t){let i=o._roots;if(i.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");let s=i[0],n=new Uint16Array(s),r=new Uint32Array(s),c=new Float32Array(s),l=s.byteLength/32,m=2*Math.ceil(Math.sqrt(l/2)),f=new Float32Array(4*m*m),u=Math.ceil(Math.sqrt(l)),a=new Uint32Array(2*u*u);for(let d=0;d<l;d++){let v=d*32/4,y=v*2,h=v;for(let p=0;p<3;p++)f[8*d+0+p]=c[h+0+p],f[8*d+4+p]=c[h+3+p];if(L(y,n)){let p=O(y,n),g=k(v,r),x=4294901760|p;a[d*2+0]=x,a[d*2+1]=g}else{let p=4*H(v,r)/32,g=Te(v,r);a[d*2+0]=g,a[d*2+1]=p}}e.image.data=f,e.image.width=m,e.image.height=m,e.format=On,e.type=Nn,e.internalFormat="RGBA32F",e.minFilter=Lt,e.magFilter=Lt,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose(),t.image.data=a,t.image.width=u,t.image.height=u,t.format=zn,t.type=kn,t.internalFormat="RG32UI",t.minFilter=Lt,t.magFilter=Lt,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose()}var me={};Os(me,{bvh_distance_functions:()=>ho,bvh_ray_functions:()=>$i,bvh_struct_definitions:()=>po,common_functions:()=>qi});var qi=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`;var ho=`

float dot2( vec3 v ) {

	return dot( v, v );

}

// https://www.shadertoy.com/view/ttfGWl
vec3 closestPointToTriangle( vec3 p, vec3 v0, vec3 v1, vec3 v2, out vec3 barycoord ) {

    vec3 v10 = v1 - v0;
    vec3 v21 = v2 - v1;
    vec3 v02 = v0 - v2;

	vec3 p0 = p - v0;
	vec3 p1 = p - v1;
	vec3 p2 = p - v2;

    vec3 nor = cross( v10, v02 );

    // method 2, in barycentric space
    vec3  q = cross( nor, p0 );
    float d = 1.0 / dot2( nor );
    float u = d * dot( q, v02 );
    float v = d * dot( q, v10 );
    float w = 1.0 - u - v;

	if( u < 0.0 ) {

		w = clamp( dot( p2, v02 ) / dot2( v02 ), 0.0, 1.0 );
		u = 0.0;
		v = 1.0 - w;

	} else if( v < 0.0 ) {

		u = clamp( dot( p0, v10 ) / dot2( v10 ), 0.0, 1.0 );
		v = 0.0;
		w = 1.0 - u;

	} else if( w < 0.0 ) {

		v = clamp( dot( p1, v21 ) / dot2( v21 ), 0.0, 1.0 );
		w = 0.0;
		u = 1.0-v;

	}

	barycoord = vec3( u, v, w );
    return u * v1 + v * v2 + w * v0;

}

float distanceToTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// point and cut off range
	vec3 point, float closestDistanceSquared,

	// outputs
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord, inout float side, inout vec3 outPoint
) {

	bool found = false;
	vec3 localBarycoord;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		// get the closest point and barycoord
		vec3 closestPoint = closestPointToTriangle( point, a, b, c, localBarycoord );
		vec3 delta = point - closestPoint;
		float sqDist = dot2( delta );
		if ( sqDist < closestDistanceSquared ) {

			// set the output results
			closestDistanceSquared = sqDist;
			faceIndices = uvec4( indices.xyz, i );
			faceNormal = normalize( cross( a - b, b - c ) );
			barycoord = localBarycoord;
			outPoint = closestPoint;
			side = sign( dot( faceNormal, delta ) );

		}

	}

	return closestDistanceSquared;

}

float distanceSqToBounds( vec3 point, vec3 boundsMin, vec3 boundsMax ) {

	vec3 clampedPoint = clamp( point, boundsMin, boundsMax );
	vec3 delta = point - clampedPoint;
	return dot( delta, delta );

}

float distanceSqToBVHNodeBoundsPoint( vec3 point, sampler2D bvhBounds, uint currNodeIndex ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return distanceSqToBounds( point, boundsMin, boundsMax );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhClosestPointToPoint(		bvh,		point, faceIndices, faceNormal, barycoord, side, outPoint	)	_bvhClosestPointToPoint(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		point, faceIndices, faceNormal, barycoord, side, outPoint	)

float _bvhClosestPointToPoint(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// point to check
	vec3 point,

	// output variables
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout vec3 outPoint
 ) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float closestDistanceSquared = pow( 100000.0, 2.0 );
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, currNodeIndex );
		if ( boundsHitDistance > closestDistanceSquared ) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );
		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;
			closestDistanceSquared = distanceToTriangles(
				bvh_position, bvh_index, offset, count, point, closestDistanceSquared,

				// outputs
				faceIndices, faceNormal, barycoord, side, outPoint
			);

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;
			bool leftToRight = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, leftIndex ) < distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, rightIndex );//rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;
			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return sqrt( closestDistanceSquared );

}
`;var $i=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`;var po=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`;var Kf=`
	${qi}
	${$i}
`;import{BufferAttribute as Po,BufferGeometry as Fo,Mesh as ia,MeshBasicMaterial as ra}from"three";import{BufferAttribute as Gn,BufferGeometry as qn}from"three";import{BufferAttribute as Vn}from"three";function kt(o,e,t=0){if(o.isInterleavedBufferAttribute){let i=o.itemSize;for(let s=0,n=o.count;s<n;s++){let r=s+t;e.setX(r,o.getX(s)),i>=2&&e.setY(r,o.getY(s)),i>=3&&e.setZ(r,o.getZ(s)),i>=4&&e.setW(r,o.getW(s))}}else{let i=e.array,s=i.constructor,n=i.BYTES_PER_ELEMENT*o.itemSize*t;new s(i.buffer,n,o.array.length).set(o.array)}}function he(o,e=null){let t=o.array.constructor,i=o.normalized,s=o.itemSize,n=e===null?o.count:e;return new Vn(new t(s*n),s,i)}function le(o,e){if(!o&&!e)return!0;if(!!o!=!!e)return!1;let t=o.count===e.count,i=o.normalized===e.normalized,s=o.array.constructor===e.array.constructor,n=o.itemSize===e.itemSize;return!(!t||!i||!s||!n)}function $n(o){let e=o[0].index!==null,t=new Set(Object.keys(o[0].attributes));if(!o[0].getAttribute("position"))throw new Error("StaticGeometryGenerator: position attribute is required.");for(let i=0;i<o.length;++i){let s=o[i],n=0;if(e!==(s.index!==null))throw new Error("StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");for(let r in s.attributes){if(!t.has(r))throw new Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure "'+r+'" attribute exists among all geometries, or in none of them.');n++}if(n!==t.size)throw new Error("StaticGeometryGenerator: All geometries must have the same number of attributes.")}}function jn(o){let e=0;for(let t=0,i=o.length;t<i;t++)e+=o[t].getIndex().count;return e}function Yn(o){let e=0;for(let t=0,i=o.length;t<i;t++)e+=o[t].getAttribute("position").count;return e}function Xn(o,e,t){o.index&&o.index.count!==e&&o.setIndex(null);let i=o.attributes;for(let s in i)i[s].count!==t&&o.deleteAttribute(s)}function go(o,e={},t=new qn){let{useGroups:i=!1,forceUpdate:s=!1,skipAssigningAttributes:n=[],overwriteIndex:r=!0}=e;$n(o);let c=o[0].index!==null,l=c?jn(o):-1,m=Yn(o);if(Xn(t,l,m),i){let u=0;for(let a=0,d=o.length;a<d;a++){let v=o[a],y;c?y=v.getIndex().count:y=v.getAttribute("position").count,t.addGroup(u,y,a),u+=y}}if(c){let u=!1;if(t.index||(t.setIndex(new Gn(new Uint32Array(l),1,!1)),u=!0),u||r){let a=0,d=0,v=t.getIndex();for(let y=0,h=o.length;y<h;y++){let p=o[y],g=p.getIndex();if(!(!s&&!u&&n[y]))for(let T=0;T<g.count;++T)v.setX(a+T,g.getX(T)+d);a+=g.count,d+=p.getAttribute("position").count}}}let f=Object.keys(o[0].attributes);for(let u=0,a=f.length;u<a;u++){let d=!1,v=f[u];if(!t.getAttribute(v)){let p=o[0].getAttribute(v);t.setAttribute(v,he(p,m)),d=!0}let y=0,h=t.getAttribute(v);for(let p=0,g=o.length;p<g;p++){let x=o[p],T=!s&&!d&&n[p],b=x.getAttribute(v);T||kt(b,h,y),y+=b.count}}}import{BufferAttribute as tt}from"three";function vo(o,e,t){let i=o.index,n=o.attributes.position.count,r=i?i.count:n,c=o.groups;c.length===0&&(c=[{count:r,start:0,materialIndex:0}]);let l=o.getAttribute("materialIndex");if(!l||l.count!==n){let f;t.length<=255?f=new Uint8Array(n):f=new Uint16Array(n),l=new tt(f,1,!1),o.deleteAttribute("materialIndex"),o.setAttribute("materialIndex",l)}let m=l.array;for(let f=0;f<c.length;f++){let u=c[f],a=u.start,d=u.count,v=Math.min(d,r-a),y=Array.isArray(e)?e[u.materialIndex]:e,h=t.indexOf(y);for(let p=0;p<v;p++){let g=a+p;i&&(g=i.getX(g)),m[g]=h}}}function xo(o,e){if(!o.index){let t=o.attributes.position.count,i=new Array(t);for(let s=0;s<t;s++)i[s]=s;o.setIndex(i)}if(!o.attributes.normal&&e&&e.includes("normal")&&o.computeVertexNormals(),!o.attributes.uv&&e&&e.includes("uv")){let t=o.attributes.position.count;o.setAttribute("uv",new tt(new Float32Array(t*2),2,!1))}if(!o.attributes.uv2&&e&&e.includes("uv2")){let t=o.attributes.position.count;o.setAttribute("uv2",new tt(new Float32Array(t*2),2,!1))}if(!o.attributes.tangent&&e&&e.includes("tangent"))if(o.attributes.uv&&o.attributes.normal)o.computeTangents();else{let t=o.attributes.position.count;o.setAttribute("tangent",new tt(new Float32Array(t*4),4,!1))}if(!o.attributes.color&&e&&e.includes("color")){let t=o.attributes.position.count,i=new Float32Array(t*4);i.fill(1),o.setAttribute("color",new tt(i,4))}}import{BufferGeometry as ta}from"three";import{Matrix4 as Qn}from"three";function ke(o){let e=0;if(o.byteLength!==0){let t=new Uint8Array(o);for(let i=0;i<o.byteLength;i++){let s=t[i];e=(e<<5)-e+s,e|=0}}return e}function yo(o){let e=o.uuid,t=Object.values(o.attributes);o.index&&(t.push(o.index),e+=`index|${o.index.version}`);let i=Object.keys(t).sort();for(let s of i){let n=t[s];e+=`${s}_${n.version}|`}return e}function bo(o){let e=o.skeleton;return e?(e.boneTexture||e.computeBoneTexture(),`${ke(e.boneTexture.image.data.buffer)}_${e.boneTexture.uuid}`):null}var Ot=class{constructor(e=null){this.matrixWorld=new Qn,this.geometryHash=null,this.skeletonHash=null,this.primitiveCount=-1,e!==null&&this.updateFrom(e)}updateFrom(e){let t=e.geometry,i=(t.index?t.index.count:t.attributes.position.count)/3;this.matrixWorld.copy(e.matrixWorld),this.geometryHash=yo(t),this.primitiveCount=i,this.skeletonHash=bo(e)}didChange(e){let t=e.geometry,i=(t.index?t.index.count:t.attributes.position.count)/3;return!(this.matrixWorld.equals(e.matrixWorld)&&this.geometryHash===yo(t)&&this.skeletonHash===bo(e)&&this.primitiveCount===i)}};import{BufferGeometry as Kn,Matrix3 as Zn,Matrix4 as Io,Vector3 as it,Vector4 as Xi}from"three";var de=new it,pe=new it,ge=new it,To=new Xi,zt=new it,ji=new it,wo=new Xi,So=new Xi,Ht=new Io,_o=new Io;function Ao(o,e,t){let i=o.skeleton,s=o.geometry,n=i.bones,r=i.boneInverses;wo.fromBufferAttribute(s.attributes.skinIndex,e),So.fromBufferAttribute(s.attributes.skinWeight,e),Ht.elements.fill(0);for(let c=0;c<4;c++){let l=So.getComponent(c);if(l!==0){let m=wo.getComponent(c);_o.multiplyMatrices(n[m].matrixWorld,r[m]),Jn(Ht,_o,l)}}return Ht.multiply(o.bindMatrix).premultiply(o.bindMatrixInverse),t.transformDirection(Ht),t}function Yi(o,e,t,i,s){zt.set(0,0,0);for(let n=0,r=o.length;n<r;n++){let c=e[n],l=o[n];c!==0&&(ji.fromBufferAttribute(l,i),t?zt.addScaledVector(ji,c):zt.addScaledVector(ji.sub(s),c))}s.add(zt)}function Jn(o,e,t){let i=o.elements,s=e.elements;for(let n=0,r=s.length;n<r;n++)i[n]+=s[n]*t}function ea(o){let{index:e,attributes:t}=o;if(e)for(let i=0,s=e.count;i<s;i+=3){let n=e.getX(i),r=e.getX(i+2);e.setX(i,r),e.setX(i+2,n)}else for(let i in t){let s=t[i],n=s.itemSize;for(let r=0,c=s.count;r<c;r+=3)for(let l=0;l<n;l++){let m=s.getComponent(r,l),f=s.getComponent(r+2,l);s.setComponent(r,l,f),s.setComponent(r+2,l,m)}}return o}function Ro(o,e={},t=new Kn){e={applyWorldTransforms:!0,attributes:[],...e};let i=o.geometry,s=e.applyWorldTransforms,n=e.attributes.includes("normal"),r=e.attributes.includes("tangent"),c=i.attributes,l=t.attributes;for(let g in t.attributes)(!e.attributes.includes(g)||!(g in i.attributes))&&t.deleteAttribute(g);!t.index&&i.index&&(t.index=i.index.clone()),l.position||t.setAttribute("position",he(c.position)),n&&!l.normal&&c.normal&&t.setAttribute("normal",he(c.normal)),r&&!l.tangent&&c.tangent&&t.setAttribute("tangent",he(c.tangent)),le(i.index,t.index),le(c.position,l.position),n&&le(c.normal,l.normal),r&&le(c.tangent,l.tangent);let m=c.position,f=n?c.normal:null,u=r?c.tangent:null,a=i.morphAttributes.position,d=i.morphAttributes.normal,v=i.morphAttributes.tangent,y=i.morphTargetsRelative,h=o.morphTargetInfluences,p=new Zn;p.getNormalMatrix(o.matrixWorld),i.index&&t.index.array.set(i.index.array);for(let g=0,x=c.position.count;g<x;g++)de.fromBufferAttribute(m,g),f&&pe.fromBufferAttribute(f,g),u&&(To.fromBufferAttribute(u,g),ge.fromBufferAttribute(u,g)),h&&(a&&Yi(a,h,y,g,de),d&&Yi(d,h,y,g,pe),v&&Yi(v,h,y,g,ge)),o.isSkinnedMesh&&(o.applyBoneTransform(g,de),f&&Ao(o,g,pe),u&&Ao(o,g,ge)),s&&de.applyMatrix4(o.matrixWorld),l.position.setXYZ(g,de.x,de.y,de.z),f&&(s&&pe.applyNormalMatrix(p),l.normal.setXYZ(g,pe.x,pe.y,pe.z)),u&&(s&&ge.transformDirection(o.matrixWorld),l.tangent.setXYZW(g,ge.x,ge.y,ge.z,To.w));for(let g in e.attributes){let x=e.attributes[g];x==="position"||x==="tangent"||x==="normal"||!(x in c)||(l[x]||t.setAttribute(x,he(c[x])),le(c[x],l[x]),kt(c[x],l[x]))}return o.matrixWorld.determinant()<0&&ea(t),t}var Ut=class extends ta{constructor(){super(),this.version=0,this.hash=null,this._diff=new Ot}isCompatible(e,t){let i=e.geometry;for(let s=0;s<t.length;s++){let n=t[s],r=i.attributes[n],c=this.attributes[n];if(r&&!le(r,c))return!1}return!0}updateFrom(e,t){let i=this._diff;return i.didChange(e)?(Ro(e,t,this),i.updateFrom(e),this.version++,this.hash=`${this.uuid}_${this.version}`,!0):!1}};var Vt=0,Qi=1,Ki=2;function oa(o,e){for(let t=0,i=o.length;t<i;t++)o[t].traverseVisible(n=>{n.isMesh&&e(n)})}function sa(o){let e=[];for(let t=0,i=o.length;t<i;t++){let s=o[t];Array.isArray(s.material)?e.push(...s.material):e.push(s.material)}return e}function na(o,e,t){if(o.length===0){e.setIndex(null);let i=e.attributes;for(let s in i)e.deleteAttribute(s);for(let s in t.attributes)e.setAttribute(t.attributes[s],new Po(new Float32Array(0),4,!1))}else go(o,t,e);for(let i in e.attributes)e.attributes[i].needsUpdate=!0}var Wt=class{constructor(e){this.objects=null,this.useGroups=!0,this.applyWorldTransforms=!0,this.generateMissingAttributes=!0,this.overwriteIndex=!0,this.attributes=["position","normal","color","tangent","uv","uv2"],this._intermediateGeometry=new Map,this._geometryMergeSets=new WeakMap,this._mergeOrder=[],this._dummyMesh=null,this.setObjects(e||[])}_getDummyMesh(){if(!this._dummyMesh){let e=new ra,t=new Fo;t.setAttribute("position",new Po(new Float32Array(9),3)),this._dummyMesh=new ia(t,e)}return this._dummyMesh}_getMeshes(){let e=[];return oa(this.objects,t=>{e.push(t)}),e.sort((t,i)=>t.uuid>i.uuid?1:t.uuid<i.uuid?-1:0),e.length===0&&e.push(this._getDummyMesh()),e}_updateIntermediateGeometries(){let{_intermediateGeometry:e}=this,t=this._getMeshes(),i=new Set(e.keys()),s={attributes:this.attributes,applyWorldTransforms:this.applyWorldTransforms};for(let n=0,r=t.length;n<r;n++){let c=t[n],l=c.uuid;i.delete(l);let m=e.get(l);(!m||!m.isCompatible(c,this.attributes))&&(m&&m.dispose(),m=new Ut,e.set(l,m)),m.updateFrom(c,s)&&this.generateMissingAttributes&&xo(m,this.attributes)}i.forEach(n=>{e.delete(n)})}setObjects(e){Array.isArray(e)?this.objects=[...e]:this.objects=[e]}generate(e=new Fo){let{useGroups:t,overwriteIndex:i,_intermediateGeometry:s,_geometryMergeSets:n}=this,r=this._getMeshes(),c=[],l=[],m=n.get(e)||[];this._updateIntermediateGeometries();let f=!1;r.length!==m.length&&(f=!0);for(let a=0,d=r.length;a<d;a++){let v=r[a],y=s.get(v.uuid);l.push(y);let h=m[a];!h||h.uuid!==y.uuid?(c.push(!1),f=!0):h.version!==y.version?c.push(!1):c.push(!0)}na(l,e,{useGroups:t,forceUpdate:f,skipAssigningAttributes:c,overwriteIndex:i}),f&&e.dispose(),n.set(e,l.map(a=>({version:a.version,uuid:a.uuid})));let u=Vt;return f?u=Ki:c.includes(!1)&&(u=Qi),{changeType:u,materials:sa(r),geometry:e}}};function ca(o){let e=new Set;for(let t=0,i=o.length;t<i;t++){let s=o[t];for(let n in s){let r=s[n];r&&r.isTexture&&e.add(r)}}return Array.from(e)}function la(o){let e=[],t=new Set;for(let s=0,n=o.length;s<n;s++)o[s].traverse(r=>{r.visible&&(r.isRectAreaLight||r.isSpotLight||r.isPointLight||r.isDirectionalLight)&&(e.push(r),r.iesMap&&t.add(r.iesMap))});let i=Array.from(t).sort((s,n)=>s.uuid<n.uuid?1:s.uuid>n.uuid?-1:0);return{lights:e,iesTextures:i}}var Gt=class{get initialized(){return!!this.bvh}constructor(e){this.bvhOptions={},this.attributes=["position","normal","tangent","color","uv","uv2"],this.generateBVH=!0,this.bvh=null,this.geometry=new aa,this.staticGeometryGenerator=new Wt(e),this._bvhWorker=null,this._pendingGenerate=null,this._buildAsync=!1}setObjects(e){this.staticGeometryGenerator.setObjects(e)}setBVHWorker(e){this._bvhWorker=e}async generateAsync(e=null){if(!this._bvhWorker)throw new Error('PathTracingSceneGenerator: "setBVHWorker" must be called before "generateAsync" can be called.');if(this.bvh instanceof Promise)return this._pendingGenerate||(this._pendingGenerate=new Promise(async()=>(await this.bvh,this._pendingGenerate=null,this.generateAsync(e)))),this._pendingGenerate;{this._buildAsync=!0;let t=this.generate(e);return this._buildAsync=!1,t.bvh=this.bvh=await t.bvh,t}}generate(e=null){let{staticGeometryGenerator:t,geometry:i,attributes:s}=this,n=t.objects;t.attributes=s,n.forEach(u=>{u.traverse(a=>{a.isSkinnedMesh&&a.skeleton&&a.skeleton.update()})});let r=t.generate(i),c=r.materials,l=ca(c),{lights:m,iesTextures:f}=la(n);if(r.changeType!==Vt&&vo(i,c,c),this.generateBVH){if(this.bvh instanceof Promise)throw new Error("PathTracingSceneGenerator: BVH is already building asynchronously.");if(r.changeType===Ki){let u={strategy:2,maxLeafTris:1,indirect:!0,onProgress:e,...this.bvhOptions};this._buildAsync?this.bvh=this._bvhWorker.generate(i,u):this.bvh=new et(i,u)}else r.changeType===Qi&&this.bvh.refit()}return{bvhChanged:r.changeType!==Vt,bvh:this.bvh,lights:m,iesTextures:f,geometry:i,materials:c,textures:l,objects:n}}};import{PerspectiveCamera as Uc,Scene as Wc,Vector2 as Ns,Clock as Vc,NormalBlending as Gc,NoBlending as Ls,AdditiveBlending as qc}from"three";import{RGBAFormat as ar,FloatType as cr,Color as pc,Vector2 as gc,WebGLRenderTarget as lr,NoBlending as vc,NormalBlending as xc,Vector4 as ur,NearestFilter as Ue}from"three";import{FullScreenQuad as Rs}from"three/addons/postprocessing/Pass.js";import{NoBlending as fa}from"three";import{ShaderMaterial as ua}from"three";var Z=class extends ua{set needsUpdate(e){super.needsUpdate=!0,this.dispatchEvent({type:"recompilation"})}constructor(e){super(e);for(let t in this.uniforms)Object.defineProperty(this,t,{get(){return this.uniforms[t].value},set(i){this.uniforms[t].value=i}})}setDefine(e,t=void 0){if(t==null){if(e in this.defines)return delete this.defines[e],this.needsUpdate=!0,!0}else if(this.defines[e]!==t)return this.defines[e]=t,this.needsUpdate=!0,!0;return!1}};var qt=class extends Z{constructor(e){super({blending:fa,uniforms:{target1:{value:null},target2:{value:null},opacity:{value:1}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				uniform float opacity;

				uniform sampler2D target1;
				uniform sampler2D target2;

				varying vec2 vUv;

				void main() {

					vec4 color1 = texture2D( target1, vUv );
					vec4 color2 = texture2D( target2, vUv );

					float invOpacity = 1.0 - opacity;
					float totalAlpha = color1.a * invOpacity + color2.a * opacity;

					if ( color1.a != 0.0 || color2.a != 0.0 ) {

						gl_FragColor.rgb = color1.rgb * ( invOpacity * color1.a / totalAlpha ) + color2.rgb * ( opacity * color2.a / totalAlpha );
						gl_FragColor.a = totalAlpha;

					} else {

						gl_FragColor = vec4( 0.0 );

					}

				}`}),this.setValues(e)}};import{FloatType as ma,NearestFilter as Do,NoBlending as ha,RGBAFormat as da,Vector2 as pa,WebGLRenderTarget as ga}from"three";import{FullScreenQuad as va}from"three/addons/postprocessing/Pass.js";function $t(o=1){let e="uint";return o>1&&(e="uvec"+o),`
		${e} sobolReverseBits( ${e} x ) {

			x = ( ( ( x & 0xaaaaaaaau ) >> 1 ) | ( ( x & 0x55555555u ) << 1 ) );
			x = ( ( ( x & 0xccccccccu ) >> 2 ) | ( ( x & 0x33333333u ) << 2 ) );
			x = ( ( ( x & 0xf0f0f0f0u ) >> 4 ) | ( ( x & 0x0f0f0f0fu ) << 4 ) );
			x = ( ( ( x & 0xff00ff00u ) >> 8 ) | ( ( x & 0x00ff00ffu ) << 8 ) );
			return ( ( x >> 16 ) | ( x << 16 ) );

		}

		${e} sobolHashCombine( uint seed, ${e} v ) {

			return seed ^ ( v + ${e}( ( seed << 6 ) + ( seed >> 2 ) ) );

		}

		${e} sobolLaineKarrasPermutation( ${e} x, ${e} seed ) {

			x += seed;
			x ^= x * 0x6c50b47cu;
			x ^= x * 0xb82f1e52u;
			x ^= x * 0xc7afe638u;
			x ^= x * 0x8d22f6e6u;
			return x;

		}

		${e} nestedUniformScrambleBase2( ${e} x, ${e} seed ) {

			x = sobolLaineKarrasPermutation( x, seed );
			x = sobolReverseBits( x );
			return x;

		}
	`}function jt(o=1){let e="uint",t="float",i="",s=".r",n="1u";return o>1&&(e="uvec"+o,t="vec"+o,i=o+"",o===2?(s=".rg",n="uvec2( 1u, 2u )"):o===3?(s=".rgb",n="uvec3( 1u, 2u, 3u )"):(s="",n="uvec4( 1u, 2u, 3u, 4u )")),`

		${t} sobol${i}( int effect ) {

			uint seed = sobolGetSeed( sobolBounceIndex, uint( effect ) );
			uint index = sobolPathIndex;

			uint shuffle_seed = sobolHashCombine( seed, 0u );
			uint shuffled_index = nestedUniformScrambleBase2( sobolReverseBits( index ), shuffle_seed );
			${t} sobol_pt = sobolGetTexturePoint( shuffled_index )${s};
			${e} result = ${e}( sobol_pt * 16777216.0 );

			${e} seed2 = sobolHashCombine( seed, ${n} );
			result = nestedUniformScrambleBase2( result, seed2 );

			return SOBOL_FACTOR * ${t}( result >> 8 );

		}
	`}var Yt=`

	// Utils
	const float SOBOL_FACTOR = 1.0 / 16777216.0;
	const uint SOBOL_MAX_POINTS = 256u * 256u;

	${$t(1)}
	${$t(2)}
	${$t(3)}
	${$t(4)}

	uint sobolHash( uint x ) {

		// finalizer from murmurhash3
		x ^= x >> 16;
		x *= 0x85ebca6bu;
		x ^= x >> 13;
		x *= 0xc2b2ae35u;
		x ^= x >> 16;
		return x;

	}

`,Mo=`

	const uint SOBOL_DIRECTIONS_1[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0xa0000000u, 0xf0000000u,
		0x88000000u, 0xcc000000u, 0xaa000000u, 0xff000000u,
		0x80800000u, 0xc0c00000u, 0xa0a00000u, 0xf0f00000u,
		0x88880000u, 0xcccc0000u, 0xaaaa0000u, 0xffff0000u,
		0x80008000u, 0xc000c000u, 0xa000a000u, 0xf000f000u,
		0x88008800u, 0xcc00cc00u, 0xaa00aa00u, 0xff00ff00u,
		0x80808080u, 0xc0c0c0c0u, 0xa0a0a0a0u, 0xf0f0f0f0u,
		0x88888888u, 0xccccccccu, 0xaaaaaaaau, 0xffffffffu
	);

	const uint SOBOL_DIRECTIONS_2[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x60000000u, 0x90000000u,
		0xe8000000u, 0x5c000000u, 0x8e000000u, 0xc5000000u,
		0x68800000u, 0x9cc00000u, 0xee600000u, 0x55900000u,
		0x80680000u, 0xc09c0000u, 0x60ee0000u, 0x90550000u,
		0xe8808000u, 0x5cc0c000u, 0x8e606000u, 0xc5909000u,
		0x6868e800u, 0x9c9c5c00u, 0xeeee8e00u, 0x5555c500u,
		0x8000e880u, 0xc0005cc0u, 0x60008e60u, 0x9000c590u,
		0xe8006868u, 0x5c009c9cu, 0x8e00eeeeu, 0xc5005555u
	);

	const uint SOBOL_DIRECTIONS_3[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x20000000u, 0x50000000u,
		0xf8000000u, 0x74000000u, 0xa2000000u, 0x93000000u,
		0xd8800000u, 0x25400000u, 0x59e00000u, 0xe6d00000u,
		0x78080000u, 0xb40c0000u, 0x82020000u, 0xc3050000u,
		0x208f8000u, 0x51474000u, 0xfbea2000u, 0x75d93000u,
		0xa0858800u, 0x914e5400u, 0xdbe79e00u, 0x25db6d00u,
		0x58800080u, 0xe54000c0u, 0x79e00020u, 0xb6d00050u,
		0x800800f8u, 0xc00c0074u, 0x200200a2u, 0x50050093u
	);

	const uint SOBOL_DIRECTIONS_4[ 32 ] = uint[ 32 ](
		0x80000000u, 0x40000000u, 0x20000000u, 0xb0000000u,
		0xf8000000u, 0xdc000000u, 0x7a000000u, 0x9d000000u,
		0x5a800000u, 0x2fc00000u, 0xa1600000u, 0xf0b00000u,
		0xda880000u, 0x6fc40000u, 0x81620000u, 0x40bb0000u,
		0x22878000u, 0xb3c9c000u, 0xfb65a000u, 0xddb2d000u,
		0x78022800u, 0x9c0b3c00u, 0x5a0fb600u, 0x2d0ddb00u,
		0xa2878080u, 0xf3c9c040u, 0xdb65a020u, 0x6db2d0b0u,
		0x800228f8u, 0x400b3cdcu, 0x200fb67au, 0xb00ddb9du
	);

	uint getMaskedSobol( uint index, uint directions[ 32 ] ) {

		uint X = 0u;
		for ( int bit = 0; bit < 32; bit ++ ) {

			uint mask = ( index >> bit ) & 1u;
			X ^= mask * directions[ bit ];

		}
		return X;

	}

	vec4 generateSobolPoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			return vec4( 0.0 );

		}

		// NOTE: this sobol "direction" is also available but we can't write out 5 components
		// uint x = index & 0x00ffffffu;
		uint x = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_1 ) ) & 0x00ffffffu;
		uint y = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_2 ) ) & 0x00ffffffu;
		uint z = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_3 ) ) & 0x00ffffffu;
		uint w = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_4 ) ) & 0x00ffffffu;

		return vec4( x, y, z, w ) * SOBOL_FACTOR;

	}

`,Co=`

	// Seeds
	uniform sampler2D sobolTexture;
	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;

	uint sobolGetSeed( uint bounce, uint effect ) {

		return sobolHash(
			sobolHashCombine(
				sobolHashCombine(
					sobolHash( bounce ),
					sobolPixelIndex
				),
				effect
			)
		);

	}

	vec4 sobolGetTexturePoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			index = index % SOBOL_MAX_POINTS;

		}

		uvec2 dim = uvec2( textureSize( sobolTexture, 0 ).xy );
		uint y = index / dim.x;
		uint x = index - y * dim.x;
		vec2 uv = vec2( x, y ) / vec2( dim );
		return texture( sobolTexture, uv );

	}

	${jt(1)}
	${jt(2)}
	${jt(3)}
	${jt(4)}

`;var Zi=class extends Z{constructor(){super({blending:ha,uniforms:{resolution:{value:new pa}},vertexShader:`

				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`

				${Yt}
				${Mo}

				varying vec2 vUv;
				uniform vec2 resolution;
				void main() {

					uint index = uint( gl_FragCoord.y ) * uint( resolution.x ) + uint( gl_FragCoord.x );
					gl_FragColor = generateSobolPoint( index );

				}
			`})}},Xt=class{generate(e,t=256){let i=new ga(t,t,{type:ma,format:da,minFilter:Do,magFilter:Do,generateMipmaps:!1}),s=e.getRenderTarget();e.setRenderTarget(i);let n=new va(new Zi);return n.material.resolution.set(t,t),n.render(e),e.setRenderTarget(s),n.dispose(),i}};import{ClampToEdgeWrapping as Is,HalfFloatType as hc,Matrix4 as fi,Vector2 as dc}from"three";import{PerspectiveCamera as xa}from"three";var Qt=class extends xa{set bokehSize(e){this.fStop=this.getFocalLength()/e}get bokehSize(){return this.getFocalLength()/this.fStop}constructor(...e){super(...e),this.fStop=1.4,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=25,this.anamorphicRatio=1}copy(e,t){return super.copy(e,t),this.fStop=e.fStop,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio,this}};var Kt=class{constructor(){this.bokehSize=0,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=10,this.anamorphicRatio=1}updateFrom(e){e instanceof Qt?(this.bokehSize=e.bokehSize,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio):(this.bokehSize=0,this.apertureRotation=0,this.apertureBlades=0,this.focusDistance=10,this.anamorphicRatio=1)}};import{DataTexture as Ji,RedFormat as Bo,LinearFilter as Oe,DataUtils as ve,HalfFloatType as ue,Source as ba,RepeatWrapping as er,RGBAFormat as Ta,FloatType as wa,ClampToEdgeWrapping as Sa}from"three";import{DataUtils as ya}from"three";function Zt(o){let e=new Uint16Array(o.length);for(let t=0,i=o.length;t<i;++t)e[t]=ya.toHalfFloat(o[t]);return e}function Eo(o,e,t=0,i=o.length){let s=t,n=t+i-1;for(;s<n;){let r=s+n>>1;o[r]<e?s=r+1:n=r}return s-t}function _a(o,e,t){return .2126*o+.7152*e+.0722*t}function Aa(o,e=ue){let t=o.clone();t.source=new ba({...t.image});let{width:i,height:s,data:n}=t.image,r=n;if(t.type!==e){e===ue?r=new Uint16Array(n.length):r=new Float32Array(n.length);let c;n instanceof Int8Array||n instanceof Int16Array||n instanceof Int32Array?c=2**(8*n.BYTES_PER_ELEMENT-1)-1:c=2**(8*n.BYTES_PER_ELEMENT)-1;for(let l=0,m=n.length;l<m;l++){let f=n[l];t.type===ue&&(f=ve.fromHalfFloat(n[l])),t.type!==wa&&t.type!==ue&&(f/=c),e===ue&&(r[l]=ve.toHalfFloat(f))}t.image.data=r,t.type=e}if(t.flipY){let c=r;r=r.slice();for(let l=0;l<s;l++)for(let m=0;m<i;m++){let f=s-l-1,u=4*(l*i+m),a=4*(f*i+m);r[a+0]=c[u+0],r[a+1]=c[u+1],r[a+2]=c[u+2],r[a+3]=c[u+3]}t.flipY=!1,t.image.data=r}return t}var Jt=class{constructor(){let e=new Ji(Zt(new Float32Array([0,0,0,0])),1,1);e.type=ue,e.format=Ta,e.minFilter=Oe,e.magFilter=Oe,e.wrapS=er,e.wrapT=er,e.generateMipmaps=!1,e.needsUpdate=!0;let t=new Ji(Zt(new Float32Array([0,1])),1,2);t.type=ue,t.format=Bo,t.minFilter=Oe,t.magFilter=Oe,t.generateMipmaps=!1,t.needsUpdate=!0;let i=new Ji(Zt(new Float32Array([0,0,1,1])),2,2);i.type=ue,i.format=Bo,i.minFilter=Oe,i.magFilter=Oe,i.generateMipmaps=!1,i.needsUpdate=!0,this.map=e,this.marginalWeights=t,this.conditionalWeights=i,this.totalSum=0}dispose(){this.marginalWeights.dispose(),this.conditionalWeights.dispose(),this.map.dispose()}updateFrom(e){let t=Aa(e);t.wrapS=er,t.wrapT=Sa;let{width:i,height:s,data:n}=t.image,r=new Float32Array(i*s),c=new Float32Array(i*s),l=new Float32Array(s),m=new Float32Array(s),f=0,u=0;for(let h=0;h<s;h++){let p=0;for(let g=0;g<i;g++){let x=h*i+g,T=ve.fromHalfFloat(n[4*x+0]),b=ve.fromHalfFloat(n[4*x+1]),w=ve.fromHalfFloat(n[4*x+2]),S=_a(T,b,w);p+=S,f+=S,r[x]=S,c[x]=p}if(p!==0)for(let g=h*i,x=h*i+i;g<x;g++)r[g]/=p,c[g]/=p;u+=p,l[h]=p,m[h]=u}if(u!==0)for(let h=0,p=l.length;h<p;h++)l[h]/=u,m[h]/=u;let a=new Uint16Array(s),d=new Uint16Array(i*s);for(let h=0;h<s;h++){let p=(h+1)/s,g=Eo(m,p);a[h]=ve.toHalfFloat((g+.5)/s)}for(let h=0;h<s;h++)for(let p=0;p<i;p++){let g=h*i+p,x=(p+1)/i,T=Eo(c,x,h*i,i);d[g]=ve.toHalfFloat((T+.5)/i)}this.dispose();let{marginalWeights:v,conditionalWeights:y}=this;v.image={width:s,height:1,data:a},v.needsUpdate=!0,y.image={width:i,height:s,data:d},y.needsUpdate=!0,this.totalSum=f,this.map=t}};import{DataTexture as Ia,RGBAFormat as Ra,ClampToEdgeWrapping as Lo,FloatType as Fa,Vector3 as rt,Quaternion as Pa,Matrix4 as Ma,NearestFilter as No}from"three";var tr=6,Ca=0,Da=1,Ba=2,Ea=3,La=4,X=new rt,q=new rt,ko=new Ma,ze=new Pa,Oo=new rt,He=new rt,Na=new rt(0,1,0),ei=class{constructor(){let e=new Ia(new Float32Array(4),1,1);e.format=Ra,e.type=Fa,e.wrapS=Lo,e.wrapT=Lo,e.generateMipmaps=!1,e.minFilter=No,e.magFilter=No,this.tex=e,this.count=0}updateFrom(e,t=[]){let i=this.tex,s=Math.max(e.length*tr,1),n=Math.ceil(Math.sqrt(s));i.image.width!==n&&(i.dispose(),i.image.data=new Float32Array(n*n*4),i.image.width=n,i.image.height=n);let r=i.image.data;for(let l=0,m=e.length;l<m;l++){let f=e[l],u=l*tr*4,a=0;for(let v=0;v<tr*4;v++)r[u+v]=0;f.getWorldPosition(q),r[u+a++]=q.x,r[u+a++]=q.y,r[u+a++]=q.z;let d=Ca;if(f.isRectAreaLight&&f.isCircular?d=Da:f.isSpotLight?d=Ba:f.isDirectionalLight?d=Ea:f.isPointLight&&(d=La),r[u+a++]=d,r[u+a++]=f.color.r,r[u+a++]=f.color.g,r[u+a++]=f.color.b,r[u+a++]=f.intensity,f.getWorldQuaternion(ze),f.isRectAreaLight)X.set(f.width,0,0).applyQuaternion(ze),r[u+a++]=X.x,r[u+a++]=X.y,r[u+a++]=X.z,a++,q.set(0,f.height,0).applyQuaternion(ze),r[u+a++]=q.x,r[u+a++]=q.y,r[u+a++]=q.z,r[u+a++]=X.cross(q).length()*(f.isCircular?Math.PI/4:1);else if(f.isSpotLight){let v=f.radius||0;Oo.setFromMatrixPosition(f.matrixWorld),He.setFromMatrixPosition(f.target.matrixWorld),ko.lookAt(Oo,He,Na),ze.setFromRotationMatrix(ko),X.set(1,0,0).applyQuaternion(ze),r[u+a++]=X.x,r[u+a++]=X.y,r[u+a++]=X.z,a++,q.set(0,1,0).applyQuaternion(ze),r[u+a++]=q.x,r[u+a++]=q.y,r[u+a++]=q.z,r[u+a++]=Math.PI*v*v,r[u+a++]=v,r[u+a++]=f.decay,r[u+a++]=f.distance,r[u+a++]=Math.cos(f.angle),r[u+a++]=Math.cos(f.angle*(1-f.penumbra)),r[u+a++]=f.iesMap?t.indexOf(f.iesMap):-1}else if(f.isPointLight){let v=X.setFromMatrixPosition(f.matrixWorld);r[u+a++]=v.x,r[u+a++]=v.y,r[u+a++]=v.z,a++,a+=4,a+=1,r[u+a++]=f.decay,r[u+a++]=f.distance}else if(f.isDirectionalLight){let v=X.setFromMatrixPosition(f.matrixWorld),y=q.setFromMatrixPosition(f.target.matrixWorld);He.subVectors(v,y).normalize(),r[u+a++]=He.x,r[u+a++]=He.y,r[u+a++]=He.z}}this.count=e.length;let c=ke(r.buffer);return this.hash!==c?(this.hash=c,i.needsUpdate=!0,!0):!1}};import{DataArrayTexture as ka,FloatType as Oa,RGBAFormat as za}from"three";function zo(o,e,t,i,s){if(e>i)throw new Error;let n=o.length/e,r=o.constructor.BYTES_PER_ELEMENT*8,c=1;switch(o.constructor){case Uint8Array:case Uint16Array:case Uint32Array:c=2**r-1;break;case Int8Array:case Int16Array:case Int32Array:c=2**(r-1)-1;break}for(let l=0;l<n;l++){let m=4*l,f=e*l;for(let u=0;u<i;u++)t[s+m+u]=e>=u+1?o[f+u]/c:0}}var ti=class extends ka{constructor(){super(),this._textures=[],this.type=Oa,this.format=za,this.internalFormat="RGBA32F"}updateAttribute(e,t){let i=this._textures[e];i.updateFrom(t);let s=i.image,n=this.image;if(s.width!==n.width||s.height!==n.height)throw new Error("FloatAttributeTextureArray: Attribute must be the same dimensions when updating single layer.");let{width:r,height:c,data:l}=n,f=r*c*4*e,u=t.itemSize;u===3&&(u=4),zo(i.image.data,u,l,4,f),this.dispose(),this.needsUpdate=!0}setAttributes(e){let t=e[0].count,i=e.length;for(let u=0,a=i;u<a;u++)if(e[u].count!==t)throw new Error("FloatAttributeTextureArray: All attributes must have the same item count.");let s=this._textures;for(;s.length<i;){let u=new Ne;s.push(u)}for(;s.length>i;)s.pop();for(let u=0,a=i;u<a;u++)s[u].updateFrom(e[u]);let r=s[0].image,c=this.image;(r.width!==c.width||r.height!==c.height||r.depth!==i)&&(c.width=r.width,c.height=r.height,c.depth=i,c.data=new Float32Array(c.width*c.height*c.depth*4));let{data:l,width:m,height:f}=c;for(let u=0,a=i;u<a;u++){let d=s[u],y=m*f*4*u,h=e[u].itemSize;h===3&&(h=4),zo(d.image.data,h,l,4,y)}this.dispose(),this.needsUpdate=!0}};var ii=class extends ti{updateNormalAttribute(e){this.updateAttribute(0,e)}updateTangentAttribute(e){this.updateAttribute(1,e)}updateUvAttribute(e){this.updateAttribute(2,e)}updateColorAttribute(e){this.updateAttribute(3,e)}updateFrom(e,t,i,s){this.setAttributes([e,t,i,s])}};import{DataTexture as Ua,RGBAFormat as Wa,ClampToEdgeWrapping as Vo,FloatType as Va,FrontSide as Ga,BackSide as qa,DoubleSide as $a,NearestFilter as Go}from"three";function ir(o,e){return o.uuid<e.uuid?1:o.uuid>e.uuid?-1:0}function ri(o){return`${o.source.uuid}:${o.colorSpace}`}function Ha(o){let e=new Set,t=[];for(let i=0,s=o.length;i<s;i++){let n=o[i],r=ri(n);e.has(r)||(e.add(r),t.push(n))}return t}function Ho(o){let e=o.map(i=>i.iesMap||null).filter(i=>i),t=new Set(e);return Array.from(t).sort(ir)}function Uo(o){let e=new Set;for(let i=0,s=o.length;i<s;i++){let n=o[i];for(let r in n){let c=n[r];c&&c.isTexture&&e.add(c)}}let t=Array.from(e);return Ha(t).sort(ir)}function Wo(o){let e=[];return o.traverse(t=>{t.visible&&(t.isRectAreaLight||t.isSpotLight||t.isPointLight||t.isDirectionalLight)&&e.push(t)}),e.sort(ir)}var $o=45,qo=$o*4,rr=class{constructor(){this._features={}}isUsed(e){return e in this._features}setUsed(e,t=!0){t===!1?delete this._features[e]:this._features[e]=!0}reset(){this._features={}}},oi=class extends Ua{constructor(){super(new Float32Array(4),1,1),this.format=Wa,this.type=Va,this.wrapS=Vo,this.wrapT=Vo,this.minFilter=Go,this.magFilter=Go,this.generateMipmaps=!1,this.features=new rr}updateFrom(e,t){function i(v,y,h=-1){if(y in v&&v[y]){let p=ri(v[y]);return u[p]}else return h}function s(v,y,h){return y in v?v[y]:h}function n(v,y,h,p){let g=v[y]&&v[y].isTexture?v[y]:null;if(g){g.matrixAutoUpdate&&g.updateMatrix();let x=g.matrix.elements,T=0;h[p+T++]=x[0],h[p+T++]=x[3],h[p+T++]=x[6],T++,h[p+T++]=x[1],h[p+T++]=x[4],h[p+T++]=x[7],T++}return 8}let r=0,c=e.length*$o,l=Math.ceil(Math.sqrt(c))||1,{image:m,features:f}=this,u={};for(let v=0,y=t.length;v<y;v++)u[ri(t[v])]=v;m.width!==l&&(this.dispose(),m.data=new Float32Array(l*l*4),m.width=l,m.height=l);let a=m.data;f.reset();for(let v=0,y=e.length;v<y;v++){let h=e[v];if(h.isFogVolumeMaterial){f.setUsed("FOG");for(let x=0;x<qo;x++)a[r+x]=0;a[r+0*4+0]=h.color.r,a[r+0*4+1]=h.color.g,a[r+0*4+2]=h.color.b,a[r+2*4+3]=s(h,"emissiveIntensity",0),a[r+3*4+0]=h.emissive.r,a[r+3*4+1]=h.emissive.g,a[r+3*4+2]=h.emissive.b,a[r+13*4+1]=h.density,a[r+13*4+3]=0,a[r+14*4+2]=4,r+=qo;continue}a[r++]=h.color.r,a[r++]=h.color.g,a[r++]=h.color.b,a[r++]=i(h,"map"),a[r++]=s(h,"metalness",0),a[r++]=i(h,"metalnessMap"),a[r++]=s(h,"roughness",0),a[r++]=i(h,"roughnessMap"),a[r++]=s(h,"ior",1.5),a[r++]=s(h,"transmission",0),a[r++]=i(h,"transmissionMap"),a[r++]=s(h,"emissiveIntensity",0),"emissive"in h?(a[r++]=h.emissive.r,a[r++]=h.emissive.g,a[r++]=h.emissive.b):(a[r++]=0,a[r++]=0,a[r++]=0),a[r++]=i(h,"emissiveMap"),a[r++]=i(h,"normalMap"),"normalScale"in h?(a[r++]=h.normalScale.x,a[r++]=h.normalScale.y):(a[r++]=1,a[r++]=1),a[r++]=s(h,"clearcoat",0),a[r++]=i(h,"clearcoatMap"),a[r++]=s(h,"clearcoatRoughness",0),a[r++]=i(h,"clearcoatRoughnessMap"),a[r++]=i(h,"clearcoatNormalMap"),"clearcoatNormalScale"in h?(a[r++]=h.clearcoatNormalScale.x,a[r++]=h.clearcoatNormalScale.y):(a[r++]=1,a[r++]=1),r++,a[r++]=s(h,"sheen",0),"sheenColor"in h?(a[r++]=h.sheenColor.r,a[r++]=h.sheenColor.g,a[r++]=h.sheenColor.b):(a[r++]=0,a[r++]=0,a[r++]=0),a[r++]=i(h,"sheenColorMap"),a[r++]=s(h,"sheenRoughness",0),a[r++]=i(h,"sheenRoughnessMap"),a[r++]=i(h,"iridescenceMap"),a[r++]=i(h,"iridescenceThicknessMap"),a[r++]=s(h,"iridescence",0),a[r++]=s(h,"iridescenceIOR",1.3);let p=s(h,"iridescenceThicknessRange",[100,400]);a[r++]=p[0],a[r++]=p[1],"specularColor"in h?(a[r++]=h.specularColor.r,a[r++]=h.specularColor.g,a[r++]=h.specularColor.b):(a[r++]=1,a[r++]=1,a[r++]=1),a[r++]=i(h,"specularColorMap"),a[r++]=s(h,"specularIntensity",1),a[r++]=i(h,"specularIntensityMap");let g=s(h,"thickness",0)===0&&s(h,"attenuationDistance",1/0)===1/0;if(a[r++]=Number(g),r++,"attenuationColor"in h?(a[r++]=h.attenuationColor.r,a[r++]=h.attenuationColor.g,a[r++]=h.attenuationColor.b):(a[r++]=1,a[r++]=1,a[r++]=1),a[r++]=s(h,"attenuationDistance",1/0),a[r++]=i(h,"alphaMap"),a[r++]=h.opacity,a[r++]=h.alphaTest,!g&&h.transmission>0)a[r++]=0;else switch(h.side){case Ga:a[r++]=1;break;case qa:a[r++]=-1;break;case $a:a[r++]=0;break}a[r++]=Number(s(h,"matte",!1)),a[r++]=Number(s(h,"castShadow",!0)),a[r++]=Number(h.vertexColors)|Number(h.flatShading)<<1,a[r++]=Number(h.transparent),r+=n(h,"map",a,r),r+=n(h,"metalnessMap",a,r),r+=n(h,"roughnessMap",a,r),r+=n(h,"transmissionMap",a,r),r+=n(h,"emissiveMap",a,r),r+=n(h,"normalMap",a,r),r+=n(h,"clearcoatMap",a,r),r+=n(h,"clearcoatNormalMap",a,r),r+=n(h,"clearcoatRoughnessMap",a,r),r+=n(h,"sheenColorMap",a,r),r+=n(h,"sheenRoughnessMap",a,r),r+=n(h,"iridescenceMap",a,r),r+=n(h,"iridescenceThicknessMap",a,r),r+=n(h,"specularColorMap",a,r),r+=n(h,"specularIntensityMap",a,r)}let d=ke(a.buffer);return this.hash!==d?(this.hash=d,this.needsUpdate=!0,!0):!1}};import{WebGLArrayRenderTarget as ja,RGBAFormat as Ya,UnsignedByteType as Xa,Color as Qa,RepeatWrapping as jo,LinearFilter as Yo,NoToneMapping as Ka,ShaderMaterial as Za}from"three";import{FullScreenQuad as Ja}from"three/addons/postprocessing/Pass.js";var Xo=new Qa;function ec(o){return o?`${o.uuid}:${o.version}`:null}function tc(o,e){for(let t in e)t in o&&(o[t]=e[t])}var ot=class extends ja{constructor(e,t,i){let s={format:Ya,type:Xa,minFilter:Yo,magFilter:Yo,wrapS:jo,wrapT:jo,generateMipmaps:!1,...i};super(e,t,1,s),tc(this.texture,s),this.texture.setTextures=(...r)=>{this.setTextures(...r)},this.hashes=[null];let n=new Ja(new or);this.fsQuad=n}setTextures(e,t,i=this.width,s=this.height){let n=e.getRenderTarget(),r=e.toneMapping,c=e.getClearAlpha();e.getClearColor(Xo);let l=t.length||1;(i!==this.width||s!==this.height||this.depth!==l)&&(this.setSize(i,s,l),this.hashes=new Array(l).fill(null)),e.setClearColor(0,0),e.toneMapping=Ka;let m=this.fsQuad,f=this.hashes,u=!1;for(let a=0,d=l;a<d;a++){let v=t[a],y=ec(v);v&&(f[a]!==y||v.isWebGLRenderTarget)&&(v.matrixAutoUpdate=!1,v.matrix.identity(),m.material.map=v,e.setRenderTarget(this,a),m.render(e),v.updateMatrix(),v.matrixAutoUpdate=!0,f[a]=y,u=!0)}return m.material.map=null,e.setClearColor(Xo,c),e.setRenderTarget(n),e.toneMapping=r,u}dispose(){super.dispose(),this.fsQuad.dispose()}},or=class extends Za{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}constructor(){super({uniforms:{map:{value:null}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				varying vec2 vUv;
				void main() {

					gl_FragColor = texture2D( map, vUv );

				}
			`})}};import{DataTexture as rc,FloatType as oc,NearestFilter as Qo,RGBAFormat as sc}from"three";function ic(o,e=Math.random()){for(let t=o.length-1;t>0;t--){let i=Math.floor(e()*(t+1)),s=o[t];o[t]=o[i],o[i]=s}return o}var si=class{constructor(e,t,i=Math.random){let s=e**t,n=new Uint16Array(s),r=s;for(let c=0;c<s;c++)n[c]=c;this.samples=new Float32Array(t),this.strataCount=e,this.reset=function(){for(let c=0;c<s;c++)n[c]=c;r=0},this.reshuffle=function(){r=0},this.next=function(){let{samples:c}=this;r>=n.length&&(ic(n,i),this.reshuffle());let l=n[r++];for(let m=0;m<t;m++)c[m]=(l%e+i())/e,l=Math.floor(l/e);return c}}};var ni=class{constructor(e,t,i=Math.random){let s=0;for(let l of t)s+=l;let n=new Float32Array(s),r=[],c=0;for(let l of t){let m=new si(e,l,i);m.samples=new Float32Array(n.buffer,c,m.samples.length),c+=m.samples.length*4,r.push(m)}this.samples=n,this.strataCount=e,this.next=function(){for(let l of r)l.next();return n},this.reshuffle=function(){for(let l of r)l.reshuffle()},this.reset=function(){for(let l of r)l.reset()}}};var sr=class{constructor(e=0){this.m=2147483648,this.a=1103515245,this.c=12345,this.seed=e}nextInt(){return this.seed=(this.a*this.seed+this.c)%this.m,this.seed}nextFloat(){return this.nextInt()/(this.m-1)}},ai=class extends rc{constructor(e=1,t=1,i=8){super(new Float32Array(1),1,1,sc,oc),this.minFilter=Qo,this.magFilter=Qo,this.strata=i,this.sampler=null,this.generator=new sr,this.stableNoise=!1,this.random=()=>this.stableNoise?this.generator.nextFloat():Math.random(),this.init(e,t,i)}init(e=this.image.height,t=this.image.width,i=this.strata){let{image:s}=this;if(s.width===t&&s.height===e&&this.sampler!==null)return;let n=new Array(e*t).fill(4),r=new ni(i,n,this.random);s.width=t,s.height=e,s.data=r.samples,this.sampler=r,this.dispose(),this.next()}next(){this.sampler.next(),this.needsUpdate=!0}reset(){this.sampler.reset(),this.generator.seed=0}};import{DataTexture as nc,FloatType as ac,NearestFilter as Jo,RGBAFormat as es,RGFormat as cc,RedFormat as lc}from"three";function Ko(o,e=Math.random){for(let t=o.length-1;t>0;t--){let i=~~((e()-1e-6)*t),s=o[t];o[t]=o[i],o[i]=s}}function Zo(o,e){o.fill(0);for(let t=0;t<e;t++)o[t]=1}var st=class{constructor(e){this.count=0,this.size=-1,this.sigma=-1,this.radius=-1,this.lookupTable=null,this.score=null,this.binaryPattern=null,this.resize(e),this.setSigma(1.5)}findVoid(){let{score:e,binaryPattern:t}=this,i=1/0,s=-1;for(let n=0,r=t.length;n<r;n++){if(t[n]!==0)continue;let c=e[n];c<i&&(i=c,s=n)}return s}findCluster(){let{score:e,binaryPattern:t}=this,i=-1/0,s=-1;for(let n=0,r=t.length;n<r;n++){if(t[n]!==1)continue;let c=e[n];c>i&&(i=c,s=n)}return s}setSigma(e){if(e===this.sigma)return;let t=~~(Math.sqrt(10*2*e**2)+1),i=2*t+1,s=new Float32Array(i*i),n=e*e;for(let r=-t;r<=t;r++)for(let c=-t;c<=t;c++){let l=(t+c)*i+r+t,m=r*r+c*c;s[l]=Math.E**(-m/(2*n))}this.lookupTable=s,this.sigma=e,this.radius=t}resize(e){this.size!==e&&(this.size=e,this.score=new Float32Array(e*e),this.binaryPattern=new Uint8Array(e*e))}invert(){let{binaryPattern:e,score:t,size:i}=this;t.fill(0);for(let s=0,n=e.length;s<n;s++)if(e[s]===0){let r=~~(s/i),c=s-r*i;this.updateScore(c,r,1),e[s]=1}else e[s]=0}updateScore(e,t,i){let{size:s,score:n,lookupTable:r}=this,c=this.radius,l=2*c+1;for(let m=-c;m<=c;m++)for(let f=-c;f<=c;f++){let u=(c+f)*l+m+c,a=r[u],d=e+m;d=d<0?s+d:d%s;let v=t+f;v=v<0?s+v:v%s;let y=v*s+d;n[y]+=i*a}}addPointIndex(e){this.binaryPattern[e]=1;let t=this.size,i=~~(e/t),s=e-i*t;this.updateScore(s,i,1),this.count++}removePointIndex(e){this.binaryPattern[e]=0;let t=this.size,i=~~(e/t),s=e-i*t;this.updateScore(s,i,-1),this.count--}copy(e){this.resize(e.size),this.score.set(e.score),this.binaryPattern.set(e.binaryPattern),this.setSigma(e.sigma),this.count=e.count}};var ci=class{constructor(){this.random=Math.random,this.sigma=1.5,this.size=64,this.majorityPointsRatio=.1,this.samples=new st(1),this.savedSamples=new st(1)}generate(){let{samples:e,savedSamples:t,sigma:i,majorityPointsRatio:s,size:n}=this;e.resize(n),e.setSigma(i);let r=Math.floor(n*n*s),c=e.binaryPattern;Zo(c,r),Ko(c,this.random);for(let u=0,a=c.length;u<a;u++)c[u]===1&&e.addPointIndex(u);for(;;){let u=e.findCluster();e.removePointIndex(u);let a=e.findVoid();if(u===a){e.addPointIndex(u);break}e.addPointIndex(a)}let l=new Uint32Array(n*n);t.copy(e);let m;for(m=e.count-1;m>=0;){let u=e.findCluster();e.removePointIndex(u),l[u]=m,m--}let f=n*n;for(m=t.count;m<f/2;){let u=t.findVoid();t.addPointIndex(u),l[u]=m,m++}for(t.invert();m<f;){let u=t.findCluster();t.removePointIndex(u),l[u]=m,m++}return{data:l,maxValue:f}}};function uc(o){return o>=3?4:o}function fc(o){switch(o){case 1:return lc;case 2:return cc;default:return es}}var li=class extends nc{constructor(e=64,t=1){super(new Float32Array(4),1,1,es,ac),this.minFilter=Jo,this.magFilter=Jo,this.size=e,this.channels=t,this.update()}update(){let e=this.channels,t=this.size,i=new ci;i.channels=e,i.size=t;let s=uc(e),n=fc(s);(this.image.width!==t||n!==this.format)&&(this.image.width=t,this.image.height=t,this.image.data=new Float32Array(t**2*s),this.format=n,this.dispose());let r=this.image.data;for(let c=0,l=e;c<l;c++){let m=i.generate(),f=m.data,u=m.maxValue;for(let a=0,d=f.length;a<d;a++){let v=f[a]/u;r[a*s+c]=v}}this.needsUpdate=!0}};var ts=`

	struct PhysicalCamera {

		float focusDistance;
		float anamorphicRatio;
		float bokehSize;
		int apertureBlades;
		float apertureRotation;

	};

`;var is=`

	struct EquirectHdrInfo {

		sampler2D marginalWeights;
		sampler2D conditionalWeights;
		sampler2D map;

		float totalSum;

	};

`;var rs=`

	#define RECT_AREA_LIGHT_TYPE 0
	#define CIRC_AREA_LIGHT_TYPE 1
	#define SPOT_LIGHT_TYPE 2
	#define DIR_LIGHT_TYPE 3
	#define POINT_LIGHT_TYPE 4

	struct LightsInfo {

		sampler2D tex;
		uint count;

	};

	struct Light {

		vec3 position;
		int type;

		vec3 color;
		float intensity;

		vec3 u;
		vec3 v;
		float area;

		// spot light fields
		float radius;
		float near;
		float decay;
		float distance;
		float coneCos;
		float penumbraCos;
		int iesProfile;

	};

	Light readLightInfo( sampler2D tex, uint index ) {

		uint i = index * 6u;

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );

		Light l;
		l.position = s0.rgb;
		l.type = int( round( s0.a ) );

		l.color = s1.rgb;
		l.intensity = s1.a;

		l.u = s2.rgb;
		l.v = s3.rgb;
		l.area = s3.a;

		if ( l.type == SPOT_LIGHT_TYPE || l.type == POINT_LIGHT_TYPE ) {

			vec4 s4 = texelFetch1D( tex, i + 4u );
			vec4 s5 = texelFetch1D( tex, i + 5u );
			l.radius = s4.r;
			l.decay = s4.g;
			l.distance = s4.b;
			l.coneCos = s4.a;

			l.penumbraCos = s5.r;
			l.iesProfile = int( round( s5.g ) );

		} else {

			l.radius = 0.0;
			l.decay = 0.0;
			l.distance = 0.0;

			l.coneCos = 0.0;
			l.penumbraCos = 0.0;
			l.iesProfile = - 1;

		}

		return l;

	}

`;var os=`

	struct Material {

		vec3 color;
		int map;

		float metalness;
		int metalnessMap;

		float roughness;
		int roughnessMap;

		float ior;
		float transmission;
		int transmissionMap;

		float emissiveIntensity;
		vec3 emissive;
		int emissiveMap;

		int normalMap;
		vec2 normalScale;

		float clearcoat;
		int clearcoatMap;
		int clearcoatNormalMap;
		vec2 clearcoatNormalScale;
		float clearcoatRoughness;
		int clearcoatRoughnessMap;

		int iridescenceMap;
		int iridescenceThicknessMap;
		float iridescence;
		float iridescenceIor;
		float iridescenceThicknessMinimum;
		float iridescenceThicknessMaximum;

		vec3 specularColor;
		int specularColorMap;

		float specularIntensity;
		int specularIntensityMap;
		bool thinFilm;

		vec3 attenuationColor;
		float attenuationDistance;

		int alphaMap;

		bool castShadow;
		float opacity;
		float alphaTest;

		float side;
		bool matte;

		float sheen;
		vec3 sheenColor;
		int sheenColorMap;
		float sheenRoughness;
		int sheenRoughnessMap;

		bool vertexColors;
		bool flatShading;
		bool transparent;
		bool fogVolume;

		mat3 mapTransform;
		mat3 metalnessMapTransform;
		mat3 roughnessMapTransform;
		mat3 transmissionMapTransform;
		mat3 emissiveMapTransform;
		mat3 normalMapTransform;
		mat3 clearcoatMapTransform;
		mat3 clearcoatNormalMapTransform;
		mat3 clearcoatRoughnessMapTransform;
		mat3 sheenColorMapTransform;
		mat3 sheenRoughnessMapTransform;
		mat3 iridescenceMapTransform;
		mat3 iridescenceThicknessMapTransform;
		mat3 specularColorMapTransform;
		mat3 specularIntensityMapTransform;

	};

	mat3 readTextureTransform( sampler2D tex, uint index ) {

		mat3 textureTransform;

		vec4 row1 = texelFetch1D( tex, index );
		vec4 row2 = texelFetch1D( tex, index + 1u );

		textureTransform[0] = vec3(row1.r, row2.r, 0.0);
		textureTransform[1] = vec3(row1.g, row2.g, 0.0);
		textureTransform[2] = vec3(row1.b, row2.b, 1.0);

		return textureTransform;

	}

	Material readMaterialInfo( sampler2D tex, uint index ) {

		uint i = index * 45u;

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );
		vec4 s4 = texelFetch1D( tex, i + 4u );
		vec4 s5 = texelFetch1D( tex, i + 5u );
		vec4 s6 = texelFetch1D( tex, i + 6u );
		vec4 s7 = texelFetch1D( tex, i + 7u );
		vec4 s8 = texelFetch1D( tex, i + 8u );
		vec4 s9 = texelFetch1D( tex, i + 9u );
		vec4 s10 = texelFetch1D( tex, i + 10u );
		vec4 s11 = texelFetch1D( tex, i + 11u );
		vec4 s12 = texelFetch1D( tex, i + 12u );
		vec4 s13 = texelFetch1D( tex, i + 13u );
		vec4 s14 = texelFetch1D( tex, i + 14u );

		Material m;
		m.color = s0.rgb;
		m.map = int( round( s0.a ) );

		m.metalness = s1.r;
		m.metalnessMap = int( round( s1.g ) );
		m.roughness = s1.b;
		m.roughnessMap = int( round( s1.a ) );

		m.ior = s2.r;
		m.transmission = s2.g;
		m.transmissionMap = int( round( s2.b ) );
		m.emissiveIntensity = s2.a;

		m.emissive = s3.rgb;
		m.emissiveMap = int( round( s3.a ) );

		m.normalMap = int( round( s4.r ) );
		m.normalScale = s4.gb;

		m.clearcoat = s4.a;
		m.clearcoatMap = int( round( s5.r ) );
		m.clearcoatRoughness = s5.g;
		m.clearcoatRoughnessMap = int( round( s5.b ) );
		m.clearcoatNormalMap = int( round( s5.a ) );
		m.clearcoatNormalScale = s6.rg;

		m.sheen = s6.a;
		m.sheenColor = s7.rgb;
		m.sheenColorMap = int( round( s7.a ) );
		m.sheenRoughness = s8.r;
		m.sheenRoughnessMap = int( round( s8.g ) );

		m.iridescenceMap = int( round( s8.b ) );
		m.iridescenceThicknessMap = int( round( s8.a ) );
		m.iridescence = s9.r;
		m.iridescenceIor = s9.g;
		m.iridescenceThicknessMinimum = s9.b;
		m.iridescenceThicknessMaximum = s9.a;

		m.specularColor = s10.rgb;
		m.specularColorMap = int( round( s10.a ) );

		m.specularIntensity = s11.r;
		m.specularIntensityMap = int( round( s11.g ) );
		m.thinFilm = bool( s11.b );

		m.attenuationColor = s12.rgb;
		m.attenuationDistance = s12.a;

		m.alphaMap = int( round( s13.r ) );

		m.opacity = s13.g;
		m.alphaTest = s13.b;
		m.side = s13.a;

		m.matte = bool( s14.r );
		m.castShadow = bool( s14.g );
		m.vertexColors = bool( int( s14.b ) & 1 );
		m.flatShading = bool( int( s14.b ) & 2 );
		m.fogVolume = bool( int( s14.b ) & 4 );
		m.transparent = bool( s14.a );

		uint firstTextureTransformIdx = i + 15u;

		// mat3( 1.0 ) is an identity matrix
		m.mapTransform = m.map == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx );
		m.metalnessMapTransform = m.metalnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 2u );
		m.roughnessMapTransform = m.roughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 4u );
		m.transmissionMapTransform = m.transmissionMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 6u );
		m.emissiveMapTransform = m.emissiveMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 8u );
		m.normalMapTransform = m.normalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 10u );
		m.clearcoatMapTransform = m.clearcoatMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 12u );
		m.clearcoatNormalMapTransform = m.clearcoatNormalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 14u );
		m.clearcoatRoughnessMapTransform = m.clearcoatRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 16u );
		m.sheenColorMapTransform = m.sheenColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 18u );
		m.sheenRoughnessMapTransform = m.sheenRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 20u );
		m.iridescenceMapTransform = m.iridescenceMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 22u );
		m.iridescenceThicknessMapTransform = m.iridescenceThicknessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 24u );
		m.specularColorMapTransform = m.specularColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 26u );
		m.specularIntensityMapTransform = m.specularIntensityMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 28u );

		return m;

	}

`;var ss=`

	struct SurfaceRecord {

		// surface type
		bool volumeParticle;

		// geometry
		vec3 faceNormal;
		bool frontFace;
		vec3 normal;
		mat3 normalBasis;
		mat3 normalInvBasis;

		// cached properties
		float eta;
		float f0;

		// material
		float roughness;
		float filteredRoughness;
		float metalness;
		vec3 color;
		vec3 emission;

		// transmission
		float ior;
		float transmission;
		bool thinFilm;
		vec3 attenuationColor;
		float attenuationDistance;

		// clearcoat
		vec3 clearcoatNormal;
		mat3 clearcoatBasis;
		mat3 clearcoatInvBasis;
		float clearcoat;
		float clearcoatRoughness;
		float filteredClearcoatRoughness;

		// sheen
		float sheen;
		vec3 sheenColor;
		float sheenRoughness;

		// iridescence
		float iridescence;
		float iridescenceIor;
		float iridescenceThickness;

		// specular
		vec3 specularColor;
		float specularIntensity;
	};

	struct ScatterRecord {
		float specularPdf;
		float pdf;
		vec3 direction;
		vec3 color;
	};

`;var ns=`

	// samples the the given environment map in the given direction
	vec3 sampleEquirectColor( sampler2D envMap, vec3 direction ) {

		return texture2D( envMap, equirectDirectionToUv( direction ) ).rgb;

	}

	// gets the pdf of the given direction to sample
	float equirectDirectionPdf( vec3 direction ) {

		vec2 uv = equirectDirectionToUv( direction );
		float theta = uv.y * PI;
		float sinTheta = sin( theta );
		if ( sinTheta == 0.0 ) {

			return 0.0;

		}

		return 1.0 / ( 2.0 * PI * PI * sinTheta );

	}

	// samples the color given env map with CDF and returns the pdf of the direction
	float sampleEquirect( vec3 direction, inout vec3 color ) {

		float totalSum = envMapInfo.totalSum;
		if ( totalSum == 0.0 ) {

			color = vec3( 0.0 );
			return 1.0;

		}

		vec2 uv = equirectDirectionToUv( direction );
		color = texture2D( envMapInfo.map, uv ).rgb;

		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}

	// samples a direction of the envmap with color and retrieves pdf
	float sampleEquirectProbability( vec2 r, inout vec3 color, inout vec3 direction ) {

		// sample env map cdf
		float v = texture2D( envMapInfo.marginalWeights, vec2( r.x, 0.0 ) ).x;
		float u = texture2D( envMapInfo.conditionalWeights, vec2( r.y, v ) ).x;
		vec2 uv = vec2( u, v );

		vec3 derivedDirection = equirectUvToDirection( uv );
		direction = derivedDirection;
		color = texture2D( envMapInfo.map, uv ).rgb;

		float totalSum = envMapInfo.totalSum;
		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}
`;var as=`

	float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

		return smoothstep( coneCosine, penumbraCosine, angleCosine );

	}

	float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// page 32, equation 26: E[window1]
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), EPSILON );

		if ( cutoffDistance > 0.0 ) {

			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

		}

		return distanceFalloff;

	}

	float getPhotometricAttenuation( sampler2DArray iesProfiles, int iesProfile, vec3 posToLight, vec3 lightDir, vec3 u, vec3 v ) {

		float cosTheta = dot( posToLight, lightDir );
		float angle = acos( cosTheta ) / PI;

		return texture2D( iesProfiles, vec3( angle, 0.0, iesProfile ) ).r;

	}

	struct LightRecord {

		float dist;
		vec3 direction;
		float pdf;
		vec3 emission;
		int type;

	};

	bool intersectLightAtIndex( sampler2D lights, vec3 rayOrigin, vec3 rayDirection, uint l, inout LightRecord lightRec ) {

		bool didHit = false;
		Light light = readLightInfo( lights, l );

		vec3 u = light.u;
		vec3 v = light.v;

		// check for backface
		vec3 normal = normalize( cross( u, v ) );
		if ( dot( normal, rayDirection ) > 0.0 ) {

			u *= 1.0 / dot( u, u );
			v *= 1.0 / dot( v, v );

			float dist;

			// MIS / light intersection is not supported for punctual lights.
			if(
				( light.type == RECT_AREA_LIGHT_TYPE && intersectsRectangle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) ) ||
				( light.type == CIRC_AREA_LIGHT_TYPE && intersectsCircle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) )
			) {

				float cosTheta = dot( rayDirection, normal );
				didHit = true;
				lightRec.dist = dist;
				lightRec.pdf = ( dist * dist ) / ( light.area * cosTheta );
				lightRec.emission = light.color * light.intensity;
				lightRec.direction = rayDirection;
				lightRec.type = light.type;

			}

		}

		return didHit;

	}

	LightRecord randomAreaLightSample( Light light, vec3 rayOrigin, vec2 ruv ) {

		vec3 randomPos;
		if( light.type == RECT_AREA_LIGHT_TYPE ) {

			// rectangular area light
			randomPos = light.position + light.u * ( ruv.x - 0.5 ) + light.v * ( ruv.y - 0.5 );

		} else if( light.type == CIRC_AREA_LIGHT_TYPE ) {

			// circular area light
			float r = 0.5 * sqrt( ruv.x );
			float theta = ruv.y * 2.0 * PI;
			float x = r * cos( theta );
			float y = r * sin( theta );

			randomPos = light.position + light.u * x + light.v * y;

		}

		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );
		vec3 direction = toLight / dist;
		vec3 lightNormal = normalize( cross( light.u, light.v ) );

		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.emission = light.color * light.intensity;
		lightRec.dist = dist;
		lightRec.direction = direction;

		// TODO: the denominator is potentially zero
		lightRec.pdf = lightDistSq / ( light.area * dot( direction, lightNormal ) );

		return lightRec;

	}

	LightRecord randomSpotLightSample( Light light, sampler2DArray iesProfiles, vec3 rayOrigin, vec2 ruv ) {

		float radius = light.radius * sqrt( ruv.x );
		float theta = ruv.y * 2.0 * PI;
		float x = radius * cos( theta );
		float y = radius * sin( theta );

		vec3 u = light.u;
		vec3 v = light.v;
		vec3 normal = normalize( cross( u, v ) );

		float angle = acos( light.coneCos );
		float angleTan = tan( angle );
		float startDistance = light.radius / max( angleTan, EPSILON );

		vec3 randomPos = light.position - normal * startDistance + u * x + v * y;
		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );

		vec3 direction = toLight / max( dist, EPSILON );
		float cosTheta = dot( direction, normal );

		float spotAttenuation = light.iesProfile != - 1 ?
			getPhotometricAttenuation( iesProfiles, light.iesProfile, direction, normal, u, v ) :
			getSpotAttenuation( light.coneCos, light.penumbraCos, cosTheta );

		float distanceAttenuation = getDistanceAttenuation( dist, light.distance, light.decay );
		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.dist = dist;
		lightRec.direction = direction;
		lightRec.emission = light.color * light.intensity * distanceAttenuation * spotAttenuation;
		lightRec.pdf = 1.0;

		return lightRec;

	}

	LightRecord randomLightSample( sampler2D lights, sampler2DArray iesProfiles, uint lightCount, vec3 rayOrigin, vec3 ruv ) {

		LightRecord result;

		// pick a random light
		uint l = uint( ruv.x * float( lightCount ) );
		Light light = readLightInfo( lights, l );

		if ( light.type == SPOT_LIGHT_TYPE ) {

			result = randomSpotLightSample( light, iesProfiles, rayOrigin, ruv.yz );

		} else if ( light.type == POINT_LIGHT_TYPE ) {

			vec3 lightRay = light.u - rayOrigin;
			float lightDist = length( lightRay );
			float cutoffDistance = light.distance;
			float distanceFalloff = 1.0 / max( pow( lightDist, light.decay ), 0.01 );
			if ( cutoffDistance > 0.0 ) {

				distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDist / cutoffDistance ) ) );

			}

			LightRecord rec;
			rec.direction = normalize( lightRay );
			rec.dist = length( lightRay );
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity * distanceFalloff;
			rec.type = light.type;
			result = rec;

		} else if ( light.type == DIR_LIGHT_TYPE ) {

			LightRecord rec;
			rec.dist = 1e10;
			rec.direction = light.u;
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity;
			rec.type = light.type;

			result = rec;

		} else {

			// sample the light
			result = randomAreaLightSample( light, rayOrigin, ruv.yz );

		}

		return result;

	}

`;var cs=`

	vec3 sampleHemisphere( vec3 n, vec2 uv ) {

		// https://www.rorydriscoll.com/2009/01/07/better-sampling/
		// https://graphics.pixar.com/library/OrthonormalB/paper.pdf
		float sign = n.z == 0.0 ? 1.0 : sign( n.z );
		float a = - 1.0 / ( sign + n.z );
		float b = n.x * n.y * a;
		vec3 b1 = vec3( 1.0 + sign * n.x * n.x * a, sign * b, - sign * n.x );
		vec3 b2 = vec3( b, sign + n.y * n.y * a, - n.y );

		float r = sqrt( uv.x );
		float theta = 2.0 * PI * uv.y;
		float x = r * cos( theta );
		float y = r * sin( theta );
		return x * b1 + y * b2 + sqrt( 1.0 - uv.x ) * n;

	}

	vec2 sampleTriangle( vec2 a, vec2 b, vec2 c, vec2 r ) {

		// get the edges of the triangle and the diagonal across the
		// center of the parallelogram
		vec2 e1 = a - b;
		vec2 e2 = c - b;
		vec2 diag = normalize( e1 + e2 );

		// pick the point in the parallelogram
		if ( r.x + r.y > 1.0 ) {

			r = vec2( 1.0 ) - r;

		}

		return e1 * r.x + e2 * r.y;

	}

	vec2 sampleCircle( vec2 uv ) {

		float angle = 2.0 * PI * uv.x;
		float radius = sqrt( uv.y );
		return vec2( cos( angle ), sin( angle ) ) * radius;

	}

	vec3 sampleSphere( vec2 uv ) {

		float u = ( uv.x - 0.5 ) * 2.0;
		float t = uv.y * PI * 2.0;
		float f = sqrt( 1.0 - u * u );

		return vec3( f * cos( t ), f * sin( t ), u );

	}

	vec2 sampleRegularPolygon( int sides, vec3 uvw ) {

		sides = max( sides, 3 );

		vec3 r = uvw;
		float anglePerSegment = 2.0 * PI / float( sides );
		float segment = floor( float( sides ) * r.x );

		float angle1 = anglePerSegment * segment;
		float angle2 = angle1 + anglePerSegment;
		vec2 a = vec2( sin( angle1 ), cos( angle1 ) );
		vec2 b = vec2( 0.0, 0.0 );
		vec2 c = vec2( sin( angle2 ), cos( angle2 ) );

		return sampleTriangle( a, b, c, r.yz );

	}

	// samples an aperture shape with the given number of sides. 0 means circle
	vec2 sampleAperture( int blades, vec3 uvw ) {

		return blades == 0 ?
			sampleCircle( uvw.xy ) :
			sampleRegularPolygon( blades, uvw );

	}


`;var ls=`

	bool totalInternalReflection( float cosTheta, float eta ) {

		float sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		return eta * sinTheta > 1.0;

	}

	// https://google.github.io/filament/Filament.md.html#materialsystem/diffusebrdf
	float schlickFresnel( float cosine, float f0 ) {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	vec3 schlickFresnel( float cosine, vec3 f0 ) {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	vec3 schlickFresnel( float cosine, vec3 f0, vec3 f90 ) {

		return f0 + ( f90 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	float dielectricFresnel( float cosThetaI, float eta ) {

		// https://schuttejoe.github.io/post/disneybsdf/
		float ni = eta;
		float nt = 1.0;

		// Check for total internal reflection
		float sinThetaISq = 1.0f - cosThetaI * cosThetaI;
		float sinThetaTSq = eta * eta * sinThetaISq;
		if( sinThetaTSq >= 1.0 ) {

			return 1.0;

		}

		float sinThetaT = sqrt( sinThetaTSq );

		float cosThetaT = sqrt( max( 0.0, 1.0f - sinThetaT * sinThetaT ) );
		float rParallel = ( ( nt * cosThetaI ) - ( ni * cosThetaT ) ) / ( ( nt * cosThetaI ) + ( ni * cosThetaT ) );
		float rPerpendicular = ( ( ni * cosThetaI ) - ( nt * cosThetaT ) ) / ( ( ni * cosThetaI ) + ( nt * cosThetaT ) );
		return ( rParallel * rParallel + rPerpendicular * rPerpendicular ) / 2.0;

	}

	// https://raytracing.github.io/books/RayTracingInOneWeekend.html#dielectrics/schlickapproximation
	float iorRatioToF0( float eta ) {

		return pow( ( 1.0 - eta ) / ( 1.0 + eta ), 2.0 );

	}

	vec3 evaluateFresnel( float cosTheta, float eta, vec3 f0, vec3 f90 ) {

		if ( totalInternalReflection( cosTheta, eta ) ) {

			return f90;

		}

		return schlickFresnel( cosTheta, f0, f90 );

	}

	// TODO: disney fresnel was removed and replaced with this fresnel function to better align with
	// the glTF but is causing blown out pixels. Should be revisited
	// float evaluateFresnelWeight( float cosTheta, float eta, float f0 ) {

	// 	if ( totalInternalReflection( cosTheta, eta ) ) {

	// 		return 1.0;

	// 	}

	// 	return schlickFresnel( cosTheta, f0 );

	// }

	// https://schuttejoe.github.io/post/disneybsdf/
	float disneyFresnel( vec3 wo, vec3 wi, vec3 wh, float f0, float eta, float metalness ) {

		float dotHV = dot( wo, wh );
		if ( totalInternalReflection( dotHV, eta ) ) {

			return 1.0;

		}

		float dotHL = dot( wi, wh );
		float dielectricFresnel = dielectricFresnel( abs( dotHV ), eta );
		float metallicFresnel = schlickFresnel( dotHL, f0 );

		return mix( dielectricFresnel, metallicFresnel, metalness );

	}

`;var us=`

	// Fast arccos approximation used to remove banding artifacts caused by numerical errors in acos.
	// This is a cubic Lagrange interpolating polynomial for x = [-1, -1/2, 0, 1/2, 1].
	// For more information see: https://github.com/gkjohnson/three-gpu-pathtracer/pull/171#issuecomment-1152275248
	float acosApprox( float x ) {

		x = clamp( x, -1.0, 1.0 );
		return ( - 0.69813170079773212 * x * x - 0.87266462599716477 ) * x + 1.5707963267948966;

	}

	// An acos with input values bound to the range [-1, 1].
	float acosSafe( float x ) {

		return acos( clamp( x, -1.0, 1.0 ) );

	}

	float saturateCos( float val ) {

		return clamp( val, 0.001, 1.0 );

	}

	float square( float t ) {

		return t * t;

	}

	vec2 square( vec2 t ) {

		return t * t;

	}

	vec3 square( vec3 t ) {

		return t * t;

	}

	vec4 square( vec4 t ) {

		return t * t;

	}

	vec2 rotateVector( vec2 v, float t ) {

		float ac = cos( t );
		float as = sin( t );
		return vec2(
			v.x * ac - v.y * as,
			v.x * as + v.y * ac
		);

	}

	// forms a basis with the normal vector as Z
	mat3 getBasisFromNormal( vec3 normal ) {

		vec3 other;
		if ( abs( normal.x ) > 0.5 ) {

			other = vec3( 0.0, 1.0, 0.0 );

		} else {

			other = vec3( 1.0, 0.0, 0.0 );

		}

		vec3 ortho = normalize( cross( normal, other ) );
		vec3 ortho2 = normalize( cross( normal, ortho ) );
		return mat3( ortho2, ortho, normal );

	}

`;var fs=`

	// Finds the point where the ray intersects the plane defined by u and v and checks if this point
	// falls in the bounds of the rectangle on that same plane.
	// Plane intersection: https://lousodrome.net/blog/light/2020/07/03/intersection-of-a-ray-and-a-plane/
	bool intersectsRectangle( vec3 center, vec3 normal, vec3 u, vec3 v, vec3 rayOrigin, vec3 rayDirection, inout float dist ) {

		float t = dot( center - rayOrigin, normal ) / dot( rayDirection, normal );

		if ( t > EPSILON ) {

			vec3 p = rayOrigin + rayDirection * t;
			vec3 vi = p - center;

			// check if p falls inside the rectangle
			float a1 = dot( u, vi );
			if ( abs( a1 ) <= 0.5 ) {

				float a2 = dot( v, vi );
				if ( abs( a2 ) <= 0.5 ) {

					dist = t;
					return true;

				}

			}

		}

		return false;

	}

	// Finds the point where the ray intersects the plane defined by u and v and checks if this point
	// falls in the bounds of the circle on that same plane. See above URL for a description of the plane intersection algorithm.
	bool intersectsCircle( vec3 position, vec3 normal, vec3 u, vec3 v, vec3 rayOrigin, vec3 rayDirection, inout float dist ) {

		float t = dot( position - rayOrigin, normal ) / dot( rayDirection, normal );

		if ( t > EPSILON ) {

			vec3 hit = rayOrigin + rayDirection * t;
			vec3 vi = hit - position;

			float a1 = dot( u, vi );
			float a2 = dot( v, vi );

			if( length( vec2( a1, a2 ) ) <= 0.5 ) {

				dist = t;
				return true;

			}

		}

		return false;

	}

`;var ms=`

	// add texel fetch functions for texture arrays
	vec4 texelFetch1D( sampler2DArray tex, int layer, uint index ) {

		uint width = uint( textureSize( tex, 0 ).x );
		uvec2 uv;
		uv.x = index % width;
		uv.y = index / width;

		return texelFetch( tex, ivec3( uv, layer ), 0 );

	}

	vec4 textureSampleBarycoord( sampler2DArray tex, int layer, vec3 barycoord, uvec3 faceIndices ) {

		return
			barycoord.x * texelFetch1D( tex, layer, faceIndices.x ) +
			barycoord.y * texelFetch1D( tex, layer, faceIndices.y ) +
			barycoord.z * texelFetch1D( tex, layer, faceIndices.z );

	}

`;var ui=`

	// TODO: possibly this should be renamed something related to material or path tracing logic

	#ifndef RAY_OFFSET
	#define RAY_OFFSET 1e-4
	#endif

	// adjust the hit point by the surface normal by a factor of some offset and the
	// maximum component-wise value of the current point to accommodate floating point
	// error as values increase.
	vec3 stepRayOrigin( vec3 rayOrigin, vec3 rayDirection, vec3 offset, float dist ) {

		vec3 point = rayOrigin + rayDirection * dist;
		vec3 absPoint = abs( point );
		float maxPoint = max( absPoint.x, max( absPoint.y, absPoint.z ) );
		return point + offset * ( maxPoint + 1.0 ) * RAY_OFFSET;

	}

	// https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md#attenuation
	vec3 transmissionAttenuation( float dist, vec3 attColor, float attDist ) {

		vec3 ot = - log( attColor ) / attDist;
		return exp( - ot * dist );

	}

	vec3 getHalfVector( vec3 wi, vec3 wo, float eta ) {

		// get the half vector - assuming if the light incident vector is on the other side
		// of the that it's transmissive.
		vec3 h;
		if ( wi.z > 0.0 ) {

			h = normalize( wi + wo );

		} else {

			// Scale by the ior ratio to retrieve the appropriate half vector
			// From Section 2.2 on computing the transmission half vector:
			// https://blog.selfshadow.com/publications/s2015-shading-course/burley/s2015_pbs_disney_bsdf_notes.pdf
			h = normalize( wi + wo * eta );

		}

		h *= sign( h.z );
		return h;

	}

	vec3 getHalfVector( vec3 a, vec3 b ) {

		return normalize( a + b );

	}

	// The discrepancy between interpolated surface normal and geometry normal can cause issues when a ray
	// is cast that is on the top side of the geometry normal plane but below the surface normal plane. If
	// we find a ray like that we ignore it to avoid artifacts.
	// This function returns if the direction is on the same side of both planes.
	bool isDirectionValid( vec3 direction, vec3 surfaceNormal, vec3 geometryNormal ) {

		bool aboveSurfaceNormal = dot( direction, surfaceNormal ) > 0.0;
		bool aboveGeometryNormal = dot( direction, geometryNormal ) > 0.0;
		return aboveSurfaceNormal == aboveGeometryNormal;

	}

	// ray sampling x and z are swapped to align with expected background view
	vec2 equirectDirectionToUv( vec3 direction ) {

		// from Spherical.setFromCartesianCoords
		vec2 uv = vec2( atan( direction.z, direction.x ), acos( direction.y ) );
		uv /= vec2( 2.0 * PI, PI );

		// apply adjustments to get values in range [0, 1] and y right side up
		uv.x += 0.5;
		uv.y = 1.0 - uv.y;
		return uv;

	}

	vec3 equirectUvToDirection( vec2 uv ) {

		// undo above adjustments
		uv.x -= 0.5;
		uv.y = 1.0 - uv.y;

		// from Vector3.setFromSphericalCoords
		float theta = uv.x * 2.0 * PI;
		float phi = uv.y * PI;

		float sinPhi = sin( phi );

		return vec3( sinPhi * cos( theta ), cos( phi ), sinPhi * sin( theta ) );

	}

	// power heuristic for multiple importance sampling
	float misHeuristic( float a, float b ) {

		float aa = a * a;
		float bb = b * b;
		return aa / ( aa + bb );

	}

	// tentFilter from Peter Shirley's 'Realistic Ray Tracing (2nd Edition)' book, pg. 60
	// erichlof/THREE.js-PathTracing-Renderer/
	float tentFilter( float x ) {

		return x < 0.5 ? sqrt( 2.0 * x ) - 1.0 : 1.0 - sqrt( 2.0 - ( 2.0 * x ) );

	}
`;var nr=`

	// https://www.shadertoy.com/view/wltcRS
	uvec4 WHITE_NOISE_SEED;

	void rng_initialize( vec2 p, int frame ) {

		// white noise seed
		WHITE_NOISE_SEED = uvec4( p, uint( frame ), uint( p.x ) + uint( p.y ) );

	}

	// https://www.pcg-random.org/
	void pcg4d( inout uvec4 v ) {

		v = v * 1664525u + 1013904223u;
		v.x += v.y * v.w;
		v.y += v.z * v.x;
		v.z += v.x * v.y;
		v.w += v.y * v.z;
		v = v ^ ( v >> 16u );
		v.x += v.y*v.w;
		v.y += v.z*v.x;
		v.z += v.x*v.y;
		v.w += v.y*v.z;

	}

	// returns [ 0, 1 ]
	float pcgRand() {

		pcg4d( WHITE_NOISE_SEED );
		return float( WHITE_NOISE_SEED.x ) / float( 0xffffffffu );

	}

	vec2 pcgRand2() {

		pcg4d( WHITE_NOISE_SEED );
		return vec2( WHITE_NOISE_SEED.xy ) / float(0xffffffffu);

	}

	vec3 pcgRand3() {

		pcg4d( WHITE_NOISE_SEED );
		return vec3( WHITE_NOISE_SEED.xyz ) / float( 0xffffffffu );

	}

	vec4 pcgRand4() {

		pcg4d( WHITE_NOISE_SEED );
		return vec4( WHITE_NOISE_SEED ) / float( 0xffffffffu );

	}
`;var hs=`

	uniform sampler2D stratifiedTexture;
	uniform sampler2D stratifiedOffsetTexture;

	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;
	vec4 pixelSeed = vec4( 0 );

	vec4 rand4( int v ) {

		ivec2 uv = ivec2( v, sobolBounceIndex );
		vec4 stratifiedSample = texelFetch( stratifiedTexture, uv, 0 );
		return fract( stratifiedSample + pixelSeed.r ); // blue noise + stratified samples

	}

	vec3 rand3( int v ) {

		return rand4( v ).xyz;

	}

	vec2 rand2( int v ) {

		return rand4( v ).xy;

	}

	float rand( int v ) {

		return rand4( v ).x;

	}

	void rng_initialize( vec2 screenCoord, int frame ) {

		// tile the small noise texture across the entire screen
		ivec2 noiseSize = ivec2( textureSize( stratifiedOffsetTexture, 0 ) );
		ivec2 pixel = ivec2( screenCoord.xy ) % noiseSize;
		vec2 pixelWidth = 1.0 / vec2( noiseSize );
		vec2 uv = vec2( pixel ) * pixelWidth + pixelWidth * 0.5;

		// note that using "texelFetch" here seems to break Android for some reason
		pixelSeed = texture( stratifiedOffsetTexture, uv );

	}

`;var ds=`

	// diffuse
	float diffuseEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// https://schuttejoe.github.io/post/disneybsdf/
		float fl = schlickFresnel( wi.z, 0.0 );
		float fv = schlickFresnel( wo.z, 0.0 );

		float metalFactor = ( 1.0 - surf.metalness );
		float transFactor = ( 1.0 - surf.transmission );
		float rr = 0.5 + 2.0 * surf.roughness * fl * fl;
		float retro = rr * ( fl + fv + fl * fv * ( rr - 1.0f ) );
		float lambert = ( 1.0f - 0.5f * fl ) * ( 1.0f - 0.5f * fv );

		// TODO: subsurface approx?

		// float F = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		float F = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		color = ( 1.0 - F ) * transFactor * metalFactor * wi.z * surf.color * ( retro + lambert ) / PI;

		return wi.z / PI;

	}

	vec3 diffuseDirection( vec3 wo, SurfaceRecord surf ) {

		vec3 lightDirection = sampleSphere( rand2( 11 ) );
		lightDirection.z += 1.0;
		lightDirection = normalize( lightDirection );

		return lightDirection;

	}

	// specular
	float specularEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// if roughness is set to 0 then D === NaN which results in black pixels
		float metalness = surf.metalness;
		float roughness = surf.filteredRoughness;

		float eta = surf.eta;
		float f0 = surf.f0;

		vec3 f0Color = mix( f0 * surf.specularColor * surf.specularIntensity, surf.color, surf.metalness );
		vec3 f90Color = vec3( mix( surf.specularIntensity, 1.0, surf.metalness ) );
		vec3 F = evaluateFresnel( dot( wo, wh ), eta, f0Color, f90Color );

		vec3 iridescenceF = evalIridescence( 1.0, surf.iridescenceIor, dot( wi, wh ), surf.iridescenceThickness, f0Color );
		F = mix( F, iridescenceF,  surf.iridescence );

		// PDF
		// See 14.1.1 Microfacet BxDFs in https://www.pbr-book.org/
		float incidentTheta = acos( wo.z );
		float G = ggxShadowMaskG2( wi, wo, roughness );
		float D = ggxDistribution( wh, roughness );
		float G1 = ggxShadowMaskG1( incidentTheta, roughness );
		float ggxPdf = D * G1 * max( 0.0, abs( dot( wo, wh ) ) ) / abs ( wo.z );

		color = wi.z * F * G * D / ( 4.0 * abs( wi.z * wo.z ) );
		return ggxPdf / ( 4.0 * dot( wo, wh ) );

	}

	vec3 specularDirection( vec3 wo, SurfaceRecord surf ) {

		// sample ggx vndf distribution which gives a new normal
		float roughness = surf.filteredRoughness;
		vec3 halfVector = ggxDirection(
			wo,
			vec2( roughness ),
			rand2( 12 )
		);

		// apply to new ray by reflecting off the new normal
		return - reflect( wo, halfVector );

	}


	// transmission
	/*
	float transmissionEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// See section 4.2 in https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf

		float filteredRoughness = surf.filteredRoughness;
		float eta = surf.eta;
		bool frontFace = surf.frontFace;
		bool thinFilm = surf.thinFilm;

		color = surf.transmission * surf.color;

		float denom = pow( eta * dot( wi, wh ) + dot( wo, wh ), 2.0 );
		return ggxPDF( wo, wh, filteredRoughness ) / denom;

	}

	vec3 transmissionDirection( vec3 wo, SurfaceRecord surf ) {

		float filteredRoughness = surf.filteredRoughness;
		float eta = surf.eta;
		bool frontFace = surf.frontFace;

		// sample ggx vndf distribution which gives a new normal
		vec3 halfVector = ggxDirection(
			wo,
			vec2( filteredRoughness ),
			rand2( 13 )
		);

		vec3 lightDirection = refract( normalize( - wo ), halfVector, eta );
		if ( surf.thinFilm ) {

			lightDirection = - refract( normalize( - lightDirection ), - vec3( 0.0, 0.0, 1.0 ), 1.0 / eta );

		}

		return normalize( lightDirection );

	}
	*/

	// TODO: This is just using a basic cosine-weighted specular distribution with an
	// incorrect PDF value at the moment. Update it to correctly use a GGX distribution
	float transmissionEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		color = surf.transmission * surf.color;

		// PDF
		// float F = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		// float F = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		// if ( F >= 1.0 ) {

		// 	return 0.0;

		// }

		// return 1.0 / ( 1.0 - F );

		// reverted to previous to transmission. The above was causing black pixels
		float eta = surf.eta;
		float f0 = surf.f0;
		float cosTheta = min( wo.z, 1.0 );
		float sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		float reflectance = schlickFresnel( cosTheta, f0 );
		bool cannotRefract = eta * sinTheta > 1.0;
		if ( cannotRefract ) {

			return 0.0;

		}

		return 1.0 / ( 1.0 - reflectance );

	}

	vec3 transmissionDirection( vec3 wo, SurfaceRecord surf ) {

		float roughness = surf.filteredRoughness;
		float eta = surf.eta;
		vec3 halfVector = normalize( vec3( 0.0, 0.0, 1.0 ) + sampleSphere( rand2( 13 ) ) * roughness );
		vec3 lightDirection = refract( normalize( - wo ), halfVector, eta );

		if ( surf.thinFilm ) {

			lightDirection = - refract( normalize( - lightDirection ), - vec3( 0.0, 0.0, 1.0 ), 1.0 / eta );

		}
		return normalize( lightDirection );

	}

	// clearcoat
	float clearcoatEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		float ior = 1.5;
		float f0 = iorRatioToF0( ior );
		bool frontFace = surf.frontFace;
		float roughness = surf.filteredClearcoatRoughness;

		float eta = frontFace ? 1.0 / ior : ior;
		float G = ggxShadowMaskG2( wi, wo, roughness );
		float D = ggxDistribution( wh, roughness );
		float F = schlickFresnel( dot( wi, wh ), f0 );

		float fClearcoat = F * D * G / ( 4.0 * abs( wi.z * wo.z ) );
		color = color * ( 1.0 - surf.clearcoat * F ) + fClearcoat * surf.clearcoat * wi.z;

		// PDF
		// See equation (27) in http://jcgt.org/published/0003/02/03/
		return ggxPDF( wo, wh, roughness ) / ( 4.0 * dot( wi, wh ) );

	}

	vec3 clearcoatDirection( vec3 wo, SurfaceRecord surf ) {

		// sample ggx vndf distribution which gives a new normal
		float roughness = surf.filteredClearcoatRoughness;
		vec3 halfVector = ggxDirection(
			wo,
			vec2( roughness ),
			rand2( 14 )
		);

		// apply to new ray by reflecting off the new normal
		return - reflect( wo, halfVector );

	}

	// sheen
	vec3 sheenColor( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf ) {

		float cosThetaO = saturateCos( wo.z );
		float cosThetaI = saturateCos( wi.z );
		float cosThetaH = wh.z;

		float D = velvetD( cosThetaH, surf.sheenRoughness );
		float G = velvetG( cosThetaO, cosThetaI, surf.sheenRoughness );

		// See equation (1) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
		vec3 color = surf.sheenColor;
		color *= D * G / ( 4.0 * abs( cosThetaO * cosThetaI ) );
		color *= wi.z;

		return color;

	}

	// bsdf
	void getLobeWeights(
		vec3 wo, vec3 wi, vec3 wh, vec3 clearcoatWo, SurfaceRecord surf,
		inout float diffuseWeight, inout float specularWeight, inout float transmissionWeight, inout float clearcoatWeight
	) {

		float metalness = surf.metalness;
		float transmission = surf.transmission;
		// float fEstimate = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		float fEstimate = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );

		float transSpecularProb = mix( max( 0.25, fEstimate ), 1.0, metalness );
		float diffSpecularProb = 0.5 + 0.5 * metalness;

		diffuseWeight = ( 1.0 - transmission ) * ( 1.0 - diffSpecularProb );
		specularWeight = transmission * transSpecularProb + ( 1.0 - transmission ) * diffSpecularProb;
		transmissionWeight = transmission * ( 1.0 - transSpecularProb );
		clearcoatWeight = surf.clearcoat * schlickFresnel( clearcoatWo.z, 0.04 );

		float totalWeight = diffuseWeight + specularWeight + transmissionWeight + clearcoatWeight;
		diffuseWeight /= totalWeight;
		specularWeight /= totalWeight;
		transmissionWeight /= totalWeight;
		clearcoatWeight /= totalWeight;
	}

	float bsdfEval(
		vec3 wo, vec3 clearcoatWo, vec3 wi, vec3 clearcoatWi, SurfaceRecord surf,
		float diffuseWeight, float specularWeight, float transmissionWeight, float clearcoatWeight, inout float specularPdf, inout vec3 color
	) {

		float metalness = surf.metalness;
		float transmission = surf.transmission;

		float spdf = 0.0;
		float dpdf = 0.0;
		float tpdf = 0.0;
		float cpdf = 0.0;
		color = vec3( 0.0 );

		vec3 halfVector = getHalfVector( wi, wo, surf.eta );

		// diffuse
		if ( diffuseWeight > 0.0 && wi.z > 0.0 ) {

			dpdf = diffuseEval( wo, wi, halfVector, surf, color );
			color *= 1.0 - surf.transmission;

		}

		// ggx specular
		if ( specularWeight > 0.0 && wi.z > 0.0 ) {

			vec3 outColor;
			spdf = specularEval( wo, wi, getHalfVector( wi, wo ), surf, outColor );
			color += outColor;

		}

		// transmission
		if ( transmissionWeight > 0.0 && wi.z < 0.0 ) {

			tpdf = transmissionEval( wo, wi, halfVector, surf, color );

		}

		// sheen
		color *= mix( 1.0, sheenAlbedoScaling( wo, wi, surf ), surf.sheen );
		color += sheenColor( wo, wi, halfVector, surf ) * surf.sheen;

		// clearcoat
		if ( clearcoatWi.z >= 0.0 && clearcoatWeight > 0.0 ) {

			vec3 clearcoatHalfVector = getHalfVector( clearcoatWo, clearcoatWi );
			cpdf = clearcoatEval( clearcoatWo, clearcoatWi, clearcoatHalfVector, surf, color );

		}

		float pdf =
			dpdf * diffuseWeight
			+ spdf * specularWeight
			+ tpdf * transmissionWeight
			+ cpdf * clearcoatWeight;

		// retrieve specular rays for the shadows flag
		specularPdf = spdf * specularWeight + cpdf * clearcoatWeight;

		return pdf;

	}

	float bsdfResult( vec3 worldWo, vec3 worldWi, SurfaceRecord surf, inout vec3 color ) {

		if ( surf.volumeParticle ) {

			color = surf.color / ( 4.0 * PI );
			return 1.0 / ( 4.0 * PI );

		}

		vec3 wo = normalize( surf.normalInvBasis * worldWo );
		vec3 wi = normalize( surf.normalInvBasis * worldWi );

		vec3 clearcoatWo = normalize( surf.clearcoatInvBasis * worldWo );
		vec3 clearcoatWi = normalize( surf.clearcoatInvBasis * worldWi );

		vec3 wh = getHalfVector( wo, wi, surf.eta );
		float diffuseWeight;
		float specularWeight;
		float transmissionWeight;
		float clearcoatWeight;
		getLobeWeights( wo, wi, wh, clearcoatWo, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight );

		float specularPdf;
		return bsdfEval( wo, clearcoatWo, wi, clearcoatWi, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight, specularPdf, color );

	}

	ScatterRecord bsdfSample( vec3 worldWo, SurfaceRecord surf ) {

		if ( surf.volumeParticle ) {

			ScatterRecord sampleRec;
			sampleRec.specularPdf = 0.0;
			sampleRec.pdf = 1.0 / ( 4.0 * PI );
			sampleRec.direction = sampleSphere( rand2( 16 ) );
			sampleRec.color = surf.color / ( 4.0 * PI );
			return sampleRec;

		}

		vec3 wo = normalize( surf.normalInvBasis * worldWo );
		vec3 clearcoatWo = normalize( surf.clearcoatInvBasis * worldWo );
		mat3 normalBasis = surf.normalBasis;
		mat3 invBasis = surf.normalInvBasis;
		mat3 clearcoatNormalBasis = surf.clearcoatBasis;
		mat3 clearcoatInvBasis = surf.clearcoatInvBasis;

		float diffuseWeight;
		float specularWeight;
		float transmissionWeight;
		float clearcoatWeight;
		// using normal and basically-reflected ray since we don't have proper half vector here
		getLobeWeights( wo, wo, vec3( 0, 0, 1 ), clearcoatWo, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight );

		float pdf[4];
		pdf[0] = diffuseWeight;
		pdf[1] = specularWeight;
		pdf[2] = transmissionWeight;
		pdf[3] = clearcoatWeight;

		float cdf[4];
		cdf[0] = pdf[0];
		cdf[1] = pdf[1] + cdf[0];
		cdf[2] = pdf[2] + cdf[1];
		cdf[3] = pdf[3] + cdf[2];

		if( cdf[3] != 0.0 ) {

			float invMaxCdf = 1.0 / cdf[3];
			cdf[0] *= invMaxCdf;
			cdf[1] *= invMaxCdf;
			cdf[2] *= invMaxCdf;
			cdf[3] *= invMaxCdf;

		} else {

			cdf[0] = 1.0;
			cdf[1] = 0.0;
			cdf[2] = 0.0;
			cdf[3] = 0.0;

		}

		vec3 wi;
		vec3 clearcoatWi;

		float r = rand( 15 );
		if ( r <= cdf[0] ) { // diffuse

			wi = diffuseDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[1] ) { // specular

			wi = specularDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[2] ) { // transmission / refraction

			wi = transmissionDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[3] ) { // clearcoat

			clearcoatWi = clearcoatDirection( clearcoatWo, surf );
			wi = normalize( invBasis * normalize( clearcoatNormalBasis * clearcoatWi ) );

		}

		ScatterRecord result;
		result.pdf = bsdfEval( wo, clearcoatWo, wi, clearcoatWi, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight, result.specularPdf, result.color );
		result.direction = normalize( surf.normalBasis * wi );

		return result;

	}

`;var ps=`

	// returns the hit distance given the material density
	float intersectFogVolume( Material material, float u ) {

		// https://raytracing.github.io/books/RayTracingTheNextWeek.html#volumes/constantdensitymediums
		return material.opacity == 0.0 ? INFINITY : ( - 1.0 / material.opacity ) * log( u );

	}

	ScatterRecord sampleFogVolume( SurfaceRecord surf, vec2 uv ) {

		ScatterRecord sampleRec;
		sampleRec.specularPdf = 0.0;
		sampleRec.pdf = 1.0 / ( 2.0 * PI );
		sampleRec.direction = sampleSphere( uv );
		sampleRec.color = surf.color;
		return sampleRec;

	}

`;var gs=`

	// The GGX functions provide sampling and distribution information for normals as output so
	// in order to get probability of scatter direction the half vector must be computed and provided.
	// [0] https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf
	// [1] https://hal.archives-ouvertes.fr/hal-01509746/document
	// [2] http://jcgt.org/published/0007/04/01/
	// [4] http://jcgt.org/published/0003/02/03/

	// trowbridge-reitz === GGX === GTR

	vec3 ggxDirection( vec3 incidentDir, vec2 roughness, vec2 uv ) {

		// TODO: try GGXVNDF implementation from reference [2], here. Needs to update ggxDistribution
		// function below, as well

		// Implementation from reference [1]
		// stretch view
		vec3 V = normalize( vec3( roughness * incidentDir.xy, incidentDir.z ) );

		// orthonormal basis
		vec3 T1 = ( V.z < 0.9999 ) ? normalize( cross( V, vec3( 0.0, 0.0, 1.0 ) ) ) : vec3( 1.0, 0.0, 0.0 );
		vec3 T2 = cross( T1, V );

		// sample point with polar coordinates (r, phi)
		float a = 1.0 / ( 1.0 + V.z );
		float r = sqrt( uv.x );
		float phi = ( uv.y < a ) ? uv.y / a * PI : PI + ( uv.y - a ) / ( 1.0 - a ) * PI;
		float P1 = r * cos( phi );
		float P2 = r * sin( phi ) * ( ( uv.y < a ) ? 1.0 : V.z );

		// compute normal
		vec3 N = P1 * T1 + P2 * T2 + V * sqrt( max( 0.0, 1.0 - P1 * P1 - P2 * P2 ) );

		// unstretch
		N = normalize( vec3( roughness * N.xy, max( 0.0, N.z ) ) );

		return N;

	}

	// Below are PDF and related functions for use in a Monte Carlo path tracer
	// as specified in Appendix B of the following paper
	// See equation (34) from reference [0]
	float ggxLamda( float theta, float roughness ) {

		float tanTheta = tan( theta );
		float tanTheta2 = tanTheta * tanTheta;
		float alpha2 = roughness * roughness;

		float numerator = - 1.0 + sqrt( 1.0 + alpha2 * tanTheta2 );
		return numerator / 2.0;

	}

	// See equation (34) from reference [0]
	float ggxShadowMaskG1( float theta, float roughness ) {

		return 1.0 / ( 1.0 + ggxLamda( theta, roughness ) );

	}

	// See equation (125) from reference [4]
	float ggxShadowMaskG2( vec3 wi, vec3 wo, float roughness ) {

		float incidentTheta = acos( wi.z );
		float scatterTheta = acos( wo.z );
		return 1.0 / ( 1.0 + ggxLamda( incidentTheta, roughness ) + ggxLamda( scatterTheta, roughness ) );

	}

	// See equation (33) from reference [0]
	float ggxDistribution( vec3 halfVector, float roughness ) {

		float a2 = roughness * roughness;
		a2 = max( EPSILON, a2 );
		float cosTheta = halfVector.z;
		float cosTheta4 = pow( cosTheta, 4.0 );

		if ( cosTheta == 0.0 ) return 0.0;

		float theta = acosSafe( halfVector.z );
		float tanTheta = tan( theta );
		float tanTheta2 = pow( tanTheta, 2.0 );

		float denom = PI * cosTheta4 * pow( a2 + tanTheta2, 2.0 );
		return ( a2 / denom );

	}

	// See equation (3) from reference [2]
	float ggxPDF( vec3 wi, vec3 halfVector, float roughness ) {

		float incidentTheta = acos( wi.z );
		float D = ggxDistribution( halfVector, roughness );
		float G1 = ggxShadowMaskG1( incidentTheta, roughness );

		return D * G1 * max( 0.0, dot( wi, halfVector ) ) / wi.z;

	}

`;var vs=`

	// XYZ to sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	vec3 fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 iorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return square( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float iorToFresnel0( float transmittedIor, float incidentIor ) {

		return square( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ) );

	}

	// Fresnel equations for dielectric/dielectric interfaces. See https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;

		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - square( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * square( phase ) );
		xyz /= 1.0685e-7;

		vec3 srgb = XYZ_TO_REC709 * xyz;
		return srgb;

	}

	// See Section 4. Analytic Spectral Integration, A Practical Extension to Microfacet Theory for the Modeling of Varying Iridescence, https://hal.archives-ouvertes.fr/hal-01518344/document
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIor -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIor = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );

		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = square( outsideIOR / iridescenceIor ) * ( 1.0 - square( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = iorToFresnel0( iridescenceIor, outsideIOR );
		float R12 = schlickFresnel( cosTheta1, R0 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIor < outsideIOR ) {

			phi12 = PI;

		}

		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = iorToFresnel0( baseIOR, iridescenceIor );
		vec3 R23 = schlickFresnel( cosTheta2, R1 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[0] < iridescenceIor ) {

			phi23[ 0 ] = PI;

		}

		if ( baseIOR[1] < iridescenceIor ) {

			phi23[ 1 ] = PI;

		}

		if ( baseIOR[2] < iridescenceIor ) {

			phi23[ 2 ] = PI;

		}

		// Phase shift
		float OPD = 2.0 * iridescenceIor * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = square( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

`;var xs=`

	// See equation (2) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetD( float cosThetaH, float roughness ) {

		float alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		float invAlpha = 1.0 / alpha;

		float sqrCosThetaH = cosThetaH * cosThetaH;
		float sinThetaH = max( 1.0 - sqrCosThetaH, 0.001 );

		return ( 2.0 + invAlpha ) * pow( sinThetaH, 0.5 * invAlpha ) / ( 2.0 * PI );

	}

	float velvetParamsInterpolate( int i, float oneMinusAlphaSquared ) {

		const float p0[5] = float[5]( 25.3245, 3.32435, 0.16801, -1.27393, -4.85967 );
		const float p1[5] = float[5]( 21.5473, 3.82987, 0.19823, -1.97760, -4.32054 );

		return mix( p1[i], p0[i], oneMinusAlphaSquared );

	}

	float velvetL( float x, float alpha ) {

		float oneMinusAlpha = 1.0 - alpha;
		float oneMinusAlphaSquared = oneMinusAlpha * oneMinusAlpha;

		float a = velvetParamsInterpolate( 0, oneMinusAlphaSquared );
		float b = velvetParamsInterpolate( 1, oneMinusAlphaSquared );
		float c = velvetParamsInterpolate( 2, oneMinusAlphaSquared );
		float d = velvetParamsInterpolate( 3, oneMinusAlphaSquared );
		float e = velvetParamsInterpolate( 4, oneMinusAlphaSquared );

		return a / ( 1.0 + b * pow( abs( x ), c ) ) + d * x + e;

	}

	// See equation (3) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetLambda( float cosTheta, float alpha ) {

		return abs( cosTheta ) < 0.5 ? exp( velvetL( cosTheta, alpha ) ) : exp( 2.0 * velvetL( 0.5, alpha ) - velvetL( 1.0 - cosTheta, alpha ) );

	}

	// See Section 3, Shadowing Term, in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetG( float cosThetaO, float cosThetaI, float roughness ) {

		float alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		return 1.0 / ( 1.0 + velvetLambda( cosThetaO, alpha ) + velvetLambda( cosThetaI, alpha ) );

	}

	float directionalAlbedoSheen( float cosTheta, float alpha ) {

		cosTheta = saturate( cosTheta );

		float c = 1.0 - cosTheta;
		float c3 = c * c * c;

		return 0.65584461 * c3 + 1.0 / ( 4.16526551 + exp( -7.97291361 * sqrt( alpha ) + 6.33516894 ) );

	}

	float sheenAlbedoScaling( vec3 wo, vec3 wi, SurfaceRecord surf ) {

		float alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		float maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		float eWo = directionalAlbedoSheen( saturateCos( wo.z ), alpha );
		float eWi = directionalAlbedoSheen( saturateCos( wi.z ), alpha );

		return min( 1.0 - maxSheenColor * eWo, 1.0 - maxSheenColor * eWi );

	}

	// See Section 5, Layering, in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float sheenAlbedoScaling( vec3 wo, SurfaceRecord surf ) {

		float alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		float maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		float eWo = directionalAlbedoSheen( saturateCos( wo.z ), alpha );

		return 1.0 - maxSheenColor * eWo;

	}

`;var ys=`

#ifndef FOG_CHECK_ITERATIONS
#define FOG_CHECK_ITERATIONS 30
#endif

// returns whether the given material is a fog material or not
bool isMaterialFogVolume( sampler2D materials, uint materialIndex ) {

	uint i = materialIndex * 45u;
	vec4 s14 = texelFetch1D( materials, i + 14u );
	return bool( int( s14.b ) & 4 );

}

// returns true if we're within the first fog volume we hit
bool bvhIntersectFogVolumeHit(
	vec3 rayOrigin, vec3 rayDirection,
	usampler2D materialIndexAttribute, sampler2D materials,
	inout Material material
) {

	material.fogVolume = false;

	for ( int i = 0; i < FOG_CHECK_ITERATIONS; i ++ ) {

		// find nearest hit
		uvec4 faceIndices = uvec4( 0u );
		vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
		vec3 barycoord = vec3( 0.0 );
		float side = 1.0;
		float dist = 0.0;
		bool hit = bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
		if ( hit ) {

			// if it's a fog volume return whether we hit the front or back face
			uint materialIndex = uTexelFetch1D( materialIndexAttribute, faceIndices.x ).r;
			if ( isMaterialFogVolume( materials, materialIndex ) ) {

				material = readMaterialInfo( materials, materialIndex );
				return side == - 1.0;

			} else {

				// move the ray forward
				rayOrigin = stepRayOrigin( rayOrigin, rayDirection, - faceNormal, dist );

			}

		} else {

			return false;

		}

	}

	return false;

}

`;var bs=`

	// step through multiple surface hits and accumulate color attenuation based on transmissive surfaces
	// returns true if a solid surface was hit
	bool attenuateHit(
		RenderState state,
		Ray ray, float rayDist,
		out vec3 color
	) {

		// store the original bounce index so we can reset it after
		uint originalBounceIndex = sobolBounceIndex;

		int traversals = state.traversals;
		int transmissiveTraversals = state.transmissiveTraversals;
		bool isShadowRay = state.isShadowRay;
		Material fogMaterial = state.fogMaterial;

		vec3 startPoint = ray.origin;

		// hit results
		SurfaceHit surfaceHit;

		color = vec3( 1.0 );

		bool result = true;
		for ( int i = 0; i < traversals; i ++ ) {

			sobolBounceIndex ++;

			int hitType = traceScene( ray, fogMaterial, surfaceHit );

			if ( hitType == FOG_HIT ) {

				result = true;
				break;

			} else if ( hitType == SURFACE_HIT ) {

				float totalDist = distance( startPoint, ray.origin + ray.direction * surfaceHit.dist );
				if ( totalDist > rayDist ) {

					result = false;
					break;

				}

				// TODO: attenuate the contribution based on the PDF of the resulting ray including refraction values
				// Should be able to work using the material BSDF functions which will take into account specularity, etc.
				// TODO: should we account for emissive surfaces here?

				uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
				Material material = readMaterialInfo( materials, materialIndex );

				// adjust the ray to the new surface
				bool isEntering = surfaceHit.side == 1.0;
				ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

				#if FEATURE_FOG

				if ( material.fogVolume ) {

					fogMaterial = material;
					fogMaterial.fogVolume = surfaceHit.side == 1.0;
					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;
					continue;

				}

				#endif

				if ( ! material.castShadow && isShadowRay ) {

					continue;

				}

				vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
				vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

				// albedo
				vec4 albedo = vec4( material.color, material.opacity );
				if ( material.map != - 1 ) {

					vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
					albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

				}

				if ( material.vertexColors ) {

					albedo *= vertexColor;

				}

				// alphaMap
				if ( material.alphaMap != - 1 ) {

					albedo.a *= texture2D( textures, vec3( uv, material.alphaMap ) ).x;

				}

				// transmission
				float transmission = material.transmission;
				if ( material.transmissionMap != - 1 ) {

					vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
					transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

				}

				// metalness
				float metalness = material.metalness;
				if ( material.metalnessMap != - 1 ) {

					vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
					metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

				}

				float alphaTest = material.alphaTest;
				bool useAlphaTest = alphaTest != 0.0;
				float transmissionFactor = ( 1.0 - metalness ) * transmission;
				if (
					transmissionFactor < rand( 9 ) && ! (
						// material sidedness
						material.side != 0.0 && surfaceHit.side == material.side

						// alpha test
						|| useAlphaTest && albedo.a < alphaTest

						// opacity
						|| material.transparent && ! useAlphaTest && albedo.a < rand( 10 )
					)
				) {

					result = true;
					break;

				}

				if ( surfaceHit.side == 1.0 && isEntering ) {

					// only attenuate by surface color on the way in
					color *= mix( vec3( 1.0 ), albedo.rgb, transmissionFactor );

				} else if ( surfaceHit.side == - 1.0 ) {

					// attenuate by medium once we hit the opposite side of the model
					color *= transmissionAttenuation( surfaceHit.dist, material.attenuationColor, material.attenuationDistance );

				}

				bool isTransmissiveRay = dot( ray.direction, surfaceHit.faceNormal * surfaceHit.side ) < 0.0;
				if ( ( isTransmissiveRay || isEntering ) && transmissiveTraversals > 0 ) {

					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;

				}

			} else {

				result = false;
				break;

			}

		}

		// reset the bounce index
		sobolBounceIndex = originalBounceIndex;
		return result;

	}

`;var Ts=`

	vec3 ndcToRayOrigin( vec2 coord ) {

		vec4 rayOrigin4 = cameraWorldMatrix * invProjectionMatrix * vec4( coord, - 1.0, 1.0 );
		return rayOrigin4.xyz / rayOrigin4.w;
	}

	Ray getCameraRay() {

		vec2 ssd = vec2( 1.0 ) / resolution;

		// Jitter the camera ray by finding a uv coordinate at a random sample
		// around this pixel's UV coordinate for AA
		vec2 ruv = rand2( 0 );
		vec2 jitteredUv = vUv + vec2( tentFilter( ruv.x ) * ssd.x, tentFilter( ruv.y ) * ssd.y );
		Ray ray;

		#if CAMERA_TYPE == 2

			// Equirectangular projection
			vec4 rayDirection4 = vec4( equirectUvToDirection( jitteredUv ), 0.0 );
			vec4 rayOrigin4 = vec4( 0.0, 0.0, 0.0, 1.0 );

			rayDirection4 = cameraWorldMatrix * rayDirection4;
			rayOrigin4 = cameraWorldMatrix * rayOrigin4;

			ray.direction = normalize( rayDirection4.xyz );
			ray.origin = rayOrigin4.xyz / rayOrigin4.w;

		#else

			// get [- 1, 1] normalized device coordinates
			vec2 ndc = 2.0 * jitteredUv - vec2( 1.0 );
			ray.origin = ndcToRayOrigin( ndc );

			#if CAMERA_TYPE == 1

				// Orthographic projection
				ray.direction = ( cameraWorldMatrix * vec4( 0.0, 0.0, - 1.0, 0.0 ) ).xyz;
				ray.direction = normalize( ray.direction );

			#else

				// Perspective projection
				ray.direction = normalize( mat3( cameraWorldMatrix ) * ( invProjectionMatrix * vec4( ndc, 0.0, 1.0 ) ).xyz );

			#endif

		#endif

		#if FEATURE_DOF
		{

			// depth of field
			vec3 focalPoint = ray.origin + normalize( ray.direction ) * physicalCamera.focusDistance;

			// get the aperture sample
			// if blades === 0 then we assume a circle
			vec3 shapeUVW= rand3( 1 );
			int blades = physicalCamera.apertureBlades;
			float anamorphicRatio = physicalCamera.anamorphicRatio;
			vec2 apertureSample = blades == 0 ? sampleCircle( shapeUVW.xy ) : sampleRegularPolygon( blades, shapeUVW );
			apertureSample *= physicalCamera.bokehSize * 0.5 * 1e-3;

			// rotate the aperture shape
			apertureSample =
				rotateVector( apertureSample, physicalCamera.apertureRotation ) *
				saturate( vec2( anamorphicRatio, 1.0 / anamorphicRatio ) );

			// create the new ray
			ray.origin += ( cameraWorldMatrix * vec4( apertureSample, 0.0, 0.0 ) ).xyz;
			ray.direction = focalPoint - ray.origin;

		}
		#endif

		ray.direction = normalize( ray.direction );

		return ray;

	}

`;var ws=`

	vec3 directLightContribution( vec3 worldWo, SurfaceRecord surf, RenderState state, vec3 rayOrigin ) {

		vec3 result = vec3( 0.0 );

		// uniformly pick a light or environment map
		if( lightsDenom != 0.0 && rand( 5 ) < float( lights.count ) / lightsDenom ) {

			// sample a light or environment
			LightRecord lightRec = randomLightSample( lights.tex, iesProfiles, lights.count, rayOrigin, rand3( 6 ) );

			bool isSampleBelowSurface = ! surf.volumeParticle && dot( surf.faceNormal, lightRec.direction ) < 0.0;
			if ( isSampleBelowSurface ) {

				lightRec.pdf = 0.0;

			}

			// check if a ray could even reach the light area
			Ray lightRay;
			lightRay.origin = rayOrigin;
			lightRay.direction = lightRec.direction;
			vec3 attenuatedColor;
			if (
				lightRec.pdf > 0.0 &&
				isDirectionValid( lightRec.direction, surf.normal, surf.faceNormal ) &&
				! attenuateHit( state, lightRay, lightRec.dist, attenuatedColor )
			) {

				// get the material pdf
				vec3 sampleColor;
				float lightMaterialPdf = bsdfResult( worldWo, lightRec.direction, surf, sampleColor );
				bool isValidSampleColor = all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) );
				if ( lightMaterialPdf > 0.0 && isValidSampleColor ) {

					// weight the direct light contribution
					float lightPdf = lightRec.pdf / lightsDenom;
					float misWeight = lightRec.type == SPOT_LIGHT_TYPE || lightRec.type == DIR_LIGHT_TYPE || lightRec.type == POINT_LIGHT_TYPE ? 1.0 : misHeuristic( lightPdf, lightMaterialPdf );
					result = attenuatedColor * lightRec.emission * state.throughputColor * sampleColor * misWeight / lightPdf;

				}

			}

		} else if ( envMapInfo.totalSum != 0.0 && environmentIntensity != 0.0 ) {

			// find a sample in the environment map to include in the contribution
			vec3 envColor, envDirection;
			float envPdf = sampleEquirectProbability( rand2( 7 ), envColor, envDirection );
			envDirection = invEnvRotation3x3 * envDirection;

			// this env sampling is not set up for transmissive sampling and yields overly bright
			// results so we ignore the sample in this case.
			// TODO: this should be improved but how? The env samples could traverse a few layers?
			bool isSampleBelowSurface = ! surf.volumeParticle && dot( surf.faceNormal, envDirection ) < 0.0;
			if ( isSampleBelowSurface ) {

				envPdf = 0.0;

			}

			// check if a ray could even reach the surface
			Ray envRay;
			envRay.origin = rayOrigin;
			envRay.direction = envDirection;
			vec3 attenuatedColor;
			if (
				envPdf > 0.0 &&
				isDirectionValid( envDirection, surf.normal, surf.faceNormal ) &&
				! attenuateHit( state, envRay, INFINITY, attenuatedColor )
			) {

				// get the material pdf
				vec3 sampleColor;
				float envMaterialPdf = bsdfResult( worldWo, envDirection, surf, sampleColor );
				bool isValidSampleColor = all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) );
				if ( envMaterialPdf > 0.0 && isValidSampleColor ) {

					// weight the direct light contribution
					envPdf /= lightsDenom;
					float misWeight = misHeuristic( envPdf, envMaterialPdf );
					result = attenuatedColor * environmentIntensity * envColor * state.throughputColor * sampleColor * misWeight / envPdf;

				}

			}

		}

		// Function changed to have a single return statement to potentially help with crashes on Mac OS.
		// See issue #470
		return result;

	}

`;var Ss=`

	#define SKIP_SURFACE 0
	#define HIT_SURFACE 1
	int getSurfaceRecord(
		Material material, SurfaceHit surfaceHit, sampler2DArray attributesArray,
		float accumulatedRoughness,
		inout SurfaceRecord surf
	) {

		if ( material.fogVolume ) {

			vec3 normal = vec3( 0, 0, 1 );

			SurfaceRecord fogSurface;
			fogSurface.volumeParticle = true;
			fogSurface.color = material.color;
			fogSurface.emission = material.emissiveIntensity * material.emissive;
			fogSurface.normal = normal;
			fogSurface.faceNormal = normal;
			fogSurface.clearcoatNormal = normal;

			surf = fogSurface;
			return HIT_SURFACE;

		}

		// uv coord for textures
		vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
		vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

		// albedo
		vec4 albedo = vec4( material.color, material.opacity );
		if ( material.map != - 1 ) {

			vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
			albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

		}

		if ( material.vertexColors ) {

			albedo *= vertexColor;

		}

		// alphaMap
		if ( material.alphaMap != - 1 ) {

			albedo.a *= texture2D( textures, vec3( uv, material.alphaMap ) ).x;

		}

		// possibly skip this sample if it's transparent, alpha test is enabled, or we hit the wrong material side
		// and it's single sided.
		// - alpha test is disabled when it === 0
		// - the material sidedness test is complicated because we want light to pass through the back side but still
		// be able to see the front side. This boolean checks if the side we hit is the front side on the first ray
		// and we're rendering the other then we skip it. Do the opposite on subsequent bounces to get incoming light.
		float alphaTest = material.alphaTest;
		bool useAlphaTest = alphaTest != 0.0;
		if (
			// material sidedness
			material.side != 0.0 && surfaceHit.side != material.side

			// alpha test
			|| useAlphaTest && albedo.a < alphaTest

			// opacity
			|| material.transparent && ! useAlphaTest && albedo.a < rand( 3 )
		) {

			return SKIP_SURFACE;

		}

		// fetch the interpolated smooth normal
		vec3 normal = normalize( textureSampleBarycoord(
			attributesArray,
			ATTR_NORMAL,
			surfaceHit.barycoord,
			surfaceHit.faceIndices.xyz
		).xyz );

		// roughness
		float roughness = material.roughness;
		if ( material.roughnessMap != - 1 ) {

			vec3 uvPrime = material.roughnessMapTransform * vec3( uv, 1 );
			roughness *= texture2D( textures, vec3( uvPrime.xy, material.roughnessMap ) ).g;

		}

		// metalness
		float metalness = material.metalness;
		if ( material.metalnessMap != - 1 ) {

			vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
			metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

		}

		// emission
		vec3 emission = material.emissiveIntensity * material.emissive;
		if ( material.emissiveMap != - 1 ) {

			vec3 uvPrime = material.emissiveMapTransform * vec3( uv, 1 );
			emission *= texture2D( textures, vec3( uvPrime.xy, material.emissiveMap ) ).xyz;

		}

		// transmission
		float transmission = material.transmission;
		if ( material.transmissionMap != - 1 ) {

			vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
			transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

		}

		// normal
		if ( material.flatShading ) {

			// if we're rendering a flat shaded object then use the face normals - the face normal
			// is provided based on the side the ray hits the mesh so flip it to align with the
			// interpolated vertex normals.
			normal = surfaceHit.faceNormal * surfaceHit.side;

		}

		vec3 baseNormal = normal;
		if ( material.normalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( normal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, normal );

				vec3 uvPrime = material.normalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.normalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.normalScale;
				normal = vTBN * texNormal;

			}

		}

		normal *= surfaceHit.side;

		// clearcoat
		float clearcoat = material.clearcoat;
		if ( material.clearcoatMap != - 1 ) {

			vec3 uvPrime = material.clearcoatMapTransform * vec3( uv, 1 );
			clearcoat *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatMap ) ).r;

		}

		// clearcoatRoughness
		float clearcoatRoughness = material.clearcoatRoughness;
		if ( material.clearcoatRoughnessMap != - 1 ) {

			vec3 uvPrime = material.clearcoatRoughnessMapTransform * vec3( uv, 1 );
			clearcoatRoughness *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatRoughnessMap ) ).g;

		}

		// clearcoatNormal
		vec3 clearcoatNormal = baseNormal;
		if ( material.clearcoatNormalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( clearcoatNormal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, clearcoatNormal );

				vec3 uvPrime = material.clearcoatNormalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.clearcoatNormalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.clearcoatNormalScale;
				clearcoatNormal = vTBN * texNormal;

			}

		}

		clearcoatNormal *= surfaceHit.side;

		// sheenColor
		vec3 sheenColor = material.sheenColor;
		if ( material.sheenColorMap != - 1 ) {

			vec3 uvPrime = material.sheenColorMapTransform * vec3( uv, 1 );
			sheenColor *= texture2D( textures, vec3( uvPrime.xy, material.sheenColorMap ) ).rgb;

		}

		// sheenRoughness
		float sheenRoughness = material.sheenRoughness;
		if ( material.sheenRoughnessMap != - 1 ) {

			vec3 uvPrime = material.sheenRoughnessMapTransform * vec3( uv, 1 );
			sheenRoughness *= texture2D( textures, vec3( uvPrime.xy, material.sheenRoughnessMap ) ).a;

		}

		// iridescence
		float iridescence = material.iridescence;
		if ( material.iridescenceMap != - 1 ) {

			vec3 uvPrime = material.iridescenceMapTransform * vec3( uv, 1 );
			iridescence *= texture2D( textures, vec3( uvPrime.xy, material.iridescenceMap ) ).r;

		}

		// iridescence thickness
		float iridescenceThickness = material.iridescenceThicknessMaximum;
		if ( material.iridescenceThicknessMap != - 1 ) {

			vec3 uvPrime = material.iridescenceThicknessMapTransform * vec3( uv, 1 );
			float iridescenceThicknessSampled = texture2D( textures, vec3( uvPrime.xy, material.iridescenceThicknessMap ) ).g;
			iridescenceThickness = mix( material.iridescenceThicknessMinimum, material.iridescenceThicknessMaximum, iridescenceThicknessSampled );

		}

		iridescence = iridescenceThickness == 0.0 ? 0.0 : iridescence;

		// specular color
		vec3 specularColor = material.specularColor;
		if ( material.specularColorMap != - 1 ) {

			vec3 uvPrime = material.specularColorMapTransform * vec3( uv, 1 );
			specularColor *= texture2D( textures, vec3( uvPrime.xy, material.specularColorMap ) ).rgb;

		}

		// specular intensity
		float specularIntensity = material.specularIntensity;
		if ( material.specularIntensityMap != - 1 ) {

			vec3 uvPrime = material.specularIntensityMapTransform * vec3( uv, 1 );
			specularIntensity *= texture2D( textures, vec3( uvPrime.xy, material.specularIntensityMap ) ).a;

		}

		surf.volumeParticle = false;

		surf.faceNormal = surfaceHit.faceNormal;
		surf.normal = normal;

		surf.metalness = metalness;
		surf.color = albedo.rgb;
		surf.emission = emission;

		surf.ior = material.ior;
		surf.transmission = transmission;
		surf.thinFilm = material.thinFilm;
		surf.attenuationColor = material.attenuationColor;
		surf.attenuationDistance = material.attenuationDistance;

		surf.clearcoatNormal = clearcoatNormal;
		surf.clearcoat = clearcoat;

		surf.sheen = material.sheen;
		surf.sheenColor = sheenColor;

		surf.iridescence = iridescence;
		surf.iridescenceIor = material.iridescenceIor;
		surf.iridescenceThickness = iridescenceThickness;

		surf.specularColor = specularColor;
		surf.specularIntensity = specularIntensity;

		// apply perceptual roughness factor from gltf. sheen perceptual roughness is
		// applied by its brdf function
		// https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#microfacet-surfaces
		surf.roughness = roughness * roughness;
		surf.clearcoatRoughness = clearcoatRoughness * clearcoatRoughness;
		surf.sheenRoughness = sheenRoughness;

		// frontFace is used to determine transmissive properties and PDF. If no transmission is used
		// then we can just always assume this is a front face.
		surf.frontFace = surfaceHit.side == 1.0 || transmission == 0.0;
		surf.eta = material.thinFilm || surf.frontFace ? 1.0 / material.ior : material.ior;
		surf.f0 = iorRatioToF0( surf.eta );

		// Compute the filtered roughness value to use during specular reflection computations.
		// The accumulated roughness value is scaled by a user setting and a "magic value" of 5.0.
		// If we're exiting something transmissive then scale the factor down significantly so we can retain
		// sharp internal reflections
		surf.filteredRoughness = applyFilteredGlossy( surf.roughness, accumulatedRoughness );
		surf.filteredClearcoatRoughness = applyFilteredGlossy( surf.clearcoatRoughness, accumulatedRoughness );

		// get the normal frames
		surf.normalBasis = getBasisFromNormal( surf.normal );
		surf.normalInvBasis = inverse( surf.normalBasis );

		surf.clearcoatBasis = getBasisFromNormal( surf.clearcoatNormal );
		surf.clearcoatInvBasis = inverse( surf.clearcoatBasis );

		return HIT_SURFACE;

	}
`;var _s=`

	struct Ray {

		vec3 origin;
		vec3 direction;

	};

	struct SurfaceHit {

		uvec4 faceIndices;
		vec3 barycoord;
		vec3 faceNormal;
		float side;
		float dist;

	};

	struct RenderState {

		bool firstRay;
		bool transmissiveRay;
		bool isShadowRay;
		float accumulatedRoughness;
		int transmissiveTraversals;
		int traversals;
		uint depth;
		vec3 throughputColor;
		Material fogMaterial;

	};

	RenderState initRenderState() {

		RenderState result;
		result.firstRay = true;
		result.transmissiveRay = true;
		result.isShadowRay = false;
		result.accumulatedRoughness = 0.0;
		result.transmissiveTraversals = 0;
		result.traversals = 0;
		result.throughputColor = vec3( 1.0 );
		result.depth = 0u;
		result.fogMaterial.fogVolume = false;
		return result;

	}

`;var As=`

	#define NO_HIT 0
	#define SURFACE_HIT 1
	#define LIGHT_HIT 2
	#define FOG_HIT 3

	// Passing the global variable 'lights' into this function caused shader program errors.
	// So global variables like 'lights' and 'bvh' were moved out of the function parameters.
	// For more information, refer to: https://github.com/gkjohnson/three-gpu-pathtracer/pull/457
	int traceScene(
		Ray ray, Material fogMaterial, inout SurfaceHit surfaceHit
	) {

		int result = NO_HIT;
		bool hit = bvhIntersectFirstHit( bvh, ray.origin, ray.direction, surfaceHit.faceIndices, surfaceHit.faceNormal, surfaceHit.barycoord, surfaceHit.side, surfaceHit.dist );

		#if FEATURE_FOG

		if ( fogMaterial.fogVolume ) {

			// offset the distance so we don't run into issues with particles on the same surface
			// as other objects
			float particleDist = intersectFogVolume( fogMaterial, rand( 1 ) );
			if ( particleDist + RAY_OFFSET < surfaceHit.dist ) {

				surfaceHit.side = 1.0;
				surfaceHit.faceNormal = normalize( - ray.direction );
				surfaceHit.dist = particleDist;
				return FOG_HIT;

			}

		}

		#endif

		if ( hit ) {

			result = SURFACE_HIT;

		}

		return result;

	}

`;var mi=class extends Z{onBeforeRender(){this.setDefine("FEATURE_DOF",this.physicalCamera.bokehSize===0?0:1),this.setDefine("FEATURE_BACKGROUND_MAP",this.backgroundMap?1:0),this.setDefine("FEATURE_FOG",this.materials.features.isUsed("FOG")?1:0)}constructor(e){super({transparent:!0,depthWrite:!1,defines:{FEATURE_MIS:1,FEATURE_RUSSIAN_ROULETTE:1,FEATURE_DOF:1,FEATURE_BACKGROUND_MAP:0,FEATURE_FOG:1,RANDOM_TYPE:2,CAMERA_TYPE:0,DEBUG_MODE:0,ATTR_NORMAL:0,ATTR_TANGENT:1,ATTR_UV:2,ATTR_COLOR:3},uniforms:{resolution:{value:new dc},opacity:{value:1},bounces:{value:10},transmissiveBounces:{value:10},filterGlossyFactor:{value:0},physicalCamera:{value:new Kt},cameraWorldMatrix:{value:new fi},invProjectionMatrix:{value:new fi},bvh:{value:new Nt},attributesArray:{value:new ii},materialIndexAttribute:{value:new Le},materials:{value:new oi},textures:{value:new ot().texture},lights:{value:new ei},iesProfiles:{value:new ot(360,180,{type:hc,wrapS:Is,wrapT:Is}).texture},environmentIntensity:{value:1},environmentRotation:{value:new fi},envMapInfo:{value:new Jt},backgroundBlur:{value:0},backgroundMap:{value:null},backgroundAlpha:{value:1},backgroundIntensity:{value:1},backgroundRotation:{value:new fi},seed:{value:0},sobolTexture:{value:null},stratifiedTexture:{value:new ai},stratifiedOffsetTexture:{value:new li(64,1)}},vertexShader:`

				varying vec2 vUv;
				void main() {

					vec4 mvPosition = vec4( position, 1.0 );
					mvPosition = modelViewMatrix * mvPosition;
					gl_Position = projectionMatrix * mvPosition;

					vUv = uv;

				}

			`,fragmentShader:`
				#define RAY_OFFSET 1e-4
				#define INFINITY 1e20

				precision highp isampler2D;
				precision highp usampler2D;
				precision highp sampler2DArray;
				vec4 envMapTexelToLinear( vec4 a ) { return a; }
				#include <common>

				// bvh intersection
				${me.common_functions}
				${me.bvh_struct_definitions}
				${me.bvh_ray_functions}

				// uniform structs
				${ts}
				${rs}
				${is}
				${os}
				${ss}

				// random
				#if RANDOM_TYPE == 2 	// Stratified List

					${hs}

				#elif RANDOM_TYPE == 1 	// Sobol

					${nr}
					${Yt}
					${Co}

					#define rand(v) sobol(v)
					#define rand2(v) sobol2(v)
					#define rand3(v) sobol3(v)
					#define rand4(v) sobol4(v)

				#else 					// PCG

				${nr}

					// Using the sobol functions seems to break the the compiler on MacOS
					// - specifically the "sobolReverseBits" function.
					uint sobolPixelIndex = 0u;
					uint sobolPathIndex = 0u;
					uint sobolBounceIndex = 0u;

					#define rand(v) pcgRand()
					#define rand2(v) pcgRand2()
					#define rand3(v) pcgRand3()
					#define rand4(v) pcgRand4()

				#endif

				// common
				${ms}
				${ls}
				${ui}
				${us}
				${fs}

				// environment
				uniform EquirectHdrInfo envMapInfo;
				uniform mat4 environmentRotation;
				uniform float environmentIntensity;

				// lighting
				uniform sampler2DArray iesProfiles;
				uniform LightsInfo lights;

				// background
				uniform float backgroundBlur;
				uniform float backgroundAlpha;
				#if FEATURE_BACKGROUND_MAP

				uniform sampler2D backgroundMap;
				uniform mat4 backgroundRotation;
				uniform float backgroundIntensity;

				#endif

				// camera
				uniform mat4 cameraWorldMatrix;
				uniform mat4 invProjectionMatrix;
				#if FEATURE_DOF

				uniform PhysicalCamera physicalCamera;

				#endif

				// geometry
				uniform sampler2DArray attributesArray;
				uniform usampler2D materialIndexAttribute;
				uniform sampler2D materials;
				uniform sampler2DArray textures;
				uniform BVH bvh;

				// path tracer
				uniform int bounces;
				uniform int transmissiveBounces;
				uniform float filterGlossyFactor;
				uniform int seed;

				// image
				uniform vec2 resolution;
				uniform float opacity;

				varying vec2 vUv;

				// globals
				mat3 envRotation3x3;
				mat3 invEnvRotation3x3;
				float lightsDenom;

				// sampling
				${cs}
				${ns}
				${as}

				${ys}
				${gs}
				${xs}
				${vs}
				${ps}
				${ds}

				float applyFilteredGlossy( float roughness, float accumulatedRoughness ) {

					return clamp(
						max(
							roughness,
							accumulatedRoughness * filterGlossyFactor * 5.0 ),
						0.0,
						1.0
					);

				}

				vec3 sampleBackground( vec3 direction, vec2 uv ) {

					vec3 sampleDir = sampleHemisphere( direction, uv ) * 0.5 * backgroundBlur;

					#if FEATURE_BACKGROUND_MAP

					sampleDir = normalize( mat3( backgroundRotation ) * direction + sampleDir );
					return backgroundIntensity * sampleEquirectColor( backgroundMap, sampleDir );

					#else

					sampleDir = normalize( envRotation3x3 * direction + sampleDir );
					return environmentIntensity * sampleEquirectColor( envMapInfo.map, sampleDir );

					#endif

				}

				${_s}
				${Ts}
				${As}
				${bs}
				${ws}
				${Ss}

				void main() {

					// init
					rng_initialize( gl_FragCoord.xy, seed );
					sobolPixelIndex = ( uint( gl_FragCoord.x ) << 16 ) | uint( gl_FragCoord.y );
					sobolPathIndex = uint( seed );

					// get camera ray
					Ray ray = getCameraRay();

					// inverse environment rotation
					envRotation3x3 = mat3( environmentRotation );
					invEnvRotation3x3 = inverse( envRotation3x3 );
					lightsDenom =
						( environmentIntensity == 0.0 || envMapInfo.totalSum == 0.0 ) && lights.count != 0u ?
							float( lights.count ) :
							float( lights.count + 1u );

					// final color
					gl_FragColor = vec4( 0, 0, 0, 1 );

					// surface results
					SurfaceHit surfaceHit;
					ScatterRecord scatterRec;

					// path tracing state
					RenderState state = initRenderState();
					state.transmissiveTraversals = transmissiveBounces;
					#if FEATURE_FOG

					state.fogMaterial.fogVolume = bvhIntersectFogVolumeHit(
						ray.origin, - ray.direction,
						materialIndexAttribute, materials,
						state.fogMaterial
					);

					#endif

					for ( int i = 0; i < bounces; i ++ ) {

						sobolBounceIndex ++;

						state.depth ++;
						state.traversals = bounces - i;
						state.firstRay = i == 0 && state.transmissiveTraversals == transmissiveBounces;

						int hitType = traceScene( ray, state.fogMaterial, surfaceHit );

						// check if we intersect any lights and accumulate the light contribution
						// TODO: we can add support for light surface rendering in the else condition if we
						// add the ability to toggle visibility of the the light
						if ( ! state.firstRay && ! state.transmissiveRay ) {

							LightRecord lightRec;
							float lightDist = hitType == NO_HIT ? INFINITY : surfaceHit.dist;
							for ( uint i = 0u; i < lights.count; i ++ ) {

								if (
									intersectLightAtIndex( lights.tex, ray.origin, ray.direction, i, lightRec ) &&
									lightRec.dist < lightDist
								) {

									#if FEATURE_MIS

									// weight the contribution
									// NOTE: Only area lights are supported for forward sampling and can be hit
									float misWeight = misHeuristic( scatterRec.pdf, lightRec.pdf / lightsDenom );
									gl_FragColor.rgb += lightRec.emission * state.throughputColor * misWeight;

									#else

									gl_FragColor.rgb += lightRec.emission * state.throughputColor;

									#endif

								}

							}

						}

						if ( hitType == NO_HIT ) {

							if ( state.firstRay || state.transmissiveRay ) {

								gl_FragColor.rgb += sampleBackground( ray.direction, rand2( 2 ) ) * state.throughputColor;
								gl_FragColor.a = backgroundAlpha;

							} else {

								#if FEATURE_MIS

								// get the PDF of the hit envmap point
								vec3 envColor;
								float envPdf = sampleEquirect( envRotation3x3 * ray.direction, envColor );
								envPdf /= lightsDenom;

								// and weight the contribution
								float misWeight = misHeuristic( scatterRec.pdf, envPdf );
								gl_FragColor.rgb += environmentIntensity * envColor * state.throughputColor * misWeight;

								#else

								gl_FragColor.rgb +=
									environmentIntensity *
									sampleEquirectColor( envMapInfo.map, envRotation3x3 * ray.direction ) *
									state.throughputColor;

								#endif

							}
							break;

						}

						uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
						Material material = readMaterialInfo( materials, materialIndex );

						#if FEATURE_FOG

						if ( hitType == FOG_HIT ) {

							material = state.fogMaterial;
							state.accumulatedRoughness += 0.2;

						} else if ( material.fogVolume ) {

							state.fogMaterial = material;
							state.fogMaterial.fogVolume = surfaceHit.side == 1.0;

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );
							continue;

						}

						#endif

						// early out if this is a matte material
						if ( material.matte && state.firstRay ) {

							gl_FragColor = vec4( 0.0 );
							break;

						}

						// if we've determined that this is a shadow ray and we've hit an item with no shadow casting
						// then skip it
						if ( ! material.castShadow && state.isShadowRay ) {

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						SurfaceRecord surf;
						if (
							getSurfaceRecord(
								material, surfaceHit, attributesArray, state.accumulatedRoughness,
								surf
							) == SKIP_SURFACE
						) {

							// only allow a limited number of transparency discards otherwise we could
							// crash the context with too long a loop.
							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						scatterRec = bsdfSample( - ray.direction, surf );
						state.isShadowRay = scatterRec.specularPdf < rand( 4 );

						bool isBelowSurface = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal ) < 0.0;
						vec3 hitPoint = stepRayOrigin( ray.origin, ray.direction, isBelowSurface ? - surf.faceNormal : surf.faceNormal, surfaceHit.dist );

						// next event estimation
						#if FEATURE_MIS

						gl_FragColor.rgb += directLightContribution( - ray.direction, surf, state, hitPoint );

						#endif

						// accumulate a roughness value to offset diffuse, specular, diffuse rays that have high contribution
						// to a single pixel resulting in fireflies
						// TODO: handle transmissive surfaces
						if ( ! surf.volumeParticle && ! isBelowSurface ) {

							// determine if this is a rough normal or not by checking how far off straight up it is
							vec3 halfVector = normalize( - ray.direction + scatterRec.direction );
							state.accumulatedRoughness += max(
								sin( acosApprox( dot( halfVector, surf.normal ) ) ),
								sin( acosApprox( dot( halfVector, surf.clearcoatNormal ) ) )
							);

							state.transmissiveRay = false;

						}

						// accumulate emissive color
						gl_FragColor.rgb += ( surf.emission * state.throughputColor );

						// skip the sample if our PDF or ray is impossible
						if ( scatterRec.pdf <= 0.0 || ! isDirectionValid( scatterRec.direction, surf.normal, surf.faceNormal ) ) {

							break;

						}

						// if we're bouncing around the inside a transmissive material then decrement
						// perform this separate from a bounce
						bool isTransmissiveRay = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal * surfaceHit.side ) < 0.0;
						if ( ( isTransmissiveRay || isBelowSurface ) && state.transmissiveTraversals > 0 ) {

							state.transmissiveTraversals --;
							i --;

						}

						//

						// handle throughput color transformation
						// attenuate the throughput color by the medium color
						if ( ! surf.frontFace ) {

							state.throughputColor *= transmissionAttenuation( surfaceHit.dist, surf.attenuationColor, surf.attenuationDistance );

						}

						#if FEATURE_RUSSIAN_ROULETTE

						// russian roulette path termination
						// https://www.arnoldrenderer.com/research/physically_based_shader_design_in_arnold.pdf
						uint minBounces = 3u;
						float depthProb = float( state.depth < minBounces );

						float rrProb = luminance( state.throughputColor * scatterRec.color / scatterRec.pdf );
						rrProb /= luminance( state.throughputColor );
						rrProb = sqrt( rrProb );
						rrProb = max( rrProb, depthProb );
						rrProb = min( rrProb, 1.0 );
						if ( rand( 8 ) > rrProb ) {

							break;

						}

						// perform sample clamping here to avoid bright pixels
						state.throughputColor *= min( 1.0 / rrProb, 20.0 );

						#endif

						// adjust the throughput and discard and exit if we find discard the sample if there are any NaNs
						state.throughputColor *= scatterRec.color / scatterRec.pdf;
						if ( any( isnan( state.throughputColor ) ) || any( isinf( state.throughputColor ) ) ) {

							break;

						}

						//

						// prepare for next ray
						ray.direction = scatterRec.direction;
						ray.origin = hitPoint;

					}

					gl_FragColor.a *= opacity;

					#if DEBUG_MODE == 1

					// output the number of rays checked in the path and number of
					// transmissive rays encountered.
					gl_FragColor.rgb = vec3(
						float( state.depth ),
						transmissiveBounces - state.transmissiveTraversals,
						0.0
					);
					gl_FragColor.a = 1.0;

					#endif

				}

			`}),this.setValues(e)}};function*yc(){let{_renderer:o,_fsQuad:e,_blendQuad:t,_primaryTarget:i,_blendTargets:s,_sobolTarget:n,_subframe:r,alpha:c,material:l}=this,m=new ur,f=new ur,u=t.material,[a,d]=s;for(;;){c?(u.opacity=this._opacityFactor/(this.samples+1),l.blending=vc,l.opacity=1):(l.opacity=this._opacityFactor/(this.samples+1),l.blending=xc);let[v,y,h,p]=r,g=i.width,x=i.height;l.resolution.set(g*h,x*p),l.sobolTexture=n.texture,l.stratifiedTexture.init(20,l.bounces+l.transmissiveBounces+5),l.stratifiedTexture.next(),l.seed++;let T=this.tiles.x||1,b=this.tiles.y||1,w=T*b,S=Math.ceil(g*h),_=Math.ceil(x*p),A=Math.floor(v*g),R=Math.floor(y*x),F=Math.ceil(S/T),I=Math.ceil(_/b);for(let P=0;P<b;P++)for(let M=0;M<T;M++){let C=o.getRenderTarget(),N=o.autoClear,Q=o.getScissorTest();o.getScissor(m),o.getViewport(f);let J=M,ie=P;if(!this.stableTiles){let vi=this._currentTile%(T*b);J=vi%T,ie=~~(vi/T),this._currentTile=vi+1}let pr=b-ie-1;i.scissor.set(A+J*F,R+pr*I,Math.min(F,S-J*F),Math.min(I,_-pr*I)),i.viewport.set(A,R,S,_),o.setRenderTarget(i),o.setScissorTest(!0),o.autoClear=!1,e.render(o),o.setViewport(f),o.setScissor(m),o.setScissorTest(Q),o.setRenderTarget(C),o.autoClear=N,c&&(u.target1=a.texture,u.target2=i.texture,o.setRenderTarget(d),t.render(o),o.setRenderTarget(C)),this.samples+=1/w,M===T-1&&P===b-1&&(this.samples=Math.round(this.samples)),yield}[a,d]=[d,a]}}var Fs=new pc,nt=class{get material(){return this._fsQuad.material}set material(e){this._fsQuad.material.removeEventListener("recompilation",this._compileFunction),e.addEventListener("recompilation",this._compileFunction),this._fsQuad.material=e}get target(){return this._alpha?this._blendTargets[1]:this._primaryTarget}set alpha(e){this._alpha!==e&&(e||(this._blendTargets[0].dispose(),this._blendTargets[1].dispose()),this._alpha=e,this.reset())}get alpha(){return this._alpha}get isCompiling(){return!!this._compilePromise}constructor(e){this.camera=null,this.tiles=new gc(3,3),this.stableNoise=!1,this.stableTiles=!0,this.samples=0,this._subframe=new ur(0,0,1,1),this._opacityFactor=1,this._renderer=e,this._alpha=!1,this._fsQuad=new Rs(new mi),this._blendQuad=new Rs(new qt),this._task=null,this._currentTile=0,this._compilePromise=null,this._sobolTarget=new Xt().generate(e),this._primaryTarget=new lr(1,1,{format:ar,type:cr,magFilter:Ue,minFilter:Ue}),this._blendTargets=[new lr(1,1,{format:ar,type:cr,magFilter:Ue,minFilter:Ue}),new lr(1,1,{format:ar,type:cr,magFilter:Ue,minFilter:Ue})],this._compileFunction=()=>{let t=this.compileMaterial(this._fsQuad._mesh);t.then(()=>{this._compilePromise===t&&(this._compilePromise=null)}),this._compilePromise=t},this.material.addEventListener("recompilation",this._compileFunction)}compileMaterial(){return this._renderer.compileAsync(this._fsQuad._mesh)}setCamera(e){let{material:t}=this;t.cameraWorldMatrix.copy(e.matrixWorld),t.invProjectionMatrix.copy(e.projectionMatrixInverse),t.physicalCamera.updateFrom(e);let i=0;e.projectionMatrix.elements[15]>0&&(i=1),e.isEquirectCamera&&(i=2),t.setDefine("CAMERA_TYPE",i),this.camera=e}setSize(e,t){e=Math.ceil(e),t=Math.ceil(t),!(this._primaryTarget.width===e&&this._primaryTarget.height===t)&&(this._primaryTarget.setSize(e,t),this._blendTargets[0].setSize(e,t),this._blendTargets[1].setSize(e,t),this.reset())}getSize(e){e.x=this._primaryTarget.width,e.y=this._primaryTarget.height}dispose(){this._primaryTarget.dispose(),this._blendTargets[0].dispose(),this._blendTargets[1].dispose(),this._sobolTarget.dispose(),this._fsQuad.dispose(),this._blendQuad.dispose(),this._task=null}reset(){let{_renderer:e,_primaryTarget:t,_blendTargets:i}=this,s=e.getRenderTarget(),n=e.getClearAlpha();e.getClearColor(Fs),e.setRenderTarget(t),e.setClearColor(0,0),e.clearColor(),e.setRenderTarget(i[0]),e.setClearColor(0,0),e.clearColor(),e.setRenderTarget(i[1]),e.setClearColor(0,0),e.clearColor(),e.setClearColor(Fs,n),e.setRenderTarget(s),this.samples=0,this._task=null,this.material.stratifiedTexture.stableNoise=this.stableNoise,this.stableNoise&&(this.material.seed=0,this.material.stratifiedTexture.reset())}update(){this.material.onBeforeRender(),!this.isCompiling&&(this._task||(this._task=yc.call(this)),this._task.next())}};import{FullScreenQuad as $c}from"three/addons/postprocessing/Pass.js";import{Color as Ds,Vector3 as Fc}from"three";import{ClampToEdgeWrapping as bc,Color as Tc,DataTexture as wc,EquirectangularReflectionMapping as Sc,LinearFilter as Ps,RepeatWrapping as _c,RGBAFormat as Ac,Spherical as Ic,Vector2 as Cs,FloatType as Rc}from"three";var xe=new Cs,Ms=new Cs,hi=new Ic,di=new Tc,pi=class extends wc{constructor(e=512,t=512){super(new Float32Array(e*t*4),e,t,Ac,Rc,Sc,_c,bc,Ps,Ps),this.generationCallback=null}update(){this.dispose(),this.needsUpdate=!0;let{data:e,width:t,height:i}=this.image;for(let s=0;s<t;s++)for(let n=0;n<i;n++){Ms.set(t,i),xe.set(s/t,n/i),xe.x-=.5,xe.y=1-xe.y,hi.theta=xe.x*2*Math.PI,hi.phi=xe.y*Math.PI,hi.radius=1,this.generationCallback(hi,xe,Ms,di);let c=4*(n*t+s);e[c+0]=di.r,e[c+1]=di.g,e[c+2]=di.b,e[c+3]=1}}copy(e){return super.copy(e),this.generationCallback=e.generationCallback,this}};var Bs=new Fc,at=class extends pi{constructor(e=512){super(e,e),this.topColor=new Ds().set(16777215),this.bottomColor=new Ds().set(0),this.exponent=2,this.generationCallback=(t,i,s,n)=>{Bs.setFromSpherical(t);let r=Bs.y*.5+.5;n.lerpColors(this.bottomColor,this.topColor,r**this.exponent)}}copy(e){return super.copy(e),this.topColor.copy(e.topColor),this.bottomColor.copy(e.bottomColor),this}};import{ShaderMaterial as Pc}from"three";var gi=class extends Pc{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}constructor(e){super({uniforms:{map:{value:null},opacity:{value:1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				uniform float opacity;
				varying vec2 vUv;

				vec4 clampedTexelFatch( sampler2D map, ivec2 px, int lod ) {

					vec4 res = texelFetch( map, ivec2( px.x, px.y ), 0 );

					#if defined( TONE_MAPPING )

					res.xyz = toneMapping( res.xyz );

					#endif

			  		return linearToOutputTexel( res );

				}

				void main() {

					vec2 size = vec2( textureSize( map, 0 ) );
					vec2 pxUv = vUv * size;
					vec2 pxCurr = floor( pxUv );
					vec2 pxFrac = fract( pxUv ) - 0.5;
					vec2 pxOffset;
					pxOffset.x = pxFrac.x > 0.0 ? 1.0 : - 1.0;
					pxOffset.y = pxFrac.y > 0.0 ? 1.0 : - 1.0;

					vec2 pxNext = clamp( pxOffset + pxCurr, vec2( 0.0 ), size - 1.0 );
					vec2 alpha = abs( pxFrac );

					vec4 p1 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxCurr.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxCurr.y ), 0 ),
						alpha.x
					);

					vec4 p2 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxNext.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxNext.y ), 0 ),
						alpha.x
					);

					gl_FragColor = mix( p1, p2, alpha.y );
					gl_FragColor.a *= opacity;
					#include <premultiplied_alpha_fragment>

				}
			`}),this.setValues(e)}};import{DataTexture as Mc,DataUtils as Cc,EquirectangularReflectionMapping as Dc,FloatType as Bc,HalfFloatType as Ec,LinearFilter as Lc,LinearMipMapLinearFilter as Nc,RGBAFormat as kc,RepeatWrapping as Es,ShaderMaterial as Oc,WebGLRenderTarget as zc}from"three";import{FullScreenQuad as Hc}from"three/addons/postprocessing/Pass.js";var fr=class extends Oc{constructor(){super({uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`
				#define ENVMAP_TYPE_CUBE_UV

				uniform samplerCube envMap;
				uniform float flipEnvMap;
				varying vec2 vUv;

				#include <common>
				#include <cube_uv_reflection_fragment>

				${ui}

				void main() {

					vec3 rayDirection = equirectUvToDirection( vUv );
					rayDirection.x *= flipEnvMap;
					gl_FragColor = textureCube( envMap, rayDirection );

				}`}),this.depthWrite=!1,this.depthTest=!1}},ct=class{constructor(e){this._renderer=e,this._quad=new Hc(new fr)}generate(e,t=null,i=null){if(!e.isCubeTexture)throw new Error("CubeToEquirectMaterial: Source can only be cube textures.");let s=e.images[0],n=this._renderer,r=this._quad;t===null&&(t=4*s.height),i===null&&(i=2*s.height);let c=new zc(t,i,{type:Bc,colorSpace:s.colorSpace}),l=s.height,m=Math.log2(l)-2,f=1/l,u=1/(3*Math.max(Math.pow(2,m),7*16));r.material.defines.CUBEUV_MAX_MIP=`${m}.0`,r.material.defines.CUBEUV_TEXEL_WIDTH=u,r.material.defines.CUBEUV_TEXEL_HEIGHT=f,r.material.uniforms.envMap.value=e,r.material.uniforms.flipEnvMap.value=e.isRenderTargetTexture?1:-1,r.material.needsUpdate=!0;let a=n.getRenderTarget(),d=n.autoClear;n.autoClear=!0,n.setRenderTarget(c),r.render(n),n.setRenderTarget(a),n.autoClear=d;let v=new Uint16Array(t*i*4),y=new Float32Array(t*i*4);n.readRenderTargetPixels(c,0,0,t,i,y),c.dispose();for(let p=0,g=y.length;p<g;p++)v[p]=Cc.toHalfFloat(y[p]);let h=new Mc(v,t,i,kc,Ec);return h.minFilter=Nc,h.magFilter=Lc,h.wrapS=Es,h.wrapT=Es,h.mapping=Dc,h.needsUpdate=!0,h}dispose(){this._quad.dispose()}};function jc(o){return o.extensions.get("EXT_float_blend")}var We=new Ns,mr=class{get multipleImportanceSampling(){return!!this._pathTracer.material.defines.FEATURE_MIS}set multipleImportanceSampling(e){this._pathTracer.material.setDefine("FEATURE_MIS",e?1:0)}get transmissiveBounces(){return this._pathTracer.material.transmissiveBounces}set transmissiveBounces(e){this._pathTracer.material.transmissiveBounces=e}get bounces(){return this._pathTracer.material.bounces}set bounces(e){this._pathTracer.material.bounces=e}get filterGlossyFactor(){return this._pathTracer.material.filterGlossyFactor}set filterGlossyFactor(e){this._pathTracer.material.filterGlossyFactor=e}get samples(){return this._pathTracer.samples}get target(){return this._pathTracer.target}get tiles(){return this._pathTracer.tiles}get stableNoise(){return this._pathTracer.stableNoise}set stableNoise(e){this._pathTracer.stableNoise=e}get isCompiling(){return!!this._pathTracer.isCompiling}constructor(e){this._renderer=e,this._generator=new Gt,this._pathTracer=new nt(e),this._queueReset=!1,this._clock=new Vc,this._compilePromise=null,this._lowResPathTracer=new nt(e),this._lowResPathTracer.tiles.set(1,1),this._quad=new $c(new gi({map:null,transparent:!0,blending:Ls,premultipliedAlpha:e.getContextAttributes().premultipliedAlpha})),this._materials=null,this._previousEnvironment=null,this._previousBackground=null,this._internalBackground=null,this.renderDelay=100,this.minSamples=5,this.fadeDuration=500,this.enablePathTracing=!0,this.pausePathTracing=!1,this.dynamicLowRes=!1,this.lowResScale=.25,this.renderScale=1,this.synchronizeRenderSize=!0,this.rasterizeScene=!0,this.renderToCanvas=!0,this.textureSize=new Ns(1024,1024),this.rasterizeSceneCallback=(t,i)=>{this._renderer.render(t,i)},this.renderToCanvasCallback=(t,i,s)=>{let n=i.autoClear;i.autoClear=!1,s.render(i),i.autoClear=n},this.setScene(new Wc,new Uc)}setBVHWorker(e){this._generator.setBVHWorker(e)}setScene(e,t,i={}){e.updateMatrixWorld(!0),t.updateMatrixWorld();let s=this._generator;if(s.setObjects(e),this._buildAsync)return s.generateAsync(i.onProgress).then(n=>this._updateFromResults(e,t,n));{let n=s.generate();return this._updateFromResults(e,t,n)}}setSceneAsync(...e){this._buildAsync=!0;let t=this.setScene(...e);return this._buildAsync=!1,t}setCamera(e){this.camera=e,this.updateCamera()}updateCamera(){let e=this.camera;e.updateMatrixWorld(),this._pathTracer.setCamera(e),this._lowResPathTracer.setCamera(e),this.reset()}updateMaterials(){let e=this._pathTracer.material,t=this._renderer,i=this._materials,s=this.textureSize,n=Uo(i);e.textures.setTextures(t,n,s.x,s.y),e.materials.updateFrom(i,n),this.reset()}updateLights(){let e=this.scene,t=this._renderer,i=this._pathTracer.material,s=Wo(e),n=Ho(s);i.lights.updateFrom(s,n),i.iesProfiles.setTextures(t,n),this.reset()}updateEnvironment(){let e=this.scene,t=this._pathTracer.material;if(this._internalBackground&&(this._internalBackground.dispose(),this._internalBackground=null),t.backgroundBlur=e.backgroundBlurriness,t.backgroundIntensity=e.backgroundIntensity??1,t.backgroundRotation.makeRotationFromEuler(e.backgroundRotation).invert(),e.background===null)t.backgroundMap=null,t.backgroundAlpha=0;else if(e.background.isColor){this._colorBackground=this._colorBackground||new at(16);let i=this._colorBackground;i.topColor.equals(e.background)||(i.topColor.set(e.background),i.bottomColor.set(e.background),i.update()),t.backgroundMap=i,t.backgroundAlpha=1}else if(e.background.isCubeTexture){if(e.background!==this._previousBackground){let i=new ct(this._renderer).generate(e.background);this._internalBackground=i,t.backgroundMap=i,t.backgroundAlpha=1}}else t.backgroundMap=e.background,t.backgroundAlpha=1;if(t.environmentIntensity=e.environmentIntensity??1,t.environmentRotation.makeRotationFromEuler(e.environmentRotation).invert(),this._previousEnvironment!==e.environment)if(e.environment!==null)if(e.environment.isCubeTexture){let i=new ct(this._renderer).generate(e.environment);t.envMapInfo.updateFrom(i)}else t.envMapInfo.updateFrom(e.environment);else t.environmentIntensity=0;this._previousEnvironment=e.environment,this._previousBackground=e.background,this.reset()}_updateFromResults(e,t,i){let{materials:s,geometry:n,bvh:r,bvhChanged:c}=i;this._materials=s;let m=this._pathTracer.material;return c&&(m.bvh.updateFrom(r),m.attributesArray.updateFrom(n.attributes.normal,n.attributes.tangent,n.attributes.uv,n.attributes.color),m.materialIndexAttribute.updateFrom(n.attributes.materialIndex)),this._previousScene=e,this.scene=e,this.camera=t,this.updateCamera(),this.updateMaterials(),this.updateEnvironment(),this.updateLights(),i}renderSample(){let e=this._lowResPathTracer,t=this._pathTracer,i=this._renderer,s=this._clock,n=this._quad;this._updateScale(),this._queueReset&&(t.reset(),e.reset(),this._queueReset=!1,n.material.opacity=0,s.start());let r=s.getDelta()*1e3,c=s.getElapsedTime()*1e3;if(!this.pausePathTracing&&this.enablePathTracing&&this.renderDelay<=c&&!this.isCompiling&&t.update(),t.alpha=t.material.backgroundAlpha!==1||!jc(i),e.alpha=t.alpha,this.renderToCanvas){let l=this._renderer,m=this.minSamples;if(c>=this.renderDelay&&this.samples>=this.minSamples&&(this.fadeDuration!==0?n.material.opacity=Math.min(n.material.opacity+r/this.fadeDuration,1):n.material.opacity=1),!this.enablePathTracing||this.samples<m||n.material.opacity<1){if(this.dynamicLowRes&&!this.isCompiling){e.samples<1&&(e.material=t.material,e.update());let f=n.material.opacity;n.material.opacity=1-n.material.opacity,n.material.map=e.target.texture,n.render(l),n.material.opacity=f}(!this.dynamicLowRes&&this.rasterizeScene||this.dynamicLowRes&&this.isCompiling)&&this.rasterizeSceneCallback(this.scene,this.camera)}this.enablePathTracing&&n.material.opacity>0&&(n.material.opacity<1&&(n.material.blending=this.dynamicLowRes?qc:Gc),n.material.map=t.target.texture,this.renderToCanvasCallback(t.target,l,n),n.material.blending=Ls)}}reset(){this._queueReset=!0,this._pathTracer.samples=0}dispose(){this._renderQuad.dispose(),this._renderQuad.material.dispose(),this._pathTracer.dispose()}_updateScale(){if(this.synchronizeRenderSize){this._renderer.getDrawingBufferSize(We);let e=Math.floor(this.renderScale*We.x),t=Math.floor(this.renderScale*We.y);if(this._pathTracer.getSize(We),We.x!==e||We.y!==t){let i=this.lowResScale;this._pathTracer.setSize(e,t),this._lowResPathTracer.setSize(Math.floor(e*i),Math.floor(t*i))}}}};import{SpotLight as Yc}from"three";var hr=class extends Yc{constructor(...e){super(...e),this.iesMap=null,this.radius=0}copy(e,t){return super.copy(e,t),this.iesMap=e.iesMap,this.radius=e.radius,this}};import{NoBlending as Xc}from"three";var dr=class extends Z{constructor(e){super({blending:Xc,transparent:!1,depthWrite:!1,depthTest:!1,defines:{USE_SLIDER:0},uniforms:{sigma:{value:5},threshold:{value:.03},kSigma:{value:1},map:{value:null},opacity:{value:1}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}

			`,fragmentShader:`

				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				//  Copyright (c) 2018-2019 Michele Morrone
				//  All rights reserved.
				//
				//  https://michelemorrone.eu - https://BrutPitt.com
				//
				//  me@michelemorrone.eu - brutpitt@gmail.com
				//  twitter: @BrutPitt - github: BrutPitt
				//
				//  https://github.com/BrutPitt/glslSmartDeNoise/
				//
				//  This software is distributed under the terms of the BSD 2-Clause license
				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

				uniform sampler2D map;

				uniform float sigma;
				uniform float threshold;
				uniform float kSigma;
				uniform float opacity;

				varying vec2 vUv;

				#define INV_SQRT_OF_2PI 0.39894228040143267793994605993439
				#define INV_PI 0.31830988618379067153776752674503

				// Parameters:
				//	 sampler2D tex	 - sampler image / texture
				//	 vec2 uv		   - actual fragment coord
				//	 float sigma  >  0 - sigma Standard Deviation
				//	 float kSigma >= 0 - sigma coefficient
				//		 kSigma * sigma  -->  radius of the circular kernel
				//	 float threshold   - edge sharpening threshold
				vec4 smartDeNoise( sampler2D tex, vec2 uv, float sigma, float kSigma, float threshold ) {

					float radius = round( kSigma * sigma );
					float radQ = radius * radius;

					float invSigmaQx2 = 0.5 / ( sigma * sigma );
					float invSigmaQx2PI = INV_PI * invSigmaQx2;

					float invThresholdSqx2 = 0.5 / ( threshold * threshold );
					float invThresholdSqrt2PI = INV_SQRT_OF_2PI / threshold;

					vec4 centrPx = texture2D( tex, uv );
					centrPx.rgb *= centrPx.a;

					float zBuff = 0.0;
					vec4 aBuff = vec4( 0.0 );
					vec2 size = vec2( textureSize( tex, 0 ) );

					vec2 d;
					for ( d.x = - radius; d.x <= radius; d.x ++ ) {

						float pt = sqrt( radQ - d.x * d.x );

						for ( d.y = - pt; d.y <= pt; d.y ++ ) {

							float blurFactor = exp( - dot( d, d ) * invSigmaQx2 ) * invSigmaQx2PI;

							vec4 walkPx = texture2D( tex, uv + d / size );
							walkPx.rgb *= walkPx.a;

							vec4 dC = walkPx - centrPx;
							float deltaFactor = exp( - dot( dC.rgba, dC.rgba ) * invThresholdSqx2 ) * invThresholdSqrt2PI * blurFactor;

							zBuff += deltaFactor;
							aBuff += deltaFactor * walkPx;

						}

					}

					return aBuff / zBuff;

				}

				void main() {

					gl_FragColor = smartDeNoise( map, vec2( vUv.x, vUv.y ), sigma, kSigma, threshold );
					#include <tonemapping_fragment>
					#include <colorspace_fragment>
					#include <premultiplied_alpha_fragment>

					gl_FragColor.a *= opacity;

				}

			`}),this.setValues(e)}};export{dr as DenoiseMaterial,at as GradientEquirectTexture,hr as PhysicalSpotLight,mr as WebGLPathTracer};
