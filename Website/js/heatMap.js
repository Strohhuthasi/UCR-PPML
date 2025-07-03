//X matrices
var XMatrixLocationofRawDataStorage = math.matrix([[1, 1, 1, 1, 1],[0,0,0,0,0],[0,0,0,0,0]]);
var XMatrixDataSize = math.matrix([[0,0,0,0,0],[1,1,1,1,1]]);
var XMatrixTrainingMethod = math.matrix([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1]]);
var XMatrixDataQuality = math.matrix([[1, 1, 1, 1, 1], [0,0,0,0,0]]);
var XMatrixAggregation = math.matrix([[1,1,0,0,0],[0,0,1,1,1]]);
var XMatrixSensitiveAttributes = math.matrix([[0,0,0,0,0], [0,1,1,0,0],[0,0,0,1,1],[0,0,0,0,0],[1,1,1,0,0]]);
var XMatrixExplainability = math.matrix([[1,1,1,0,0],[1,1,1,1,1],[1,1,1,0,0],[1,1,1,1,1]]);
var XMatrixLocationOfComputation = math.matrix([[1,1,0,0,0],[0,0,0,1,0],[1,1,1,0,1]]);
var XMatrixAccuracy = math.matrix([[0,0,1,0,0],[0,1,0,0,0],[0,0,0,0,0],[1,0,0,1,1]]);
var XMatrixTrainingTime = math.matrix([[0,0,0,1,1],[0,0,0,0,0],[1,1,1,0,0]]);
var XMatrixPerformance = math.matrix([[0,0,0,0,0],[0,0,0,0,1],[1,1,1,1,0],[0,0,0,0,0]]);
var XMatrixResilienceAgainstAttacks = math.matrix([[0,0,0,1,1],[0,1,1,1,1]]);
var XMatrixPurposeAndAccessLimitation = math.matrix([[0,0,1,0,1],[0,1,1,1,1],[0,1,0,1,1],[0,0,0,1,1]]);
var XMatrixTechnicalRobustness = math.matrix([[1,1,1,0,0],[0,0,0,1,1]]);

