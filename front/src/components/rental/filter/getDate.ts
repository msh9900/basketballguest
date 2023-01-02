const getDate = (str:string) => {
  const dt = new Date();   
  let a = dt.getFullYear()+''
  let b = (dt.getMonth()+1) + ''
  let c = dt.getDate()+'';
  let d = (dt.getDate()+1) + '';

  if(b.length<2) b ='0' + b;
  if(c.length<2) c ='0' + c;
  if(d.length<2) d ='0' + d;

  const today:string = a+'-'+b+'-'+c
  const tomorrow:string = a+'-'+b+'-'+d
  if(str === 'today') return today
  else return tomorrow
}

export default getDate