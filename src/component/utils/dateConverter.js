

export const DateConverter =(date) =>{
  return Date.parse(date);
}

export const AgeCalculator = (date) =>{
  let timeNow = Date.now();
  const timeDifference = timeNow - DateConverter(date);
  const age = new Date(timeDifference);
  return Math.abs(age.getUTCFullYear()-1970)

}