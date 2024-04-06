function isUrl(str: string) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#]*\.[^\s]*$/i;
  return urlPattern.test(str);
}

export default isUrl;
