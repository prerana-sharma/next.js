export const replaceString = (str: string, replaceTo: string, replaceBy: string) => {
    return str.replace(replaceTo, replaceBy);
};

export const EMAIL_VALIDATION =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;