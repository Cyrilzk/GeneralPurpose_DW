 //------------- WebAPI用Key变量 ---------//
var fact_temp = null;
var line_temp = null;
var cell_temp = null;
var ctrl_temp = null;
var allPage = document.querySelector('html');
var basicUrl = "https://" + window.location.host + "/YCPApp/api/v2/";
var start = document.getElementById('fromDate');
var end = document.getElementById('toDate');
var devlist = [];

//-------Execute here---------//
$(document).ready(function(){	
  init();
  ControllerLocation()
  createTbodyHTML();
  userNotification();
  makeTable();
  getRbtImg()
  proCount()
 //dragDiv.addEventListener("mousedown", function(e) {dragAct(e)});  //添加框体拖动功能
})

//----Language-----//
window.onload = function (){
	languageSelect(getLanguage());
} 

console.log(getLanguage());
//----语言全局保持----//
var languageNow = getLanguage();

//----默认英语----//
var defaultLang = "en";
function languageSelect(defaultLang){
  $("[i18n]").i18n({
      defaultLang: defaultLang,
      filePath: "/YCPApp/resources/json_messages/" + addon_name + "/",
      filePrefix: "i18n_",
      fileSuffix: "",
      forever: true,
      callback: function(res) {}
  });
}


function getLanguage() { 
  var name = "clientLang"
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]); 
    else 
    return defaultLang; 
} 
 

 //---字段查询----//
function getI18nString(par){
    var vale=$("#"+par).text();
    return vale;
    }


//-------点击执行数据获取---------//
function letItWork(){
 languageSelect(getLanguage())
 createControllerInfo();
 //lineData();
 makeTable();
 proCount();
 //getAttributeData()
}


//-----日夜模式切换------//
/*
$("#switchbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/moon.png")
function sunCtrl(){
    var sun=$("#switchbtn").attr("myIndex");
    var fill=$("#fullScreenbtn").attr("myIndex")
    if(fill==1&&sun==1){
	$("body").css("animation","dtn 1s forwards");
	$("#switchbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/sun.png")
	$("#fullScreenbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/extscrwt.png")
	$("#switchbtn").attr("myIndex",0);
}else if(fill==0&&sun==0){
	$("body").css("animation","ntd 1s forwards");
	$("#switchbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/moon.png")
	$("#fullScreenbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/fullscrbk.png")
	$("#switchbtn").attr("myIndex",1);
}else if(fill==0&&sun==1){
	$("body").css("animation","dtn 1s forwards");
	$("#switchbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/sun.png")
	$("#fullScreenbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/fullscrwt.png")
	$("#switchbtn").attr("myIndex",0);
}else{
	$("body").css("animation","ntd 1s forwards");
	$("#switchbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/moon.png")
	$("#fullScreenbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/extscrbk.png")
	$("#switchbtn").attr("myIndex",1);
}
}


//-------点击按钮全屏--------//
$("#fullScreenbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/fullscrbk.png")
function fullScreen(){
	var fill = $("#fullScreenbtn").attr("myIndex");
	var sun = $("#switchbtn").attr("myIndex");
	if(fill==0&&sun==1){
		allPage.webkitRequestFullscreen();
		$("#fullScreenbtn").attr("myIndex",1);
		$("#fullScreenbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/extscrbk.png")
		console.log(fill);
		console.log(sun);

	}
	else if(fill==1&&sun==0){
		$("#fullScreenbtn").attr("myIndex",0);
		document.webkitExitFullscreen();
		$("#fullScreenbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/fullscrwt.png")
		console.log(fill);
		console.log(sun);
	}
	else if(fill==1&&sun==1){
		$("#fullScreenbtn").attr("myIndex",0);
		document.webkitExitFullscreen();
		$("#fullScreenbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/fullscrbk.png")
		console.log(fill);
		console.log(sun);
	}
	else{
		$("#fullScreenbtn").attr("myIndex",1);
		allPage.webkitRequestFullscreen();
		$("#fullScreenbtn").attr("src","/YCPApp/resources/images/" + addon_name + "/extscrwt.png")
		console.log(fill);
		console.log(sun);
	}
}
*/

