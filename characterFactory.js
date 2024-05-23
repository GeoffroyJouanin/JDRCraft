"use strict"

const SaveCurveType = {
    WEAK: Symbol("weak"),
    STRONG: Symbol("strong"),
};

const BBACurveType = {
    WEAK: Symbol("weak"),
    MEDIUM: Symbol("medium"),
    STRONG: Symbol("strong"),
};

const primaryStatEnum = {
    STRENGTH: "Strength",
    DEXTERITY: "Dexterity",
    CONSTITUTION: "Constitution",
    INTELLIGENCE: "Intelligence",
    WISDOM: "Wisdom",
    CHARISMA: "Charisma",
};

const classEnum = {
    BARBARE: Symbol("Barbare"),
    BARDE: Symbol("Barde"),
    DRUIDE: Symbol("Druide"),
    ENSORCELEUR: Symbol("Ensorceleur"),
    GUERRIER: Symbol("Guerrier"),
    MAGICIEN: Symbol("Magicien"),
    MOINE: Symbol("Moine"),
    PALADIN: Symbol("Paladin"),
    PRETRE: Symbol("Prêtre"),
    RODEUR: Symbol("Rôdeur"),
    ROUBLARD: Symbol("Roublard"),
};

const classTypeMap = {
    "Barbare": classEnum.BARBARE,
    "Barde": classEnum.BARDE,
    "Druide": classEnum.DRUIDE,
    "Ensorceleur": classEnum.ENSORCELEUR,
    "Guerrier": classEnum.GUERRIER,
    "Magicien": classEnum.MAGICIEN,
    "Moine": classEnum.MOINE,
    "Paladin": classEnum.PALADIN,
    "Pretre": classEnum.PRETRE,
    "Rodeur": classEnum.RODEUR,
    "Roublard": classEnum.ROUBLARD,
};

function stringToClassType(classString) {
    if (classString === "Rôdeur") {
        classString = "Rodeur";
    } else if (classString === "Prêtre") {
        classString = "Pretre";
    }
    const classType = classTypeMap[classString];
    if (!classType) {
        throw new Error(`Cannot convert ${classString} into classTypeEnum`);
    }
    return classType;
}

const raceEnum = {
    DEMI_ELF: "Demi-elf",
    DEMI_ORC: "Demi-orc",
    ELF: "Elf",
    GNOME: "Gnome",
    HALFELIN: "Halfelin",
    HUMAIN: "Humain",
    NAIN: "Nain",
}

const raceTypeMap = {
    "Demi-elf": raceEnum.DEMI_ELF,
    "Demi-orc": raceEnum.DEMI_ORC,
    "Elf": raceEnum.ELF,
    "Gnome": raceEnum.GNOME,
    "Halfelin": raceEnum.HALFELIN,
    "Humain": raceEnum.HUMAIN,
    "Nain": raceEnum.NAIN,
}

function stringToRaceType(raceString) {
    const raceType = raceTypeMap[raceString];
    if (!raceType) {
        throw new Error(`Cannot convert ${raceString} into classTypeEnum`);
    }
    return raceType;
}

const skillEnum = {
    ACROBATIES: "Acrobaties",
    ART_DE_LA_MAGIE: "Art de la magie",
    ARTISANAT: "Artisanat",
    BLUFF: "Bluff",
    CONNAISSANCES_HISTOIRE: "Connaissances Histoire",
    CONNAISSANCES_GEOGRAPHIE: "Connaissances Geographie",
    CONNAISSANCES_RELIGION: "Connaissances Religion",
    CONNAISSANCES_NOBLESSE: "Connaissances Noblesse",
    CONNAISSANCES_NATURE: "Connaissances Nature",
    CONNAISSANCES_INGENIEURIE: "Connaissances Ingenieurie",
    CONNAISSANCES_MYSTERE: "Connaissances Mystere",
    CONNAISSANCES_FOLKLORE_LOCAL: "Connaissances Folklore local",
    CONNAISSANCES_EXPLORATION: "Connaissances Exploration",
    CONNAISSANCES_PLANS: "Connaissances Plans",
    DEGUISEMENT: "Deguisement",
    DIPLOMATIE: "Diplomatie",
    DISCRETION: "Discretion",
    DRESSAGE: "Dressage",
    ESCALADE: "Escalade",
    EQUITATION: "Equitation",
    EVASION: "Evasion",
    ESTIMATION: "Estimation",
    ESCAMOTAGE: "Escamotage",
    INTIMIDATION: "Intimidation",
    LINGUISTIQUE: "Linguistique",
    NATATION: "Natation",
    PERCEPTION: "Perception",
    PSYCHOLOGIE: "Psychologie",
    PROFESSION: "Profession",
    PREMIER_SECOURS: "Premiers secours",
    REPRESENTATION: "Representation",
    SURVIE: "Survie",
    SABOTAGE: "Sabotage",
    UTILISATION_D_OBJETS_MAGIQUES: "Utilisation d'objets magiques",
    VOL: "Vol",
};

