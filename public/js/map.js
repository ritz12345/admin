$( document ).ready(function(){
	$("#form1").hide();
	$("#form2").hide();
	$("#add_machine").hide();
	$("#delete_machine").hide();
	$("#datebox").hide();
	$("#change_layout").on("click",function(){
		$(".resizable").resizable().draggable();
		$("#form1").show();
		$("#submit").click(function(){
			$("#add_machine").show();
			$(".plant_wrap a").bind('rightclick',function(){
				this.remove();        
				console.log(this);
			});
			$("#add_machine").click(function(){
				$("#form2").show();
				$("#name_submit").click(function(){
					var y = $("#name_value").val();
					var z = $("#state_value").val();
					console.log(z);
					if(z=="PPAP"){
						var x = "<a class='resizable' style='background-color:#417FE8' onmousedown='isKeyPressed(event)' >";
					}
					else if(z=="SOP"){
						var x = "<a class='resizable' style='background-color:#FFA671' onmousedown='isKeyPressed(event)'>";
					}
					x+="<div class='inner_wrap draggable new_"+z+"'>";
					x+="<div class='inner'>"+y;
					x+= "</div></div></a>";
					$(".plant_wrap").append(x);
					$(".resizable").resizable().draggable();
				})
			})
		}) // END OF #submit click
		$("#confirm_layout").one("click",function(){
			var data = $(".resizable");
			console.log(data);
			var name   =[];
			var height =[];
			var width  =[];
			var left   =[];
			var top    =[];
			var color  =[];
		//console.log(data);
			for(var i=0 ; i<data.length; i++){
				name[i]=(data[i].innerText);
				height[i] = (data[i].offsetHeight);
				width[i]  = (data[i].offsetWidth);
				left[i]   = (data[i].offsetLeft);
				top[i]    = (data[i].offsetTop);
				color[i]  = (data[i].style.backgroundColor);
			}
			console.log(name,height,width,left,top,color);
			var layout_date = $("#date_value").val();
			var new_data  = {layout_date, name,height,width,left,top,color};
			console.log(new_data);
			$.ajax({
				url         :"/send_layout",
				type        : "POST",
				contentType : "application/json",
				data        : JSON.stringify(new_data),
				processData : false
			});
			$("#form1").hide();
			$("#form2").hide();
			$("#add_machine").hide();
		})
	}) //END OF CHANGE LAYOUT
	$("#generate_timeline").one("click",function(){
		$("#change_layout").hide();
		$("#confirm_layout").hide();
		$("#generate_timeline").hide();
		$("#datebox").show();
		$.ajax({
			url         : "/get_layout_data",
			type        : "GET",
			contentType : "application/json",
			processData : false,
			complete    : function(data) {
		//console.log(JSON.parse(data.responseText));
				var data = JSON.parse(data.responseText);
				var date_value =[];
				var diff_value =[];
				for (var j=0; j< data.length;j++){
					date_value[j] = data[j].date;
					diff_value[j] = data[j].diff;
				}
				date_value= ($.unique(date_value));
				//var diff_values=($.unique(diff_value));
				var uniquediff = diff_value.filter(function(itm, i, a) {
				return i == a.indexOf(itm);
				});
				var layout =[];
				console.log(uniquediff);
				for(var j=0;j<uniquediff.length;j++){
		 			layout[j] =[];
					for(var i=0 ;i<data.length;i++){
						if(data[i].diff == uniquediff[j]){
		  					layout[j].push([data[i].Name,data[i].height,data[i].left,data[i].state,data[i].top,data[i].width]); 
						}
		 			//console.log("LAYOUT",i,layout[i]);
					}
				}
				console.log(layout);
				$("#timeline").append("<input type='range' id='fade' value='0' min='0' max='300' step='1'> </input>")
				$("input[type=range]").on("input",function(){
					var a= parseFloat($("#fade").val());
				// if(a==0){$("#datebox").append(date_value[0]);}
				//
					for(i=0;i<uniquediff.length;i++){
						if(a==uniquediff[i]){
							$("#datebox").text(date_value[i]);
							buildHTML(layout[i]);
		// if(i!=0){
		// 	$(".plant_wrap a ").hide();
		// }else{$(".plant_wrap a").show(); }
						}
					}
				});
			}
		});    
    }) //END OF GEnerate TimeLine
	function buildHTML(layout){
		var y=[];
			for(var j=0;j<layout.length;j++){
				y[j]= " 'left:"+ layout[j][2]+"px;"+"background-color:"+layout[j][3]+";"+ "top:"+layout[j][4]+"px;"+"width:"+layout[j][5]+"px;" +"height:"+layout[j][1]+"px'"
			} 
		//y=JSON.parse(y);
		var x="";
			for(var i=0;i<layout.length;i++){
				x += "<a class='resizable' style="+y[i]+"><div class='inner_wrap'><div class='inner'>"+layout[i][0]+"</div></div></a>\n";
			}
		$(".plant_wrap").html(x);
		}
}) //DOCUMENT.READY







