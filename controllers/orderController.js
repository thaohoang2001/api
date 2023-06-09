import ChildPitch from "../models/ChildPitch.js";
import Order from "../models/Order.js";
import Stripe from "stripe";
import OrderMatch from "../models/OrderMatch.js";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(
    process.env.STRIPE
  );

  const orders = await Order.findById(req.params.ordersId);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: orders?.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    
  });


  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
}


export const createOrder = async (req, res, next) => {

  const orderMatch = await OrderMatch.findById(req.params.orderMatchId);

  const newOrders = new Order({
    orderMatchId: orderMatch._id,
    childPitchId: orderMatch.childPitchId,
    userId: orderMatch.userId,
    userIdMatch: orderMatch.userIdMatch,
    nameChildPitchOrder: orderMatch.childPitchName,
    price: orderMatch.priceChildPitch,
    TimeFrame: orderMatch.timeFrame,
    DateOrder: orderMatch.dateChildPitch,
    findMatch: orderMatch.findMatch,
  })
  await newOrders.save();
  console.log("newOrders: ", newOrders);

  res.status(200).send(newOrders);
}

export const confirm = async (req, res, next) => {
  const orderId = req.params.ordersId;
  try {
    const orders = await Order.findByIdAndUpdate(
      orderId,
      { $set: {isCompleted: true,} },
      { new: true }
    );
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};


// export const confirm = async (req, res, next) => {
//   try {
//     const orders = await Order.findOneAndUpdate(
//       {
//         payment_intent: req.body.payment_intent,
//       },
//       {
//         $set: {
//           isCompleted: true,
//         },
//       }
//     );

//     res.status(200).send("Order has been confirmed.");
//   } catch (err) {
//     next(err);
//   }
// };

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
}

export const getOrder = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId: userId });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
}

// export const deleteOrder = async (req, res, next) => {
//   try {
//     const orderMatchId = req.params.orderMatchId;
//     await Order.findByIdAndDelete(req.params.id, {orderMatchId: orderMatchId});
//     res.status(200).json("Order has been deleted");
//   } catch (err) {
//     next(err);
//   }
// }

export const deleteOrder = async (req, res, next) => {
  try {
    // const orderMatchId = req.params.orderMatchId;
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (err) {
    next(err);
  }
}