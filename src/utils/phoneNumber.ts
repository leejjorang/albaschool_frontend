export const formatPhoneNumber = (number: string) => {
  const phoneNumber = number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  return phoneNumber;
}