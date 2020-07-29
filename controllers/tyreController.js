const Tyre = require("../models/tyreModel");
const HttpError = require("./httpError");

exports.getTyres = async (req, res, next) => {
  const { size = /.*/, type = /.*/, clas = /.*/ } = req.query;
  const sortBy = req.query.sorty
    ? req.query.sorty === "up"
      ? "price"
      : "-price"
    : "price";

  const limit = 12;
  const page = +req.query.page;
  const skip = (page - 1) * limit;
  try {
    const tyres = await Tyre.find({
      size: size === "undefined" ? /.*/ : size,
      type: type === "undefined" ? /.*/ : type,
      clas: clas === "undefined" ? /.*/ : clas,
    })
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      tyres,
    });
  } catch (err) {
    return next(new HttpError("Nie udalo sie pobrac opon", 402));
  }
};

exports.createTyre = async (req, res, next) => {
  const { name, size, type, clas, price, description } = req.body;
  const images = req.files.images.map((el) => el.path);
  const imageCover = req.files.imageCover[0].path;
  let tyre;
  try {
    tyre = new Tyre({
      name,
      size,
      type,
      clas,
      image: images,
      price,
      imageCover,
      description,
    });
    await tyre.save();

    res.status(200).json({ tyre });
  } catch (err) {
    return next(new HttpError("Nie udalo sie wrzcucic opony", 432));
  }
};
exports.getTyreById = async (req, res, next) => {
  const tid = req.params.tid;
  try {
    const tyre = await Tyre.findById(tid);
    res.status(200).json({ tyre });
  } catch (err) {
    return next(new HttpError("Nie udalo sie znalesc opony", 404));
  }
};
exports.deleteTyreById = async (req, res, next) => {
  const tid = req.params.tid;
  try {
    await Tyre.findByIdAndDelete(tid);
  } catch (err) {
    return next(new HttpError("Nie udalo sie usunac", 402));
  }
  res.json({ ok: "ok" });
};

exports.updateTyreById = async (req, res, next) => {
  const tid = req.params.tid;
  const { price } = req.body;
  try {
    await Tyre.findByIdAndUpdate(tid, req.body);
  } catch (err) {
    return next(new HttpError("Nie udalo sie zmienic ceny", 402));
  }
  res.json({ ok: "ok" });
};
