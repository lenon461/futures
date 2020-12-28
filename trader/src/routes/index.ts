import { NextFunction, Request, Response, Router } from "express";
import OrderRouter from './order';
const router = Router();

router.use("/order", OrderRouter);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    res.json("HI")
});
export default router;