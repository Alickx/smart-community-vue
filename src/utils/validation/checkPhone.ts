const checkPhone = (phone: string) => {
  const reg = /^1[3456789]\d{9}$/;
  return reg.test(phone);
}
