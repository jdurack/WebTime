this["WebTime"] = this["WebTime"] || {};
this["WebTime"]["Template"] = this["WebTime"]["Template"] || {};

this["WebTime"]["Template"]["src/html/template/watchURL.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  if (stack1 = helpers.index) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.index); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  return escapeExpression(stack1);
  }

function program3(depth0,data) {
  
  
  return "new";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <input type='button' value='X' id='removeWatchURL-";
  if (stack1 = helpers.index) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.index); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "' class='removeWatchURL'/>\n    ";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.url); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n  ";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "\n    <input type='text' placeholder='new site (e.g. cnn.com)' id='newWatchURL'/>\n  ";
  }

  buffer += "<div style='clear:both;' id='watchURL-";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.url), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' class='watchURL'>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.url), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div>";
  return buffer;
  });