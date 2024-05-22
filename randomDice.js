function lancerDe(nbFaces) {
    return Math.floor(Math.random() * nbFaces) + 1;
}

function lancerDe4() {
    return lancerDe(4);
}

export function lancerDe6() {
    return lancerDe(6);
}

function lancerDe8() {
    return lancerDe(8);
}

function lancerDe10() {
    return lancerDe(10);
}

function lancerDe12() {
    return lancerDe(12);
}

function lancerDe20() {
    return lancerDe(20);
}

export function lancerDe100() {
    return lancerDe(100);
}

function test()
{
    console.log("Lancer de dé à 4 faces: " + lancerDe4());
    console.log("Lancer de dé à 6 faces: " + lancerDe6());
    console.log("Lancer de dé à 8 faces: " + lancerDe8());
    console.log("Lancer de dé à 10 faces: " + lancerDe10());
    console.log("Lancer de dé à 12 faces: " + lancerDe12());
    console.log("Lancer de dé à 20 faces: " + lancerDe20());
}

//test();