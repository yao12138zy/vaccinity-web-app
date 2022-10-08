
export const logincheck = (arg,type) =>{
  console.log(type);
  if (type==="user"){
    arg.setState({token:true});
      return;
  }
  else if (type==="admin"){
    arg.setState({token:true});
    return;
  }
  else{
    arg.setState({token:false});
    return;
  }

}
