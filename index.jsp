<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
	<!--<link href="libs/c3/c3.min.css" rel="stylesheet">
	<link href="libs/bootstrap/bootstrap.min.css" rel="stylesheet">
  <link href="libs/jquery/jquery-ui.min.css" rel="stylesheet">
	<link href="css/index.css" rel="stylesheet">
	<script src="libs/jquery/jquery-3.1.1.min.js"></script>
	<script src="libs/jquery/jquery-ui.min.js"></script>
	<script src="libs/moment/moment.min.js"></script>
	<script src="libs/d3/d3.min.js"></script>
	<script src="libs/c3/c3.js"></script>
  <script src="js/dragAct.js"></script>
  <script src="js/settingView.js"></script>
  <script src="js/mainView.js"></script>
	<script src="libs/bootstrap/bootstrap.min.js"></script>-->
  <title>YASKAWA</title>
</head>
<body>
  <ul class="nav nav-tabs">
  <li class="active" id="mainPage_tab"><a>主页</a></li>
  <li id="settingPage_tab"><a>查询</a></li>
  </ul>
<section  id='mainPage' style='display: block;'>
    <!--<div><img id="fullScreenbtn" onclick="fullScreen()" myIndex="0">&nbsp;&nbsp;<img id="switchbtn" myIndex="1" onclick="sunCtrl()"></div>-->
    <div class = "picFrame">
   	  <table class="table table-striped" style="text-align: center;vertical-align: middle;">
    	 <th id="title" style="background-color:#2F5597;color:white;font-size:30px;text-align:center;"></th>
        <tr><td><img id="contentImg"></td></tr>
      </table>
    </div>
  <div class = "DeviceInfo">
    <table class="table table-striped">
    	<th id="title" style="background-color:#2F5597;color:white;font-size:30px;text-align:center;" i18n="DeviceInfo">Device Info</th>
        <tr id="factoryName"><td id="content"><span i18n="Fac">Factory:</span><c:out value="${FACTORY_DISPLAY_NAME}" /></td></tr>
        <tr id="lineName"><td id="content"><span i18n="Lin">Line:</span><c:out value="${LineDisplayName}" /></span></td></tr>
        <tr id="cellName"><td id="content"><span i18n="Cel">Cell:</span><c:out value="${CellDisplayName}" /></span></td></tr>
        <tr id="unitName"><td id="content"><span i18n="Con">Controller:</span><c:out value="${ControllerDisplayName}" /></span></td></tr>
    </table>
  </div>
    <div id="productionPic"></div>
  </section>
    <section id='settingPage' style="display: none;">
    <div class = "bar" style="width:800px; display: flex;justify-content: space-between;">
      <input type="text" id="fromDate" class="input" placeholder = "Time-Start" autocomplete="off"><input type="text" id="toDate" class="input" placeholder= "Time-End" autocomplete="off">
      <button type="button" class="btn btn-primary color-background" id="searchbtn" onclick="letItWork()" i18n="Search" >Search</button>
    </div>
    <br/>
    <div id="myTable"> <!--onmousedown="dragAct(this,event)">-->
      <table class="table table-striped" id="recordTable">
      </table>
    </div>
    <div id="userSetting"> <!--onmousedown="dragAct(this,event)">-->
      <table class="table table-striped" id="settingTable">
      </table>
    </div>
    <div id= "myChart"></div>
    <button type="button" class="btn btn-primary color-background" id="submitbtn">Submit</button>
    <button type="button" class="btn btn-primary color-background" id="importbtn">Import</button>
    <button type="button" class="btn btn-primary color-background" id="exportbtn" onclick="exportJson()">Export</button>
    <input type="file" display="none" id="fileInput" onchange="importJson(this)"></input>
    </section>
</body>    
    <script type="text/javascript">
        var path_name = location.pathname.split("/");
        var addon_name = path_name[3];
        var token = '${ycpDWToken}'
    	  document.write('<script src="/YCPApp/resources/js/' + addon_name + '/jquery-3.1.1.min.js" charset="utf-8"><\/script>');
        document.write('<script src="/YCPApp/resources/js/' + addon_name + '/c3.js" charset="utf-8"><\/script>');
        document.write('<script src="/YCPApp/resources/js/' + addon_name + '/d3.min.js" charset="utf-8"><\/script>');
        document.write('<script src="/YCPApp/resources/js/' + addon_name + '/bootstrap.min.js" charset="utf-8"><\/script>');
        document.write('<script src="/YCPApp/resources/js/' + addon_name + '/jquery-ui.min.js" charset="utf-8"><\/script>');
        document.write('<script src="/YCPApp/resources/js/' + addon_name + '/jquery.i18n.js" charset="utf-8"><\/script>');
        document.write('<script src="/YCPApp/resources/js/' + addon_name + '/moment.min.js" charset="utf-8"><\/script>');
        document.write('<script src="/YCPApp/resources/js/' + addon_name + '/FileSaver.min.js" charset="utf-8"><\/script>');
        document.write('<script src="/YCPApp/resources/js/' + addon_name + '/echarts.min.js" charset="utf-8"><\/script>');
        document.write('<script src="/YCPApp/resources/js/' + addon_name + '/usersInfo.js" charset="utf-8"><\/script>');
        document.write('<script src="/YCPApp/resources/js/' + addon_name + '/index.js" charset="utf-8"><\/script>');
        document.write('<script src="/YCPApp/resources/js/' + addon_name + '/dragAct.js" charset="utf-8"><\/script>');
        document.write('<script src="/YCPApp/resources/js/' + addon_name + '/settingView.js" charset="utf-8"><\/script>');
        document.write('<script src="/YCPApp/resources/js/' + addon_name + '/mainView.js" charset="utf-8"><\/script>');
        document.write('<link rel="stylesheet" type="text/css" href="/YCPApp/resources/css/' + addon_name + '/c3.min.css">');
        document.write('<link rel="stylesheet" type="text/css" href="/YCPApp/resources/css/' + addon_name + '/bootstrap.min.css">');
        document.write('<link rel="stylesheet" type="text/css" href="/YCPApp/resources/css/' + addon_name + '/jquery-ui.min.css">');
        document.write('<link rel="stylesheet" type="text/css" href="/YCPApp/resources/css/' + addon_name + '/index.css">');
    </script>
</html>