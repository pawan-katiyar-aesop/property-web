	// Chart js
	var lineChartData = {
		labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
		datasets: [{
			fillColor: "rgba(255, 255, 255, 0)",
			strokeColor: "rgba(0, 174, 239, 0.98)",
			pointColor: "rgba(0, 174, 239, 0.98)",
			data: [10, 30, 20, 60, 40, 80, 60, 100, 80, 130, 100, 150]
		}]

	}
	Chart.defaults.global.animationSteps = 50;
	Chart.defaults.global.tooltipYPadding = 16;
	Chart.defaults.global.tooltipCornerRadius = 3;
	Chart.defaults.global.tooltipTitleFontStyle = "normal";
	Chart.defaults.global.tooltipFillColor = "rgba(0,0,0,0.8)";
	Chart.defaults.global.animationEasing = "easeOutBounce";
	Chart.defaults.global.responsive = true;
	Chart.defaults.global.scaleLineColor = "black";
	Chart.defaults.global.scaleFontSize = 12;

	var ctx = document.getElementById("canvas").getContext("2d");
	var LineChartDemo = new Chart(ctx).Line(lineChartData, {
		pointDotRadius: 10,
		bezierCurve: false,
		scaleShowVerticalLines: false,
		scaleGridLineColor: "black"
	});