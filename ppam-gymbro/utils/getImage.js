import CryptoJS from 'crypto-js';

export function getImageNumber(inputString) {
    const maxNumber = 10;

    
    const hash = CryptoJS.SHA256(inputString).toString(CryptoJS.enc.Hex);

    
    const hashNumber = parseInt(hash.substring(0, 8), 16);

    
    const imageNumber = Math.abs(hashNumber) % maxNumber;

    return imageNumber; 
  }

export const referenceImage = {
    1: require('@/assets/profile/1.png'),
    2: require('@/assets/profile/2.png'),
    3: require('@/assets/profile/3.png'),
    4: require('@/assets/profile/4.png'),
    5: require('@/assets/profile/5.png'),
    6: require('@/assets/profile/6.png'),
    7: require('@/assets/profile/7.png'),
    8: require('@/assets/profile/8.png'),
    9: require('@/assets/profile/9.png'),
    10: require('@/assets/profile/10.png'),
}

export const referenceUserImage = {
    1: require('@/assets/profile_user/1.png'),
    2: require('@/assets/profile_user/2.png'),
    3: require('@/assets/profile_user/3.png'),
    4: require('@/assets/profile_user/4.png'),
    5: require('@/assets/profile_user/5.png'),
    6: require('@/assets/profile_user/6.png'),
    7: require('@/assets/profile_user/7.png'),
    8: require('@/assets/profile_user/8.png'),
    9: require('@/assets/profile_user/9.png'),
    10: require('@/assets/profile_user/10.png'),
}