//---------Init Date---------//
function init() {
    console.log("init start"); 
    //--------- From、To日期设定---------//
    var dates = jQuery('#fromDate, #toDate').
    datepicker({
        showAnim: 'drop',
        changeMonth: false,
        dateFormat: "yy/mm/dd",
        onSelect: function (selectedDate) {
            var option = this.id == 'fromDate' ? 'minDate' : 'maxDate',
                instance = $(this).data('datepicker'),
                date = $.datepicker.parseDate(
                    instance.settings.dateFormat ||
                    $.datepicker._defaults.dateFormat,
                    selectedDate, instance.settings);
            dates.not(this).datepicker('option', option, date);
        }
    });
 $("#fromDate").datepicker();
 $("#toDate").datepicker();
};


// 取得URL
 function ControllerLocation() {
    console.log("ControllerLocation start");
    console.log("  iframeURL:" + window.location.href);
    // BaseURL取得
    var href = parent.location.href;
    console.log("href:" + href);
    // 工厂名取得
    this.factory = getHeaderString(href, "factoryName");
    console.log("factoryName:" + this.factory);
    // 产线名取得
    this.line = getHeaderString(href, "lineName");
    console.log("lineName:" + this.line);
    // 单元名取得
    this.cell = getHeaderString(href, "cellName");
    console.log("cellName:" + this.cell);
    // 控制器名取得
    this.controller = getHeaderString(href, "controllerName");
    console.log("controllerName:" + this.controller);

    console.log("ControllerLocation end");
};


// URL全局保持
var controllerLocation = new ControllerLocation();


//----------------获取URL文字段-------------//
function getHeaderString(str, startKey) {
    return getString(str, startKey + '=', '&', 0);
 }
function getString(str, startKey, endKey, startIndex) {
    var startKeyIndex = str.indexOf(startKey, startIndex);
    if (startKeyIndex >= 0) {
        var valueIndex = startKeyIndex + startKey.length;
        var endKeyIndex = str.indexOf(endKey, valueIndex);
        if (endKeyIndex >= 0) {
            return str.substring(valueIndex, endKeyIndex);
        } else {
            return str.substring(valueIndex);
        }
    } else {
        return "";
    }
}


