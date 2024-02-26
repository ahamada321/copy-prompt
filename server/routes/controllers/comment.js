const Comment = require("./models/comment");
const User = require("./models/user");
const Prompt = require("./models/prompt");
const { normalizeErrors } = require("./helpers/mongoose");

exports.getRandomComments = async function (req, res) {
  try {
    const result = await Comment.aggregate([
      { $sample: { size: 4 } },
      {
        $lookup: {
          from: "users", // 結合するコレクション
          localField: "user", // rentalsコレクションのフィールド
          foreignField: "_id", // usersコレクションのフィールド
          as: "user", // 結果を格納するフィールド名
          pipeline: [
            {
              $project: {
                email: 0,
                password: 0, // パスワードフィールドを除外
              },
            },
          ],
        },
      },
      {
        $unwind: "$user",
      },
    ]);
    return res.json(result);
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.postComment = async function (req, res) {
  const commentData = new Comment(req.body);

  try {
    const newComment = await Comment.create(commentData);
    await Prompt.updateOne(
      { _id: newComment.promptId },
      { $push: { comments: newComment } }
    );
    return res.json(newComment);
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.editComment = async function (req, res) {
  const commentData = req.body;
  const commentId = req.params.id;
  const user = res.locals.user;

  try {
    const foundComment = await Comment.findById(promptId).populate("user");
    // await Prompt.updateOne(
    //   { _id: commentData.prompt },
    //   { $push: { comments: newComment } }
    // );
    return res.json({ status: "edited" });
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};