const diceEnum = {
    d4: 4,
    d6: 6,
    d8: 8,
    d10: 10,
    d12: 12,
    d20: 20,
    d100: 100,
};

class classInfo {
    BBACurve;
    ReflexCurve;
    FortitudeCurve;
    WillCurve;
    RichnessDiceNumber;
    LifeDice;
    SkillPoints;
    ClassSkillsSet;

    constructor(BBACurve, ReflexCurve, FortitudeCurve, WillCurve, RichnessDiceNumber, LifeDice, SkillPoints, ClassSkillsSet) {
        this.BBACurve = BBACurve;
        this.ReflexCurve = ReflexCurve;
        this.FortitudeCurve = FortitudeCurve;
        this.WillCurve = WillCurve;
        this.RichnessDiceNumber = RichnessDiceNumber;
        this.LifeDice = LifeDice;
        this.SkillPoints = SkillPoints;
        this.ClassSkillsSet = ClassSkillsSet;
    }
}

let classInfosMap = new Map();
classInfosMap.set(classEnum.BARBARE, new classInfo(BBACurveType.STRONG, SaveCurveType.WEAK, SaveCurveType.STRONG, SaveCurveType.WEAK, 3, diceEnum.d12, 4, []));
classInfosMap.set(classEnum.BARDE, new classInfo(BBACurveType.MEDIUM, SaveCurveType.STRONG, SaveCurveType.WEAK, SaveCurveType.STRONG, 3, diceEnum.d8, 6, []));
classInfosMap.set(classEnum.DRUIDE, new classInfo(BBACurveType.MEDIUM, SaveCurveType.WEAK, SaveCurveType.STRONG, SaveCurveType.STRONG, 2, diceEnum.d8, 4, []));
classInfosMap.set(classEnum.ENSORCELEUR, new classInfo(BBACurveType.WEAK, SaveCurveType.WEAK, SaveCurveType.WEAK, SaveCurveType.STRONG, 2, diceEnum.d6, 2, []));
classInfosMap.set(classEnum.GUERRIER, new classInfo(BBACurveType.STRONG, SaveCurveType.WEAK, SaveCurveType.STRONG, SaveCurveType.WEAK, 5, diceEnum.d10, 2, []));
classInfosMap.set(classEnum.MAGICIEN, new classInfo(BBACurveType.WEAK, SaveCurveType.WEAK, SaveCurveType.WEAK, SaveCurveType.STRONG, 2, diceEnum.d6, 2, []));
classInfosMap.set(classEnum.MOINE, new classInfo(BBACurveType.MEDIUM, SaveCurveType.STRONG, SaveCurveType.STRONG, SaveCurveType.STRONG, 1, diceEnum.d8, 4, []));
classInfosMap.set(classEnum.PALADIN, new classInfo(BBACurveType.STRONG, SaveCurveType.WEAK, SaveCurveType.STRONG, SaveCurveType.STRONG, 5, diceEnum.d10, 2, []));
classInfosMap.set(classEnum.PRETRE, new classInfo(BBACurveType.MEDIUM, SaveCurveType.WEAK, SaveCurveType.STRONG, SaveCurveType.STRONG, 4, diceEnum.d8, 2, []));
classInfosMap.set(classEnum.RODEUR, new classInfo(BBACurveType.STRONG, SaveCurveType.STRONG, SaveCurveType.STRONG, SaveCurveType.WEAK, 5, diceEnum.d10, 6, []));
classInfosMap.set(classEnum.ROUBLARD, new classInfo(BBACurveType.MEDIUM, SaveCurveType.STRONG, SaveCurveType.WEAK, SaveCurveType.WEAK, 4, diceEnum.d8, 8, []));

