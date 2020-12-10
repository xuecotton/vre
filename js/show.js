var showStatus=(function(){
	return {
		show:function(selector){
			var tmp=document.querySelector(selector);
			tmp.style.display="block";
		},
		hide:function(selector){
			var tmp=document.querySelector(selector);
			tmp.style.display="none";
		}
	}
})();