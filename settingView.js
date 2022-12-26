const AppName_CommonSetting = "CommonSetting";
const dataName = ["blank","INFO1","INFO2","INFO3","INFO4","DATA1","DATA2","DATA3","DATA4","DATA5","DATA6","DATA7","DATA8","DATA9","DATA10",
"DATA11","DATA12","S_FbPls","L_FbPls","U_FbPls","R_FbPls","B_FbPls","T_FbPls","S_Trq","L_Trq","U_Trq","R_Trq","B_Trq","T_Trq"]
var nameCountId = 0;
	offsetCountId = 0;
	divCountId = 0;
    checkboxId = 0;

$(function(){
	$("#settingPage_tab").click(function(){
		$(this).addClass("active");
		$("#mainPage_tab").removeClass("active");
		$("#mainPage").css('display','none');
		$("#fileInput").css('display','none');
		$("#settingPage").css('display','flex');
		console.log("设置页面切换成功！")	
	})
	// 設定適用ボタン押下時
	$("#submitbtn").click(function(){
		var attributesArray = getSettingAttribute()
		console.log(attributesArray);
		//getToken();
		//console.log(servertoken)
		if (attributesArray != "") {
			//$("#setting_error_message").html("");
			var attributeURL = 
			basicUrl + 
		    "factories/" + controllerLocation.factory + 
			"/lines/" + controllerLocation.line +
			"/cells/" + controllerLocation.cell +
			"/controllers/" + controllerLocation.controller + 
			"/attribute-groups/" + AppName_CommonSetting + "/attributes"
			$.ajax({
				type: 'PUT',
				url: attributeURL,
				headers: {"YCP-DW-TOKEN": token},
				data: attributesArray,
				dataType: "json",
				async: false,
				contentType: "application/json",
				success: function(data,textStatus,xhr) {
					alert("用户信息存储成功")
				},
				error : function(xhr,status) {
					console.log("Error Occured at url: "+attributeURL+":: Status Code ::"+xhr.status);
				}
			});// Ajax Call end
		}
    makeTable();
	});
})


//生成设定信息表格
function createTbodyHTML() {
  //var headArray = getAttributeData();
  var rows = [];
  //var p_time_list = [];
  var table = document.getElementById("settingTable");
  //var headers_EN =["Date",headArray[0].DisplayName,headArray[1].DisplayName,headArray[2].DisplayName,headArray[3].DisplayName,"TactTime","SamplingPeriod","Graph"];
  //var headers_zh_CN = ["日期","信息1","信息2","信息3","信息4","节拍时间","采样频率","图表"];
  var headlist = ["数据库名","显示名称","纵轴区分","比例大小","显示"];
  //languageNow === "zh_CN"?headlist=headers_zh_CN:headlist=headers_EN;
  //console.log(headlist);
  const ENV_MAX = 5;
  
  while(table.rows[0]) table.deleteRow(0);
  
  for(i = 0; i < 29; i ++){
  	rows.push(table.insertRow(-1));
  	//rows.push(table2.insertRow(-1));
  	if(i == 0){
  		for(j = 0; j < headlist.length; j++){
  			cell = rows[i].insertCell(-1);
  			//cell.whiteSpace = "inherit";
  			cell.style.color = "white";
  			//cell.style.width = "145px";
        //cell.setAttribute("i18n",headache[j]);
  			cell.style.textAlign = 'center';
        	cell.style.border = 'solid 1px white';
  			cell.appendChild(document.createTextNode(headlist[j]));
  			cell.style.backgroundColor = "#2F5597";
  		}
  	}else{
  		//countId += 1;
  		for(j = 0; j < ENV_MAX; j ++){
  			cell = rows[i].insertCell(-1);
  			//cell.whiteSpace = "inherit";
  			//cell.style.width = "15px";
  			//cell.id = '' + (j + i);
  			cell.style.textAlign = 'center';
        	cell.style.verticalAlign = 'middle';
        //cell.style.display = 'block';
        if(j == 0){
          //console.log(dt);
          	cell.appendChild(document.createTextNode(dataName[i]));
        }else{
        	switch(j){
        		case 1:
        		var input = document.createElement("input");
        		input.id = 'nameId' + nameCountId;
        			//input.style.width = '25%'
  					cell.appendChild(input);
  					nameCountId += 1;
  					break;
  				  
            case 2:
  					var input = document.createElement("input");
  					input.id = 'offsetId' + offsetCountId;
  					i < 5 ? input.disabled = true : input.disabled = false;
  					cell.appendChild(input);
  					offsetCountId += 1;
  					break;
  				  
            case 3:
  				    var input = document.createElement("input");
        		    input.id = 'divId' + divCountId;
        		    i < 5 ? input.disabled = true : input.disabled = false;
  					cell.appendChild(input);
  					divCountId += 1;
  					break;

            case 4:
            		var input = document.createElement("input");
            		input.id = 'checkId' + checkboxId;
            		input.type = 'checkbox'
            		i < 5 ? input.disabled = true : input.disabled = false;
            		cell.appendChild(input);
            		checkboxId += 1;
            		break;
  			}

      }
  		}
  	}
  }
}

// 入力内容取得
function getSettingAttribute() {
	var displayArray = [];
		offsetArray = [];
		divArray = [];
        checkArray = [];
	var valueArray = [];
	var attributesArray = [];
	for(var i = 0; i <= 27; i++) {
		// 各入力内容取得
		let displayName = $("#nameId" + i).val();		// 表示名称
		let offset = $('#offsetId' + i).val();
		let div = $('#divId' + i).val();
    let checked = $('#checkId' + i).prop('checked');
		// 入力内容をJSON形式の文字列にする
		let valueJson = 
			{
				DisplayName : displayName,
				OffsetValue : offset,
				DivValue : div,
        		Checked: checked
			};
		valueArray.push(valueJson);
	}
	console.log(valueArray)
	// ControllerAttributeの形式にする。
	var attributeJson = 
		{
			Key : AppName_CommonSetting,
			Type : "String",
			Value : JSON.stringify({"Setting": valueArray}),
			Unit : "",
			Name : AppName_CommonSetting
		};
	attributesArray.push(attributeJson);
	console.log(attributesArray);
	return JSON.stringify(attributesArray);
}

function exportJson(){
	var jsonArray = getSettingAttribute();
	var blob = new Blob([jsonArray], {type: "" });
	saveAs(blob,'UserSettings.json')
}

$('#importbtn').click(function(){
	$('#fileInput').click();
})

function importJson(obj){
	var f = obj.files[0];
	//console.log(f);
	var reader = new FileReader();
	reader.readAsText(f);
	reader.onload = function(f){
		//console.log(this.result); 
		var data = JSON.parse(this.result);
		attributesArray = JSON.parse(data[0].Value).Setting;
				console.log(attributesArray)
				for(i = 0; i < attributesArray.length; i++){
					console.log(i);
					$("#nameId" + i).val(attributesArray[i].DisplayName);
					if(i>3){
						$('#offsetId' + i).val(attributesArray[i].OffsetValue);
						$('#divId' + i).val(attributesArray[i].DivValue);
						$('#checkId' + i).prop('checked',attributesArray[i].Checked)
					}
				}

	}
}

