import { Router } from 'express';
import { libro } from "./controller.js";

export const router = Router();

router.get('/libro/:id', libro.getOne);
router.get('/libros', libro.getAll);
router.post('/libro', libro.add);
router.delete('/libro/isbn/:isbn', libro.delete);
router.put('/libro', libro.update);