const sizeEnum = {
    INFIME: "Infime",
    MIN: "Minuscule",
    TP: "Très petit",
    P: "Petit",
    M: "Moyenne",
    G: "Grand",
    TG: "Très grand",
    Gig: "Gigantesque",
    C: "Colossal",
}

const speedEnum = {
    VERY_SLOW: "4,5m",
    SLOW: "6m",
    NORMAL: "9m",
    FAST: "12",
}

class primaryStatsPattern {
    str
    dex
    con
    int
    wis
    cha
    any
    constructor(str, dex, con, int, wis, cha, any) {
        this.str = str;
        this.dex = dex;
        this.con = con;
        this.int = int;
        this.wis = wis;
        this.cha = cha;
        this.any = any;
    }
}

class raceInfo {
    stats
    size
    speed
    languages
    constructor(stats, size, speed, languages) {
        this.stats = stats;
        this.size = size;
        this.speed = speed;
        this.languages = languages;
    }
}

let raceInfosMap = new Map();
raceInfosMap.set(raceEnum.DEMI_ELF, new raceInfo(new primaryStatsPattern(0, 0, 0, 0, 0, 0, 2), sizeEnum.M, speedEnum.NORMAL, []));
raceInfosMap.set(raceEnum.DEMI_ORC, new raceInfo(new primaryStatsPattern(0, 0, 0, 0, 0, 0, 2), sizeEnum.M, speedEnum.NORMAL, []));
raceInfosMap.set(raceEnum.ELF, new raceInfo(new primaryStatsPattern(0, 2, -2, 2, 0, 0, 0), sizeEnum.M, speedEnum.NORMAL, []));
raceInfosMap.set(raceEnum.GNOME, new raceInfo(new primaryStatsPattern(-2, 0, 2, 0, 0, 2,0), sizeEnum.P, speedEnum.SLOW, []));
raceInfosMap.set(raceEnum.HALFELIN, new raceInfo(new primaryStatsPattern(-2, 2, 0, 0, 0, 2, 0), sizeEnum.P, speedEnum.SLOW, []));
raceInfosMap.set(raceEnum.HUMAIN, new raceInfo(new primaryStatsPattern(0, 0, 0, 0, 0, 0, 2), sizeEnum.M, speedEnum.NORMAL, []));
raceInfosMap.set(raceEnum.NAIN, new raceInfo(new primaryStatsPattern(0, 0, 2, 0, 2, -2, 0), sizeEnum.M, speedEnum.SLOW, []));

