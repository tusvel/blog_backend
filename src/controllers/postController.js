import PostModel from '../models/Post.js';

class PostController {
  async create(req, res) {
    try {
      const doc = new PostModel({
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags && req.body.tags?.split(','),
        viewsCount: req.body.viewsCount,
        user: req.userId,
        imageUrl: req.body.imageUrl,
      });
      const post = await doc.save();

      return res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json('Не удалось создать статью');
    }
  }
  async getAll(req, res) {
    try {
      const posts = await PostModel.find().populate('user');
      return res.json(posts);
    } catch (err) {
      console.log(err);
      return res.status(500).json('Ошибка получения всех статей');
    }
  }
  async getAllByTag(req, res) {
    try {
      const posts = await PostModel.find({ tags: { $in: [req.params.tag] } }).populate('user');
      return res.json(posts);
    } catch (err) {
      console.log(err);
      return res.status(500).json('Ошибка получения всех статей');
    }
  }
  async getOne(req, res) {
    try {
      const postId = req.params.id;
      PostModel.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $inc: { viewsCount: 1 },
        },
        {
          returnDocument: 'after',
        },
        (err, doc) => {
          if (err) {
            console.log(err);
            return res.status(500).json('Не удалось вернуть статью');
          }
          if (!doc) {
            return res.status(404).json({
              message: 'Статья не найдена',
            });
          }
          return res.json(doc);
        },
      ).populate('user');
    } catch (err) {
      console.log(err);
      return res.status(500).json('Ошибка получения статьи');
    }
  }
  async delete(req, res) {
    try {
      const postId = req.params.id;
      PostModel.findOneAndRemove(
        {
          _id: postId,
        },
        (err, doc) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          }
          if (!doc) {
            return res.status(404).json({
              message: 'Статья не найдена',
            });
          }

          return res.json({
            success: true,
          });
        },
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json('Ошибка удаления статьи');
    }
  }
  async update(req, res) {
    try {
      const postId = req.params.id;
      await PostModel.updateOne(
        {
          _id: postId,
        },
        {
          title: req.body.title,
          text: req.body.text,
          tags: req.body.tags && req.body.tags?.split(','),
          viewsCount: req.body.viewsCount,
          user: req.userId,
          imageUrl: req.body.imageUrl,
        },
      );
      return res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json('Не удалось обновить статью');
    }
  }
  async getTags(req, res) {
    try {
      const posts = await PostModel.find().limit(10).distinct('tags');
      const items = posts?.filter((item) => {
        return item !== null;
      });

      return res.json(items);
    } catch (err) {
      console.log(err);
      return res.status(500).json('Не удалось получить теги');
    }
  }
}

const postController = new PostController();

export { postController };
