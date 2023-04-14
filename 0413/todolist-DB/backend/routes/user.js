const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

// prisma client 사용 선언
const client = new PrismaClient();

// user 생성 - POST
// BE와 통신하기 위해 비동기로. async, await 사용
// 중복된 account POST 요청 시 에러 발생 (id는 늘어남) Unique constraint failed...
// 해결하기 위해 아이디 조회 하고 없으면 생성
router.post("/", async (req, res) => {
    try {
        // req.body에서 account 받아오기
        const { account } = req.body;

        // existUser 가 null일 때 정상 (= 이미 존재하는, 중복된 계정이 없다는 뜻)
        const existUser = await client.user.findUnique({
            where: {
                account,
            },
        });
        // console.log(existUser);
        // 존재하면 400 코드 던져주기
        if (existUser) {
            return res.status(400).json({ ok: false, error: "Already exist account." });
        }

        // DB와 통신 - prisma client 사용. js도 만든 테이블 자동완성 지원
        const user = await client.user.create({
            data: {
                account,
            },
        });

        // 응답 잘 갔는지 확인, user 보내기
        res.json({ ok: true, user });
    } catch (error) {
        console.error(error);
    }
});

// user 조회 - GET
router.get("/:account/", async (req, res) => {
    try {
        const { account } = req.params;
        const user = await client.user.findUnique({
            where: {
                account,
            },
        });

        if (!user) {
            return res.status(400).json({
                ok: false,
                error: "Not exist user.",
            });
        }
        console.log(account);
        res.json({
            ok: true,
            user,
        });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