/*
class Character {
    name = "";
    level = 1;
    className = undefined;
    raceName = undefined;
     classType = undefined;
     raceType = undefined;

     speed = undefined;
     size = undefined;
     languagesAvailable = [];

     totalPV = 1;
     actualPV = 1;
     lifeDiceType = 6;
     lifeDices = [];
     richnessDicesNumber = 0;
     TotalRichness = 0;
     coins = {
        bronze: 0,
        silver: 0,
        gold: 0,
        platinum: 0,
    }
     skillsPoints = 0;
     skillsClassPoints = 0;
     skillsClassSet = [];

     CA = 10;
     CAContact = 10;
     CAPaD = 10;

     initiative = 0;

     BBAClass = 0;

     BBA = 0;
     BMO = 0;
     DMD = 0;
     attCaC = 0;
     attDist = 0;

     strength = 10;
     dexterity = 10;
     constitution = 10;
     intelligence = 10;
     wisdom = 10;
     charisma = 10;

     strMod = 0;
     dexMod = 0;
     conMod = 0;
     intMod = 0;
     wisMod = 0;
     chaMod = 0;

     reflexSave = 0;
     fortitudeSave = 0;
     willSave = 0;

     reflexSaveClass = 0;
     fortitudeSaveClass = 0;
     willSaveClass = 0;

     armorBonus = 0;
     shieldBonus = 0;
     alignment = undefined;

    constructor(name, level, className, raceName, classType, raceType, speed, size, languagesAvailable, totalPV, actualPV, lifeDiceType, lifeDices, richnessDicesNumber, TotalRichness, coins, skillsPoints, skillsClassPoints, skillsClassSet, CA, CAContact, CAPaD, initiative, BBAClass, BBA, BMO, DMD, attCaC, attDist, strength, dexterity, constitution, intelligence, wisdom, charisma, strMod, dexMod, conMod, intMod, wisMod, chaMod, reflexSave, fortitudeSave, willSave, reflexSaveClass, fortitudeSaveClass, willSaveClass, armorBonus, shieldBonus, alignment) {
        this.name = name;
        this.level = level;
        this.className = className;
        this.raceName = raceName;
        this.classType = classType;
        this.raceType = raceType;
        this.speed = speed;
        this.size = size;
        this.languagesAvailable = languagesAvailable;
        this.totalPV = totalPV;
        this.actualPV = actualPV;
        this.lifeDiceType = lifeDiceType;
        this.lifeDices = lifeDices;
        this.richnessDicesNumber = richnessDicesNumber;
        this.TotalRichness = TotalRichness;
        this.coins = coins;
        this.skillsPoints = skillsPoints;
        this.skillsClassPoints = skillsClassPoints;
        this.skillsClassSet = skillsClassSet;
        this.CA = CA;
        this.CAContact = CAContact;
        this.CAPaD = CAPaD;
        this.initiative = initiative;
        this.BBAClass = BBAClass;
        this.BBA = BBA;
        this.BMO = BMO;
        this.DMD = DMD;
        this.attCaC = attCaC;
        this.attDist = attDist;
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.intelligence = intelligence;
        this.wisdom = wisdom;
        this.charisma = charisma;
        this.strMod = strMod;
        this.dexMod = dexMod;
        this.conMod = conMod;
        this.intMod = intMod;
        this.wisMod = wisMod;
        this.chaMod = chaMod;
        this.reflexSave = reflexSave;
        this.fortitudeSave = fortitudeSave;
        this.willSave = willSave;
        this.reflexSaveClass = reflexSaveClass;
        this.fortitudeSaveClass = fortitudeSaveClass;
        this.willSaveClass = willSaveClass;
        this.armorBonus = armorBonus;
        this.shieldBonus = shieldBonus;
        this.alignment = alignment;
    }
}*/

let name = "";
let level = 1;
let className = undefined;
let raceName = undefined;
let classType = undefined;
let raceType = undefined;

let speed = undefined;
let size = undefined;
let languagesAvailable = [];

let totalPV = 1;
let actualPV = 1;
let lifeDiceType = 6;
let lifeDices = [];
let richnessDicesNumber = 0;
let TotalRichness = 0;
const coins = {
    bronze: 0,
    silver: 0,
    gold: 0,
    platinum: 0,
}
let skillsPoints = 0;
let skillsClassPoints = 0;
let skillsClassSet = [];

let CA = 10;
let CAContact = 10;
let CAPaD = 10;

let initiative = 0;

let BBAClass = 0;

let BBA = 0;
let BMO = 0;
let DMD = 0;
let attCaC = 0;
let attDist = 0;

let strength = 10;
let dexterity = 10;
let constitution = 10;
let intelligence = 10;
let wisdom = 10;
let charisma = 10;

let strengthPure = 10;
let dexterityPure = 10;
let constitutionPure = 10;
let intelligencePure = 10;
let wisdomPure = 10;
let charismaPure = 10;

let strengthRaceModifier = 0;
let dexterityRaceModifier = 0;
let constitutionRaceModifier = 0;
let intelligenceRaceModifier = 0;
let wisdomRaceModifier = 0;
let charismaRaceModifier = 0;

let strMod = 0;
let dexMod = 0;
let conMod = 0;
let intMod = 0;
let wisMod = 0;
let chaMod = 0;

let reflexSave = 0;
let fortitudeSave = 0;
let willSave = 0;

let reflexSaveClass = 0;
let fortitudeSaveClass = 0;
let willSaveClass = 0;

