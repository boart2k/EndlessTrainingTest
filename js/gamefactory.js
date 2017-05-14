//'use strict';
angular.module('endlessTraining').factory('GameFactory', ['$rootScope', '$timeout', '$window', '$filter', function($rootScope, $timeout, $window, $filter){
    var mfactory = {
        addStats: addStats,
        init: init,
        getServerTime: getServerTime,
        formatNumbers: formatNumbers,
        rng: rng,
        convertExp: convertExp,
        rankUp: rankUp,
        ascend: ascend,
        save: save,
        loadImportSave: loadImportSave,
        loadLocalStorage: loadLocalStorage,
        computeDamageMul: computeDamageMul,
        playfabLogIn: playfabLogIn,
        changeNotation: changeNotation,
        computeExpLimit: computeExpLimit,
        computePrice: computePrice,
        onStatUpgradeHover: onStatUpgradeHover
        //authenticateKongLogin: authenticateKongLogin
    };

    return mfactory;

    //===========================================================================
    //=========================== INITIALIZE VARIABLES  =========================
    //===========================================================================
    function init()
    {
    	$rootScope.rslevel = 1;
		$rootScope.rscurrentexp = 0;

		$rootScope.rsdamage = [1,100];
		$rootScope.rscritchance = 5;
		$rootScope.rscritdamage = 1.5;
		$rootScope.rsattackspeed = 1;
		$rootScope.rshp = 0;
		$rootScope.rshpregen = 0;
		$rootScope.rstoughness = 0;
		$rootScope.rsdodge = 0;
		$rootScope.rsblock = 0;
		$rootScope.rshitrate = 0;
		$rootScope.rsattributepointstogain = 0;
		$rootScope.rsattributepoints = 0;
		$rootScope.rsmsspeed = 1000;

		//attributes
		$rootScope.rsstatpower = 0;
		$rootScope.rsstatcritp = 0;
		$rootScope.rsstatcritdmg = 0;
		$rootScope.rsstatspeed = 0;
		$rootScope.rsstatform = 0;
		$rootScope.rsstatendurance = 0;
		$rootScope.rsstatresting = 0;
		$rootScope.rsstatdodge = 0;
		$rootScope.rsstatblock = 0;

		//display variables
		$rootScope.rsleveltxt = 1;
		$rootScope.rscurrentexptxt = 0;

		$rootScope.rsstatpowertxt = 0;
		$rootScope.rsstatcritptxt = 0;
		$rootScope.rsstatcritdmgtxt = 0;
		$rootScope.rsstatspeedtxt = 0;
		$rootScope.rsstatformtxt = 0;
		$rootScope.rsstatendurancetxt = 0;
		$rootScope.rsstatrestingtxt = 0;
		$rootScope.rsstatdodgetxt = 0;
		$rootScope.rsstatblocktxt = 0;

		$rootScope.rsdamagetxt = [1,100];
		$rootScope.rscritchancetxt = 5;
		$rootScope.rscritdamagetxt = 1.5;
		$rootScope.rsattackspeedtxt = 1;
		$rootScope.rshptxt = 0;
		$rootScope.rshpregentxt = 0;
		$rootScope.rstoughnesstxt = 0;
		$rootScope.rsdodgetxt = 0;
		$rootScope.rsblocktxt = 0;
		$rootScope.rshitratetxt = 0;
		$rootScope.rsattributepointstogaintxt = 0;
		$rootScope.rsattributepointstxt = 0;

		$rootScope.numberNotation = "Standard";
		$rootScope.date = "";
		$rootScope.rawunixTime = "";

		//============ Rank Up and Ascensions Unlocked

		$rootScope.rankUpUnlocked = 0;
		$rootScope.ascensionUnlocked = 0;

		$rootScope.playerSaveData = "";
		$rootScope.buttonLimiter = 0;

		//skills here
		$rootScope.rsskillAdvanceForm = 0;
		$rootScope.rsskillAdvanceCrit = 0;
		$rootScope.rsskillAdvanceSpeed = 0;


		// extreanous variables
		$rootScope.disablefloatingnumbers = false;
		$rootScope.disableanimation = false;
		$rootScope.minSec = "minutes";
		$rootScope.rsStatUpgradeMul = 1;
		$rootScope.rsStatUpgradeMulTxt = 1;
		$rootScope.rsFormBonus = 0;
		$rootScope.rsFormBonusTxt = 0;

		$rootScope.rsToggleAutoRebirth = false;
		$rootScope.autoRebirthLevels = 35;

		$rootScope.suttAttributePoints = 1;
		$rootScope.suttStat = "";
		$rootScope.suttMul = 1;

		$rootScope.rsDPS = 0;
		$rootScope.rsDPStxt = 0;

		$rootScope.rsAbility = 0;
		$rootScope.rsAbilityTxt = 0;

		$rootScope.textToDraw = [];
		$rootScope.damageTextsToAdd = [];
		computeDamageMul();

		$('#attrBlue').hide();
		$('#statUpgradeToolTip').hide()
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

    //===========================================================================
    //======================= CHANGING OF NUMBER NOTATIONS  =====================
    //===========================================================================

    function changeNotation()
    {
		$rootScope.rscurrentexptxt = formatNumbers($rootScope.rscurrentexp,$rootScope.numberNotation);

		$rootScope.rsstatpowertxt = formatNumbers($rootScope.rsstatpower,$rootScope.numberNotation);
		$rootScope.rsstatcritptxt = formatNumbers($rootScope.rsstatcritp,$rootScope.numberNotation);
		$rootScope.rsstatcritdmgtxt = formatNumbers($rootScope.rsstatcritdmg,$rootScope.numberNotation);
		$rootScope.rsstatspeedtxt = formatNumbers($rootScope.rsstatspeed,$rootScope.numberNotation);
		$rootScope.rsstatformtxt = formatNumbers($rootScope.rsstatform,$rootScope.numberNotation);
		$rootScope.rsstatendurancetxt = formatNumbers($rootScope.rsstatendurance,$rootScope.numberNotation);
		$rootScope.rsstatrestingtxt = formatNumbers($rootScope.rsstatresting,$rootScope.numberNotation);
		$rootScope.rsstatdodgetxt = formatNumbers($rootScope.rsstatdodge,$rootScope.numberNotation);
		$rootScope.rsstatblocktxt = formatNumbers($rootScope.rsstatblock,$rootScope.numberNotation);

		$rootScope.rsdamagetxt[0] = formatNumbers($rootScope.rsdamage[0],$rootScope.numberNotation);
		$rootScope.rsdamagetxt[1] = formatNumbers($rootScope.rsdamage[1],$rootScope.numberNotation);
		$rootScope.rscritchancetxt = formatNumbers($rootScope.rscritchance,$rootScope.numberNotation);
		$rootScope.rscritdamagetxt = formatNumbers($rootScope.rscritdamage,$rootScope.numberNotation);
		$rootScope.rshptxt = formatNumbers($rootScope.rshp,$rootScope.numberNotation);
		$rootScope.rshpregentxt = formatNumbers($rootScope.rshpregen,$rootScope.numberNotation);
		$rootScope.rstoughnesstxt = formatNumbers($rootScope.rstoughness,$rootScope.numberNotation);
		$rootScope.rsdodgetxt = formatNumbers($rootScope.rsdodge,$rootScope.numberNotation);
		$rootScope.rsblocktxt = formatNumbers($rootScope.rsblock,$rootScope.numberNotation);
		$rootScope.rshitratetxt = formatNumbers($rootScope.rshitrate,$rootScope.numberNotation);
		//$rootScope.rsattackspeedtxt = $rootScope.rsattackspeed.toFixed(2);
		$rootScope.rsattributepointstxt = formatNumbers($rootScope.rsattributepoints,$rootScope.numberNotation);
		$rootScope.rsDPStxt = formatNumbers($rootScope.rsDPS,$rootScope.numberNotation);
		$rootScope.rsAbilityTxt = formatNumbers($rootScope.rsAbility,$rootScope.numberNotation);
    }

    //===========================================================================
    //============================= ADDING STATS  ===============================
    //===========================================================================
    function addStats(stat)
    {

    	if(Decimal($rootScope.rsattributepoints).gte($rootScope.rsStatUpgradeMul))
    	{
	    	if(stat=="power")
	    	{
	    		var price = computePrice($rootScope.rsstatpower);

	    		if(Decimal($rootScope.rsattributepoints).gte(price))
	    		{
		    		$rootScope.rsstatpower = Decimal.add($rootScope.rsstatpower,$rootScope.rsStatUpgradeMul);
		    		$rootScope.rsattributepoints = Decimal.sub($rootScope.rsattributepoints,price);
		    		computeAbility();
		    		onStatUpgradeHover('power');
	    		}
	    	}
	    	else if(stat=="endurance")
	    	{
	    		var price = computePrice($rootScope.rsstatendurance);

	    		if(Decimal($rootScope.rsattributepoints).gte(price))
	    		{
		    		$rootScope.rsstatendurance = Decimal.add($rootScope.rsstatendurance,$rootScope.rsStatUpgradeMul);
		    		$rootScope.rsattributepoints = Decimal.sub($rootScope.rsattributepoints,price);
		    		computeEnduranceStat();
		    		computeAbility();
		    		onStatUpgradeHover('endurance');
		    		
	    		}
	    	}
	    	else if(stat=="resting")
	    	{
	    		var price = computePrice($rootScope.rsstatresting);

	    		if(Decimal($rootScope.rsattributepoints).gte(price))
	    		{
		    		$rootScope.rsstatresting = Decimal.add($rootScope.rsstatresting,$rootScope.rsStatUpgradeMul);
		    		$rootScope.rsattributepoints = Decimal.sub($rootScope.rsattributepoints,price);
		    		computeRestingStat();
		    		computeAbility();
		    		onStatUpgradeHover('resting');
		    		
	    		}
	    	}
	    	else if(stat=="speed")
	    	{
	    		var price = computePrice($rootScope.rsstatspeed);

	    		if(Decimal($rootScope.rsattributepoints).gte(price))
	    		{
		    		$rootScope.rsstatspeed = Decimal.add($rootScope.rsstatspeed,$rootScope.rsStatUpgradeMul);
		    		$rootScope.rsattributepoints = Decimal.sub($rootScope.rsattributepoints,price);

		    		computeSpeedStat();
		    		computeAbility();
		    		onStatUpgradeHover('speed');
		    		
	    		}
	    	}
	    	else if(stat=="dodge")
	    	{
	    		var price = computePrice($rootScope.rsstatdodge);

	    		if(Decimal($rootScope.rsattributepoints).gte(price))
	    		{
		    		$rootScope.rsstatdodge = Decimal.add($rootScope.rsstatdodge,$rootScope.rsStatUpgradeMul);
		    		$rootScope.rsattributepoints = Decimal.sub($rootScope.rsattributepoints,price);
		    		computeDodgeStat();
		    		computeAbility();
		    		onStatUpgradeHover('dodge');
		    		
	    		}
	    	}
	    	else if(stat=="block")
	    	{
	    		var price = computePrice($rootScope.rsstatblock);

	    		if(Decimal($rootScope.rsattributepoints).gte(price))
	    		{
		    		$rootScope.rsstatblock = Decimal.add($rootScope.rsstatblock,$rootScope.rsStatUpgradeMul);
		    		$rootScope.rsattributepoints = Decimal.sub($rootScope.rsattributepoints,price);
		    		computeBlockStat();
		    		computeAbility();
		    		onStatUpgradeHover('block');
		    		
	    		}
	    	}
	    	else if(stat=="form")
	    	{
	    		var price = computePrice($rootScope.rsstatform);

	    		if(Decimal($rootScope.rsattributepoints).gte(price))
	    		{
		    		$rootScope.rsstatform = Decimal.add($rootScope.rsstatform,$rootScope.rsStatUpgradeMul);
		    		$rootScope.rsattributepoints = Decimal.sub($rootScope.rsattributepoints,price);

		    		computeFormStat();
		    		computeAbility();
		    		onStatUpgradeHover('form');
		    		
	    		}
	    	}
	    	else if(stat=="crit chance")
	    	{
	    		var price = computePrice($rootScope.rsstatcritp);

	    		if(Decimal($rootScope.rsattributepoints).gte(price))
	    		{
		    		$rootScope.rsstatcritp = Decimal.add($rootScope.rsstatcritp,$rootScope.rsStatUpgradeMul);
		    		$rootScope.rsattributepoints = Decimal.sub($rootScope.rsattributepoints,price);

		    		computeCritChanceStat();
		    		computeAbility();
		    		onStatUpgradeHover('critp');
		    		
	    		}
	    	}
	    	else if(stat=="crit damage")
	    	{
	    		var price = computePrice($rootScope.rsstatcritdmg);

	    		if(Decimal($rootScope.rsattributepoints).gte(price))
	    		{
		    		$rootScope.rsstatcritdmg = Decimal.add($rootScope.rsstatcritdmg,$rootScope.rsStatUpgradeMul);
		    		$rootScope.rsattributepoints = Decimal.sub($rootScope.rsattributepoints,price);

		    		computeCritDamageStat();
		    		computeAbility();
		    		onStatUpgradeHover('critd');

		    	}
	    	}
    	}
    	computeDamageMul();
	    changeNotation();
    }

    function computeEnduranceStat()
    {
    	$rootScope.rshp = Decimal.mul($rootScope.rsstatendurance,100);
    	$rootScope.rstoughness = Decimal.mul($rootScope.rsstatendurance,10);
    }

    function computeTempEnduranceStat()
    {
    	var temphp = Decimal.mul(Decimal.add($rootScope.rsstatendurance,$rootScope.rsStatUpgradeMul),100);
    	var temptoughness = Decimal.mul(Decimal.add($rootScope.rsstatendurance,$rootScope.rsStatUpgradeMul),10);
    	$rootScope.temphptxt = formatNumbers(temphp,$rootScope.numberNotation);
    	$rootScope.temptoughnesstxt = formatNumbers(temptoughness,$rootScope.numberNotation);
    }

    function computeRestingStat()
    {
    	$rootScope.rshpregen = $rootScope.rsstatresting;
    }

    function computeTempRestingStat()
    {
    	var hpregen = Decimal.add($rootScope.rsstatresting,$rootScope.rsStatUpgradeMul);
    	$rootScope.temphpregentxt = formatNumbers(hpregen,$rootScope.numberNotation);
    }

    function computeSpeedStat()
    {
	    var tempAttackSpeed = Decimal.add(Decimal.pow($rootScope.rsstatspeed,Decimal.div(1,3)),1);
	    tempAttackSpeed = parseFloat(tempAttackSpeed);

	    /*var attackspeedCap = 10 + $rootScope.rsskillAdvanceSpeed;
	    if(Decimal(tempAttackSpeed).gte(attackspeedCap))
	    {
	    	tempAttackSpeed = attackspeedCap;
	    }*/

	    $rootScope.rsattackspeed = tempAttackSpeed;
	    $rootScope.rsattackspeedtxt = $rootScope.rsattackspeed;
	    $rootScope.rsmsspeed = 1000/$rootScope.rsattackspeed;
    }

    function computeTempSpeedStat()
    {
	    var tempAttackSpeed = Decimal.add(Decimal.pow(Decimal.add($rootScope.rsstatspeed,$rootScope.rsStatUpgradeMul),Decimal.div(1,3)),1);
	    tempAttackSpeed = parseFloat(tempAttackSpeed);

	    $rootScope.tempattackspeed = tempAttackSpeed;

	    /*var attackspeedCap = 10 + $rootScope.rsskillAdvanceSpeed;
	    if(Decimal(tempAttackSpeed).gte(attackspeedCap))
	    {
	    	$rootScope.tempattackspeed = attackspeedCap;
	    }*/
    }

    function computeDodgeStat()
    {
    	$rootScope.rsdodge = $rootScope.rsstatdodge;
    }

    function computeTempDodgeStat()
    {
    	var rsdodge = Decimal.add($rootScope.rsstatdodge,$rootScope.rsStatUpgradeMul);
    	$rootScope.tempdodgetxt = formatNumbers(rsdodge,$rootScope.numberNotation);
    }

    function computeBlockStat()
    {
    	$rootScope.rsblock = Decimal.mul($rootScope.rsstatblock,2);
    }

    function computeTempBlockStat()
    {
    	var rsblock = Decimal.mul(Decimal.add($rootScope.rsstatblock,$rootScope.rsStatUpgradeMul),2);
    	$rootScope.tempblocktxt = formatNumbers(rsblock,$rootScope.numberNotation);
    }

    function computeFormStat()
    {
    	$rootScope.rsFormBonus = Decimal.div(Decimal.add(Decimal.pow($rootScope.rsstatform,Decimal.div(1,3)),1),100);
    	$rootScope.rsFormBonusTxt = parseFloat(Decimal.mul($rootScope.rsFormBonus,100));

    	$rootScope.rshitrate = $rootScope.rsstatform;
    	$rootScope.rshitratetxt = formatNumbers($rootScope.rshitrate,$rootScope.numberNotation);

    	var formCap = (99 + $rootScope.rsskillAdvanceForm)/100;
    	if(Decimal($rootScope.rsFormBonus).gte(formCap))
    	{
    		$rootScope.rsFormBonus = formCap;
    		$rootScope.rsFormBonusTxt = parseFloat(Decimal.mul($rootScope.rsFormBonus,100));
    	}
    }

    function computeTempFormStat()
    {
    	var rsFormBonus = Decimal.div(Decimal.add(Decimal.pow(Decimal.add($rootScope.rsstatform,$rootScope.rsStatUpgradeMul),Decimal.div(1,3)),1),100);
    	$rootScope.tempformbonustxt = parseFloat(Decimal.mul(rsFormBonus,100));

    	var rshitrate = Decimal.add($rootScope.rsstatform,$rootScope.rsStatUpgradeMul);
    	$rootScope.temphitratetxt = formatNumbers(rshitrate,$rootScope.numberNotation);

    	var formCap = 99 + $rootScope.rsskillAdvanceForm;
    	if($rootScope.tempformbonustxt>=formCap)
    	{
    		$rootScope.tempformbonustxt = formCap;
    	}
    	
    }

    function computeCritChanceStat()
    {
    	var asdf = Decimal.div(Decimal.add(Decimal.pow($rootScope.rsstatcritp,Decimal.div(1,3)),1),100);
    	asdf = 5+(parseFloat(asdf)-1);
	    $rootScope.rscritchance = asdf;

	    var critPCap = 75 + $rootScope.rsskillAdvanceCrit;
	    if($rootScope.rscritchance>=critPCap)
	    {
	    	$rootScope.rscritchance = critPCap;
	    	$('#critChanceStatUpgrade').addClass('disabled');
	    }
    }

    /// ====================================== kani sunod nya e check pud tanan nimo na buhat so far

    function computeTempCritPStat()
    {
    	var asdf = Decimal.div(Decimal.add(Decimal.pow(Decimal.add($rootScope.rsstatcritp,$rootScope.rsStatUpgradeMul),Decimal.div(1,3)),1),100);
    	asdf = 5+(parseFloat(Decimal.mul(asdf,100))-1);
	    $rootScope.tempcritchance = asdf;

	    var critPCap = 75 + $rootScope.rsskillAdvanceCrit;
	    if($rootScope.tempcritchance>=critPCap)
	    {
	    	$rootScope.tempcritchance = critPCap;
	    }
    }

    function computeCritDamageStat()
    {
    	var tempCritD = Decimal.mul($rootScope.rsstatcritdmg,0.001);
	    $rootScope.rscritdamage = 1.5 + parseFloat(tempCritD);
    }

    function computePrice(x)
	{
		var firstVal = Decimal.add(x,1);
		var lastVal = Decimal.add(x,$rootScope.rsStatUpgradeMul)
		return Decimal.div(Decimal.mul($rootScope.rsStatUpgradeMul,Decimal.add(firstVal,lastVal)),2);
	}


    //===========================================================================
    //========================   CONVERT EXP    =================================
    //===========================================================================

    function convertExp(){
    	$rootScope.buttonLimiter++;
    	if($rootScope.buttonLimiter===1)
    	{
	    	$rootScope.rsattributepoints = Decimal.add($rootScope.rsattributepoints,$rootScope.rsattributepointstogain);
	    	$rootScope.rsattributepointstxt = formatNumbers($rootScope.rsattributepoints,$rootScope.numberNotation);

	    	$rootScope.rscurrentexp = 0;
	    	$rootScope.rscurrentexptxt = 0;
    	}
    	var limiter = function(){
    		$rootScope.buttonLimiter = 0;
    	}
    	$timeout(limiter,2000);
    }

    //===========================================================================
    //==========================   RANK UP    ===================================
    //===========================================================================

    function rankUp(){
    	$rootScope.buttonLimiter++;
    	if($rootScope.buttonLimiter==1)
    	{
    		if($rootScope.canRankUp == 'true')
    		{
		    	$rootScope.rsrank += 1;
		    	$rootScope.rsnextrankup = Decimal.add($rootScope.rsnextrankup,Decimal.mul(Decimal.add($rootScope.rsascensions,1),5));
		    	$rootScope.rsnextrankuptxt = formatNumbers($rootScope.rsnextrankup,$rootScope.numberNotation);
		    	computeDamageMul();

				$rootScope.rsdamage = Decimal.mul(Decimal.mul($rootScope.rsstatpower,1),$rootScope.rstotaldamagemul);
				$rootScope.rsdamagetxt = formatNumbers($rootScope.rsdamage,$rootScope.numberNotation);
			}
		}
		var limiter = function(){
    		$rootScope.buttonLimiter = 0;
    	}
    	$timeout(limiter,2000);
    }

    function ascend(){
    	$rootScope.buttonLimiter++;
    	if($rootScope.buttonLimiter == 1)
    	{
    		if($rootScope.canAscend == 'true')
    		{
		    	$rootScope.rsascensions += 1;
		    	$rootScope.rsascensionstxt = $rootScope.rsascensions;

	    		$rootScope.rsascensionskillpoints = $rootScope.rsascensionskillpoints + 2;
		    	
		    	ascensionReset();
		    	$rootScope.rsnextrankup = Decimal.add($rootScope.rsnextrankup,Decimal.mul(Decimal.add($rootScope.rsascensions,1),5));
		    	$rootScope.rsnextrankuptxt = formatNumbers($rootScope.rsnextrankup,$rootScope.numberNotation);
		    	computeDamageMul();
	    	}
    	}
    	var limiter = function(){
    		$rootScope.buttonLimiter = 0;
    	}
    	$timeout(limiter,2000);
    }

    //===========================================================================
    //================    COMPUTE TOTAL DAMAGE MULTIPLIER     ===================
    //===========================================================================

    function computeDamageMul()
    {
    	//multipliers here

    	//calculate temp min and max damage
    	var dmgDiff = Decimal.sub(Decimal.add(Decimal.mul($rootScope.rsstatpower,100),100),Decimal.add(Decimal.mul($rootScope.rsstatpower,1),1));
    	var tempMinDmg = Decimal.add(Decimal.add($rootScope.rsstatpower,Decimal.mul(dmgDiff,$rootScope.rsFormBonus)),1);
    	var tempMaxDmg = Decimal.add(Decimal.mul($rootScope.rsstatpower,100),100);

		$rootScope.rsdamage[0] = tempMinDmg;
		$rootScope.rsdamage[1] = tempMaxDmg;

		$rootScope.rsdamagetxt[0] = formatNumbers($rootScope.rsdamage[0],$rootScope.numberNotation);
		$rootScope.rsdamagetxt[1] = formatNumbers($rootScope.rsdamage[1],$rootScope.numberNotation);
    }

    function computeTempDamage(p,f,u)
    {
    	var x = Decimal.add(p,u);
    	var dmgDiff = Decimal.sub(Decimal.add(Decimal.mul(x,100),100),Decimal.add(Decimal.mul(x,1),1));
    	var tempMinDmg = Decimal.add(Decimal.add(x,Decimal.mul(dmgDiff,f)),1);
    	var tempMaxDmg = Decimal.add(Decimal.mul(x,100),100);

		$rootScope.tempdamagemintxt = formatNumbers(tempMinDmg,$rootScope.numberNotation);
		$rootScope.tempdamagemaxtxt = formatNumbers(tempMaxDmg,$rootScope.numberNotation);
    }

    function computeAbility()
    {
    	$rootScope.rsAbility = Decimal.add($rootScope.rsAbility,$rootScope.rsStatUpgradeMul);
    	$rootScope.rsAbilityTxt = formatNumbers($rootScope.rsAbility,$rootScope.numberNotation);
    }

    function computeTempAbility()
    {
    	var tempAbility = Decimal.add($rootScope.rsAbility,$rootScope.rsStatUpgradeMul);
    	$rootScope.tempAbilityTxt = formatNumbers(tempAbility,$rootScope.numberNotation);
    }
    //===========================================================================
    //========================    COMPUTE EXP LIMIT     =========================
    //===========================================================================

    function computeExpLimit(){
    	$rootScope.rsexplimit = Decimal.round(Decimal.mul(100,Decimal.pow(1.25,Decimal.sub($rootScope.rslevel,1))));
    }

    function ascensionReset(){
    	$rootScope.rslevel = 1;
		$rootScope.rscurrentexp = 0;
		$rootScope.rsexplimit = 100;
		$rootScope.rsrebirths = 0;
		$rootScope.rsnextrebirth = 35;
		$rootScope.rsnextrankup = 5;


		$rootScope.rsdamage = 10;
		$rootScope.rscritchance = $rootScope.rsSkillCritPoints + 1;
		$rootScope.rscritdamage = 1;
		$rootScope.rsattackspeed = $rootScope.rsSkillSpeedPoints+1;
		$rootScope.rsattributepoints = 0;
		$rootScope.rsmsspeed = 1000;

		//attributes
		$rootScope.rsstatpower = 10;
		$rootScope.rsstatcritp = 0;
		$rootScope.rsstatcritdmg = 0;
		$rootScope.rsstatspeed = 0;
		$rootScope.rsstatmastery = 10;

		//display variables
		$rootScope.rsleveltxt = 1;
		$rootScope.rscurrentexptxt = 0;
		$rootScope.rsexplimittxt = 100;
		$rootScope.rsrebirthstxt = 0;
		$rootScope.rsnextrebirthtxt = 35;

		$rootScope.rsstatpowertxt = 10;
		$rootScope.rsstatcritptxt = 0;
		$rootScope.rsstatcritdmgtxt = 0;
		$rootScope.rsstatspeedtxt = 0;
		$rootScope.rsstatmasterytxt = 10;

		$rootScope.rsdamagetxt = 10;
		$rootScope.rscritchancetxt = $rootScope.rsSkillCritPoints + 1;
		$rootScope.rscritdamagetxt = 1;
		$rootScope.rsattackspeedtxt = $rootScope.rsSkillSpeedPoints+1;
		$rootScope.rsattributepointstxt = 0;

		$rootScope.rsstatpointperlevel = 10;

		$rootScope.rsattackspeedPierce = 1;

		$rootScope.rsrank = 0;


    }

    //===========================================================================
    //=========================    SAVING PROGRESS     ==========================
    //===========================================================================

    function save(){
    	getServerTime();	
    	
    			$rootScope.date = $filter('date')(new Date(), 'medium');
		    	var s;
		    	s = {
		    		level: $rootScope.rslevel,
		    		totallevels: $rootScope.rstotallevels,
		    		currentexp: $rootScope.rscurrentexp,
		    		explimit: $rootScope.rsexplimit,
		    		rebirths: $rootScope.rsrebirths,
		    		totalrebirths: $rootScope.rstotalrebirths,
		    		rank: $rootScope.rsrank,
		    		ascension: $rootScope.rsascensions,
		    		nextrebirth: $rootScope.rsnextrebirth,
		    		nextrank: $rootScope.rsnextrankup,
		    		critchance: $rootScope.rscritchance,
		    		critdamage: $rootScope.rscritdamage,
		    		attackspeed: $rootScope.rsattackspeed,
		    		attackpierce: $rootScope.rsattackspeedPierce,
		    		attributepoints: $rootScope.rsattributepoints,
		    		msspeed: $rootScope.rsmsspeed,
		    		statpower: $rootScope.rsstatpower,
		    		statcritp: $rootScope.rsstatcritp,
		    		statcritdmg: $rootScope.rsstatcritdmg,
		    		statspeed: $rootScope.rsstatspeed,
		    		statmastery: $rootScope.rsstatmastery,
		    		statpointperlevel: $rootScope.rsstatpointperlevel,
		    		numberNotation: $rootScope.numberNotation,
		    		unixTime: $rootScope.unixTime,
		    		lastSaved: $rootScope.date,
		    		rankUnlocked: $rootScope.rankUpUnlocked,
		    		ascensionUnlocked: $rootScope.ascensionUnlocked,
		    		saveFilesCounter: $rootScope.saveFilesCounter,
		    		disanim: $rootScope.disableanimation,
		    		disfloatn: $rootScope.disablefloatingnumbers,
		    		skillpoints: $rootScope.rsascensionskillpoints,
		    		resetpoints: $rootScope.rsascensionresetpoints,
		    		skillDamagePoints: $rootScope.rsSkillDamagePoints,
		    		skillSpeedPoints: $rootScope.rsSkillSpeedPoints,
		    		skillAPPoints: $rootScope.rsSkillAPPoints,
		    		skillCritPoints: $rootScope.rsSkillCritPoints,
		    		skillTimedAutoRebirth: $rootScope.rsSkillTimedAutoRebirthPoints,
		    		skillAutoRebirthTime: $rootScope.rsSkillAutoRebirthTime,
		    		skillChancedAutoRebirth: $rootScope.rsSkillChancedAutoRebirthPoints,
		    		skillAutoRebirthChance: $rootScope.rsSkillAutoRebirthChance,
		    		skillBerserkPoints: $rootScope.rsSkillBerserkPoints,
		    		skillOverheatPoints: $rootScope.rsSkillOverheatPoints,
		    		skillLevelBreakerPoints: $rootScope.rsSkillLevelBreakerPoints,
		    		skillLuckyStrikePoints: $rootScope.rsSkillLuckyStrikePoints
		    	}
		    	
		    	var o = JSON.stringify(s);
		    	var p = $rootScope.rtxt($window.btoa(o));
		    	$rootScope.playerSaveData = p;
		     	localStorage.setItem("endlesstraining",p);
		     	console.log("Game Saved!");// - " +s.lastSaved + " -- " +s.unixTime);
		     	var kongStatsLevels = Decimal($rootScope.rstotallevels).gte(2147483647) ? 2147483647 : parseInt($rootScope.rstotallevels);
		     	var kongStatsRebirths = Decimal($rootScope.rstotalrebirths).gte(2147483647) ? 2147483647 : parseInt($rootScope.rstotalrebirths);
		     	var kongStatsAscensions = $rootScope.rsascensions >= 2147483647 ? 2147483647 : $rootScope.rsascensions;

		     	$window.kongregate.stats.submit("totalLevels",kongStatsLevels);
		     	$window.kongregate.stats.submit("totalRebirths",kongStatsRebirths);
		     	$window.kongregate.stats.submit("totalAscensions",kongStatsAscensions);
    }

    function loadImportSave(){
    	if($rootScope.playerSaveData!="")
    	{
	    	var l = $rootScope.playerSaveData;
	    	l = $rootScope.drtxt(l);
	    	var g = $window.atob(l);
	    	var h = JSON.parse(g);
	    	loadValues(h);
    	}
    }

    function loadLocalStorage(){
    	var l = localStorage.getItem("endlesstraining");
    	var txt1 = "";
		for(x=0;x<l.length;x+=2)
		{
			txt1 = txt1+l[x];
		}
		l = txt1;
    	var g = $window.atob(l);
    	var h = JSON.parse(g);
    	loadValues(h);
    	//
    }

    function loadValues(h)
    {
	   	getServerTime();

   		$rootScope.rslevel = Decimal(h.level);
		$rootScope.rstotallevels = Decimal(h.totallevels);
		$rootScope.rscurrentexp = Decimal(h.currentexp);
		$rootScope.rsexplimit = Decimal(h.explimit);
		$rootScope.rsrebirths = Decimal(h.rebirths);
		$rootScope.rstotalrebirths = Decimal(h.totalrebirths);
		$rootScope.rsrank = parseInt(h.rank);
		$rootScope.rsascensions = parseInt(h.ascension);
		$rootScope.rsnextrebirth = Decimal(h.nextrebirth);
		$rootScope.rsnextrankup = Decimal(h.nextrank);

		//$rootScope.rsdamage = Decimal(h.damage);
		$rootScope.rscritchance = parseInt(h.critchance);
		$rootScope.rscritdamage = Decimal(h.critdamage);
		$rootScope.rsattackspeed = parseInt(h.attackspeed);
		$rootScope.rsattackspeedPierce = h.attackpierce;
		$rootScope.rsattributepoints = Decimal(h.attributepoints);
		$rootScope.rsmsspeed = parseInt(h.msspeed);

		//attributes
		$rootScope.rsstatpower = Decimal(h.statpower);
		$rootScope.rsstatcritp = Decimal(h.statcritp);
		$rootScope.rsstatcritdmg = Decimal(h.statcritdmg);
		$rootScope.rsstatspeed = Decimal(h.statspeed);
		$rootScope.rsstatmastery = Decimal(h.statmastery);

		$rootScope.rsstatpointperlevel = Decimal(h.statpointperlevel);
			
		$rootScope.rankUpUnlocked = parseInt(h.rankUnlocked);
		$rootScope.ascensionUnlocked = parseInt(h.ascensionUnlocked);
		$rootScope.numberNotation = h.numberNotation;

		$rootScope.rsleveltxt = formatNumbers(Decimal(h.level),$rootScope.numberNotation);
		$rootScope.rstotallevelstxt = formatNumbers(Decimal(h.totallevels),$rootScope.numberNotation);
		$rootScope.rscurrentexptxt = formatNumbers(Decimal(h.currentexp),$rootScope.numberNotation);
		$rootScope.rsexplimittxt = formatNumbers(Decimal(h.explimit),$rootScope.numberNotation);
		$rootScope.rsrebirthstxt = formatNumbers(Decimal(h.rebirths),$rootScope.numberNotation);
		$rootScope.rstotalrebirthstxt = formatNumbers(Decimal(h.totalrebirths),$rootScope.numberNotation);
		$rootScope.rsascensionstxt = parseInt(h.ascension);
		$rootScope.rsnextrebirthtxt = formatNumbers(Decimal(h.nextrebirth),$rootScope.numberNotation);
		//$rootScope.rsnextrankuptxt = h.nextrank;

		$rootScope.rscritchancetxt = formatNumbers(h.critchance,$rootScope.numberNotation);
		$rootScope.rscritdamagetxt = formatNumbers(Decimal(h.critdamage),$rootScope.numberNotation);
		$rootScope.rsattackspeedtxt = $rootScope.rsattackspeed.toFixed(2);
		$rootScope.rsattributepointstxt = formatNumbers(Decimal(h.attributepoints),$rootScope.numberNotation);

		//attributes
		$rootScope.rsstatpowertxt = formatNumbers(Decimal(h.statpower),$rootScope.numberNotation);
		$rootScope.rsstatcritptxt = formatNumbers(Decimal(h.statcritp),$rootScope.numberNotation);
		$rootScope.rsstatcritdmgtxt = formatNumbers(Decimal(h.statcritdmg),$rootScope.numberNotation);
		$rootScope.rsstatspeedtxt = formatNumbers(Decimal(h.statspeed),$rootScope.numberNotation);
		$rootScope.rsstatmasterytxt = formatNumbers(Decimal(h.statmastery),$rootScope.numberNotation);
		$rootScope.lastUnixTime = parseInt(h.unixTime);
		$rootScope.date = h.lastSaved;
		$rootScope.lastLevel = h.level;

		$rootScope.offlineTime = $rootScope.unixTime - $rootScope.lastUnixTime;

		$rootScope.disablefloatingnumbers = h.disfloatn;
		$rootScope.disableanimation = h.disanim;

		$rootScope.rsascensionskillpoints = parseInt(h.skillpoints);

		$rootScope.rsascensionresetpoints = parseInt(h.resetpoints);

		$rootScope.rsSkillDamagePoints = parseInt(h.skillDamagePoints);

		$rootScope.rsSkillSpeedPoints = parseInt(h.skillSpeedPoints);

		$rootScope.rsSkillAPPoints = parseInt(h.skillAPPoints);

		$rootScope.rsSkillCritPoints = parseInt(h.skillCritPoints);

		$rootScope.rsSkillTimedAutoRebirthPoints = parseInt(h.skillTimedAutoRebirth);
		$rootScope.rsSkillAutoRebirthTime = parseInt(h.skillAutoRebirthTime);
		$rootScope.rsSkillChancedAutoRebirthPoints = parseInt(h.skillChancedAutoRebirth);
		$rootScope.rsSkillAutoRebirthChance = parseInt(h.skillAutoRebirthChance);

		$rootScope.rsSkillBerserkPoints = parseInt(h.skillBerserkPoints);
		$rootScope.rsSkillOverheatPoints = parseInt(h.skillOverheatPoints);
		$rootScope.rsSkillLevelBreakerPoints = parseInt(h.skillLevelBreakerPoints);
		$rootScope.rsSkillLuckyStrikePoints = parseInt(h.skillLuckyStrikePoints);
			

			// ============== FIXING THE RANK UP BUGG CAN BE REMOVED LATER
			if($rootScope.rsnextrankup === undefined || isNaN($rootScope.rsnextrankup) || $rootScope.rsnextrankup===null)
			{
				$rootScope.rsnextrankup = 5;
				for(xy = $rootScope.rsrank; xy > 0; xy--)
    			{
    				$rootScope.rsnextrankup = Decimal.add($rootScope.rsnextrankup,Decimal.mul(Decimal.add($rootScope.rsascensions,1),5));
    			}

    			//console.log('Success');
    		}

    		if($rootScope.rscurrentexp===undefined || $rootScope.rscurrentexp===null || isNaN($rootScope.rscurrentexp))
    		{
    			$rootScope.rscurrentexp = 0;
    		}

    		if($rootScope.rsattackspeedPierce === undefined || isNaN($rootScope.rsattackspeedPierce) || $rootScope.rsattackspeedPierce===null)
    		{
    			$rootScope.rsattackspeedPierce = 1;	
    			var p = Decimal.add($rootScope.rsattackspeedPierce,1);
				var po = Decimal.pow(Decimal.pow(Decimal.pow(p,p),p),p);
				while(Decimal($rootScope.rsstatspeed).gte(po))
				{
					$rootScope.rsattackspeedPierce += 1;
					p = Decimal.add($rootScope.rsattackspeedPierce,1);
					po = Decimal.pow(Decimal.pow(Decimal.pow(p,p),p),p);
				}
    		}


    		// =========================================================================
    		$rootScope.rsnextrankuptxt = formatNumbers($rootScope.rsnextrankup,$rootScope.numberNotation);
			
			addStats(0,'crit chance');
			addStats(0,'speed');
			computeDamageMul();

			$rootScope.offlineTime = $rootScope.offlineTime > 14400 ? 14400 : $rootScope.offlineTime;
			var toot = Math.floor($rootScope.offlineTime * $rootScope.rsattackspeed);
			for(x=0;x<=toot;x++)
			{
				$rootScope.computations('offline');
			}
			//console.log($rootScope.rslevel + " -- " +$rootScope.lastLevel);
			var offlineHours = computeOfflineTime($rootScope.offlineTime);
			var x = Decimal.sub($rootScope.rslevel,$rootScope.lastLevel);

			$rootScope.offlineMessage = "You were away for "+ offlineHours + "and have earned "+formatNumbers(x,$rootScope.numberNotation)+" levels.";
			$('#ig').hide();
			$('#om').show();
			$('#gc').hide();
			$('#olcb').show();
			console.log("Game Save Loaded!");
			
			if($rootScope.rsSkillCritPoints>=50)
		    {
				$('#critskillupgrade').hide();
		    }
		    if($rootScope.rsSkillAPPoints>20)
		    {
		    	$('#apskillupgrade').hide();
		    }
		    if($rootScope.rscritchance>=50)
		    {
		    	$('#critchancebuttongroup').hide();	
		    }
		    if($rootScope.rsSkillSpeedPoints>=10)
		    {
		    	$('#speedskillupgrade').hide();
		    }
		    if($rootScope.rsSkillLuckyStrikePoints>0)
		    {
		    	$('#luckystrikeskillupgrade').hide();
		    }
		    
		    
			if($rootScope.rsSkillTimedAutoRebirthPoints>0)
			{
				$rootScope.autoRebirthFunc();
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


			//var kongStatsLevels = Decimal($rootScope.rstotallevels).gte(2147483647) ? 2147483647 : parseInt($rootScope.rstotallevels);
		    //var kongStatsRebirths = Decimal($rootScope.rstotalrebirths).gte(2147483647) ? 2147483647 : parseInt($rootScope.rstotalrebirths);
		    //var kongStatsAscensions = $rootScope.rsascensions >= 2147483647 ? 2147483647 : $rootScope.rsascensions;

		    //$window.kongregate.stats.submit("totalLevels",kongStatsLevels);
		    //$window.kongregate.stats.submit("totalRebirths",kongStatsRebirths);
		    //$window.kongregate.stats.submit("totalAscensions",kongStatsAscensions);
    }

    function playfabLogIn(){
    	/*var x = {};
        x.TitleId = $rootScope.pfid;
        x.CustomId = $rootScope.pfcid;
        x.CreateAccount = false;
    	PlayFabClientSDK.LoginWithCustomID(x, (response, error) => {
            if(error)
            {
            	console.log(error.status + " -- " +error.errorMessage);
            } 
            else
            {
                var result = response.data;
                $rootScope.loginSuccess = true;
                //console.log("login success");
            }
            });*/

    }

    function computeOfflineTime(xUnix){
	    	var hours = Math.floor(xUnix/3600);
	    	var tempMin = xUnix % 3600;
	    	var min = Math.floor(tempMin/60);
	    	var sec = tempMin % 60;
	    	var time = "";
	    	if(hours == 0 && min == 0 && sec > 0)
	    	{
	    		time = sec +" second/s ";
	    	}
	    	else if (hours == 0 && sec == 0 && min > 0)
	    	{
	    		time = min + " minute/s ";
	    	}
	    	else if(min == 0 && sec == 0 && hours > 0)
	    	{
	    		time = hours + " hour/s ";
	    	}
	    	else if(hours > 0 && min == 0 && sec > 0)
	    	{
	    		time = hours + " hour/s and " +sec + " second/s ";
	    	}
	    	else if(hours > 0 && min > 0 && sec == 0)
	    	{
	    		time = hours + " hour/s and " +min+" minute/s ";
	    	}
	    	else if(hours == 0 && min > 0 && sec > 0)
	    	{
	    		time = min + " minute/s and " +sec + " second/s ";
	    	}
	    	else
	    	{
	    		time = hours + " hour/s, "+min+" minute/s and "+sec+" second/s "
	    	}
	    	return time;
    	}

    function getServerTime(){
    	$rootScope.unixTime = Date.now();
    	//console.log(Playfab.settings.sessionTicket);
    	/*var a = 0;
    	var x = {};
            x.FunctionName = 'helloWorld';
            PlayFabClientSDK.ExecuteCloudScript(x, (response,error) => {
                if(error)
                {
                  console.log(error.status + " -- "+error.errorMessage);
                } 
                else
                {
                  $rootScope.unixTime = response.data.FunctionResult;
                  //console.log("getservertime success"+$rootScope.unixTime);
                  //console.log($rootScope.unixTime);
                }
            });*/
    }

    function onStatUpgradeHover(x)
    {
    	switch(x) {
		    case 'power':
		        $rootScope.suttStat = 'Power';
		        $rootScope.suttAttributePoints = formatNumbers(computePrice($rootScope.rsstatpower),$rootScope.numberNotation);
		        computeTempDamage($rootScope.rsstatpower,$rootScope.rsFormBonus,$rootScope.rsStatUpgradeMul);
		        computeTempAbility();
		        $('[id=puChange]').show();
		        $('#abChange').show();
		        break;
		    case 'endurance':
		        $rootScope.suttStat = 'Endurance';
		        $rootScope.suttAttributePoints = formatNumbers(computePrice($rootScope.rsstatendurance),$rootScope.numberNotation);
		        computeTempEnduranceStat();
		        computeTempAbility();
		        $('[id=hpChange]').show();
		        $('#abChange').show();
		        break;
		    case 'resting':
		        $rootScope.suttStat = 'Resting';
		        $rootScope.suttAttributePoints = formatNumbers(computePrice($rootScope.rsstatresting),$rootScope.numberNotation);
		        computeTempRestingStat();
		        computeTempAbility();
		        $('[id=hpregenChange]').show();
		        $('#abChange').show();
		        break;
		    case 'speed':
		        $rootScope.suttStat = 'Speed';
		        $rootScope.suttAttributePoints = formatNumbers(computePrice($rootScope.rsstatspeed),$rootScope.numberNotation);
		        computeTempSpeedStat();
		        computeTempAbility();
		        $('[id=speedChange]').show();
		        $('#abChange').show();
		        break;
		    case 'dodge':
		        $rootScope.suttStat = 'Dodge';
		        $rootScope.suttAttributePoints = formatNumbers(computePrice($rootScope.rsstatdodge),$rootScope.numberNotation);
		        computeTempDodgeStat();
		        computeTempAbility();
		        $('[id=dodgeChange]').show();
		        $('#abChange').show();
		        break;
		    case 'block':
		        $rootScope.suttStat = 'Block';
		        $rootScope.suttAttributePoints = formatNumbers(computePrice($rootScope.rsstatblock),$rootScope.numberNotation);
		        computeTempBlockStat();
		        computeTempAbility();
		        $('[id=blockChange]').show();
		        $('#abChange').show();
		        break;
		    case 'form':
		        $rootScope.suttStat = 'Form';
		        $rootScope.suttAttributePoints = formatNumbers(computePrice($rootScope.rsstatform),$rootScope.numberNotation);
		        computeTempFormStat();
		        computeTempAbility();
		        $('[id=formChange]').show();
		        $('#abChange').show();
		        break;
		    case 'critp':
		        $rootScope.suttStat = 'Crit Chance';
		        $rootScope.suttAttributePoints = formatNumbers(computePrice($rootScope.rsstatcritp),$rootScope.numberNotation);
		        computeTempCritPStat();
		        computeTempAbility();
		        $('[id=critpChange]').show();
		        $('#abChange').show();
		        break;
		    case 'critd':
		        $rootScope.suttStat = 'Crit Damage';
		        $rootScope.suttAttributePoints = formatNumbers(computePrice($rootScope.rsstatcritdmg),$rootScope.numberNotation);
		        computeTempCritDStat();
		        computeTempAbility();
		        $('[id=critdChange]').show();
		        $('#abChange').show();
		        break;
		    default:
		        $rootScope.suttStat = '';
		        $rootScope.suttAttributePoints = 0;
		}
		$rootScope.suttMul = formatNumbers($rootScope.rsStatUpgradeMul,$rootScope.numberNotation);
    }

    function formatNumbers(a,xtype)
	{
		if(xtype == "Standard")
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
		else if(xtype == "Scientific")
		{
			if(Decimal(a).gte(100000))
			{
				return numberformat.format(a, {backend: 'decimal.js', format: 'scientific', sigfigs: 3});
			}
			else
			{
				return numberformat.format(a);
			}
		}
		else if(xtype == "Engineering")
		{
			if(Decimal(a).gte(100000))
			{
				return numberformat.format(a, {backend: 'decimal.js', format: 'engineering', sigfigs: 3});
			}
			else
			{
				return numberformat.format(a);
			}
		}
	}

	function rng(min, max) 
	{
		return Decimal.add(Decimal.floor(Decimal.mul(Decimal.random(),(Decimal.sub(max,min)))),min);
    	//return Math.floor(Math.random() * (max - min) ) + min;
	}
}]);