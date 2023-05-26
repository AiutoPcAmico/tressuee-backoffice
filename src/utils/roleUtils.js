import { sessionInfo } from "../stores/sessionInfo";
import { store } from "../stores/store";
import { decryptData, encryptData } from "./encryptionFunctions";

function getUserRole() {
  const cryptedText = store.getState(sessionInfo).sessionInfo.user.role;
  const plainText = decryptData(cryptedText);
  return plainText;
}

function saveUserRoleEncrypted(role) {
  const encryptedText = encryptData(role);
  return encryptedText;
}

export { getUserRole, saveUserRoleEncrypted };
