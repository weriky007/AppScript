var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Q8A7optEtlc7vGCP58s2YNYmBfavXOZuGzLl11A-cKU/edit#gid=0");

var sheet = ss.getSheetByName('teste'); 
//---------------------------------------------------------------------------------------------------------------------
function doPost(e){
var action = e.parameter.action;
if(action == 'addItem'){
    return addItem(e);
  }

if(action == "delete"){
    return delete_value(e);
  }  

if(action == "getItem"){
    return getItem(e);
  } 

if(action == "update"){
  return update(e);
  }  
}
//---------------------------------------------------------------------------------------------------------------------
function doGet(e){

var action = e.parameter.action;

  if(action == 'addItem'){
    return addItem(e);
  }

if(action == "delete"){
    return delete_value(e);
  }  

if(action == "getItem"){
    return getItem(e);
  } 

if(action == "update"){
  return update(e);
  } 
}
//---------------------------------------------------------------------------------------------------------------------
function addItem(e){

var date =  new Date();

var id  =  "Item"+sheet.getLastRow(); // Exemple: Item1
var itemTipo = e.parameter.itemTipo;
var itemMarca = e.parameter.itemMarca;
var precoUnity = e.parameter.precoUnity;
var qtd = e.parameter.qtd;
var total = e.parameter.total;

sheet.appendRow([date,id,itemTipo,itemMarca,precoUnity,qtd,total]);

   return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);

}
//---------------------------------------------------------------------------------------------------------------------
function getItems(e){
  var records={};
 
  var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1,sheet.getLastColumn()).getValues();
      data = [];

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r],record  = {};
    record['itemTipo'] = row[2];
    record['itemMarca']=row[3];
    record['precoUnity']=row[4];
    record['qtd']=row[5];
    record['total']=row[6];
    
    data.push(record);
    
   }
  records.items = data;
  var result=JSON.stringify(records);
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}
//---------------------------------------------------------------------------------------------------------------------
function getItem(e){
  
  var itemTipo = e.parameter.itemTipo;
  var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1,sheet.getLastColumn()).getValues();
  var data = [];
  var records={};

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r],record  = {};
    
    record['itemTipo'] = row[2];
    record['itemMarca']=row[3];
    record['precoUnity']=row[4];
    record['qtd']=row[5];
    record['total']=row[6];
    
    if(row[2] == itemTipo){
    data.push(record);
    }

  }
   
 
  records.items = data;
  var result=JSON.stringify(records);
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}
//---------------------------------------------------------------------------------------------------------------------
function update(e){
  var itemTipo = e.parameter.itemTipo;
  var itemMarca = e.parameter.itemMarca;
  var precoUnity = e.parameter.precoUnity;
  var qtd = e.parameter.qtd;
  var total = e.parameter.total;
  var flag = 0;
  var lr = sheet.getLastRow();

    for (var i = 1; i <= lr; i++) {
        var rid = sheet.getRange(i, 3).getValue();
        if (rid == itemTipo) {
            sheet.getRange(i, 5).setValue(precoUnity);
            var result = "value updated successfully";
            flag = 1;
        }
    }
    if (flag == 0)
        var result = "id not found";
 
    result = JSON.stringify({
        "result": result
    });
 
    return ContentService
        .createTextOutput(result)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

//---------------------------------------------------------------------------------------------------------------------
function delete_value(e) {
    var itemTipo = e.parameter.itemTipo;
    var flag = 0;
 
    var lr = sheet.getLastRow();
    for (var i = 1; i <= lr; i++) {
        var rname = sheet.getRange(i, 3).getValue();
        
        if (rname == itemTipo) {
            sheet.deleteRow(i);
            var result = "value deleted successfully";
            flag = 1;
        }

    }
 
    if (flag == 0)
        var result = "id not found";
    result = JSON.stringify({
        "result": result
    });
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JAVASCRIPT);
}
//---------------------------------------------------------------------------------------------------------------------
