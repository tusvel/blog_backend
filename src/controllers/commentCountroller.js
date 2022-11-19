import CommentModel from '../models/Comment.js';

class CommentController {
  async create(req, res) {
    try {
      const postId = req.params.id;
      const doc = new CommentModel({
        text: req.body.text,
        user: req.userId,
        post: postId,
      });
      const comment = await doc.save();

      return res.json(comment);
    } catch (err) {
      console.log(err);
      return res.status(500).json('Не удалось создать комментарий');
    }
  }
  async getAllByPost(req, res) {
    try {
      const postId = req.params.id;

      const comments = await CommentModel.find({
        post: postId,
      }).populate('user');
      return res.json(comments);
    } catch (err) {
      console.log(err);
      return res.status(500).json('Ошибка получения комментариев');
    }
  }
  async getAll(req, res) {
    try {
      const comments = await CommentModel.find().populate('user').limit(5);

      const Comments = comments?.map((obj) => obj.user).flat();

      return res.json(Comments);
    } catch (err) {
      console.log(err);
      return res.status(500).json('Не удалось получить комментарии');
    }
  }
}

const commentController = new CommentController();

export { commentController };
