const Comment = require("./models/comment");
const User = require("./models/user");
const Prompt = require("./models/prompt");
const { normalizeErrors } = require("./helpers/mongoose");

exports.getComments = async function (req, res) {
  const { promptId } = req.query;

  try {
    const foundComments = await Comment.find({ prompt: promptId })
      .populate("user", "-email -password")
      .sort({ createdAt: -1 });

    return res.json(foundComments);
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.createComment = async function (req, res) {
  const commentData = new Comment(req.body);
  const user = res.locals.user;
  commentData.user = user;

  try {
    const newComment = await Comment.create(commentData);
    await Prompt.updateOne(
      { _id: commentData.prompt },
      { $push: { comments: newComment } }
    );
    return res.json({ status: "created" });
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
