const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

// prisma client 사용 선언
const client = new PrismaClient();

// todo 생성 - POST
router.post("/", async (req, res) => {
    try {
        const { todo, userId } = req.body;

        // todo 비어있을 때 예외처리
        if (!todo) {
            return res.status(400).json({ ok: false, error: "Not exist todo." });
        }
        // 존재하지 않는 userId 예외처리
        if (!userId) {
            return res.status(400).json({ ok: false, error: "Not exist userId." });
        }
        // 유저 조회
        const user = await client.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });
        // 없는 유저인지 확인
        if (!user) {
            return res.status(400).json({ ok: false, error: "Not exist user." });
        }

        // 생성
        const newTodo = await client.todo.create({
            data: {
                todo,
                isDone: false,
                userId: user.id,
            },
        });

        res.json({ ok: true, todo: newTodo });
    } catch (error) {
        console.error(error);
    }
});

// todo 조회 - GET
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // todo 조회 전, user 있는지 체크
        const user = await client.user.findMany({
            where: {
                id: parseInt(userId),
            },
            // 0번부터 3개 출력 (findMany로 조회할 때는 값이 많을 수도 있기 때문에)
            // 실제 동작할 때는 skip이 take만큼 더해져야 함 (0 -> 3 -> 6 ...)
            //   skip: 0,
            //   take: 3,
        });

        if (!user) {
            return res.status(400).json({ ok: false, error: "Not exist user." });
        }

        // 조건을 만족하는(여기에서는 userId가 일치하는) 값이 여러 개일 때 findMany 사용
        // findUnique는 유일한 값으로 찾음. 스키마에서 @unique로 설정한
        // 하나만 찾을 때는 findFirst
        const todos = await client.todo.findMany({
            where: {
                userId: parseInt(userId),
            },
        });

        // console.log(todos);

        res.json({ ok: true, todos });
    } catch (error) {
        console.error(error);
    }
});

// 투두 완료 - PUT
router.put("/:id/done", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        // id를 통해 todo가 존재하는지 확인
        const existTodo = await client.todo.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        // console.log(existTodo); // 없으면 null
        // res.send("임시");

        // 예외처리 : todo가 존재하지 않을 때
        if (!existTodo) {
            return res.status(400).json({ ok: false, error: "Not exist todo." });
        }

        // 예외처리 : 수정하려는 userId가 현재 todo의 userId와 같은지
        if (existTodo.userId !== parseInt(userId)) {
            return res.status(400).json({ ok: false, error: "You are not todo's owner." });
        }

        // id를 통해 todo의 상태값(isDone) 확인
        const updatedTodo = await client.todo.update({
            // 조회
            where: {
                id: parseInt(id),
            },
            // 변경
            // isDone을 가져와서 반대로 뒤집어주기
            data: {
                isDone: !existTodo.isDone,
            },
        });

        res.json({ ok: true, todo: updatedTodo });
    } catch (error) {
        console.error(error);
    }
});

// 투두 삭제 - DELETE
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        /**
         * 실제로는 body에 userId를 바로 넣지 않고
         * (악의적인 누군가가 userId를 알고 있으면 body에 넣어서 임의로 삭제할 수 있음)
         * Session이나 JWT를 사용해 보안성을 높임
         */

        // id를 통해 todo가 존재하는지 확인
        const existTodo = await client.todo.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        // 예외처리 : todo가 존재하지 않을 때
        if (!existTodo) {
            return res.status(400).json({ ok: false, error: "Not exist todo." });
        }

        // 삭제하려는 userId가 현재 todo의 userId와 같은지
        if (existTodo.userId !== parseInt(userId)) {
            return res.status(400).json({ ok: false, error: "You are not todo's owner." });
        }

        const deletedTodo = await client.todo.delete({
            where: {
                id: parseInt(id),
            },
        });

        res.json({ ok: true, todo: deletedTodo });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
