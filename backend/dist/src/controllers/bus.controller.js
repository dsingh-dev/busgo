"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const create = async (req, res, next) => {
    console.log(req.body);
    // const result = await busService.createBus({
    //   email: req.body.email,
    //   password: req.body.password,
    // });
    // res.status(200).json({
    //   user: omitPassword(result.user),
    //   token: result.token,
    // });
};
exports.create = create;
