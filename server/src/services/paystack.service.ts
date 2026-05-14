import axios from 'axios';

import {
  PAYSTACK_BASE_URL,
  PAYSTACK_SECRET_KEY,
  PAYSTACK_CALLBACK_URL,
} from '../config/env';

export const initializePayment = async ({
  email,
  amount,
  orderId,
}: {
  email: string;

  amount: number;

  orderId: string;
}) => {
  const response = await axios.post(
    `${PAYSTACK_BASE_URL}/transaction/initialize`,
    {
      email,

      amount: amount * 100,

      callback_url: PAYSTACK_CALLBACK_URL,

      metadata: {
        orderId,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,

        'Content-Type': 'application/json',
      },
    },
  );

  return response.data.data;
};
