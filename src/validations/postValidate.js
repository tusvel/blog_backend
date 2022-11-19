import { body } from 'express-validator';

export const postValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
  body('tags', 'Неверный формат тэгов').optional(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
