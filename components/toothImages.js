// components/toothImages.js

export const getToothImage = (toothId) => {
  const images = {
    URTM: require('../assets/images/URTM.png'),
    URSM: require('../assets/images/URSM.png'),
    URFM: require('../assets/images/URFM.png'),
    URSP: require('../assets/images/URSP.png'),
    URFP: require('../assets/images/URFP.png'),
    URC: require('../assets/images/URC.png'),
    URLI: require('../assets/images/URLI.png'),
    URCI: require('../assets/images/URCI.png'),
    ULCI: require('../assets/images/ULCI.png'),
    ULLI: require('../assets/images/ULLI.png'),
    ULC: require('../assets/images/ULC.png'),
    ULFP: require('../assets/images/ULFP.png'),
    ULSP: require('../assets/images/ULSP.png'),
    ULFM: require('../assets/images/ULFM.png'),
    ULSM: require('../assets/images/ULSM.png'),
    ULTM: require('../assets/images/ULTM.png'),
    LLTM: require('../assets/images/LLTM.png'),
    LLSM: require('../assets/images/LLSM.png'),
    LLFM: require('../assets/images/LLFM.png'),
    LLSP: require('../assets/images/LLSP.png'),
    LLFP: require('../assets/images/LLFP.png'),
    LLC: require('../assets/images/LLC.png'),
    LLLI: require('../assets/images/LLLI.png'),
    LLCI: require('../assets/images/LLCI.png'),
    LRCI: require('../assets/images/LRCI.png'),
    LRLI: require('../assets/images/LRLI.png'),
    LRC: require('../assets/images/LRC.png'),
    LRFP: require('../assets/images/LRFP.png'),
    LRSP: require('../assets/images/LRSP.png'),
    LRFM: require('../assets/images/LRFM.png'),
    LRSM: require('../assets/images/LRSM.png'),
    LRTM: require('../assets/images/LRTM.png'),
  };

  return images[toothId] || null;
};
