import "dotenv/config";
const sk = process.env.STRIPE_SECRET_KEY;

import Stripe from "stripe";

const stripe = new Stripe(sk, {
  apiVersion: "2020-08-27",
});

export const create = async (req, res) => {
  try {
    // id(s), address({ city, country, line1, line2, postal_code, state }), description(s), email(s), metadata({ }), name(s), phone(s), shipping({ address, name, phone }),

    const { id, address, description, email, metadata, name, phone, shipping } =
      req.body;

    const customer = await stripe.customers.create({
      id,
      address,
      description,
      email,
      metadata,
      name,
      phone,
      shipping,
    });

    return res.status(201).json(customer);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

export const update = async (req, res) => {
  try {
    // id(s), address({ city, country, line1, line2, postal_code, state }), description(s), email(s), metadata({ }), name(s), phone(s), shipping({ address, name, phone }),

    const { id, address, description, email, metadata, name, phone, shipping } =
      req.body;

    const customer = await stripe.customers.update({
      id,
      address,
      description,
      email,
      metadata,
      name,
      phone,
      shipping,
    });

    return res.status(201).json(customer);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

export const del = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await stripe.customers.del(id);

    return res.status(201).json(deleted);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

export const get = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await stripe.customers.retrieve(id);

    return res.status(200).json(customer);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

export const getAll = async (req, res) => {
  try {
    const { limit } = req.params;

    const customers = await stripe.customers.list({
      limit,
    });

    return res.status(200).json(customers);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};
