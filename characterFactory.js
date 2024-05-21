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

let name = "";
let level = 1;
let className = undefined;
let raceName = undefined;
let classType = undefined;

let totalPV = 1;
let actualPV = 1;
let lifeDiceType = 6;
let lifeDices = [];
let TotalRichness = 0;
const coins = {
    bronze: 0,
    silver: 0,
    gold: 0,
    platinum: 0,
}
let skillsPoints = 0;

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
    if (typeof input.value === "number") {
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
    strength = changeValue(strengthValue, strengthInput);
    recalculate();
});

dexterityButton.addEventListener("click", (event) => {
    if (dexterityInput.value === "") {
        return;
    }
    dexterity = changeValue(dexterityValue, dexterityInput);
    recalculate();
})

constitutionButton.addEventListener("click", (event) => {
    if (constitutionInput.value === "") {
        return;
    }
    constitution = changeValue(constitutionValue, constitutionInput);
    recalculate();
})

intelligenceButton.addEventListener("click", (event) => {
    if (intelligenceInput.value === "") {
        return;
    }
    intelligence = changeValue(intelligenceValue, intelligenceInput);
    recalculate();
})

wisdomButton.addEventListener("click", (event) => {
    if (wisdomInput.value === "") {
        return;
    }
    wisdom = changeValue(wisdomValue, wisdomInput);
    recalculate();
})

charismaButton.addEventListener("click", (event) => {
    if (charismaInput.value === "") {
        return;
    }
    charisma = changeValue(charismaValue, charismaInput);
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
    let value = addLifeDiceInput.value;
    let nextLifeDicesAdded = document.getElementById("nextLifeDicesAdded");
    let newItem = document.createElement("div");
    newItem.setAttribute("class", "lifeDiceListItem");
    newItem.innerHTML = value;
    lifeDices.push(value);
    nextLifeDicesAdded.appendChild(newItem);
    let newRetireButton = document.createElement("button");
    newRetireButton.setAttribute("class", "retireLifeDiceButton");
    newRetireButton.innerHTML = "Retire";
    newRetireButton.addEventListener("click", (event) => {
       retireLifeDice();
    });
}

<button class="retireLifeDiceButton">Retire</button>
<br/>

function PV_compute(LifeDiceType) {
    let PVDisplay = document.getElementById("PVValue");
    console.log(lifeDices);
    PVDisplay.innerHTML = getSumOfArray(lifeDices) + conMod;
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
    lifeDiceType = affectLifeDiceClass(classInfo.LifeDice);
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

function defineRace() {
    raceName = raceChoice.value;
    raceDisplay.innerHTML = raceName;
    recalculate();
}

document.addEventListener("DOMContentLoaded", (event) => {
    recalculate();
})

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
    let BMODisplay = document.getElementById("BMOValue");
    let DMDDisplay = document.getElementById("DMDValue");
    let attCaCDisplay = document.getElementById("attCaCValue");
    let attDistDisplay = document.getElementById("attDistValue");
    let initiativeDisplay = document.getElementById("initiativeValue");
    BMODisplay.innerHTML = BMO;
    DMDDisplay.innerHTML = DMD;
    attCaCDisplay.innerHTML = attCaC;
    attDistDisplay.innerHTML = attDist;
    initiativeDisplay.innerHTML = initiative;
}

function recalculate() {
    //always mods first
    strMod = modCompute(strength);
    dexMod = modCompute(dexterity);
    conMod = modCompute(constitution);
    intMod = modCompute(intelligence);
    wisMod = modCompute(wisdom);
    chaMod = modCompute(charisma);
    //affectStatsAtClassChoice(classInfosMap.get(classType));

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

