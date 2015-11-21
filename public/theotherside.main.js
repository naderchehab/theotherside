"use strict";

 // shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

var theotherside = {};
var canvas, ctx, width, fillColor, strokeColor;
var num = 0;
var duration = 0;

theotherside.main = function() {

	var run = function() {
		canvas = document.getElementById("theotherside-canvas");
		ctx = canvas.getContext("2d");
		ctx.strokeStyle = "black";
		ctx.font = '40px Arial';
		ctx.textBaseline = 'bottom';
		ctx.lineWidth = 2;
		var maxDepth = 12;
		var angle = 90;
		var angleDelta = 15;
		var startX = 150;
		var startY = 500;
		var branchWidth = 6;
		
		recurse(maxDepth, maxDepth, startX, startY, angle, angleDelta, branchWidth, branchWidth/maxDepth);
		recurse(maxDepth, maxDepth, startX+250, startY+100, angle, angleDelta, branchWidth, branchWidth/maxDepth);
		recurse(maxDepth, maxDepth, startX+500, startY-50, angle, angleDelta, branchWidth, branchWidth/maxDepth);
		recurse(maxDepth, maxDepth, startX+600, startY+200, angle, angleDelta, branchWidth, branchWidth/maxDepth);
	}
	
	var animate = function() {
		if (num > maxDepth) {
			return;
		}
			
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		recurse(num, 450, 500, 90, 5);
		setTimeout(function() { window.requestAnimFrame(animate); }, duration);
		num++;
	}
	
	var recurse = function(depth, maxDepth, x, y, angle, angleDelta, branchWidth, branchWidthReduction) {
		
		if (depth <= 0)
			return;
		
		var dx = 0, dy = 0;
		ctx.beginPath();
		for (var i = 0; i < 20; i++) {
		dx += 1.5*Math.cos(rad(angle));		
		dy -= 1.5*Math.sin(rad(angle));
		ctx.arc(x+dx, y+dy, branchWidth, 0, rad(360));
		}
		ctx.stroke();
		if (Math.random()*maxDepth < depth) {
			recurse(depth-1, maxDepth, x+dx, y+dy, angle-angleDelta, angleDelta, branchWidth-branchWidthReduction, branchWidthReduction);
		}
		if (Math.random()*maxDepth < depth) {
			recurse(depth-1, maxDepth, x+dx, y+dy, angle+angleDelta, angleDelta, branchWidth-branchWidthReduction, branchWidthReduction);	
		}
	}
	
	var rad = function(deg) {
		return deg * Math.PI / 180;
	}

	return {
		run: run
	}
}();