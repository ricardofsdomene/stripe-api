import "dotenv/config";
const sk = process.env.STRIPE_SECRET_KEY;

import Stripe from "stripe";

const stripe = new Stripe(sk, {
  apiVersion: "2020-08-27",
});

export const create = async (req, res) => {
  try {
    const { product } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "boleto"],
      line_items: [
        {
          name: product.name,
          amount: product.amount,
          currency: "BRL",
          quantity: product.quantity,
          images: product.images,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/cart/success",
      cancel_url: "http://localhost:3000/cart/cancel",
    });

    return res.status(201).json(session);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};
