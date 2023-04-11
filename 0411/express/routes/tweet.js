const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("전체tweet조회");
});

router.get("/:id", (req, res) => {
    console.log(req.params);
    res.send("특정tweet조회");
});

router.post("/:id", (req, res) => {
    res.send("신규 트윗 생성");
});

router.put("/:id", (req, res) => {
    res.send("트윗 업데이트");
});

router.delete("/:id", (req, res) => {
    res.send("트윗 삭제");
});

module.exports = router;
