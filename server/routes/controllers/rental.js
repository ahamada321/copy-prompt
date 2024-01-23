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
      {
        $match: {
          user: user._id,
          isShared: true,
        },
      },
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

  Rental.findById(rentalId).exec(async function (err, foundRental) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    try {
      foundRental.remove();
      return res.json({ status: "deleted" });
    } catch (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
  });
};

exports.updateRental = function (req, res) {
  const rentalData = req.body;
  const rentalId = req.params.id;
  const user = res.locals.user;

  Rental.findById(rentalId).exec(function (err, foundRental) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    User.findOne({ patientId }, function (err, foundUser) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      rentalData.user = foundUser;

      try {
        const updatedRental = Rental.updateOne(
          { _id: foundRental.id },
          rentalData,
          () => {}
        );
        return res.json(updatedRental);
      } catch (err) {
        return res.json(err);
      }
    });
  });
};

exports.createRental = async function (req, res) {
  const rental = new Rental(req.body);
  rental.user = res.locals.user;

  try {
    const newRental = await Rental.create(rental);
    const result = await User.updateOne(
      { _id: rental.user.id },
      { $push: { rentals: newRental } }
    );
    return res.json(result);
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};
