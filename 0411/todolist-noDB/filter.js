const foods = [
    { type: "fruit", name: "apple" },
    { type: "vegetable", name: "carrot" },
    { type: "fruit", name: "kiwi" },
    { type: "vegetable", name: "potato" },
    { type: "fruit", name: "orange" },
    { type: "vegetable", name: "tomato" },
    { type: "fruit", name: "banana" },
];

const onlyFruits = foods.filter((v, i) => {
    return v.type === "fruit";
});

const mapFruits = foods.map((v) => {
    if (v.type === "fruit") {
        return v;
    }
});

console.log(onlyFruits);
console.log(mapFruits);

//filter, map 함수 차이점 알아보기
