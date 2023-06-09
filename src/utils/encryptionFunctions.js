import CryptoJS from "crypto-js";

const secretPass = process.env.REACT_APP_SECRET_SEGRETO;

const encryptData = (stringToBeCrypted) => {
  try {
    return CryptoJS.AES.encrypt(stringToBeCrypted, secretPass).toString();
  } catch (error) {
    console.error("Stringa di crypt non trovata!");
  }
};

const decryptData = (stringToBeDecrypted) => {
  const bytes = CryptoJS.AES.decrypt(stringToBeDecrypted, secretPass);
  const data = bytes.toString(CryptoJS.enc.Utf8);
  return data;
};

export { encryptData, decryptData };
