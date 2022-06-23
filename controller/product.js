import "dotenv/config";
const sk = process.env.STRIPE_SECRET_KEY;

import Stripe from "stripe";

const stripe = new Stripe(sk, {
  apiVersion: "2020-08-27",
});

export const create = async (req, res) => {
  try {
    // id(s), name(s), active(b), description(s), metadata({})
    // default_price_data({ currency, unit_amount_decimal, recurring, tax_behavior, unit_amount })
    // images([url])
    // package_dimensions({ height, length, weight, width })
    // url(s)

    const {
      id,
      name,
      active,
      description,
      metadata,
      default_price_data,
      images,
      package_dimensions,
      url,
    } = req.body;

    const product = await stripe.products.create({
      id,
      name,
      active,
      description,
      metadata,
      default_price_data,
      images,
      package_dimensions,
      url,
    });

    return res.status(201).json(product);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

export const update = async (req, res) => {
  try {
    // id(s), name(s), active(b), description(s), metadata({})
    // default_price_data({ currency, unit_amount_decimal, recurring, tax_behavior, unit_amount })
    // images([url])
    // package_dimensions({ height, length, weight, width })
    // url(s)

    const {
      id,
      name,
      active,
      description,
      metadata,
      default_price_data,
      images,
      package_dimensions,
      url,
    } = req.body;

    const product = await stripe.products.update({
      id,
      name,
      active,
      description,
      metadata,
      default_price_data,
      images,
      package_dimensions,
      url,
    });

    return res.status(201).json(product);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

export const del = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await stripe.products.del(id);

    return res.status(201).json(deleted);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

export const get = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await stripe.products.retrieve(id);

    const price = await stripe.prices.retrieve(product.default_price);

    return res.status(200).json({ ...product, price });
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

export const getAll = async (req, res) => {
  try {
    const { limit } = req.params;

    const products = await stripe.products.list({
      limit,
    });

    return res.status(200).json(products);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};
