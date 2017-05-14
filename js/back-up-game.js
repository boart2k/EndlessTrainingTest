//==============================================================================================================================================

var svg = angular.module('endlessTraining', ['ngRoute']);

svg.controller('maingamecontroller', ['$rootScope', '$timeout', '$window', function($rootScope, $timeout, $window) {
	
}]);

svg.controller('game',['$rootScope', '$window', '$scope', '$timeout', '$http', '$location', 'GameFactory', function($rootScope, $window, $scope, $timeout, $http, $location, GameFactory) {


	GameFactory.init();

	$rootScope.islog = function()
	{
		//console.log($window.username); you can access global variables declared in the index page :)
		$rootScope.pfid = '1F74';
		$rootScope.pfcid = 'maesanchez182';
		PlayFab.settings.titleId = $rootScope.pfid;
		GameFactory.playfabLogIn();
		return true;
	}
	if($rootScope.islog())
	{
		//===========================================================================
	    //================== GETTING SAVE OR INITIALIZE VARIABLES  ==================
	    //===========================================================================
		Decimal.set({ rounding: 7 });
		if(localStorage.getItem("endlesstraining")!=null)
		{
			GameFactory.loadLocalStorage();
		}

		var loadingScreen = function(){
			$('#ig').hide();
			$('#om').hide();
			$('#gc').show();
			//===========================================================================
		    //============================= ANIMATION  ==================================
		    //===========================================================================

			var animationCounter = 1;
			$rootScope.mysource = 'images/p-m1.png';
			var picTimer = function(){
				var r = GameFactory.rng(1,101);
				if(animationCounter == 11)
				{
					animationCounter = 1;
				}
				if(animationCounter % 2 == 1)
				{
					if(r <= parseInt($rootScope.rscritchance))
					{
						$rootScope.mysource = 'images/k1-m2-crit.png';
						$('#critImg').show();
						$rootScope.computations('crit');
					}
					else
					{
						$('#critImg').hide();
						$rootScope.mysource = 'images/p-m2.png';
						$rootScope.computations('normal');
					}
				}
				else
				{
					$rootScope.mysource = 'images/p-m1.png';
				}
				animationCounter++;
				$timeout(picTimer, $rootScope.rsmsspeed);
			}

			$rootScope.computations = function(type){
				//==========================================if NORMAL OR CRIT DAMAGE  ===========================================
				if(type == "normal")
				{
					$rootScope.rscurrentexp = Decimal.add($rootScope.rscurrentexp,$rootScope.rsdamage);
				}
				else if(type == "crit")
				{
					$rootScope.rscurrentexp = Decimal.add($rootScope.rscurrentexp,Decimal.mul($rootScope.rsdamage,$rootScope.rscritdamage));
				}
				else if(type == "offline")
				{
					$rootScope.rscurrentexp = Decimal.div(Decimal.add($rootScope.rscurrentexp,$rootScope.rsdamage),4);
				}
				
				//============================================   if LEVEL UP    ==============================================
				if(Decimal($rootScope.rscurrentexp).gte($rootScope.rsexplimit))
				{
					$rootScope.rslevel = Decimal.add($rootScope.rslevel,1);
					$rootScope.rsleveltxt = GameFactory.formatNumbers($rootScope.rslevel,$rootScope.numberNotation);

					$rootScope.rstotallevels = Decimal.add($rootScope.rstotallevels,1);
					$rootScope.rstotallevelstxt = GameFactory.formatNumbers($rootScope.rstotallevels,$rootScope.numberNotation);

					$rootScope.rscurrentexp = 0;
					$rootScope.rsexplimit = Decimal.mul($rootScope.rsexplimit,1.05);
					$rootScope.rsexplimittxt = GameFactory.formatNumbers($rootScope.rsexplimit,$rootScope.numberNotation);

					$rootScope.rsattributepoints = Decimal.add($rootScope.rsattributepoints,$rootScope.rsstatpointperlevel);
					$rootScope.rsattributepointstxt = GameFactory.formatNumbers($rootScope.rsattributepoints,$rootScope.numberNotation);
				}

				$rootScope.rscurrentexptxt = GameFactory.formatNumbers($rootScope.rscurrentexp,$rootScope.numberNotation);

				//check if it is possible to rebirth
				if(Decimal($rootScope.rslevel).gte($rootScope.rsnextrebirth))
				{
					$rootScope.canRebirth = 'true';
				}
				else
				{
					$rootScope.canRebirth = 'false';
				}

				//check if it is possible to rankup
				if(Decimal($rootScope.rsrebirths).gte($rootScope.rsnextrankup))
				{
					$rootScope.canRankUp = 'true';
					$rootScope.rankUpUnlocked = 1;
				}
				else
				{
					$rootScope.canRankUp = 'false';
				}

				//check if it is possible to ascend
				if(Decimal($rootScope.rsrank).equals(25))
				{
					$rootScope.canAscend = 'true';
					$rootScope.ascensionUnlocked = 1;
				}
				else
				{
					$rootScope.canAscend = 'false';
				}

				if($rootScope.rankUpUnlocked == 1)
				{
					$('#rankup').show();
				}
				if($rootScope.ascensionUnlocked == 1)
				{
					$('#ascension').show();
				}
			}
			
			//===========================================================================
		    //============================= ADDING STATS  ===============================
		    //===========================================================================
			$rootScope.addStats = function(multiplier,stat){
				GameFactory.addStats(multiplier,stat);
			}

			$rootScope.save = function(){
				GameFactory.save();
			}

			$rootScope.loadImportSave = function(){
				GameFactory.loadImportSave();
			}

			$rootScope.changeView = function(v){
				$location.path(v);
			}

			$rootScope.rebirth = function(){
				GameFactory.rebirth();
			}

			$rootScope.rankUp = function(){
				GameFactory.rankUp();
			}

			$rootScope.ascend = function(){
				GameFactory.ascend();
			}

			$rootScope.checkLocalStorage = function(){
				if (typeof(Storage) !== "undefined") {
				    $rootScope.localstorage = "The game auto saves every 30 seconds. Last saved was on: ";
				} else {
				    $rootScope.localstorage = "Your browser doesn't support local storage, you can still play the game but you need to secure the exported saved game files. If you accidentally close the browser before exporting your saved game file, there is no way to recover your save game. Play at your own risk."
				}
			}
			$rootScope.checkLocalStorage();

			$rootScope.randomtxt = function(){
				var txt1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
				return txt1[GameFactory.rng(1,63)-1];
			}

			$rootScope.rtxt = function(mytxt){
				var txt2 = "";
				for(x=0;x<mytxt.length;x++)
				{
					txt2 = txt2+mytxt[x]+$rootScope.randomtxt();
				}
				return txt2;
			}

			$rootScope.drtxt = function(mytxt){
				var txt1 = "";
				for(x=0;x<mytxt.length;x+=2)
				{
					txt1 = txt1+mytxt[x];
				}
				return txt1;
			}

			$rootScope.closeOfflineMessage = function(){
				$('#om').hide();
				$('#gc').show();
			}

			$rootScope.changeNumberNotation = function(x){
				$rootScope.numberNotation = x;
				GameFactory.changeNotation();
			}

			$rootScope.hardReset = function(){
				if($rootScope.confirmHardReset == "confirm")
				{
					console.log($rootScope.confirmHardReset);
					localStorage.removeItem("endlesstraining");
					GameFactory.init();
					$rootScope.playerSaveData = "";
					console.log($rootScope.playerSaveData);
				}
				else
				{
					$rootScope.confirmHardReset = "";
				}
			}

			var gameTimerCount = 0;
			var gameTimer = function(){
				if(gameTimerCount == 30)
				{
					$rootScope.save();
					//console.log($rootScope.numberNotation);
					gameTimerCount = 0;

				}
				
				gameTimerCount++;
				$timeout(gameTimer, 1000);
			}


			$timeout(picTimer, 10);
			$timeout(gameTimer, 10);
		}

		$timeout(loadingScreen, 5000);
	}
}]);