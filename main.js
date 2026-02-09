// 페이지 전환
const navLinks=document.querySelectorAll(".nav-link");
const pages=document.querySelectorAll(".page-content");

function showPage(id){
pages.forEach(p=>p.hidden=p.id!==id);
}

navLinks.forEach(link=>{
link.addEventListener("click",()=>{
showPage(link.dataset.page);
});
});

// 테스트 데이터
const tests={
animal:{
questions:[
{q:"연애할때 나는?",a:[
{text:"직진",score:2},
{text:"천천히",score:1}
]}
],
results:[
{min:0,title:"고양이",img:"https://picsum.photos/200",desc:"츤데레"},
{min:2,title:"강아지",img:"https://picsum.photos/201",desc:"직진형"}
]
}
};

let currentTest=null;
let step=0;
let score=0;

// 테스트 시작
function startTest(name){
currentTest=tests[name];
step=0;
score=0;
showPage("test-page");
renderQuestion();
}

// 질문 렌더
function renderQuestion(){
const q=currentTest.questions[step];
document.getElementById("question").innerText=q.q;

const ansDiv=document.getElementById("answers");
ansDiv.innerHTML="";

q.a.forEach(a=>{
const btn=document.createElement("button");
btn.innerText=a.text;
btn.onclick=()=>{
score+=a.score;
step++;
if(step>=currentTest.questions.length){
showResult();
}else{
renderQuestion();
}
};
ansDiv.appendChild(btn);
});
}

// 결과
function showResult(){
showPage("result-page");

let result=currentTest.results[0];
currentTest.results.forEach(r=>{
if(score>=r.min) result=r;
});

document.getElementById("result-title").innerText=result.title;
document.getElementById("result-img").src=result.img;
document.getElementById("result-desc").innerText=result.desc;

saveRanking(result.title);
}

// 공유
function shareResult(){
navigator.clipboard.writeText(location.href);
alert("링크 복사됨");
}

// 랭킹
function saveRanking(name){
let rank=JSON.parse(localStorage.getItem("rank")||"{}");
rank[name]=(rank[name]||0)+1;
localStorage.setItem("rank",JSON.stringify(rank));
renderRanking();
}

function renderRanking(){
let rank=JSON.parse(localStorage.getItem("rank")||"{}");
let html="<h3>인기 결과</h3>";

Object.entries(rank)
.sort((a,b)=>b[1]-a[1])
.forEach(r=>{
html+=`<p>${r[0]} (${r[1]})</p>`;
});

document.getElementById("ranking").innerHTML=html;
}
