// import "../styles/styles.css";
// import "./styles.css";
// alert("hi");
let mainEl = document.querySelector("main");

mainEl.style.backgroundColor = "var(--main-bg)";

mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList.add("flex-ctr");

let topMenuEl = document.querySelector("#top-menu");

topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];


// var menuLinks = [
//   { text: "about", href: "/about" },
//   { text: "catalog", href: "/catalog" },
//   { text: "orders", href: "/orders" },
//   { text: "account", href: "/account" },
// ];

for (let link of menuLinks) {
  let anchor = document.createElement("a");
  anchor.setAttribute("href", link.href);
  anchor.textContent = link.text;
  topMenuEl.appendChild(anchor);
}


// ******************part 3 &4***************
let subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";


let topMenuLinks = topMenuEl.getElementsByTagName("a");
// console.log(topMenuLinks);

topMenuEl.addEventListener('click',(e)=>{
  e.preventDefault();
  
  if(e.target.tagName !== 'A') return;
  console.log(e.target.textContent);
  
  topMenuEl.querySelectorAll("a").forEach(a=>{ a.classList.remove("active");});  
  e.target.classList.add("active");

  for(ml of menuLinks){

    if(ml.subLinks && ml.text === e.target.textContent.toLowerCase()){
         subMenuEl.style.top = "100%";
         buildSubmenu(ml.subLinks);

        subMenuEl.addEventListener('click',(e1)=>{
            e1.preventDefault();
            if(e1.target.tagName != 'A') return;
            console.log(e1.target.textContent);
            subMenuEl.style.top = "0";
            e.target.classList.remove("active");
            let h1 = document.createElement("h1");
            // capitalize(e1.target.textContent);
            h1.textContent = e1.target.textContent;
            mainEl.textContent = "";
            mainEl.appendChild(h1);
        });

         break;
    }
    else if(!ml.subLinks){
        subMenuEl.style.top = "0";
        let h1 = document.createElement("h1");
        h1.textContent = ml.text;
        mainEl.textContent = "";
        mainEl.append(h1);
    }
  }
});

function buildSubmenu(subLinks){
  subMenuEl.textContent = "";
  for(sl of subLinks){
    let aEl = document.createElement("a");
    aEl.setAttribute("href",sl.href);
    aEl.textContent = sl.text;
    subMenuEl.appendChild(aEl);
  }
}