const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
    endpoint: {
      orders: 'orders',
    },
  },
  popupMessages: {
    orderConfirm: 'Order successfull.',
    orderIncomplete:
      'Order data is incomplete. Please fill empty form fields and try again.',
  },
};

export default settings;
