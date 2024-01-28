const Prompt = require("./models/prompt");
const User = require("./models/user");
const { normalizeErrors } = require("./helpers/mongoose");

exports.getPromptById = async function (req, res) {
  const promptId = req.params.id;

  try {
    const foundPrompt = await Prompt.findById(promptId).populate(
      "user",
      "-password"
    );
    return res.json(foundPrompt);
  } catch (err) {
    if (err) {
      return res.status(422).send({
        errors: {
          title: "Prompt error!",
          detail: "Could not find Prompt!",
        },
      });
    }
  }
};

exports.getPromptsTotal = function (req, res) {
  Prompt.countDocuments({}, function (err, total) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    return res.json(total);
  });
};

exports.getPrompts = async function (req, res) {
  const { page, limit } = req.query;
  const { selectedCategory, keywords } = req.body;

  if (!page || !limit) {
    return res.status(422).send({
      errors: [
        {
          title: "Data missing!",
          detail: "ページリミット情報が取得できませんでした。",
        },
      ],
    });
  }

  try {
    if (!keywords) {
      if (!selectedCategory) {
        const result = await Prompt.aggregate([
          { $match: { isShared: true } },
          {
            $facet: {
              metadata: [{ $count: "total" }, { $addFields: { page: page } }],
              foundPrompts: [
                { $skip: (page - 1) * limit },
                { $limit: Number(limit) },
              ],
            },
          },
        ]);
        return res.json(result);
      } else {
        const result = await Prompt.aggregate([
          {
            $match: {
              isShared: true,
              selectedCategory: { $in: selectedCategory },
            },
          },
          {
            $facet: {
              metadata: [{ $count: "total" }, { $addFields: { page: page } }],
              foundPrompts: [
                { $skip: (page - 1) * limit },
                { $limit: Number(limit) },
              ],
            },
          },
        ]);
        return res.json(result);
      }
    } else {
      if (!selectedCategory) {
        const result = await Prompt.aggregate([
          {
            $match: {
              isShared: true,
              name: {
                $regex: name,
                $options: "i",
              },
            },
          },
          {
            $facet: {
              metadata: [{ $count: "total" }, { $addFields: { page: page } }],
              foundPrompts: [
                { $skip: (page - 1) * limit },
                { $limit: Number(limit) },
              ],
            },
          },
        ]);
        return res.json(result);
      } else {
        const result = await Prompt.aggregate([
          {
            $match: {
              isShared: true,
              selectedCategory: { $in: selectedCategory },
              name: {
                $regex: name,
                $options: "i",
              },
            },
          },
          {
            $facet: {
              metadata: [{ $count: "total" }, { $addFields: { page: page } }],
              foundPrompts: [
                { $skip: (page - 1) * limit },
                { $limit: Number(limit) },
              ],
            },
          },
        ]);
        return res.json(result);
      }
    }
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.searchPrompts = async function (req, res) {
  const { searchWords } = req.params;
  const regexPatterns = searchWords
    .split(/\s+/)
    .map((word) => new RegExp(word, "i"));

  try {
    const foundPrompts = await Prompt.aggregate([
      {
        $match: {
          $or: [
            { name: { $in: regexPatterns } },
            { description: { $in: regexPatterns } },
          ],
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return res.json(foundPrompts);
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.getOwnerPrompts = async function (req, res) {
  const user = res.locals.user;
  const { page, limit } = req.query;

  if (!page || !limit) {
    return res.status(422).send({
      errors: [
        {
          title: "Data missing!",
          detail: "ページリミット情報が取得できませんでした。",
        },
      ],
    });
  }

  try {
    const result = await Prompt.aggregate([
      { $match: { user: user._id } },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page: page } }],
          foundPrompts: [
            { $skip: (page - 1) * limit },
            { $limit: Number(limit) },
          ],
        },
      },
    ]);
    return res.json(result);
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.deletePrompt = async function (req, res) {
  const promptId = req.params.id;
  const user = res.locals.user;

  try {
    const foundPrompt = await Prompt.findById(promptId).populate("user");
    if (foundPrompt.user.id !== user.id) {
      return res.status(422).send({
        errors: [
          {
            title: "Can't delete prompt!",
            detail: "他ユーザーのプロンプトは削除できません",
          },
        ],
      });
    }

    await User.updateOne(
      { _id: user._id },
      { $pull: { prompts: foundPrompt._id } }
    ); // Delete prompt from User

    await foundPrompt.deleteOne();
    return res.json({ status: "deleted" });
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.updatePrompt = async function (req, res) {
  const promptData = req.body;
  const promptId = req.params.id;
  const user = res.locals.user;

  try {
    const foundPrompt = await Prompt.findById(promptId).populate("user");
    if (foundPrompt.user.id !== user.id) {
      return res.status(422).send({
        errors: [
          {
            title: "Can't update prompt!",
            detail: "他ユーザーのプロンプトは更新できません",
          },
        ],
      });
    }

    // await User.updateOne(
    //   { _id: user._id },
    //   { $push: { prompts: foundPrompt._id } }
    // ); // No needed. Already attached with user when created.

    promptData.updatedAt = new Date();
    await Prompt.updateOne({ _id: foundPrompt._id }, promptData);
    return res.json({ status: "updated" });
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.createPrompt = async function (req, res) {
  const promptData = new Prompt(req.body);
  const user = res.locals.user;
  promptData.user = user;

  try {
    const newPrompt = await Prompt.create(promptData);
    await User.updateOne({ _id: user.id }, { $push: { prompts: newPrompt } });
    return res.json({ status: "created" });
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};
