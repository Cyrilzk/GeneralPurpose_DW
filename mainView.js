$(function(){
	$("#mainPage_tab").click(function(){
		$(this).addClass("active");
		$("#settingPage_tab").removeClass("active");
		$("#mainPage").css('display','block');
		$("#settingPage").css('display','none');
		console.log("主页面切换成功！")
	})
	
})

function userNotification(){
	var attributesArray = [];
		var attributeURL = 
			basicUrl + 
		    "factories/" + controllerLocation.factory + 
			"/lines/" + controllerLocation.line +
			"/cells/" + controllerLocation.cell +
			"/controllers/" + controllerLocation.controller + 
			"/attribute-groups/" + AppName_CommonSetting + "/attributes"
		$.ajax({
			url: attributeURL,
			headers: {"YCP-DW-TOKEN": token},
			type: 'GET',
			async: false,
			contentType: "application/json",
			success: function(data,textStatus, xhr) {
				alert("已使用上一次的设定");
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
			},
			error : function(xhr,status) {
				if (xhr.status == 404){
					alert("未设置用户信息，已使用默认参数")
					$.ajax({
        				type: 'PUT',
        				url: attributeURL,
        				headers: {"YCP-DW-TOKEN": token},
        				data: JSON.stringify(defaultInfoArray),
        				dataType: "json",
       					async: false,
        				contentType: "application/json",
        				success: function(data,textStatus,xhr) {
          				console.log("用户信息存储成功");
          				var defaultAttributesArray = defaultInfoArray[0].Value.Setting;
						console.log(defaultAttributesArray)
						for(i = 0; i < defaultAttributesArray.length; i++){
							console.log(i);
							$("#nameId" + i).val(defaultAttributesArray[i].DisplayName);
							if(i>3){
								$('#offsetId' + i).val(defaultAttributesArray[i].OffsetValue);
								$('#divId' + i).val(defaultAttributesArray[i].DivValue);
								$('#checkId' + i).prop('checked',defaultAttributesArray[i].Checked)
							}
						}
        				},
        				error : function(xhr,status) {
          				console.log("Error Occured at url: "+attributeURL+":: Status Code ::"+xhr.status);
        				}
      				});
      				// Ajax Call end
					console.log("Error Occured at url: "+attributeURL+":: Status Code ::"+xhr.status);
					//attributesArray = defaultInfoArray
			    }else{
			    	console.log("Error Occured at url: "+attributeURL+":: Status Code ::"+xhr.status);
			    }
			}
		});// Ajax Call end
	//}
	return attributesArray;
}


// 从DB获取用户设定的数据
function getAttributeData() {
	var attributesArray = [];
	//if (isExistGroupKey(AppKey)) {
		var attributeURL = 
			basicUrl + 
		    "factories/" + controllerLocation.factory + 
			"/lines/" + controllerLocation.line +
			"/cells/" + controllerLocation.cell +
			"/controllers/" + controllerLocation.controller + 
			"/attribute-groups/" + AppName_CommonSetting + "/attributes"
		$.ajax({
			url: attributeURL,
			headers: {"YCP-DW-TOKEN": token},
			type: 'GET',
			async: false,
			contentType: "application/json",
			success: function(data,textStatus, xhr) {
				//alert("已使用上一次的设定");
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
			},
			error : function(xhr,status) {
          				console.log("Error Occured at url: "+attributeURL+":: Status Code ::"+xhr.status);
          			}
          		})
	return attributesArray;
}