let armorBonus = 0;
let shieldBonus = 0;
let alignment = undefined;

let strengthInput = document.getElementById("strengthInput");
let strengthButton = document.getElementById("strengthButton");
let strengthValue = document.getElementById("strengthValue");

let dexterityInput = document.getElementById("dexterityInput");
let dexterityButton = document.getElementById("dexterityButton");
let dexterityValue = document.getElementById("dexterityValue");

let constitutionInput = document.getElementById("constitutionInput");
let constitutionButton = document.getElementById("constitutionButton");
let constitutionValue = document.getElementById("constitutionValue");

let intelligenceInput = document.getElementById("intelligenceInput");
let intelligenceButton = document.getElementById("intelligenceButton");
let intelligenceValue = document.getElementById("intelligenceValue");

let wisdomInput = document.getElementById("wisdomInput");
let wisdomButton = document.getElementById("wisdomButton");
let wisdomValue = document.getElementById("wisdomValue");

let charismaInput = document.getElementById("charismaInput");
let charismaButton = document.getElementById("charismaButton");
let charismaValue = document.getElementById("charismaValue");

//Level
let levelInput = document.getElementById("levelInput");
let levelButton = document.getElementById("levelButton");
let levelValue = document.getElementById("levelValue");

levelButton.addEventListener("click", (event) => {
    if (levelInput.value === "") {
        return;
    }
    level = changeValue(levelValue, levelInput);
    recalculate();
})
//end of level

//Name
let nameInput = document.getElementById("nameInput");
let nameButton = document.getElementById("nameButton");
let nameValue = document.getElementById("nameValue");

nameButton.addEventListener("click", (event) => {
    if (nameInput.value === "") {
        return;
    }
    name = changeValue(nameValue, nameInput);
    recalculate();
})

//end of Name

function changeValue(value, input) {
    let stat;
    if (input.getAttribute("type") === "number") {
        stat = parseInt(input.value);
    } else {
        stat = input.value;
    }
    value.innerHTML = stat;
    input.value = "";
    return stat;
}

strengthButton.addEventListener("click", (event) => {
    if (strengthInput.value === "") {
        return;
    }
    strengthPure = changeValue(strengthValue, strengthInput);
    let strengthPureDisplay = document.getElementById("strengthPureValue");
    strengthPureDisplay.innerHTML = strengthPure;
    recalculate();
});

dexterityButton.addEventListener("click", (event) => {
    if (dexterityInput.value === "") {
        return;
    }
    dexterityPure = changeValue(dexterityValue, dexterityInput);
    recalculate();
})

constitutionButton.addEventListener("click", (event) => {
    if (constitutionInput.value === "") {
        return;
    }
    constitutionPure = changeValue(constitutionValue, constitutionInput);
    recalculate();
})

intelligenceButton.addEventListener("click", (event) => {
    if (intelligenceInput.value === "") {
        return;
    }
    intelligencePure = changeValue(intelligenceValue, intelligenceInput);
    recalculate();
})

wisdomButton.addEventListener("click", (event) => {
    if (wisdomInput.value === "") {
        return;
    }
    wisdomPure = changeValue(wisdomValue, wisdomInput);
    recalculate();
})

charismaButton.addEventListener("click", (event) => {
    if (charismaInput.value === "") {
        return;
    }
    charismaPure = changeValue(charismaValue, charismaInput);
    recalculate();
})

const alignmentEnum = {
    LB: "Loyal Bon",
    NB: "Neutre Bon",
    CB: "Chaotique Bon",
    LN: "Loyal Neutre",
    N: "Neutre",
    CN: "Chaotique Neutre",
    LM: "Loyal Mauvais",
    NM: "Neutre Mauvais",
    CM: "Chaotique Mauvais",
};

const alignmentType = {
    "Loyal Bon": alignmentEnum.LB,
    "Neutre Bon": alignmentEnum.NB,
    "Chaotique Bon": alignmentEnum.CB,
    "Loyal Neutre": alignmentEnum.LN,
    "Neutre": alignmentEnum.N,
    "Chaotique Neutre": alignmentEnum.CN,
    "Loyal Mauvais": alignmentEnum.LM,
    "Neutre Mauvais": alignmentEnum.NM,
    "Chaotique Mauvais": alignmentEnum.CM,
}

