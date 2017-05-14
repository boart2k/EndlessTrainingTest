//==============================================================================================================================================
var canvas = document.getElementById("damageDisplay");

var ctx = canvas.getContext("2d");
ctx.font = "24px Arial";
ctx.fillStyle = "#FFFFFF";

var svg = angular.module('endlessTraining', ['ngRoute']);

svg.controller('maingamecontroller', ['$rootScope', '$timeout', '$window', function($rootScope, $timeout, $window) {
	
}]);

svg.controller('game',['$rootScope', '$window', '$scope', '$timeout', '$http', '$location', 'GameFactory', function($rootScope, $window, $scope, $timeout, $http, $location, GameFactory) 
{
	$scope.toggleInfo = function(xtype)
	{
		var x = document.getElementById('t'+xtype+'info');
	    if (x.style.display === 'none') {
	        x.style.display = 'block';
	    } else {
	        x.style.display = 'none';
	    }
	}

	GameFactory.init();

	$rootScope.islog = function()
	{
		//console.log($window.username); you can access global variables declared in the index page :)
		
		return true;
	}
	if($rootScope.islog())
	{
		//===========================================================================
	    //================== GETTING SAVE OR INITIALIZE VARIABLES  ==================
	    //===========================================================================
		Decimal.set({ rounding: 7 });
		

		function drawText(text, currentTime) {
		  ctx.fillStyle = text.xtype == "normal" ? "#ff6e00" : "#FF0000";
		  ctx.fillText(
		    text.value,
		    text.x,
		    text.y - (currentTime - text.created) * 0.05
		  );
		}

		var loadingScreen = function()
		{
			$('#ig').hide();
			$('#gc').show();

			$rootScope.computations = function(type)
			{
				var tempDamage = GameFactory.rng($rootScope.rsdamage[0],(Decimal.add($rootScope.rsdamage[1],1)));
				//==========================================if NORMAL OR CRIT DAMAGE  ===========================================
				if(type == "normal")
				{
					$rootScope.rscurrentexp = Decimal.add($rootScope.rscurrentexp,tempDamage);
					$rootScope.rscurrentexptxt = GameFactory.formatNumbers($rootScope.rscurrentexp,$rootScope.numberNotation);

					if(!$rootScope.disablefloatingnumbers)
					{
						$rootScope.damageTextsToAdd.push({
						    x:canvas.width * 0.5 + Math.random() * canvas.width * 0.2,
						    y:canvas.height * 0.1 + Math.random() * canvas.height * 0.9,
						    value: GameFactory.formatNumbers(tempDamage,$rootScope.numberNotation),
						    xtype: "normal",
						    created:Date.now()
						});
					}

					computeAttack();
				}
				else if(type == "crit")
				{
					$rootScope.rscurrentexp = Decimal.add($rootScope.rscurrentexp,Decimal.mul(tempDamage,$rootScope.rscritdamage));
					$rootScope.rscurrentexptxt = GameFactory.formatNumbers($rootScope.rscurrentexp,$rootScope.numberNotation);

					if(!$rootScope.disablefloatingnumbers)
					{
						$rootScope.damageTextsToAdd.push({
						    x:canvas.width * 0.5 + Math.random() * canvas.width * 0.2,
						    y:canvas.height * 0.1 + Math.random() * canvas.height * 0.9,
						    value: GameFactory.formatNumbers(Decimal.mul(tempDamage,$rootScope.rscritdamage),$rootScope.numberNotation),
						    xtype: "crit",
						    created:Date.now()
						});
					}

					computeAttack();
				}
				else if(type == "offline")
				{
					$rootScope.rscurrentexp = Decimal.add($rootScope.rscurrentexp,$rootScope.rsdamage);
					if(Decimal($rootScope.rscurrentexp).gte($rootScope.rsexplimit))
					{
						$rootScope.rslevel = Decimal.add($rootScope.rslevel,1);
						$rootScope.rscurrentexp = 0;
						GameFactory.computeExpLimit();
						$rootScope.rsattributepoints = Decimal.add($rootScope.rsattributepoints,$rootScope.rsstatpointperlevel);
					}
				}
			}

			function computeAttack()
			{
				$rootScope.rsattributepointstogain = Decimal.floor(Decimal.div($rootScope.rscurrentexp,1));
				$rootScope.rsattributepointstogaintxt = GameFactory.formatNumbers($rootScope.rsattributepointstogain,$rootScope.numberNotation);
				/*var levelUpCounter = 0;
				var ap = 1;
					
				var texp1 = Decimal.round(Decimal.div(Decimal.mul(Decimal.sub(Decimal.pow(1.25,ap),1),$rootScope.rsexplimit),Decimal.sub(1.25,1)));

				if(Decimal($rootScope.rscurrentexp).gte(texp1))
				{
					$rootScope.rslevel = Decimal.add($rootScope.rslevel,ap);
					$rootScope.rscurrentexp = 0;
					GameFactory.computeExpLimit();
					$rootScope.rsattributepoints = Decimal.add($rootScope.rsattributepoints,Decimal.mul($rootScope.rsstatpointperlevel,ap));
				}
				else
				{
					for(x = ap; x > 0; x--)
					{
						if(Decimal($rootScope.rscurrentexp).gte($rootScope.rsexplimit))
						{
							$rootScope.rslevel = Decimal.add($rootScope.rslevel,1);
								
							$rootScope.rscurrentexp = Decimal.sub($rootScope.rscurrentexp,$rootScope.rsexplimit);
							GameFactory.computeExpLimit();

							$rootScope.rsattributepoints = Decimal.add($rootScope.rsattributepoints,$rootScope.rsstatpointperlevel);
								
							levelUpCounter++;
								
						}
						else
						{
							break;
						}
					}

					if(levelUpCounter > 0)
					{
						$rootScope.rscurrentexp = 0;
					}
				}
					
				$rootScope.rscurrentexptxt = GameFactory.formatNumbers($rootScope.rscurrentexp,$rootScope.numberNotation);
				$rootScope.rsleveltxt = GameFactory.formatNumbers($rootScope.rslevel,$rootScope.numberNotation);
				$rootScope.rsexplimittxt = GameFactory.formatNumbers($rootScope.rsexplimit,$rootScope.numberNotation);
				$rootScope.rsattributepointstxt = GameFactory.formatNumbers($rootScope.rsattributepoints,$rootScope.numberNotation);*/
			}

			$rootScope.xStatMul = function(x)
			{
				if(x==1 || x==0)
				{
					$rootScope.rsStatUpgradeMul = 1;
					$rootScope.rsStatUpgradeMulTxt = 1;
				}
				else
				{
					if(x=="all")
					{
						$rootScope.rsStatUpgradeMul = $rootScope.rsattributepoints;
						$rootScope.rsStatUpgradeMulTxt = GameFactory.formatNumbers($rootScope.rsStatUpgradeMul,$rootScope.numberNotation);
					}
					else
					{
						$rootScope.rsStatUpgradeMul = Decimal.mul($rootScope.rsStatUpgradeMul,x);
						$rootScope.rsStatUpgradeMulTxt = GameFactory.formatNumbers($rootScope.rsStatUpgradeMul,$rootScope.numberNotation);	
					}
				}
			}
			
			//===========================================================================
		    //============================= ADDING STATS  ===============================
		    //===========================================================================
			$rootScope.addStats = function(stat){
				GameFactory.addStats(stat);
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

			$rootScope.convert = function(){
				GameFactory.convertExp();
			}

			$rootScope.rankUp = function(){
				GameFactory.rankUp();
			}

			$rootScope.ascend = function(){
				GameFactory.ascend();
			}

			$rootScope.statUpgradeHover = function(x,e)
			{
				if(e=="e")
				{
					//$('#statUpgradeToolTip').show()
					$('#attrRed').show()
					
					GameFactory.onStatUpgradeHover(x);
				}
				else
				{
					//$('#statUpgradeToolTip').hide()
					$('#attrRed').hide();
					$('[id=puChange]').hide();
					$('[id=hpChange]').hide();
					$('#hpregenChange').hide();
					$('#speedChange').hide();
					$('#dodgeChange').hide();
					$('#blockChange').hide();
					$('[id=formChange]').hide();
					$('#abChange').hide();
					
					
				}
			}

			$rootScope.convertShow = function(e)
			{
				if(e=='e')
				{
					$('#attrBlue').show();
				}
				else
				{
					$('#attrBlue').hide();	
				}
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
					
					localStorage.removeItem("endlesstraining");
					GameFactory.init();
					$rootScope.playerSaveData = "";
					
				}
				else
				{
					$rootScope.confirmHardReset = "";
				}
			}

			$rootScope.disable = function(xtype){
				if(xtype=="dfloatn")
				{
					if($rootScope.disablefloatingnumbers)
					{
						$rootScope.disablefloatingnumbers = false;
						//$rootScope.disablefloatingnumberstxt = "False";
					}
					else
					{
						$rootScope.disablefloatingnumbers = true;
						//$rootScope.disablefloatingnumberstxt = "True";
					}
				}
				else if(xtype=="anim")
				{
					if($rootScope.disableanimation)
					{
						$rootScope.disableanimation = false;
						//$rootScope.disableanimationtxt = "False";
					}
					else
					{
						$rootScope.disableanimation = true;
						//$rootScope.disableanimationtxt = "True";
					}
				}
			}

			$rootScope.auto = function(x)
			{
				if(x=="rebirth")
				{
					$rootScope.rsToggleAutoRebirth = $rootScope.rsToggleAutoRebirth==false?true:false;
				}
			}

			$rootScope.showSkill = function(xx){
				if(xx=="damage")
				{
					$('#damageskill').show();
					$('#speedskill').hide();
					$('#apskill').hide();
					$('#critskill').hide();
					$('#rebirthskill').hide();
				}
				else if(xx=="speed")
				{
					$('#damageskill').hide();
					$('#speedskill').show();
					$('#apskill').hide();
					$('#critskill').hide();
					$('#rebirthskill').hide();
				}
				else if(xx=="ap")
				{
					$('#damageskill').hide();
					$('#speedskill').hide();
					$('#apskill').show();
					$('#critskill').hide();
					$('#rebirthskill').hide();
				}
				else if(xx=="crit")
				{
					$('#damageskill').hide();
					$('#speedskill').hide();
					$('#apskill').hide();
					$('#critskill').show();
					$('#rebirthskill').hide();
				}
				else if(xx=="rebirth")
				{
					$('#damageskill').hide();
					$('#speedskill').hide();
					$('#apskill').hide();
					$('#critskill').hide();
					$('#rebirthskill').show();
				}
			}

			$rootScope.upgradeSkill = function(skill){
				$rootScope.buttonLimiter++;
				if($rootScope.buttonLimiter == 1)
				{
					
					if($rootScope.rsascensionskillpoints > 0)
					{
						if(skill=="damage")
						{
							$rootScope.rsSkillDamagePoints++;
							GameFactory.computeDamageMul();
							$rootScope.rsascensionskillpoints -= 1;
						}
						else if(skill=="speed")
						{
							if($rootScope.rsSkillSpeedPoints<9)
							{
								$rootScope.rsSkillSpeedPoints++;
								$rootScope.addStats(0,'speed');
								$rootScope.rsascensionskillpoints -= 1;
							}
							else
							{
								$('#speedskillupgrade').hide();
							}
						}
						else if(skill=="ap")
						{
							if($rootScope.rsSkillAPPoints<20)
							{
								$rootScope.rsSkillAPPoints++;
								$rootScope.rsascensionskillpoints -= 1;
							}
							else
							{
								$('#apskillupgrade').hide();
							}
							
						}
						else if(skill=="crit")
						{
							if($rootScope.rsSkillCritPoints<49)
							{
								$rootScope.rsSkillCritPoints++;
								$rootScope.addStats(0,'crit chance');
								$rootScope.rsascensionskillpoints -= 1;
							}
							else
							{
								$('#critskillupgrade').hide();
							}
						}
						else if(skill=="timedAutoRebirth")
						{
							if($rootScope.rsSkillTimedAutoRebirthPoints<20)
							{
								$rootScope.rsSkillTimedAutoRebirthPoints++;
								if($rootScope.rsSkillTimedAutoRebirthPoints==1)
								{
									$rootScope.autoRebirthFunc();
									$('#progressBarContainer').show();
								}							

								if($rootScope.rsSkillTimedAutoRebirthPoints>1)
								{
									$rootScope.rsSkillAutoRebirthTime-=30;
									$rootScope.aaa = $rootScope.rsSkillAutoRebirthTime;
								}

								var min = Math.floor($rootScope.rsSkillAutoRebirthTime/60);
								var sec = $rootScope.rsSkillAutoRebirthTime%60;
								if(sec<10)
								{
									sec = "0"+sec;
								}
								if(min<10)
								{
									if(min==0)
									{
										$rootScope.rsSkillAutoRebirthTimeTxtMinSec = "seconds";
									}
									else
									{
										$rootScope.rsSkillAutoRebirthTimeTxtMinSec = "minutes";
									}
									min = "0"+min;
								}
								else
								{
									$rootScope.rsSkillAutoRebirthTimeTxtMinSec = "minutes";
								}
								if($rootScope.rsSkillAutoRebirthTimeTxtMinSec=="minutes"){
								$rootScope.rsSkillAutoRebirthTimeTxt = min+":"+sec;}else{$rootScope.rsSkillAutoRebirthTimeTxt = sec;}
								$rootScope.rsascensionskillpoints -= 1;
							}
							else
							{
								$('#timeAutoRebirthSkillUpgrade').hide();
							}
							//$rootScope.autoRebirthFunc();
						}
						else if(skill=="chancedAutoRebirth")
						{
							if($rootScope.rsSkillTimedAutoRebirthPoints>20 || $rootScope.rsSkillTimedAutoRebirthPoints>$rootScope.rsSkillChancedAutoRebirthPoints)
							{
								$rootScope.rsSkillChancedAutoRebirthPoints++;
								$rootScope.rsascensionskillpoints -= 1;
							}
						}
						else if(skill=="berserk")
						{
							if($rootScope.rsSkillDamagePoints>$rootScope.rsSkillBerserkPoints)
							{
								$rootScope.rsSkillBerserkPoints++;
								$rootScope.rsascensionskillpoints -= 1;
							}
							
						}
						else if(skill=="overheat")
						{
							if($rootScope.rsSkillSpeedPoints>=9 || $rootScope.rsSkillSpeedPoints>$rootScope.rsSkillOverheatPoints)
							{
								$rootScope.rsSkillOverheatPoints++;
								$rootScope.rsascensionskillpoints -= 1;
							}
						}
						else if(skill=="levelbreaker")
						{
							if($rootScope.rsSkillAPPoints>=20 || $rootScope.rsSkillAPPoints>$rootScope.rsSkillLevelBreakerPoints)
							{
								$rootScope.rsSkillLevelBreakerPoints++;
								$rootScope.rsascensionskillpoints -= 1;
							}
						}
						else if(skill=="luckystrike")
						{
							if($rootScope.rsSkillCritPoints>=5)
							{
								if($rootScope.rsSkillLuckyStrikePoints==0)
								{
									$rootScope.rsSkillLuckyStrikePoints++;
									$rootScope.rsascensionskillpoints -= 1;
									$('#luckystrikeskillupgrade').hide();
								}
							}
						}
					}
				}
				var limiter = function(){
		    		$rootScope.buttonLimiter = 0;
		    	}
		    	$timeout(limiter,1000);
			}

			$rootScope.getARP = function(){
				return $rootScope.ARP;
			}


			$rootScope.ARFCounter = 0;
			$rootScope.autoRebirthFunc = function()
			{

				$rootScope.aaa = $rootScope.rsSkillAutoRebirthTime;
				var mxy = function(){
				$rootScope.ARFCounter++;
				var timer = Math.floor(($rootScope.rsSkillAutoRebirthTime*10)/100);
				if($rootScope.ARFCounter%timer==0)
				{
					$rootScope.ARP = $rootScope.ARP - 1;
					if($rootScope.ARP==0)
					{
						$rootScope.ARP = 100;
						$rootScope.ARFCounter = 0;
						$rootScope.aaa = $rootScope.rsSkillAutoRebirthTime;
						GameFactory.rebirth();
					}
					//console.log($rootScope.getARP() + " ARP");
				}
				if($rootScope.ARFCounter%10==0)
				{
					$rootScope.aaa = $rootScope.aaa - 1;
					var min = Math.floor($rootScope.aaa/60);
					var sec = $rootScope.aaa%60;
					if(sec<10)
					{
						sec = "0"+sec;
					}
					if(min<10)
					{
						if(min==0)
						{
							$rootScope.minSec = "seconds";
						}
						else
						{
							$rootScope.minSec = "minutes";
						}
						min = "0"+min;
					}
					else
					{
						$rootScope.minSec = "minutes";
					}
					if($rootScope.minSec=="minutes"){
					$rootScope.ARTimer = min+":"+sec;}else{$rootScope.ARTimer=sec;}
				}
				$timeout(mxy,100);
				}

				$timeout(mxy,100);
			}

			$rootScope.resetSkills = function(){
				if($rootScope.rsascensionresetpoints<10)
				{

					$rootScope.rsascensionresetpoints++;

					var countSum = $rootScope.rsascensionskillpoints + $rootScope.rsSkillDamagePoints + $rootScope.rsSkillSpeedPoints + $rootScope.rsSkillAPPoints + $rootScope.rsSkillCritPoints + $rootScope.rsSkillTimedAutoRebirthPoints + $rootScope.rsSkillChancedAutoRebirthPoints + $rootScope.rsSkillBerserkPoints + $rootScope.rsSkillLevelBreakerPoints + $rootScope.rsSkillLuckyStrikePoints + $rootScope.rsSkillOverheatPoints;

					$rootScope.rsSkillDamagePoints = 0;
					$rootScope.rsSkillSpeedPoints = 0;
					$rootScope.rsSkillAPPoints = 0;
					$rootScope.rsSkillCritPoints = 0;
					$rootScope.rsSkillTimedAutoRebirthPoints = 0;
					$rootScope.rsSkillAutoRebirthTime = 600;
					$rootScope.rsSkillAutoRebirthTimeTxt = "";
					$rootScope.rsSkillAutoRebirthTimeTxtMinSec = "";
					$rootScope.rsSkillChancedAutoRebirthPoints = 0;
					$rootScope.rsSkillBerserkPoints = 0;
					$rootScope.rsSkillLevelBreakerPoints = 0;
					$rootScope.rsSkillLuckyStrikePoints = 0;
					$rootScope.rsSkillOverheatPoints = 0;

					GameFactory.computeDamageMul();

					$rootScope.rsascensionskillpoints = countSum;
				}

			}

			var curExpHolder = 0;
			var gameTimerCount = 0;
			var berserkBuffTimer = 0;
			var overheatBuffTimer = 0;
			var levelbreakerBuffTimer = 0;
			var gameTimer = function(){
				if(gameTimerCount == 300000)
				{
					$rootScope.save();
					
					gameTimerCount = 0;

				}

				var a = Decimal.sub($rootScope.rscurrentexp,curExpHolder);

				if(Decimal(a).isNeg())
				{
					curExpHolder = 0;
					a = Decimal.sub($rootScope.rscurrentexp,curExpHolder);
				}
				curExpHolder = $rootScope.rscurrentexp;

				$rootScope.rsDPS = a;
				$rootScope.rsDPStxt = GameFactory.formatNumbers(a,$rootScope.numberNotation);

				gameTimerCount++;
				$timeout(gameTimer, 1000);
			}

			var picTimer = function(){
				var r = GameFactory.rng(1,101);
				var crit = parseInt($rootScope.rscritchance);
				if(r <= crit)
				{
					var showCrit = function(){
					$('#critImg').show();}
					$timeout(showCrit, ($rootScope.rsmsspeed/2));
					$rootScope.computations('crit');
				}
				else
				{
					$('#critImg').hide();
					$rootScope.computations('normal');
				}
				if(!$rootScope.disableanimation)
				{
					
					if($rootScope.rsattackspeed == 1)
					{
						$rootScope.mysource = 'images/b1.gif';	
					}
					else if($rootScope.rsattackspeed == 1.2)
					{
						$rootScope.mysource = 'images/b1-2.gif';
					}
					else if($rootScope.rsattackspeed == 1.5)
					{
						$rootScope.mysource = 'images/b1-5.gif';
					}
					else if($rootScope.rsattackspeed == 1.7)
					{
						$rootScope.mysource = 'images/b1-7.gif';
					}
					else if($rootScope.rsattackspeed == 2)
					{
						$rootScope.mysource = 'images/b2.gif';
					}
					else if($rootScope.rsattackspeed == 2.5)
					{
						$rootScope.mysource = 'images/b2-5.gif';
					}
					else if($rootScope.rsattackspeed == 3)
					{
						$rootScope.mysource = 'images/b3.gif';
					}
					else if($rootScope.rsattackspeed == 4)
					{
						$rootScope.mysource = 'images/b4.gif';
					}
					else if($rootScope.rsattackspeed == 5)
					{
						$rootScope.mysource = 'images/b5.gif';
					}
					else if($rootScope.rsattackspeed == 6)
					{
						$rootScope.mysource = 'images/b6.gif';
					}
					else if($rootScope.rsattackspeed == 7 || $rootScope.rsattackspeed == 8 || $rootScope.rsattackspeed == 9)
					{
						$rootScope.mysource = 'images/b7.gif';
					}
					else if($rootScope.rsattackspeed == 10)
					{
						$rootScope.mysource = 'images/b10.gif';
					}
				}
				else
				{
					
					$rootScope.mysource = 'images/b-sit.png';
				}
				$timeout(picTimer, $rootScope.rsmsspeed);
			}
			$rootScope.mysource = 'images/b1.gif';
			$timeout(picTimer, 500);
			$timeout(gameTimer, 10);

			if(localStorage.getItem("endlesstraining")!=null)
			{
				GameFactory.loadLocalStorage();
			}
		}

		$timeout(loadingScreen, 50);

		

		function update() {
			if(!$rootScope.disablefloatingnumbers)
			{
				
			  var currentTime = Date.now();
			  
			  ctx.clearRect(0,0,canvas.width,canvas.height);
			  
			  var activeText = [];
			  
			  $rootScope.textToDraw = $rootScope.textToDraw.concat($rootScope.damageTextsToAdd);
			  $rootScope.damageTextsToAdd = [];
			  
			  for (var i=0; i < $rootScope.textToDraw.length; i++) {
			    if ($rootScope.textToDraw[i].created > currentTime - 1000) {
			      activeText.push($rootScope.textToDraw[i]);
			      drawText($rootScope.textToDraw[i], currentTime);
			    }
			  }
			  
			  $rootScope.textToDraw = activeText;
			  
			}
			else
			{
				ctx.clearRect(0,0,canvas.width,canvas.height);
			}
			requestAnimationFrame(update);
		}
		update();
	}
}]);