const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
	name: "war",
	version: "1.0.0",
	role: 2,
	credits: "cliff",
	description: "War nát cái boxchat",
	hasPrefix: false,
	usages: "war đấm chất",
	cooldown: 10,
};

module.exports.run = async function({ api, args, event, admin }) {
	var mention = Object.keys(event.mentions)[0];
	let name = event.mentions[mention];
	var arraytag = [];
	arraytag.push({ id: mention });
	var a = function(a) {
		api.sendMessage(a, event.threadID);
	};
	a("ginalit mo si churchill putanginamo ka walang iyakan ah bwakananginaka eh");
	setTimeout(() => {
		a({
			body:
				"gumagamit ka nalang bot ingay mo pa tanginaka ket nga siguro reboot ng cp mo di mo alam dami mong satsat ampota"
		});
	}, 3000);
	setTimeout(() => {
		a({ body: "paduduguin ko ulo mo ewan kona lang kung dika mag panic" });
	}, 5000);
	setTimeout(() => {
		a({ body: "gago ampota palamunin" });
	}, 7000);
	setTimeout(() => {
		a({
			body:
				"pabigat sa pamilya tanginaka lagay mo na cp mo paluin ka mamaya di kapa nag hugas plato HAHAHAHA tanga ampota"
		});
	}, 9000);
	setTimeout(() => {
		a({ body: "asa sa magulang feeling coolkid ang cool mo naman tanginamo pwede kana mamatay" });
	}, 12000);
	setTimeout(() => {
		a({ body: "syempre mag rereply ka dito tanga ka eh alam mong bot kakausapin mo ulol kanaba?" });
	}, 15000);
	setTimeout(() => {
		a({ body: "jejemon am.puta liit tite" });
	}, 17000);
	setTimeout(() => {
		a({ body: "kaya pa ? baka mapahiya ka sa gc nyo leave kana block mo bot HAHAHAHAHA luha mo boi punasan mo na" });
	}, 20000);
	setTimeout(() => {
		a({ body: "pumapatol sa bot am.puta baka ikaw yung tigang na lalaki na nag papasend ng nudes" });
	}, 23000);
	setTimeout(() => {
		a({ body: "feeling coolkid amputa babatukan lang kita e" });
	}, 25000);
	setTimeout(() => {
		a({ body: "kaya paba? pag naluluha kana stop na ah leave na awa ako sayo eh bata " });
	}, 28500);
	setTimeout(() => {
		a({ body: "baka ikaw yung 16 years old na nag cocomment sabi ng minor ah ulol HAHAHAHAHA" });
	}, 31000);
	setTimeout(() => {
		a({ body: "Walis kana ng bahay nyo tamo lilipad tsinelas sa mukha mo mamaya" });
	}, 36000);
	setTimeout(() => {
		a({ body: "tanginaka ginigigil mo bot ko sarap mong i sidekick with recall putanginaka" });
	}, 39000);
	setTimeout(() => {
		a({ body: "gulat ka no ? HAHAHAHA tanga ka kase d moto alam " });
	}, 40000);
	setTimeout(() => {
		a({ body: "nagrereply ka palang minumura na kita tanginamo" });
	}, 65000);
	setTimeout(() => {
		a({ body: "shempre rereply ka ule dito yakk ilalabas mo pagiging coolkid mo frfr istg" });
	}, 70000);
	setTimeout(() => {
		a({ body: "baka pag in-english kita pati nanay mo mahimatay" });
	}, 75000);
	setTimeout(() => {
		a({ body: "feeling famous nagmamakaawa i heart profile agoiiii HAHAHAHAHAA LT si tanga" });
	}, 80000);
	setTimeout(() => {
		a({ body: "lakas maka myday pangit naman tuwang tuwa pa pag may nag heart napindot lng naman yak" });
	}, 85000);
	setTimeout(() => {
		a("face reveal nga baka puro sipon at luha kna ah HAAHHAHAHA iyakin ka eh");
	}, 90000);
	setTimeout(() => {
		a({ body: "stop naba ako ? baka hiyang hiya kana sa sarili mo leave kana wala kang ambag sa gc nato" });
	}, 95000);
	setTimeout(() => {
		a({ body: "wala kang masabi? malamang tanga ka gago ka putangina kang nigga ka HAHAHAHAHA " });
	}, 100000);
	setTimeout(() => {
		a({ body: "feeling gwapo/maganda pag hinubad facemask mukhang tilapiang nakawala sa tubig ampota" });
	}, 105000);
	setTimeout(() => {
		a({ body: "till next time gago bye na pasok kana sa aquarium mo bawal ka sa lupa mukha kang wtf" });
	}, 115000);
	setTimeout(() => {
		a({ body: "tangina mo mamatay kana pabigat ka lang sa pamilya mo e" });
	}, 125000);
	setTimeout(() => {
		a({ body: "di kapa minumura umiiyak kana" });
	}, 135000);
	setTimeout(() => {
		a({ body: "inutusan ako na dapat nakakadepressed at nakakatraumatize daw" });
	}, 145000);
	setTimeout(() => {
		a({ body: "kokotong kotongan lang kita rito e" });
	}, 155000);
	setTimeout(() => {
		a({ body: "bye kinginamo pangit" });
	}, 165000);
};
