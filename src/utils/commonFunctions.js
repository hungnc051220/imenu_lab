import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const formatMoney = (value) => {
  let val = (value / 1).toFixed(0).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatPhoneNumber = (input) => {
  if(!input || isNaN(input)) return;
  if(typeof(input) !== 'string') input = input.toString()
  if(input.length === 10){
    return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else if(input.length < 10) {
    return 'was not supplied enough numbers please pass a 10 digit number'
  } else if(input.length > 10) {
    return 'was supplied too many numbers please pass a 10 digit number'
  }else{
    return 'something went wrong'
  }
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