//---------获取折线图数据---------//
function lineData(start){
		var one = [];
			two = [];
			three = [];
			four = [];
			five = [];
			six = [];
			seven = [];
			eight = [];
			nine = [];
			ten = [];
			ten1 = [];
			ten2 = [];
			fbPls_S = [];
			fbPls_L = [];
			fbPls_U = [];
			fbPls_B = [];
			fbPls_R = [];
			fbPls_T = [];
			trq_S = [];
			trq_L = [];
			trq_U = [];
			trq_B = [];
			trq_R = [];
			trq_T = [];
			xAx = [];
        var yxw = [];
	    var dev_body = {
        "Item":["list_Result_Graph","TimeStamp_R_G"],
        "N": 20000,
        "Size" : 104857600,
        "Timeout" : 2147483647,
        "Query":"(TimeStamp_R_G =" + start + ")"  + "AND TimeStamp_R_G IS NOT NULL",
        "Sort": [{
            "Target": "TimeStamp_R_G",
            "Ascending": true
        }]
    };
$.ajax({
      	type:"POST",
	  	url:basicUrl + 
		"factories/" + controllerLocation.factory + 
		"/lines/" + controllerLocation.line +
		"/cells/" + controllerLocation.cell +
		"/controllers/" + controllerLocation.controller + 
		"/apps/0000040500020020/analysis/search",
	  	async:false,
    	cache: false,
    	data: JSON.stringify(dev_body),
     	contentType: "application/json",
	  	dataType: "json",
    	headers: {
            "YCP-DW-TOKEN": token
        },
		success:function(data){
       	console.log(data.Data);
       	$("#textContent").text("");
       	for(var j=0; j<data.Data.length; j++){
          one.push.apply(one,(getJsonData(data.Data[j]["list_Result_Graph"],"DATA1")));
          two.push.apply(two,(getJsonData(data.Data[j]["list_Result_Graph"],"DATA2")));
          three.push.apply(three,(getJsonData(data.Data[j]["list_Result_Graph"],"DATA3")));
          four.push.apply(four,(getJsonData(data.Data[j]["list_Result_Graph"],"DATA4")));
          five.push.apply(five,(getJsonData(data.Data[j]["list_Result_Graph"],"DATA5")));
          six.push.apply(six,(getJsonData(data.Data[j]["list_Result_Graph"],"DATA6")));
          seven.push.apply(seven,(getJsonData(data.Data[j]["list_Result_Graph"],"DATA7")));
          eight.push.apply(eight,(getJsonData(data.Data[j]["list_Result_Graph"],"DATA8")));
          nine.push.apply(nine,(getJsonData(data.Data[j]["list_Result_Graph"],"DATA9")));
          ten.push.apply(ten,(getJsonData(data.Data[j]["list_Result_Graph"],"DATA10")));
          ten1.push.apply(ten1,(getJsonData(data.Data[j]["list_Result_Graph"],"DATA11")));
          ten2.push.apply(ten2,(getJsonData(data.Data[j]["list_Result_Graph"],"DATA12")));
          fbPls_S.push.apply(fbPls_S,(getJsonData(data.Data[j]["list_Result_Graph"],"FbPls_S")));
          fbPls_L.push.apply(fbPls_L,(getJsonData(data.Data[j]["list_Result_Graph"],"FbPls_L")));
          fbPls_U.push.apply(fbPls_U,(getJsonData(data.Data[j]["list_Result_Graph"],"FbPls_U")));
          fbPls_R.push.apply(fbPls_R,(getJsonData(data.Data[j]["list_Result_Graph"],"FbPls_R")));
          fbPls_B.push.apply(fbPls_B,(getJsonData(data.Data[j]["list_Result_Graph"],"FbPls_B")));
          fbPls_T.push.apply(fbPls_T,(getJsonData(data.Data[j]["list_Result_Graph"],"FbPls_T")));
          trq_S.push.apply(trq_S,(getJsonData(data.Data[j]["list_Result_Graph"],"Trq_S")));
          trq_L.push.apply(trq_L,(getJsonData(data.Data[j]["list_Result_Graph"],"Trq_L")));
          trq_U.push.apply(trq_U,(getJsonData(data.Data[j]["list_Result_Graph"],"Trq_U")));
          trq_R.push.apply(trq_R,(getJsonData(data.Data[j]["list_Result_Graph"],"Trq_R")));
          trq_B.push.apply(trq_B,(getJsonData(data.Data[j]["list_Result_Graph"],"Trq_B")));
          trq_T.push.apply(trq_T,(getJsonData(data.Data[j]["list_Result_Graph"],"Trq_T")));
          xAx.push.apply(xAx,(getJsonData(data.Data[j]["list_Result_Graph"],"TimeStamp")));
     	}	
         var timeTitle = data.Data[0]["TimeStamp_R_G"];
         for(var s=0; s<xAx.length; s++){
                var xjr = moment(parseInt(xAx[s])).format("HH:mm:ss");
                //console.log(parseInt(xAxs[s]))
                yxw.push(xjr); 
         }
         var reichu = moment(timeTitle).format('YYYY-MM-DD HH:mm:ss');
         console.log(reichu)
    	if(one.length == 0){
       		$("#textContent").text("未找到数据，请尝试重新设定时间区间");      
       //alert("数据不存在,请尝试重新设定时间区间");
    	}
    	else{   
        	drawLineChart(one,two,three,four,five,six,seven,eight,nine,ten,ten1,ten2,fbPls_S,fbPls_L,fbPls_U,fbPls_R,fbPls_B,fbPls_T,trq_S,trq_L,trq_U,trq_B,trq_R,trq_T,yxw,reichu)
		}
		},  
   		error: function (e) {
            console.log("Exception in lineData()");
            console.log(e);
            console.log("=========");
        }

})
}


