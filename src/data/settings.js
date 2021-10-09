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
      personData: {
        name: 'Amanda',
        phoneNumber: '678.243.8455',
      },
      timeLimits: {
        from: '8:00',
        to: '12:00',
      },
    },
    afternoon: {
      personData: {
        name: 'Tobias',
        phoneNumber: '278.443.6443',
      },
      timeLimits: {
        from: '12:00',
        to: '16:00',
      },
    },
    evening: {
      personData: {
        name: 'Helena',
        phoneNumber: '167.280.3970',
      },
      timeLimits: {
        from: '16:00',
        to: '22:00',
      },
    },
    night: {
      message: 'The office opens at 8:00 UTC',
      timeLimits: {
        from: '22:00',
        to: '8:00',
      },
    },
  },
};

export default settings;