let alignmentButton = document.getElementById("alignmentButton");
let alignmentChoice = document.getElementById("alignmentChoice");
let alignmentDisplay = document.getElementById("alignmentDisplay");

alignmentButton.addEventListener("click", (event) => {
    defineAlignment();
})

function stringToAlignmentType(alignmentName) {
    return alignmentType[alignmentName];
}

function defineAlignment() {
    alignment = stringToAlignmentType(alignmentChoice.value);
    alignmentDisplay.innerHTML = alignment;
    recalculate();
}

let raceButton = document.getElementById("raceButton");
let raceChoice = document.getElementById("raceChoice");
let raceDisplay = document.getElementById("raceDisplay");

let classButton = document.getElementById("classButton");
let classChoice = document.getElementById("classChoice");
let classDisplay = document.getElementById("classDisplay");

raceButton.addEventListener("click", (event) => {
    defineRace();
})

classButton.addEventListener("click", (event) => {
    defineClass();
})

//équation pour les courbes
/*
BBA fort: =
BBA moyen: 3/4
BBA faible: mod 2
Save fort: mod 2 + 2
Save faible: mod 3
 */

function affectBBA(BBAtype) {
    if (BBAtype === BBACurveType.STRONG) {
        return level;
    } else if (BBAtype === BBACurveType.MEDIUM) {
        return Math.floor(level * 3 / 4);
    } else if (BBAtype === BBACurveType.WEAK) {
        return Math.floor(level / 2);
    } else {
        return null;
    }
}

function affectSave(SaveType) {
    if (SaveType === SaveCurveType.STRONG) {
        return Math.floor(level / 2) + 2;
    } else if (SaveType === SaveCurveType.WEAK) {
        return Math.floor(level / 3);
    } else {
        return null;
    }
}

function affectLifeDiceClass(LifeDiceType) {
    let lifeDiceClassDisplay = document.getElementById("lifeDiceClass");
    let firstLifeDiceDisplay = document.getElementById("level1lifeDice");
    firstLifeDiceDisplay.innerHTML = LifeDiceType;
    lifeDiceClassDisplay.innerHTML = LifeDiceType;
    lifeDices = [];
    lifeDices.push(LifeDiceType);
    PV_compute(LifeDiceType);
    return LifeDiceType;
}

let addLifeDiceButton = document.getElementById("addLifeDiceButton");

addLifeDiceButton.addEventListener("click", (event) => {
    addLifeDiceInList();
});

function addLifeDiceInList() {
    let addLifeDiceInput = document.getElementById("addLifeDiceInput");
    if (addLifeDiceInput.value === "")
    {
        return;
    }
    let value = parseInt(addLifeDiceInput.value);
    let nextLifeDicesAdded = document.getElementById("nextLifeDicesAdded");
    let newItem = document.createElement("div");
    newItem.setAttribute("class", "lifeDiceListItem");
    newItem.innerHTML = value.toString();
    lifeDices.push(value);
    nextLifeDicesAdded.appendChild(newItem);
    let newRetireButton = document.createElement("button");
    newRetireButton.setAttribute("class", "retireLifeDiceButton");
    newRetireButton.innerHTML = "Retirer";
    newRetireButton.addEventListener("click", (event) => {
        retireLifeDice(newItem, newRetireButton, value);
    });
    nextLifeDicesAdded.appendChild(newRetireButton);
    PV_compute();
}

function retireLifeDice(item, retireButton, value) {
    item.remove();
    retireButton.remove();
    lifeDices.splice(lifeDices.indexOf(value), 1);
    PV_compute();
}

function PV_compute(LifeDiceType) {
    let PVDisplay = document.getElementById("PVValue");
    totalPV = (getSumOfArray(lifeDices) + conMod)
    PVDisplay.innerHTML = totalPV.toString();
}

function getSumOfArray(array) {
    let sum = 0;
    for (let i of array) {
        sum += i;
    }
    return sum;
}

