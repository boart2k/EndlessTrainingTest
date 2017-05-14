//'use strict';
angular.module('tycoonology').factory('GameFactory', ['$rootScope', '$http', '$timeout', '$window', function($rootScope, $http, $timeout, $window){
    var mfactory = {
        getSeconds: getSeconds,
        addStats: addStats,
        init: init,
        getServerTime: getServerTime,
        formatNumbers: formatNumbers,
        rng: rng
    };

    return mfactory;

    //===========================================================================
    //=========================== INITIALIZE VARIABLES  =========================
    //===========================================================================
    function init()
    {
    	$rootScope.rslevel = 1;
		$rootScope.rstotallevels = 1;
		$rootScope.rscurrentexp = 0;
		$rootScope.rsexplimit = 100;
		$rootScope.rsage = 18;

		$rootScope.rsdamage = 1;
		$rootScope.rscritchance = 1;
		$rootScope.rscritdamage = 1;
		$rootScope.rsattackspeed = 1;
		$rootScope.rsattributepoints = 0;
		$rootScope.rsmsspeed = 500;

		//attributes
		$rootScope.rsstatpower = 1;
		$rootScope.rsstatcritp = 0;
		$rootScope.rsstatcritdmg = 0;
		$rootScope.rsstatspeed = 0;
		$rootScope.rsstatmastery = 0;

		//display variables
		$rootScope.rsleveltxt = 1;
		$rootScope.rstotallevelstxt = 1;
		$rootScope.rscurrentexptxt = 0;
		$rootScope.rsexplimittxt = 100;
		$rootScope.rsagetxt = 18;

		$rootScope.rsstatpowertxt = 1;
		$rootScope.rsstatcritptxt = 0;
		$rootScope.rsstatcritdmgtxt = 0;
		$rootScope.rsstatspeedtxt = 0;
		$rootScope.rsstatmasterytxt = 0;

		$rootScope.rsdamagetxt = 1;
		$rootScope.rscritchancetxt = 1;
		$rootScope.rscritdamagetxt = 1;
		$rootScope.rsattackspeedtxt = 1;
		$rootScope.rsattributepointstxt = 0;

		$rootScope.rsstatpointperlevel = 2;

		$rootScope.numberNotation = "short";

		$rootScope.mytestVar = "variable";
    }

    function setDate(u)
    {
    	var d = new Date(u*1000);
    }


    //===========================================================================
    //===================== Next kay mag process sa offline  ====================
    //===========================================================================
    function getSeconds(dt)
    {
    	//var a = parseInt(dt)*1000;
    	var b = new Date(dt);
    	//var c = 1491999956 * 1000;
    	var d = new Date('2017-04-13 12:09:16');
    	var e = d - b;
    	var f = e/1000;
    	return f;
        //var a = dt.toString().substr(8,2);
        //return a;
    }

    //===========================================================================
    //============================= ADDING STATS  ===============================
    //===========================================================================
    function addStats(multiplier,stat)
    {
    	if(multiplier == "all")
		{
				if(stat == "mastery")
				{
					if(Decimal($rootScope.rsattributepoints).gte(100))
					{
						var f = Decimal.floor(Decimal.div($rootScope.rsattributepoints,100));
						$rootScope.rsattributepoints = Decimal.sub($rootScope.rsattributepoints,Decimal.mul(f,100));
						$rootScope.rsattributepointstxt = formatNumbers($rootScope.rsattributepoints,$rootScope.numberNotation);
						$rootScope.rsstatmastery = Decimal.add($rootScope.rsstatmastery,f);
						$rootScope.rsstatmasterytxt = formatNumbers($rootScope.rsstatmastery,$rootScope.numberNotation);
						$rootScope.rsstatpointperlevel = Decimal.add(2,$rootScope.rsstatmastery);
					}
				}
				else
				{
					
					if(stat == "power")
					{
						$rootScope.rsstatpower = Decimal.add($rootScope.rsstatpower,$rootScope.rsattributepoints);
						$rootScope.rsstatpowertxt = formatNumbers($rootScope.rsstatpower,$rootScope.numberNotation);
						$rootScope.rsdamage = Decimal.mul($rootScope.rsstatpower,1);
						$rootScope.rsdamagetxt = formatNumbers($rootScope.rsdamage,$rootScope.numberNotation);
					}
					else if(stat == "speed")
					{
						$rootScope.rsstatspeed = Decimal.add($rootScope.rsstatspeed,$rootScope.rsattributepoints);
						$rootScope.rsstatspeedtxt = formatNumbers($rootScope.rsstatspeed,$rootScope.numberNotation);
						if($rootScope.rsattackspeed < 20)
						{
							$rootScope.rsattackspeed = 1+(Math.round(Math.pow(Math.pow(parseInt($rootScope.rsstatspeed),(9/10)),(1/2)))/100);
							if($rootScope.rsattackspeed > 20)
							{
								$rootScope.rsattackspeed = 20;
							}
							if($rootScope.rsattackspeed % 1 != 0)
							{
								$rootScope.rsattackspeedtxt = $rootScope.rsattackspeed.toFixed(2);
							}
							else
							{
								$rootScope.rsattackspeedtxt = $rootScope.rsattackspeed;
							}
							$rootScope.rsmsspeed = 500/$rootScope.rsattackspeed;
						}
					}
					else if(stat == "crit chance")
					{
						$rootScope.rsstatcritp = Decimal.add($rootScope.rsstatcritp,$rootScope.rsattributepoints);
						$rootScope.rsstatcritptxt = formatNumbers($rootScope.rsstatcritp,$rootScope.numberNotation);
						if(Decimal($rootScope.rscritchance).lt(50))
						{
							var c = Decimal.add($rootScope.rscritchance,1);
							var d = Decimal.pow(c,c);
							while(Decimal($rootScope.rsstatcritp).gte(d))
							{
								$rootScope.rscritchance = Decimal.add($rootScope.rscritchance,1);
								c = Decimal.add($rootScope.rscritchance,1);
								d = Decimal.pow(c,c);
							}
							$rootScope.rscritchancetxt = formatNumbers($rootScope.rscritchance,$rootScope.numberNotation);
						}
					}
					else if(stat == "crit damage")
					{
						$rootScope.rsstatcritdmg = Decimal.add($rootScope.rsstatcritdmg,$rootScope.rsattributepoints);
						$rootScope.rsstatcritdmgtxt = formatNumbers($rootScope.rsstatcritdmg,$rootScope.numberNotation);
						$rootScope.rscritdamage = Decimal.add(Decimal.mul($rootScope.rsstatcritdmg,0.01),1);
						$rootScope.rscritdamagetxt = formatNumbers($rootScope.rscritdamage,$rootScope.numberNotation);
					}
					$rootScope.rsattributepoints = 0;
					$rootScope.rsattributepointstxt = formatNumbers($rootScope.rsattributepoints,$rootScope.numberNotation);
				}
				
		}
		else
		{
			if(!(Decimal(multiplier).gt($rootScope.rsattributepoints)))
			{
				if(stat == "mastery")
				{
					if(Decimal($rootScope.rsattributepoints).gte(Decimal.mul(multiplier,100)))
					{
						$rootScope.rsattributepoints = Decimal.sub($rootScope.rsattributepoints,Decimal.mul(multiplier,100));
						$rootScope.rsattributepointstxt = formatNumbers($rootScope.rsattributepoints,$rootScope.numberNotation);
						$rootScope.rsstatmastery = Decimal.add($rootScope.rsstatmastery,multiplier);
						$rootScope.rsstatmasterytxt = formatNumbers($rootScope.rsstatmastery,$rootScope.numberNotation);
						$rootScope.rsstatpointperlevel = Decimal.add(2,$rootScope.rsstatmastery);
					}
				}
				else
				{
					$rootScope.rsattributepoints = Decimal.sub($rootScope.rsattributepoints,multiplier);
					$rootScope.rsattributepointstxt = formatNumbers($rootScope.rsattributepoints,$rootScope.numberNotation);
					if(stat == "power")
					{
						$rootScope.rsstatpower = Decimal.add($rootScope.rsstatpower,multiplier);
						$rootScope.rsstatpowertxt = formatNumbers($rootScope.rsstatpower,$rootScope.numberNotation);
						$rootScope.rsdamage = Decimal.mul($rootScope.rsstatpower,1);
						$rootScope.rsdamagetxt = formatNumbers($rootScope.rsdamage,$rootScope.numberNotation);
					}
					else if(stat == "speed")
					{
						$rootScope.rsstatspeed = Decimal.add($rootScope.rsstatspeed,multiplier);
						$rootScope.rsstatspeedtxt = formatNumbers($rootScope.rsstatspeed,$rootScope.numberNotation);
						if($rootScope.rsattackspeed < 20)
						{
							$rootScope.rsattackspeed = 1+(Math.round(Math.pow(Math.pow(parseInt($rootScope.rsstatspeed),(9/10)),(1/2)))/100);
							if($rootScope.rsattackspeed % 1 != 0)
							{
								$rootScope.rsattackspeedtxt = $rootScope.rsattackspeed.toFixed(2);
							}
							else
							{
								$rootScope.rsattackspeedtxt = $rootScope.rsattackspeed;
							}
							if($rootScope.rsattackspeed>20)
							{
								$rootScope.rsattackspeed = 20;
								$rootScope.rsattackspeedtxt = 20;
							}
							$rootScope.rsmsspeed = 500/$rootScope.rsattackspeed;
						}
					}
					else if(stat == "crit chance")
					{
						$rootScope.rsstatcritp = Decimal.add($rootScope.rsstatcritp,multiplier);
						$rootScope.rsstatcritptxt = formatNumbers($rootScope.rsstatcritp,$rootScope.numberNotation);
						if(Decimal($rootScope.rscritchance).lt(50))
						{
							var a = Decimal.add($rootScope.rscritchance,1);
							var b = Decimal.pow(a,a);
							while(Decimal($rootScope.rsstatcritp).gte(b))
							{
								$rootScope.rscritchance = Decimal.add($rootScope.rscritchance,1);
								a = Decimal.add($rootScope.rscritchance,1);
								b = Decimal.pow(a,a);
							}
							$rootScope.rscritchancetxt = formatNumbers($rootScope.rscritchance,$rootScope.numberNotation);
						}
					}
					else if(stat == "crit damage")
					{
						$rootScope.rsstatcritdmg = Decimal.add($rootScope.rsstatcritdmg,multiplier);
						$rootScope.rsstatcritdmgtxt = formatNumbers($rootScope.rsstatcritdmg,$rootScope.numberNotation);
						$rootScope.rscritdamage = Decimal.add(Decimal.mul($rootScope.rsstatcritdmg,0.01),1);
						$rootScope.rscritdamagetxt = formatNumbers($rootScope.rscritdamage,$rootScope.numberNotation);
					}
				}
			}
		}
    }


    //===========================================================================
    //===================== Next kay mag process sa offline  ====================
    //===========================================================================

    function getServerTime(){
    	var b = "http://api.timezonedb.com/v2/get-time-zone?key=AYXEMYESXHBM&format=json&by=zone&zone=Asia/Manila";
		var e = "Saving failed. Please try again in a few seconds."
		$http.get(b).then(function onSuccess(response){$rootScope.mytestVar = response.data.formatted; $rootScope.unixTime = response.data.timestamp;});
    }

    function formatNumbers(a,xtype)
	{
		if(xtype == "short")
		{
			if(Decimal(a).gte(100000))
			{
				return numberformat.formatShort(a);
			}
			else
			{
				return numberformat.format(a);
			}
		}
		else if(xtype == "scientific")
		{
			return numberformat.format(a, {format: 'scientific', sigfigs: 3});
		}
		else if(xtype == "engineering")
		{
			return numberformat.format(a, {format: 'engineering', sigfigs: 3});
		}
	}

	function rng(min, max) 
	{
    	return Math.floor(Math.random() * (max - min) ) + min;
	}
}]);