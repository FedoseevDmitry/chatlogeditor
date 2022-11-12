$("#js-file").change(function(){
	var reader = new FileReader();
	reader.onload = function(e){
		$("#chatlog").val(e.target.result);
	};
	reader.readAsText($("#js-file")[0].files[0], "UTF-8");
});