//----------------------显示折线图-------------//
function drawLineChart(one,two,three,four,five,six,seven,eight,nine,ten,ten1,ten2,fbPls_S,fbPls_L,fbPls_U,fbPls_R,fbPls_B,fbPls_T,trq_S,trq_L,trq_U,trq_B,trq_R,trq_T,yxw,reichu){
    //console.log(zero);
    console.log(yxw);
    var headArray = getAttributeData();
    var graph = echarts.init(document.getElementById('myChart'));
    var option = {
    title:{text: reichu + "" },
    animation: false,
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}                                                       
        }
        
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 60,
      bottom: 20,
      type: 'scroll'
    },
     dataZoom: [{
            startValue: yxw[1]
        }, 
        {
            type: 'inside'
        }],
    tooltip: {
		        padding: [10, 20],
		        trigger: 'axis',
            /*formatter(params){
              for(x in params){
                return params[x].name + ':' + params[x].data;
              }
            }*/
		        axisPointer: {
		        type: 'shadow',
		        shadowStyle: {
		        color: 'rgba(0, 0, 0, 0.1)'
					       }
				          },
				       },
    xAxis: {
      data:yxw
    },
    yAxis:{
    },
    series: [
    {type: 'line', name:headArray[4].DisplayName,data:scale_MinMax(one,headArray[4].OffsetValue,headArray[4].DivValue)},
    {type: 'line', name:headArray[5].DisplayName,data:scale_MinMax(two,headArray[5].OffsetValue,headArray[5].DivValue)},
    {type: 'line', name:headArray[6].DisplayName,data:scale_MinMax(three,headArray[6].OffsetValue,headArray[6].DivValue)},
    {type: 'line', name:headArray[7].DisplayName,data:scale_MinMax(four,headArray[7].OffsetValue,headArray[7].DivValue)},
    {type: 'line', name:headArray[8].DisplayName,data:scale_MinMax(five,headArray[8].OffsetValue,headArray[8].DivValue)},
    {type: 'line', name:headArray[9].DisplayName,data:scale_MinMax(six,headArray[9].OffsetValue,headArray[9].DivValue)},
    {type: 'line', name:headArray[10].DisplayName,data:scale_MinMax(seven,headArray[10].OffsetValue,headArray[10].DivValue)},
    {type: 'line', name:headArray[11].DisplayName,data:scale_MinMax(eight,headArray[11].OffsetValue,headArray[11].DivValue)},
    {type: 'line', name:headArray[12].DisplayName,data:scale_MinMax(nine,headArray[12].OffsetValue,headArray[12].DivValue)},
    {type: 'line', name:headArray[13].DisplayName,data:scale_MinMax(ten,headArray[13].OffsetValue,headArray[13].DivValue)},
    {type: 'line', name:headArray[14].DisplayName,data:scale_MinMax(ten1,headArray[14].OffsetValue,headArray[14].DivValue)},
    {type: 'line', name:headArray[15].DisplayName,data:scale_MinMax(ten2,headArray[15].OffsetValue,headArray[15].DivValue)},
    {type: 'line', name:headArray[16].DisplayName,data:scale_MinMax(fbPls_S,headArray[16].OffsetValue,headArray[16].DivValue)},
    {type: 'line', name:headArray[17].DisplayName,data:scale_MinMax(fbPls_L,headArray[17].OffsetValue,headArray[17].DivValue)},
    {type: 'line', name:headArray[18].DisplayName,data:scale_MinMax(fbPls_U,headArray[18].OffsetValue,headArray[18].DivValue)},
    {type: 'line', name:headArray[19].DisplayName,data:scale_MinMax(fbPls_R,headArray[19].OffsetValue,headArray[19].DivValue)},
    {type: 'line', name:headArray[20].DisplayName,data:scale_MinMax(fbPls_B,headArray[20].OffsetValue,headArray[20].DivValue)},
    {type: 'line', name:headArray[21].DisplayName,data:scale_MinMax(fbPls_T,headArray[21].OffsetValue,headArray[21].DivValue)},
    {type: 'line', name:headArray[22].DisplayName,data:scale_MinMax(trq_S,headArray[22].OffsetValue,headArray[22].DivValue)},
    {type: 'line', name:headArray[23].DisplayName,data:scale_MinMax(trq_L,headArray[23].OffsetValue,headArray[23].DivValue)},
    {type: 'line', name:headArray[24].DisplayName,data:scale_MinMax(trq_U,headArray[24].OffsetValue,headArray[24].DivValue)},
    {type: 'line', name:headArray[25].DisplayName,data:scale_MinMax(trq_R,headArray[25].OffsetValue,headArray[25].DivValue)},
    {type: 'line', name:headArray[26].DisplayName,data:scale_MinMax(trq_B,headArray[26].OffsetValue,headArray[26].DivValue)},
    {type: 'line', name:headArray[27].DisplayName,data:scale_MinMax(trq_T,headArray[27].OffsetValue,headArray[27].DivValue)},
    ]
  
}; 
graph.clear();
var selected_item = {};
for (var i = 4; i < headArray.length ;i++){
  var keyname = headArray[i].DisplayName;
  console.log(keyname);
  selected_item[keyname] = headArray[i].Checked;
}
console.log(selected_item);
option.legend.selected = selected_item;
graph.setOption(option);
console.log("Graph Finished!")
}