//Matrix mapping user acceptance criteria to PPML technique characteristics	
var userAcceptanceCriteriaMatrix = math.matrix(
	[
		[0,1,0,1,0,0,0,1,1,1,1,1,1,0,0],
		[0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
		[1,1,1,0,1,0,0,1,0,0,0,1,0,1,0],
		[0,1,0,1,0,0,0,0,1,1,0,0,1,0,0],
		[0,1,0,1,0,0,0,0,1,1,1,1,1,1,0],
		[1,0,1,0,0,0,0,0,1,0,0,0,1,1,1],
		[0,1,0,1,0,0,1,1,0,0,1,0,1,0,1],
		[0,0,1,0,0,0,0,1,0,1,0,0,0,1,0],
		[1,0,0,1,1,1,0,1,0,0,0,0,0,1,0],
		[0,0,0,0,1,0,0,1,0,0,0,0,0,0,0],
		[0,0,0,0,1,0,1,1,0,0,0,0,0,0,0],
		[0,0,0,1,0,0,0,0,0,0,0,0,1,0,0],
		[0,1,0,1,0,0,0,0,1,1,0,0,1,0,0],
		[0,0,0,1,0,0,1,0,0,0,0,0,1,1,0]
	]);
	
	//Functionality to update the mapping matrix 
	function updateMatrix(){
		const matrix = document.getElementById('matrix');
		var matrixData =[];
		
		for(let i = 3; i<matrix.rows.length; i++) {
			const row = matrix.rows[i];
			const rowData = [];
			
			for(let j=1; j<row.cells.length; j++){
				const cell = row.cells[j];
				const checkbox = cell.querySelector('input[type="checkbox"]');
				rowData.push(checkbox.checked ? 1:0);
			}
			matrixData.push(rowData);
		}
		matrixData = math.transpose(matrixData);
		userAcceptanceCriteriaMatrix = matrixData;
	}
		
	//Function to check whether the exclusiveness constraint is met by the developer input
	function checkSums(){
		//check exclusive sums
		let sum_LocRaw = parseFloat(document.getElementById('LRDS_loc').value) + parseFloat(document.getElementById('LRDS_dis').value)
			+ parseFloat(document.getElementById('LRDS_cen').value);
		let sum_Ex = parseFloat(document.getElementById('Ex_ante').value) + parseFloat(document.getElementById('Ex_post').value) 
			+ parseFloat(document.getElementById('Ex_glob').value) + parseFloat(document.getElementById('Ex_local').value);
		let sum_Sa = parseFloat(document.getElementById('SA_Pseudo').value) + parseFloat(document.getElementById('SA_Obfus').value) 
		+ parseFloat(document.getElementById('SA_Encry').value) + parseFloat(document.getElementById('SA_Heavy').value);
		let sum_Loc = parseFloat(document.getElementById('Loc_loc').value) + parseFloat(document.getElementById('Loc_dis').value) 
		+ parseFloat(document.getElementById('Loc_cen').value);
		let sum_Res = parseFloat(document.getElementById('Res_mod').value) + parseFloat(document.getElementById('Res_mem').value);
		let sum_PAL = parseFloat(document.getElementById('PAL_ent').value) + parseFloat(document.getElementById('PAL_user').value) 
		+ parseFloat(document.getElementById('PAL_mod').value) + parseFloat(document.getElementById('PAL_res').value);
		if(sum_LocRaw === 1 && sum_Ex===1 && sum_Sa===1 && sum_Loc===1 && sum_Res===1 && sum_PAL===1) {
			//check complete, start calculations
			updateMatrix();
			updateHeatmap();
		}
		else {
			//throw error, inform user that constraint is not met
			showError('Outputs could not be updated. <br> The sum of all weights for characteristics marked with <span class="bold">"not exclusive"</span> has to be 1.');
		}
	}
	
	//Function to update heatmap output
	function updateHeatmap(){
	
		//Read the developer input data
		var YMatrixLocationOfRawDataStorage = math.matrix([[document.getElementById('LRDS_loc').value, 
		document.getElementById('LRDS_dis').value,document.getElementById('LRDS_cen').value]]);
		var YMatrixDataSize = math.matrix([[document.getElementById('DS_min').value, document.getElementById('DS_above').value]]);
		var YMatrixTrainingMethod = math.matrix([[document.getElementById('TM_sup').value, 
		document.getElementById('TM_sem').value, document.getElementById('TM_un').value,
		document.getElementById('TM_rein').value]]);
		var YMatrixDataQuality = math.matrix([[document.getElementById('DQ_pre').value,document.getElementById('DQ_raw').value]]);
		var YMatrixAggregation = math.matrix([[document.getElementById('Agg_yes').value,document.getElementById('Agg_no').value]]);
		var YMatrixSensitiveAttributes = math.matrix([[document.getElementById('SA_Pseudo').value,
		document.getElementById('SA_Obfus').value,document.getElementById('SA_Encry').value,
		document.getElementById('SA_Rem').value,document.getElementById('SA_Heavy').value]]);
		var YMatrixExplainability = math.matrix([[document.getElementById('Ex_ante').value,
		document.getElementById('Ex_post').value,document.getElementById('Ex_glob').value,
		document.getElementById('Ex_local').value]]);
		var YMatrixLocationOfComputation = math.matrix([[document.getElementById('Loc_loc').value,
		document.getElementById('Loc_dis').value,document.getElementById('Loc_cen').value]]);
		var YMatrixAccuracy = math.matrix([[document.getElementById('Acc_0').value,document.getElementById('Acc_8').value,
		document.getElementById('Acc_9').value,document.getElementById('Acc_1').value]]);
		var YMatrixTrainingTime = math.matrix([[document.getElementById('TT_long').value,
		document.getElementById('TT_mid').value,document.getElementById('TT_short').value]]);
		var YMatrixPerformance = math.matrix([[document.getElementById('Per_lost').value,
		document.getElementById('Per_kept').value,document.getElementById('Per_unin').value,
		document.getElementById('Per_inst').value]]);
		var YMatrixResilienceAgainstAttacks = math.matrix([[document.getElementById('Res_mod').value,
		document.getElementById('Res_mem').value]]);
		var YMatrixPurposeAndAccessLimitation = math.matrix([[document.getElementById('PAL_ent').value,
		document.getElementById('PAL_user').value,document.getElementById('PAL_mod').value,
		document.getElementById('PAL_res').value]]);
		var YMatrixTechnicalRobustness = math.matrix([[document.getElementById('TR_Pois').value,
		document.getElementById('TR_no').value]]);
		
		//Calculate X-Matrix * Y-Matrix
		var resultLocationofRawDataStorage = (math.multiply(YMatrixLocationOfRawDataStorage, XMatrixLocationofRawDataStorage));
		var resultDataSize = (math.multiply(YMatrixDataSize, XMatrixDataSize));
		var resultTrainingMethod = (math.multiply(YMatrixTrainingMethod, XMatrixTrainingMethod));
		var resultDataQuality = (math.multiply(YMatrixDataQuality, XMatrixDataQuality));
		var resultAggregation = (math.multiply(YMatrixAggregation, XMatrixAggregation));
		var resultSensitiveAttributes = (math.multiply(YMatrixSensitiveAttributes, XMatrixSensitiveAttributes));
		var resultExplainability = (math.multiply(YMatrixExplainability, XMatrixExplainability));
		var resultLocationOfComputation = (math.multiply(YMatrixLocationOfComputation, XMatrixLocationOfComputation));
		var resultAccuracy = (math.multiply(YMatrixAccuracy, XMatrixAccuracy));
		var resultTrainingTime = (math.multiply(YMatrixTrainingTime, XMatrixTrainingTime));
		var resultPerformance = (math.multiply(YMatrixPerformance, XMatrixPerformance));
		var resultResilienceAgainstAttacks = (math.multiply(YMatrixResilienceAgainstAttacks, XMatrixResilienceAgainstAttacks));
		var resultPurposeAndAccessLimitation = (math.multiply(YMatrixPurposeAndAccessLimitation, XMatrixPurposeAndAccessLimitation));
		var resultTechnicalRobustness = (math.multiply(YMatrixTechnicalRobustness, XMatrixTechnicalRobustness));
		
		//Read the slider values to obtain the user priorities
		var Priorities = math.matrix([sliderAutomatedDecisionMaking.value, sliderUnauthorizedSecondaryUse.value,sliderDataBias.value, sliderUnauthorizedAccess.value,
										sliderEaseOfUse.value, sliderAdaptability.value,sliderAvailability.value, sliderPerformance.value, sliderCollection.value,
										sliderDataPurpose.value, sliderStorageLocation.value, sliderCorrectness.value, sliderLawfulness.value,
										sliderFairness.value,sliderTransparency.value]).toArray();
		
		
		//Calculate the sum of user priorities for normalization
		var sumPriorities = Number(sliderAutomatedDecisionMaking.value) + Number(sliderUnauthorizedSecondaryUse.value)+ Number(sliderDataBias.value) + Number(sliderUnauthorizedAccess.value)+
										Number(sliderEaseOfUse.value)+ Number(sliderAdaptability.value)+Number(sliderAvailability.value)+ Number(sliderPerformance.value)+ Number(sliderCollection.value)+
										Number(sliderDataPurpose.value)+ Number(sliderStorageLocation.value)+ Number(sliderCorrectness.value)+ Number(sliderLawfulness.value)+
										Number(sliderFairness.value)+Number(sliderTransparency.value);
		
		//Return error if sum!=0 constraint was not met for user input
		if (sumPriorities === 0) {
			showError("Outputs could not be updated. The sum of all UAC importance scores cannot be zero. Please revise and adjust the slider values in the user input accordingly.");
			return;
		}
		
		
		var sumnew = 0;

		//Normalize user input
		if(sumPriorities!==0){
			for(let i=0;i<Priorities.length;i++){
				var normal = Priorities[i]/sumPriorities;
				Priorities[i] = parseFloat(normal.toFixed(4));
				sumnew = sumnew + normal;
			}
		}
		
		//Obtain the user importance score by multiplying the priorities of users with the characteristics matrix
		var User = (math.multiply(userAcceptanceCriteriaMatrix, Priorities))

		//Calculate sum of c for normalization
		var sumC = 0;
		for(let i=0; i<User.length; i++){
			sumC = sumC + User[i];
		}
		
		
		//Normalize c
		var sumCnew = 0;
		for(let i=0; i<User.length; i++){
			var normal = User[i]/sumC;
			User[i] = parseFloat(normal.toFixed(4));
			sumCnew = sumCnew + normal;
		}
		
		
		//Obtain the result matrix for the performance of the different PPML techniques in the various categories
		var Score = (math.concat(resultLocationofRawDataStorage, resultDataSize, resultDataQuality,resultAggregation,
		resultSensitiveAttributes,resultExplainability,resultLocationOfComputation, resultTrainingMethod,resultAccuracy,
		resultTrainingTime,resultPerformance,resultResilienceAgainstAttacks,resultPurposeAndAccessLimitation,
		resultTechnicalRobustness,0)).toArray();
		
		//Multiply the user importance score with the score values of the PPML techniques to obtain the final score
		for(let i=0;i < User.length;i++) {
			for(let j=0;j < Score[i].length; j++){
				var result = Score[i][j] * User[i]/*[0]*/;
				Score[i][j] = parseFloat(result.toFixed(4));
			}
		}
		
		
		//Update the heatmap table cell values according to the calculated score
		var l = 0;
		for(let i=1; i < rows.length-1;i++) {
			var k = 0;
			for(let j=0; j < 5 ;j++){
				rows[i].getElementsByTagName('td')[j].innerHTML = Score[l][k];
				k = k+1;
			}
			l = l+1;
		}
		
		//Calculate the category scores for all PPML
		let radar = [];
		for(let i = 0; i < 5; i++){
			var gendata =0;
			var secdata= 0;
			var modelChara =0;
			var modelFunc = 0;
			var P=0;
			var S=0;
			secdata = secdata + Score[0][i];
			secdata = secdata + Score[4][i];
			for(let j=1; j < 4; j++){
				gendata = gendata + Score[j][i];
			}
			for(let j=5; j < 8; j++){
				modelChara = modelChara + Score[j][i];
			}
			modelChara = modelChara + Score[9][i];
			modelFunc = modelFunc + Score[8][i] + Score[10][i];
			P = P + Score[12][i];
			S = S + Score [11][i] + Score[13][i];
			gendata = parseFloat(gendata/3).toFixed(4);
			secdata = parseFloat(secdata/2).toFixed(4);
			modelChara = parseFloat(modelChara/4).toFixed(4);
			modelFunc = parseFloat(modelFunc/2).toFixed(4);
			P = parseFloat(P/1).toFixed(4);
			S = parseFloat(S/2).toFixed(4);
			radar.push([gendata, secdata, modelChara, modelFunc,P,S]);
		}
		
		
		//Reset the sum values to zero
		for(let i=0;i<5;i++){
			var k = rows.length-1;
			rows[k].getElementsByTagName('td')[i].innerHTML = "0";
		}
		
		//Calculate the sum of the scores for each PPML technique and write them in the last row of the Heatmap table
		for(let i=0; i<5;i++){
			for(let j=1; j< rows.length-1;j++){
				var k = rows.length-1;
				rows[k].getElementsByTagName('td')[i].innerHTML = (parseFloat(rows[k].getElementsByTagName('td')[i].innerHTML)  
																+ 	parseFloat(rows[j].getElementsByTagName('td')[i].innerHTML)).toFixed(2);
			}
		}
		
		//Color cells of the heatmap table according to values
		cells.forEach(function(cell){
			if (cell.innerHTML <= "0") {
				cell.style.backgroundColor = "#ffffd9";
				cell.style.color ="#4a484a";
			} else if (cell.innerHTML > "0" && cell.innerHTML < "0.01") {	
				cell.style.backgroundColor ="#edf8b1";
				cell.style.color ="#4a484a";
			} else if (cell.innerHTML >= "0.01" && cell.innerHTML < "0.03") {
				cell.style.backgroundColor = "#c7e9b4";
				cell.style.color ="#4a484a";
			} else if (cell.innerHTML >= "0.03" && cell.innerHTML < "0.05") {
				cell.style.backgroundColor = "#7fcdbb";
				cell.style.color ="#4a484a";
			} else if (cell.innerHTML >= "0.05" && cell.innerHTML < "0.07") {
				cell.style.backgroundColor = "#41b6c4";
				cell.style.color ="#4a484a";
			} else if (cell.innerHTML >= "0.07" && cell.innerHTML < "0.09") {
				cell.style.backgroundColor = "#1d91c0";
				cell.style.color ="#c5c0c0";
			} else if (cell.innerHTML >= "0.09" && cell.innerHTML < "0.11") {
				cell.style.backgroundColor = "#225ea8";
				cell.style.color = "#c5c0c0";
			} else if (cell.innerHTML >= "0.11") {
				cell.style.backgroundColor = "#0c2c84";
				cell.style.color = "#c5c0c0";
			} 
		});
		
		//Highlight the highest ranking PPML technique according to the sum value 
		for(let row of table.rows){
			if(row.classList.contains('exclude-style')){
				var m = 0;
				for (let i=0; i <5;i++) {
					if (row.getElementsByTagName('td')[i].innerHTML > m) {
						m = row.getElementsByTagName('td')[i].innerHTML;
					}
				}
				for (j=0; j<5; j++){
					if (row.getElementsByTagName('td')[j].innerHTML == m){
						row.getElementsByTagName('td')[j].style.backgroundColor = "#39ff14";
						row.getElementsByTagName('td')[j].style.color = '#575757';
					} else {
						row.getElementsByTagName('td')[j].style.backgroundColor = "	#bfbfbf";
						row.getElementsByTagName('td')[j].style.color = '#575757';
					}
				}
			}
		}	
		updateRadarChart(radar);	
	}