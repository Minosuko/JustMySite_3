function page_load() {
	var pgload = document.querySelectorAll(".pgload");
	for(let i = 0; i < pgload.length; i++){
		setTimeout(()=>{
			if(pgload[i].getAttribute('is-loaded') != 'true'){
				pgload[i].classList.add("active");
				pgload[i].setAttribute('is-loaded','true');
			}
		}, 100*(i+1));
	}
}
function changeUrlWork(){
	var a = document.getElementsByTagName('a');
	for(let i = 0; i < a.length; i++){
		if(!a[i].hasAttribute("smoothurlchange")){
			if(!a[i].hasAttribute("nosmoothurlchange")){
				a[i].setAttribute("smoothurlchange", "true");
				a[i].addEventListener("click", function(e) {
					e.preventDefault();
					changeUrl(a[i].pathname + a[i].search);
				});
			}
		}
	}
}
function changeUrl(url) {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var r = this.response;
			var el = document.createElement("html");
			el.innerHTML = r;
			var context = el.getElementsByClassName('context');
			document.getElementsByClassName('context')[0].innerHTML = context[0].innerHTML;
			var title = el.getElementsByTagName('title')[0].innerHTML;
			document.title = title;
			window.history.pushState({
				"html": r,
				"pageTitle": title
			}, "", url);
			page_load();
			changeUrlWork();
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}
document.addEventListener('readystatechange', function(e){
	if(document.readyState == "complete"){
		page_load();
		changeUrlWork();
	}
});