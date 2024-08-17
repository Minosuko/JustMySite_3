function listAnim(){
	var ul = document.querySelectorAll(".listanimated");
	ul.forEach(function(s){
		for (let c of s.children) {
			c.classList.add("pgload-left");;
		}
	});
}
function page_load() {
	var pgload = document.querySelectorAll("[class*=pgload]");
	let i = 0;
	pgload.forEach(function(s){
		setTimeout(()=>{
			if(s.getAttribute('is-loaded') != 'true'){
				s.classList.add("active");
				s.setAttribute('is-loaded','true');
			}
		}, 100*(i+1));
		i++;
	});
}
function changeUrlWork(){
	var a = document.getElementsByTagName('a');
	for (let s of a) {
		if(!s.hasAttribute("smoothurlchange")){
			if(!s.hasAttribute("nosmoothurlchange")){
				s.setAttribute("smoothurlchange", "true");
				s.addEventListener("click", function(e) {
					e.preventDefault();
					changeUrl(s.pathname + s.search);
				});
			}
		}
	}
}
function oneTimeFunc(){
	listAnim();
	page_load();
	changeUrlWork();
}
function changeUrl(url) {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var r = this.response;
			var el = document.createElement("html");
			el.innerHTML = r;
			var context = el.getElementsByClassName('context');
			var title = el.getElementsByTagName('title')[0].innerHTML;
			document.getElementsByClassName('context')[0].innerHTML = context[0].innerHTML;
			document.title = title;
			window.history.pushState({
				"html": r,
				"pageTitle": title
			}, "", url);
			oneTimeFunc();
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}
document.addEventListener('readystatechange', function(e){
	if(document.readyState == "complete"){
		oneTimeFunc();
	}
});