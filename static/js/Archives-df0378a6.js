import{d as y,P as C,h as S,i as w,u as B,r as f,A as I,j as P,k as $,l as A,_ as T,e as p,o as l,c as r,g as t,f as u,t as a,F as _,m as b,w as x,p as H,n as D}from"./index_prod-9412c206.js";import{B as F}from"./Breadcrumbs-8a6db6d6.js";import"https://unpkg.com/@waline/client@v2/dist/waline.mjs";const N=y({name:"Archives",components:{Breadcrumbs:F,Paginator:C},setup(){const e=S(),g=w(),{t:v}=B(),c=f(new I().data),o=f({pageTotal:0,page:1}),d=()=>{g.fetchArchives(o.value.page).then(n=>{o.value.pageTotal=n.total,c.value=n.data}),e.setHeaderImage(A)},m=n=>{o.value.page=n,window.scrollTo({top:0,behavior:"smooth"}),d()};return P(d),$(()=>{e.resetHeaderImage()}),{pageChangeHanlder:m,pagination:o,archives:c,t:v}}});const h=e=>(H("data-v-a2eba548"),e=e(),D(),e),V={class:"flex flex-col"},j={class:"post-header"},z={class:"post-title text-white uppercase"},E={class:"bg-ob-deep-800 px-14 py-16 rounded-2xl shadow-xl block min-h-screen"},L={class:"timeline timeline-centered"},M={class:"timeline-item period"},U=h(()=>t("div",{class:"timeline-info"},null,-1)),q=h(()=>t("div",{class:"timeline-marker"},null,-1)),G={class:"timeline-content"},J={class:"timeline-title"},K={class:"timeline-info"},O=h(()=>t("div",{class:"timeline-marker"},null,-1)),Q={class:"timeline-content"},R={class:"timeline-title"};function W(e,g,v,c,o,d){const m=p("Breadcrumbs"),n=p("router-link"),k=p("Paginator");return l(),r("div",V,[t("div",j,[u(m,{current:e.t("menu.archives")},null,8,["current"]),t("h1",z,a(e.t("menu.archives")),1)]),t("div",E,[t("ul",L,[(l(!0),r(_,null,b(e.archives,i=>(l(),r(_,{key:`${i.month}-${i.year}}`},[t("li",M,[U,q,t("div",G,[t("h2",J,a(e.t(i.month))+" "+a(i.year),1)])]),(l(!0),r(_,null,b(i.posts,s=>(l(),r("li",{class:"timeline-item",key:s.slug},[t("div",K,[t("span",null,a(e.t(s.date.month))+" "+a(s.date.day)+", "+a(s.date.year),1)]),O,t("div",Q,[u(n,{to:{name:"post",params:{slug:s.slug}}},{default:x(()=>[t("h3",R,a(s.title),1)]),_:2},1032,["to"]),t("p",null,a(s.text),1)])]))),128))],64))),128))]),u(k,{pageSize:12,pageTotal:e.pagination.pageTotal,page:e.pagination.page,onPageChange:e.pageChangeHanlder},null,8,["pageTotal","page","onPageChange"])])])}const ee=T(N,[["render",W],["__scopeId","data-v-a2eba548"]]);export{ee as default};