function makeTable(){
  var headArray = getAttributeData();
  var rows = [];
  var p_time_list = [];
  var table = document.getElementById("recordTable");
  var headlist = ["Date",headArray[0].DisplayName,headArray[1].DisplayName,headArray[2].DisplayName,headArray[3].DisplayName,"TactTime[s]","SamplingPeriod[ms]","Graph"];
  //languageNow === "zh_CN"?headlist=headers_zh_CN:headlist=headers_EN;
  console.log(headlist);
  const ENV_MAX = 7;
  
  while(table.rows[0]) table.deleteRow(0);
  
  for(i = 0; i < devlist.length + 1; i ++){
  	
  	rows.push(table.insertRow(-1));
  	if(i == 0){
  		for(j = 0; j < headlist.length; j++){
  			cell = rows[i].insertCell(-1);
  			cell.whiteSpace = "inherit";
  			cell.style.color = "white";
        //cell.setAttribute("i18n",headache[j]);
  			cell.style.textAlign = 'center';
        cell.style.border = 'solid 1px white';
  			cell.appendChild(document.createTextNode(headlist[j]));
  			cell.style.backgroundColor = "#2F5597";
  		}
  	}else{

  		for(j = 0; j < ENV_MAX; j ++){
  			cell = rows[i].insertCell(-1);
  			cell.whiteSpace = "inherit";
  			cell.style.textAlign = 'center';
        	cell.style.verticalAlign = 'middle';
        if(j == 0){
          	var dt = moment(devlist[i-1][j]).format('YYYY-MM-DD HH:mm:ss');
          	p_time_list.push(devlist[i-1][j]);
          	cell.appendChild(document.createTextNode(dt));
        }else{
  			cell.appendChild(document.createTextNode(devlist[i-1][j]));
      }
  		}

  		/* RecordBTN */
            cell=rows[i].insertCell(-1);
            cell.whiteSpace = "inherit";
            cell.display = "flex";
            cell.style.textAlign = 'center';
            cell.style.verticalAlign = 'middle';
            var crdbtn = document.createElement("img");
            var style = "style";
            crdbtn.src = "/YCPApp/resources/images/" + addon_name + "/recview_btn.png";
            crdbtn.id = i + "";
            cell.appendChild(crdbtn);
             $("#" + i + "").hover(function(){
             	this.src = "/YCPApp/resources/images/" + addon_name + "/recview_btn_big.png"
             },function(){
             	this.src = "/YCPApp/resources/images/" + addon_name + "/recview_btn.png"
             }
             )
             $("#" + i + "").click(function(){
              var val=$(this).attr("id");
              var kabuda = this;
              console.log(val);
              lineData(p_time_list[parseInt(val)-1]);
            }
            );
  	}
  }

}


