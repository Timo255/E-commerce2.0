const {
  user,
  orderDetail,
  orderItem,
  shipping,
  shippingAddress,
} = require("../../models");

const handleOrders = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await user.findOne({ where: { refreshToken } });
    const orderData = await orderDetail.findAll({
      where: { userId: foundUser.id },
      include: [orderItem],
    });

    if (orderData === null) {
      return res.status(204).json({ msg: "no orders" });
    }
    res.status(200).json({ orderData });
  } catch (err) {
    console.log(err);
  }
};

const handleDeleteOrder = async (req, res) => {
  const { id } = req.params;
  const intId = Number(id);

  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(403);

  try {
    const refreshToken = cookies.jwt;
    const foundUser = await user.findOne({ where: { refreshToken } });

    if (!foundUser) return res.sendStatus(403);

    let shippingId = await shipping.findOne({
      where: { orderDetailId: intId },
    });

    await orderDetail.destroy({
      where: { userId: foundUser.id },
    });
    await orderItem.destroy({ where: { orderDetailId: intId } });
    await shipping.destroy({ where: { orderDetailId: intId } });
    await shippingAddress.destroy({ where: { shippingId: shippingId.id } });

    res.status(200).json({ msg: "item deleted" });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handleOrders,
  handleDeleteOrder,
};
