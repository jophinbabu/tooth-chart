// components/toothImages.js

export const getToothImage = (toothId) => {
  const images = {
    1: require('../assets/images/1.png'),
    2: require('../assets/images/2.png'),
    3: require('../assets/images/3.png'),
    4: require('../assets/images/4.png'),
    5: require('../assets/images/5.png'),
    6: require('../assets/images/6.png'),
    7: require('../assets/images/7.png'),
    8: require('../assets/images/8.png'),
    9: require('../assets/images/9.png'),
    10: require('../assets/images/10.png'),
    11: require('../assets/images/11.png'),
    12: require('../assets/images/12.png'),
    13: require('../assets/images/13.png'),
    14: require('../assets/images/14.png'),
    15: require('../assets/images/15.png'),
    16: require('../assets/images/16.png'),
    17: require('../assets/images/17.png'),
    18: require('../assets/images/18.png'),
    19: require('../assets/images/19.png'),
    20: require('../assets/images/20.png'),
    21: require('../assets/images/21.png'),
    22: require('../assets/images/22.png'),
    23: require('../assets/images/23.png'),
    24: require('../assets/images/24.png'),
    25: require('../assets/images/25.png'),
    26: require('../assets/images/26.png'),
    27: require('../assets/images/27.png'),
    28: require('../assets/images/28.png'),
    29: require('../assets/images/29.png'),
    30: require('../assets/images/30.png'),
    31: require('../assets/images/31.png'),
    32: require('../assets/images/32.png'),
  };

  return images[toothId] || null;
};