function createControllerInfo() {
	 let hajime = moment(start.value).valueOf();
	 let owari  = moment(end.value).valueOf()+86399000;
    console.log(token);
    //getToken();

    $.ajax({
       type: "GET",
       url: basicUrl + "factories/",
       async: false,
       dataType: 'json',
       headers: {
           "YCP-DW-TOKEN": token
       },
        /* Factory情報収集 */
        success: function(fact_arg, textStatus, jqXHR) {
           console.log(fact_arg);
           for (i=0; i < fact_arg.Factory.length; i++){
               fact_temp = fact_arg.Factory[i];
               $.ajax({
                    type: "GET",
                    url: basicUrl + "factories/" + fact_temp + "/lines",
                    dataType: 'json',
                    async: false,
                    cache: false,
                    headers: {
                        "YCP-DW-TOKEN": token
                    },
                    /* Line情報収集 */
                    success: function(line_arg, textStatus, jqXHR) {
                        console.log(line_arg);
                        for (j=0; j < line_arg.Line.length; j++){
                            line_temp = line_arg.Line[j];
                            $.ajax({
                                type: "GET",
                                url: basicUrl + "factories/" + fact_temp + "/lines/" + line_temp + "/cells",
                                async: false,
                                cache: false,
                                dataType: 'json',
                                headers: {
                                    "YCP-DW-TOKEN":token
                                },
                                /* Cell情報収集 */
                                success: function(cell_arg, textStatus, jqXHR) {
                                    console.log(cell_arg);
                                    for (k=0; k < cell_arg.Cell.length; k++) {
                                        cell_temp = cell_arg.Cell[k];
                                        $.ajax({
                                            type: "GET",
                                            url: basicUrl + "factories/" + fact_temp + "/lines/" + line_temp + "/cells/" + cell_temp + "/controllers",
                                            async: false,
                                            cache: false,
                                            dataType: 'json',
                                            headers: {
                                                "YCP-DW-TOKEN": token
                                            },
                                            /* Controller情報収集 */
                                            success: function(ctrl_arg, textStatus, jqXHR) {
                                                console.log(ctrl_arg);
                                                var req_body = {
                                                                    "Item": ["TimeStamp_Result","INFO1","INFO2","INFO3","INFO4","TactTime","SamplingPeriod"],
                                                                    "N": 100000,
                                                                    "Size" : 104857600,
                                                                    "Timeout" : 2147483647,
                                                                    "Query": "(TimeStamp >= " + hajime +") AND (TimeStamp <= " + owari +")",
                                                                    "Sort": [{
                                                                        "Target": "TimeStamp",
                                                                        "Ascending": false
                                                                    }]
                                                                };
                                                for (l=0; l < ctrl_arg.Controller.length; l++) {
                                                       ctrl_temp = ctrl_arg.Controller[l].Key
                                                       $.ajax({
                                                                    type: "POST",
                                                                    url: basicUrl + "factories/" + fact_temp + "/lines/" + line_temp + "/cells/" + cell_temp + "/controllers/" + ctrl_temp + "/apps/" + "0000040500020020" + "/analysis/search",
                                                                    async: false,
                                                                    cache: false,
                                                                    data: JSON.stringify(req_body),
                                                                    contentType: 'application/json',
                                                                    dataType: 'json',
                                                                    headers: {
                                                                        "YCP-DW-TOKEN": token
                                                                    },
                                                                    success:function(crash_data, textStatus, jqXHR){
                                                                    	console.log(crash_data);
                                                                      		devlist = [];
                                                                    	if (crash_data.Header.Returned != 0 ) {
                                                                    		for (y = 0 ; y < crash_data.Data.length ; y++){
                                                                            var devdata = [
                                                                            crash_data.Data[y].TimeStamp_Result,
                                                                            crash_data.Data[y].INFO1,
                                                                            crash_data.Data[y].INFO2,
                                                                            crash_data.Data[y].INFO3,
                                                                            crash_data.Data[y].INFO4,
                                                                            crash_data.Data[y].TactTime,
                                                                            crash_data.Data[y].SamplingPeriod
                                                                            ]
                                                                            if(devdata[0] != undefined){
                                                                              devlist.push(devdata);
                                                                            }
                                                                            }
                                                                        }
                                                                        else {
                                                                            var devdata = ["-","-","-","-","-","-"]
                                                                        }                                                                    
                                                                        console.log(devlist);
                                                                    }            
                                                       });                                                
                                                }
                                            }   
                                        });
                                    }
                                }
                            });                    
                        }                        
                    }                            
               });                                 
           }                                               
            /* 环境List更新 */
            g_env_list = devlist;
            /* 画面描画処理 */
            if(g_env_list.length==0){
              makeTable();
              alert("未找到匹配数据，请重新设定检索条件。");
            }else{
            makeTable();
          }
        }
    });
};

function getJsonData(array,key){
    var key = key || "coldplay";
    var res = [];
    if (array){
    	array.forEach(function(t){
    		res.push(t[key]);
    		});
    	}
    	return res;
    }




