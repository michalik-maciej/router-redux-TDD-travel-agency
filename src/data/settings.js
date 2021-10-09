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
  shifts: {
    morning: {
      personData: [
        'Alpha',
        '111.111.1111',
      ],
      timeLimits: {
        from: '8:00',
        to: '12:00',
      },
    },
    afternoon: {
      personData: [
        'Beta',
        '000.000.0000',
      ],
      timeLimits: {
        from: '12:00',
        to: '16:00',
      },
    },
    evening: {
      personData: [
        'Gamma',
        '222.222.2222',
      ],
      timeLimits: {
        from: '16:00',
        to: '22:00',
      },
    },
    night: {
      message: [
        'The office opens at 8:00 UTC',
      ],
      timeLimits: {
        from: '22:00',
        to: '8:00',
      },
    },
  },
};

export default settings;
