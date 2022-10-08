
export const registerCheck = (arg,status,repeat) =>{
  console.log(status);
  console.log(repeat);
  if (status===0){
    arg.setState({Token:false});
    return;
  }
  if (repeat===true){
    arg.setState({RepeatUsername:false});
    return;
  }





}
