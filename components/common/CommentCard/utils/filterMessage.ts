export const filterMessage = (message: string) => {
  if (!!message) {
    let limitLength = 11;
    let messageList = message?.split(" ").slice(0, limitLength);
    if (messageList?.length === limitLength) {
      return [...messageList, "..."].join(" ");
    } else {
      return messageList.join(" ");
    }
  } else {
    return "";
  }
};
