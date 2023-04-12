const express = require("express");

let todoData = require("../todoData.json");

const router = express.Router();

//  전체 투두리스트 조회
router.get("/", (req, res) => {
    console.log(todoData);

    res.json(todoData);
});

// 특정 투두리스트 조회
router.get("/:id", (req, res) => {
    const { id } = req.params;

    if (parseInt(id) >= todoData.length) {
        return res.status(400).json({ error: "존재하지 않는 ID입니다." });
    }

    res.json(todoData[parseInt(id)]);
});

// 투두 생성
router.post("/", (req, res) => {
    const { title, desc } = req.body;

    if (!title || !desc) {
        return res.status(400).json({ error: "타이틀과 설명을 입력하셔야 합니다." });
    }

    todoData.push({ title, desc, isDone: false });

    console.log(todoData);

    res.json(todoData);
});

// 투두 수정
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, desc } = req.body;

    if (parseInt(id) >= todoData.length) {
        return res.status(400).json({ error: "존재하지 않는 ID입니다." });
    }
    if (!title && !desc) {
        return res.status(400).json({ error: "타이틀이나 설명 중에 하나의 값은 입력해야 합니다." });
    }

    todoData[parseInt(id)] = {
        title: title ? title : todoData[parseInt(id)].title,
        desc: desc ? desc : todoData[parseInt(id)].desc,
        isDone: todoData[parseInt(id)].isDone,
    };

    console.log(todoData);

    res.json(todoData);
});

// 투두 완료 처리
router.put("/done/:id", (req, res) => {
    const { id } = req.params;

    if (parseInt(id) >= todoData.length) {
        return res.status(400).json({ error: "존재하지 않는 ID입니다." });
    }

    todoData[parseInt(id)] = {
        title: todoData[parseInt(id)].title,
        desc: todoData[parseInt(id)].desc,
        isDone: !todoData[parseInt(id)].isDone,
    };

    console.log(todoData);

    res.json(todoData);
});

// 투두 삭제
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    if (parseInt(id) >= todoData.length) {
        return res.status(400).json({ error: "존재하지 않는 ID입니다." });
    }

    todoData = todoData.filter((v, i) => {
        return parseInt(id) !== i;
    });

    console.log(todoData);

    res.json(todoData);
});

module.exports = router;
