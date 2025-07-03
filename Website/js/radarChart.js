//Function to create and update radar chart output
function updateRadarChart(radar) {
	
	const ctx = document.getElementById('myRadarChart').getContext('2d');
	const chart = document.getElementById('myRadarChart');

	//delete old radar chart if existing
	if (chart.chartInstance) {
		chart.chartInstance.destroy();
	}
	
	//create new radarchart
	chart.chartInstance = new Chart(ctx, {
		type: 'radar',
		data: {
			labels: [
				['Data', 'Requirements'],
				['Data', 'Vulnerabilities'],
				['Model', 'Construction'],
				['Model', 'Evaluation'],
				['Privacy'],
				['Security']
			],
			datasets: [{
				label: 'FL',
				data: [radar[0][0], radar[0][1], radar[0][2], radar[0][3], radar[0][4], radar[0][5]],
				fill: true,
				backgroundColor: 'rgba(192, 175, 251, 0.1)',
				borderColor: 'rgb(192, 175, 251)',
				pointBackgroundColor: 'rgb(192, 175, 251)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: '(192, 175, 251)'
			}, {
				label: 'FL + LDP',
				data: [radar[1][0], radar[1][1], radar[1][2], radar[1][3], radar[1][4], radar[1][5]],
				fill: true,
				backgroundColor: 'rgba(230, 161, 118, 0.1)',
				borderColor: 'rgb(230, 161, 118)',
				pointBackgroundColor: 'rgb(230, 161, 118)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgb(230, 161, 118)'
			}, {
				label: 'MDP',
				data: [radar[2][0], radar[2][1], radar[2][2], radar[2][3], radar[2][4], radar[2][5]],
				fill: true,
				backgroundColor: 'rgba(0, 103, 138, 0.1)',
				borderColor: 'rgb(0, 103, 138)',
				pointBackgroundColor: 'rgb(0, 103, 138)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgb(0, 103, 138)'
			}, {
				label: 'SMPC',
				data: [radar[3][0], radar[3][1], radar[3][2], radar[3][3], radar[3][4], radar[3][5]],
				fill: true,
				backgroundColor: 'rgba(152, 68, 100, 0.1)',
				borderColor: 'rgb(152, 68, 100)',
				pointBackgroundColor: 'rgb(152, 68, 100)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgb(152, 68, 100)'
			}, {
				label: 'HE',
				data: [radar[4][0], radar[4][1], radar[4][2], radar[4][3], radar[4][4], radar[4][5]],
				fill: true,
				backgroundColor: 'rgba(94, 204, 171, 0.1)',
				borderColor: 'rgb(94, 204, 171)',
				pointBackgroundColor: 'rgb(94, 204, 171)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgb(94, 204, 171)'
			}]
		},
		options: {
			responsive: true,
			elements: {
				line: {
					borderWidth: 3
				}
			}
		}
	});				
}