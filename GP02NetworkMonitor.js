var GP02NetworkMonitor = (function() {
	GP02NetworkMonitor.prototype.gp02 = null;
	GP02NetworkMonitor.prototype.chart = null;
	GP02NetworkMonitor.prototype.maxPointCount = 20;
	GP02NetworkMonitor.prototype.beforeData = null;

	function GP02NetworkMonitor(render) {
		this.gp02 = new GP02();
		Highcharts.setOptions({
			global:{
				useUTC: false
			}
		});
		this.init(render);
	}

	GP02NetworkMonitor.prototype.init = function(render) {
		var self = this;

		var setDefaultPoints = function() {
			var data = [],
				time = (new Date()).getTime() - (20 * 1000);

			for(var i = 0; i < 20; ++i) {
				data.push({
					x: time + i * 1000,
					y: 0
				})
			}
			return data;
		};

		this.chart = new Highcharts.Chart({
			chart: {
				renderTo: render,
				type: "area",
				events: {
					load: function(){
						setInterval(function() {
							self.gp02.getTrafficStatus(self.updateGraph.bind(self));
						}, 2000);
					}
				},
			},
			title: {
				text: "GP02 NetworkMonitor"
			},
			xAxis: {
				title: {
					text: "時間"
				},
				type: "datetime",
			},
			yAxis: {
				title: {
					text: "通信量"
				}
			},
			series: [{
				name: "Upload",
				data: setDefaultPoints()
			}, {
				name: "Download",
				data: setDefaultPoints()
			}]
		});
	};

	GP02NetworkMonitor.prototype.updateGraph = function(data) {
		var skip = false,
			json = JSON.parse(data),
			date = (new Date()).getTime();

		if (this.chart.series[0].data.length >= this.maxPointCount) {
			skip = true;
		}
		var upload = json["CurrentUpload"],
			download = json["CurrentDownload"];

		if (this.beforeData) {
			upload -= this.beforeData["CurrentUpload"];
			download -= this.beforeData["CurrentDownload"];
			this.chart.series[0].addPoint([date, upload], true, skip);
			this.chart.series[1].addPoint([date, download], true, skip);
		}
		this.beforeData = json;
	};

	return GP02NetworkMonitor;
})();

