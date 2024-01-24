const Rental = require("./models/rental");
const User = require("./models/user");
const { normalizeErrors } = require("./helpers/mongoose");

exports.getRentalById = async function (req, res) {
  const rentalId = req.params.id;

  try {
    const foundRental = await Rental.findById(rentalId).populate(
      "user",
      "-password"
    );
    return res.json(foundRental);
  } catch (err) {
    if (err) {
      return res.status(422).send({
        errors: {
          title: "Rental error!",
          detail: "Could not find Rental!",
        },
      });
    }
  }
};

exports.getRentalsTotal = function (req, res) {
  Rental.countDocuments({}, function (err, total) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    return res.json(total);
  });
};

exports.getRentals = async function (req, res) {
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
        const result = await Rental.aggregate([
          { $match: { isShared: true } },
          {
            $facet: {
              metadata: [{ $count: "total" }, { $addFields: { page: page } }],
              foundRentals: [
                { $skip: (page - 1) * limit },
                { $limit: Number(limit) },
              ],
            },
          },
        ]);
        return res.json(result);
      } else {
        const result = await Rental.aggregate([
          {
            $match: {
              isShared: true,
              selectedCategory: { $in: selectedCategory },
            },
          },
          {
            $facet: {
              metadata: [{ $count: "total" }, { $addFields: { page: page } }],
              foundRentals: [
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
        const result = await Rental.aggregate([
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
              foundRentals: [
                { $skip: (page - 1) * limit },
                { $limit: Number(limit) },
              ],
            },
          },
        ]);
        return res.json(result);
      } else {
        const result = await Rental.aggregate([
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
              foundRentals: [
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

exports.searchRentals = function (req, res) {
  const { searchWords } = req.params;

  Rental.aggregate(
    [
      {
        $match: {
          name: {
            $regex: searchWords,
            $options: "i",
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ],
    function (err, foundRentals) {
      return res.json(foundRentals);
    }
  );
};

exports.getOwnerRentals = async function (req, res) {
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
    const result = await Rental.aggregate([
      { $match: { user: user._id } },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page: page } }],
          foundRentals: [
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

exports.deleteRental = async function (req, res) {
  const rentalId = req.params.id;
  const user = res.locals.user;

  try {
    const foundRental = await Rental.findById(rentalId).populate("user");
    if (foundRental.user.id !== user.id) {
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
      { $pull: { rentals: foundRental._id } }
    ); // Delete rental from User

    await foundRental.deleteOne();
    return res.json({ status: "deleted" });
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.updateRental = async function (req, res) {
  const rentalData = req.body;
  const rentalId = req.params.id;
  const user = res.locals.user;

  try {
    const foundRental = await Rental.findById(rentalId).populate("user");
    if (foundRental.user.id !== user.id) {
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
    //   { $push: { rentals: foundRental._id } }
    // ); // No needed. Already attached with user when created.

    rentalData.updatedAt = new Date();
    await Rental.updateOne({ _id: foundRental._id }, rentalData);
    return res.json({ status: "updated" });
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.createRental = async function (req, res) {
  const rentalData = new Rental(req.body);
  const user = res.locals.user;
  rentalData.user = user;

  try {
    const newRental = await Rental.create(rentalData);
    await User.updateOne({ _id: user.id }, { $push: { rentals: newRental } });
    return res.json({ status: "created" });
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};