//----画出产量图------//
function statChart(proRow,xRow){
	var statpic = echarts.init(document.getElementById("productionPic"));
	var optionEn = {
            title: {
                text: 'Production',
                backgroundColor: '#2F5597',
                fontSize: 30,
                textStyle:{
                	color:'#FFFFFF',
                	fontSize: 25
                }
            },
            tooltip: {trigger:'axis'},
            legend: {
            	data:['ProNum'],
                x:'450px',
                y:'10px'
            },
            xAxis: {
                data: xRow
            },
            yAxis: {},
            series: [{
                name: 'ProNum',
				color: '#3399FF', 
                type: 'bar',
                data: proRow
            }]
        };
  var optionCn = {
            title: {
                text: '产量',
                backgroundColor: '#2F5597',
                //borderRadius: 5,
                fontSize: 30,
                textStyle:{
                  color:'#FFFFFF',
                  fontSize: 25
                }
            },
            tooltip: {trigger:'axis'},
            legend: {
                data:['产量(件)'],
                x:'450px',
                y:'10px'
            },
            xAxis: {
                data: xRow
            },
            yAxis: {},
            series: [{
                name: 'ProNum',
				color: '#3399FF', 
				//stack:'总量',
                type: 'bar',
                data: proRow
            }]
  };
if(languageNow==="zh_CN"){
  statpic.setOption(optionCn);
}else{
statpic.setOption(optionEn);
     }
}


//-----日产量获取并计算-----//
function proCount(){
	var proRow = [];
	var xRow = [];
    	var one_body = {
        "Item":["TimeStamp_Daily","ProductionSum_Daily"],
        "N": 20000,
        "Size" : 104857600,
        "Timeout" : 2147483647,
        "Query": "TimeStamp_Daily IS NOT NULL",
        "Sort": [{
            "Target": "TimeStamp_Daily",
            "Ascending": true
        }]
    };
    $.ajax({
    type:"POST",
	  url:basicUrl + 
		"factories/" + controllerLocation.factory + 
		"/lines/" + controllerLocation.line +
		"/cells/" + controllerLocation.cell +
		"/controllers/" + controllerLocation.controller + 
		"/apps/0000040500020020/analysis/search",
	  async:false,
    cache: false,
    data: JSON.stringify(one_body),
    contentType: "application/json",
	  dataType: "json",
    headers: {
            "YCP-DW-TOKEN": token
        },
	  success:function(data){
		//console.log(data.Data)
		for (y=0 ; y < data.Data.length ; y++){
			var cardata = data.Data[y].ProductionSum_Daily;
			proRow.push(cardata);
			xRow.push(moment(data.Data[y].TimeStamp_Daily).format('MM-DD'));
        }
	   	console.log(xRow);
    }
});
statChart(proRow,xRow);
}

function getRbtImg(){
  var dev_body = {
        "Item":["TimeStamp","StrctrR1"],
        "N": 1,
        "Size" : 104857600,
        "Timeout" : 2147483647,
        "Query": "TimeStamp IS NOT NULL ",
        "Sort": [{
            "Target": "TimeStamp",
            "Ascending": true
        }]
    };
    $.ajax({
    type:"POST",
    url:basicUrl + 
    "factories/" + controllerLocation.factory + 
    "/lines/" + controllerLocation.line +
    "/cells/" + controllerLocation.cell +
    "/controllers/" + controllerLocation.controller + 
    "/apps/RC.SystemStruct/analysis/search",
    async:false,
    cache: false,
    data: JSON.stringify(dev_body),
    contentType: "application/json",
    dataType: "json",
    headers: {
            "YCP-DW-TOKEN": token
             },
    success:function(data){
    console.log(data.Data)
      var rbtType = (data.Data[0].StrctrR1).replace(/\*/,'0');
      console.log(rbtType);
      $("#contentImg").attr("src","/YCPApp/resources/img/RobotImage/" + rbtType + ".jpg")
      $("#title").text(rbtType.substring(rbtType.indexOf("(")+1,rbtType.indexOf(")")))
    },
    error:function(xhr,status){
    	$("#title").text('{Code:'+ xhr.status +'}');
    }
})

}

function scale_MinMax(arr,offset,div){
	//arr_max = Math.max(...arr);
	//arr_min = Math.min(...arr);
	arr.forEach(function(value,index){
		arr[index] = (parseFloat(value/div) + parseFloat(offset)).toFixed(2);
	})
	return arr
}

