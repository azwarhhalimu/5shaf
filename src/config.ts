//let host: string = "http://localhost:2001";
let host: string = "https://azwarhalimu.biz.id";
const baseUrl = (url: string): string => {
  let result: string = host + "/" + url;
  return result;
};
export default baseUrl;