function affectStatsAtClassChoice(classInfo) {
    if (classInfo == null) {
        return;
    }
    richnessDicesNumber = classInfo.RichnessDiceNumber;
    skillsClassPoints = classInfo.SkillPoints;
    skillsClassSet = classInfo.ClassSkillsSet;
    lifeDiceType = affectLifeDiceClass(classInfo.LifeDice);
    BBAClass = affectBBA(classInfo.BBACurve);
    reflexSaveClass = affectSave(classInfo.ReflexCurve);
    fortitudeSaveClass = affectSave(classInfo.FortitudeCurve);
    willSaveClass = affectSave(classInfo.WillCurve);
}

function savesAndBBACompute(classInfo) {
    if (classInfo == null)
    {
        return;
    }
    BBAClass = affectBBA(classInfo.BBACurve);
    reflexSaveClass = affectSave(classInfo.ReflexCurve);
    fortitudeSaveClass = affectSave(classInfo.FortitudeCurve);
    willSaveClass = affectSave(classInfo.WillCurve);
}

function defineClass() {
    className = classChoice.value;
    classType = stringToClassType(className);
    classDisplay.innerHTML = className;
    affectStatsAtClassChoice(classInfosMap.get(classType));
    recalculate();
}

function updateStatHTML(block, value) {
    block.innerHTML = value.toString();
}

function updateAllPrimaryStats() {
    updateStatHTML(strengthValue, strength);
    updateStatHTML(dexterityValue, dexterity);
    updateStatHTML(constitutionValue, constitution);
    updateStatHTML(intelligenceValue, intelligence);
    updateStatHTML(wisdomValue, wisdom);
    updateStatHTML(charismaValue, charisma);
}

function reinitializeStatsRaceModifiers()
{
    strengthRaceModifier = 0;
    dexterityRaceModifier = 0;
    constitutionRaceModifier = 0;
    intelligenceRaceModifier = 0;
    wisdomRaceModifier = 0;
    charismaRaceModifier = 0;
}

function affectStatsAtRaceChoice(raceInfo) {
    reinitializeStatsRaceModifiers();
    strengthRaceModifier += raceInfo.stats.str;
    dexterityRaceModifier += raceInfo.stats.dex;
    constitutionRaceModifier += raceInfo.stats.con;
    intelligenceRaceModifier += raceInfo.stats.int;
    wisdomRaceModifier += raceInfo.stats.wis;
    charismaRaceModifier += raceInfo.stats.cha;
    let chooseStatRaceBonus = document.getElementById("chooseStatRaceBonus");
    if (raceInfo.stats.any !== 0 && chooseStatRaceBonus == null) {
        let raceContainer = document.getElementById("raceContainer");
        chooseStatRaceBonus = document.createElement("p");
        chooseStatRaceBonus.setAttribute("id", "chooseStatRaceBonus")
        let label = document.createElement("label");
        let id = "raceBonusChoice";
        label.setAttribute("for", id);
        label.innerHTML = "Choose the stat you want the bonus to apply";
        let lineFeed = document.createElement("br");
        let select = document.createElement("select");
        select.setAttribute("name", id);
        select.setAttribute("id", id);
        for (let stat of Object.keys(primaryStatEnum))
        {
            let option = document.createElement("option");
            option.innerHTML = primaryStatEnum[stat];
            select.appendChild(option);
        }
        let button = document.createElement("button");
        button.setAttribute("class", "addValueButton");
        button.setAttribute("id", "raceBonusButton");
        button.innerHTML = "ENTER";
        button.addEventListener("click", (event) => {
            reinitializeStatsRaceModifiers();
            updateStatFromEnum(select.value, raceInfo.stats.any)
            recalculate();
        })
        chooseStatRaceBonus.appendChild(label);
        chooseStatRaceBonus.appendChild(lineFeed);
        chooseStatRaceBonus.appendChild(select);
        chooseStatRaceBonus.appendChild(button);
        raceContainer.appendChild(chooseStatRaceBonus);
    }
    else if (chooseStatRaceBonus != null && raceInfo.stats.any === 0)
    {
        chooseStatRaceBonus.remove();
    }
    languagesAvailable = raceInfo.languages;
    speed = raceInfo.speed;
    size = raceInfo.size;

    let speedDisplay = document.getElementById("speedValue");
    speedDisplay.innerHTML = speed;
    let sizeDisplay = document.getElementById("sizeValue");
    sizeDisplay.innerHTML = size;
    recalculate();
}

