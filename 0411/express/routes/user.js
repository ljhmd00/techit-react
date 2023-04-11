const express = require("express");

const router = express.Router();

router.get("/:id", (req, res) => {
    res.send("user조회");
});

router.post("/:id", (req, res) => {
    res.send("신규 유저 생성");
});

router.put("/:id", (req, res) => {
    res.send("유저 업데이트");
});

router.delete("/:id", (req, res) => {
    res.send("유저 삭제");
});

module.exports = router;
