var GP02 = (function() {
		GP02.prototype.api = {
			status: 'monitoring/status',
			traffic_status: 'monitoring/traffic-statistic',
			connection: 'dialup/connection',
			profiles: 'dialup/profiles',
			language: 'language/current-language',
			pinStatus: 'pin/status',
			plmn: 'net/current-plmn'
		};
		GP02.prototype.server = "";

		function GP02(server) {
			this.server = server || '192.168.1.1';
		}

		GP02.prototype.request = function(api, callback) {
			$.ajax({
					type: 'GET',
					url: './request.php',
					data: {
						api: api,
						server: this.server
				 	},
					success: callback
			});
		};

		GP02.prototype.getStatus = function(callback) {
			this.request(this.api.status, callback);
		};
		GP02.prototype.getTrafficStatus = function(callback) {
			this.request(this.api.traffic_status, callback);
		};
		GP02.prototype.getConnection = function(callback) {
			this.request(this.api.connection, callback);
		};
		GP02.prototype.getProfiles = function(callback) {
			this.request(this.api.profiles, callback);
		};
		GP02.prototype.getLanguage = function(callback) {
			this.request(this.api.language, callback);
		};
		GP02.prototype.getPinStatus = function(callback) {
			this.request(this.api.pinStatus, callback);
		};
		GP02.prototype.getPlmn = function(callback) {
			this.request(this.api.plmn, callback);
		};
		return GP02;
})();