function updateStatFromEnum(statType, value)
{
    switch (statType)
    {
        case primaryStatEnum.STRENGTH:
            strengthRaceModifier += value;
            break;
        case primaryStatEnum.DEXTERITY:
            dexterityRaceModifier += value;
            break;
        case primaryStatEnum.CONSTITUTION:
            constitutionRaceModifier += value;
            break;
        case primaryStatEnum.INTELLIGENCE:
            intelligenceRaceModifier += value;
            break;
        case primaryStatEnum.WISDOM:
            wisdomRaceModifier += value;
            break;
        case primaryStatEnum.CHARISMA:
            charismaRaceModifier += value;
            break;
        default:
            console.error(`Try to apply stat modification on ${statType}`);
    }
}

function defineRace() {
    raceName = raceChoice.value;
    raceType = stringToRaceType(raceName);
    raceDisplay.innerHTML = raceName;
    affectStatsAtRaceChoice(raceInfosMap.get(raceType));
    recalculate();
}

document.addEventListener("DOMContentLoaded", (event) => {
    recalculate();
});

function modCompute(stat) {
    return Math.floor((stat - 10) / 2);
}

function savesCompute() {
    reflexSave = reflexSaveClass + dexMod;
    fortitudeSave = fortitudeSaveClass + conMod;
    willSave = willSaveClass + wisMod;
    let reflexDisplay = document.getElementById("reflexValue");
    let fortitudeDisplay = document.getElementById("fortitudeValue");
    let willDisplay = document.getElementById("willValue");
    reflexDisplay.innerHTML = reflexSave;
    fortitudeDisplay.innerHTML = fortitudeSave;
    willDisplay.innerHTML = willSave;
}

function fightStatsCompute() {
    BBA = BBAClass;
    BMO = BBA + strMod; //+ size mod
    DMD = 10 + BBA + strMod + dexMod; //+ size mod
    attCaC = BBA + strMod; // size
    attDist = BBA + dexMod; // size
    initiative = dexMod;
    let BBADisplay = document.getElementById("BBAValue");
    let BMODisplay = document.getElementById("BMOValue");
    let DMDDisplay = document.getElementById("DMDValue");
    let attCaCDisplay = document.getElementById("attCaCValue");
    let attDistDisplay = document.getElementById("attDistValue");
    let initiativeDisplay = document.getElementById("initiativeValue");
    BBADisplay.innerHTML = BBA;
    BMODisplay.innerHTML = BMO;
    DMDDisplay.innerHTML = DMD;
    attCaCDisplay.innerHTML = attCaC;
    attDistDisplay.innerHTML = attDist;
    initiativeDisplay.innerHTML = initiative;
}

function primaryStatsCompute()
{
    strength = strengthPure + strengthRaceModifier;
    dexterity = dexterityPure + dexterityRaceModifier;
    constitution = constitutionPure + constitutionRaceModifier;
    intelligence = intelligencePure + intelligenceRaceModifier;
    wisdom = wisdomPure + wisdomRaceModifier;
    charisma = charismaPure + charismaRaceModifier;
}

function recalculate() {
    //always mods first
    primaryStatsCompute();
    updateAllPrimaryStats();
    strMod = modCompute(strength);
    dexMod = modCompute(dexterity);
    conMod = modCompute(constitution);
    intMod = modCompute(intelligence);
    wisMod = modCompute(wisdom);
    chaMod = modCompute(charisma);

    savesAndBBACompute(classInfosMap.get(classType));
    fightStatsCompute();
    savesCompute();
    CA_compute();
}

function CA_compute() {
    CA = 10 + dexMod + armorBonus + shieldBonus;
    let CA_display = document.getElementById("CAValue");
    CA_display.innerHTML = CA;
    CAContact = 10 + dexMod;
    CAPaD = CA - dexMod;
    let CAContactDisplay = document.getElementById("CAContactValue");
    let CAPaDDisplay = document.getElementById("CAPaDValue");
    CAContactDisplay.innerHTML = CAContact;
    CAPaDDisplay.innerHTML = CAPaD;
}