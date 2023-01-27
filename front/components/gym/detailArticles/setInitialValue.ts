const setInitialValue = (gymInfo:any) => {
  const field1 = document.querySelector('#article_title') as HTMLInputElement 
  const field2 = document.querySelector('#article_content')as HTMLTextAreaElement 
  const field3 = document.querySelector('#article_contact')as HTMLInputElement 
  const field_addr_1 = document.querySelector('#article_address_1') as HTMLInputElement 
  const field_addr_2 = document.querySelector('#article_address_2') as HTMLInputElement 
  const field_addr_3 = document.querySelector('#article_address_3') as HTMLInputElement 
  const field_addr_4 = document.querySelector('#article_address_4') as HTMLInputElement 
  const field_addr_5 = document.querySelector('#article_address_5') as HTMLInputElement 
  const field4 = document.querySelector('#article_price')as HTMLInputElement 
  const field5 = document.querySelector('#article_openingHours')as HTMLInputElement 
  const field7 = document.querySelector('#article_openingPeriod_1')as HTMLInputElement 
  const field8 = document.querySelector('#article_openingPeriod_2')as HTMLInputElement 

  field1.value = gymInfo.title
  field2.value = gymInfo.content
  field3.value = gymInfo.contact
  field_addr_1.value = gymInfo.address[0].val
  field_addr_2.value = gymInfo.address[1].val
  field_addr_3.value = gymInfo.address[2].val
  field_addr_4.value = gymInfo.address[3].val
  field_addr_5.value = gymInfo.address[4].val
  field4.value = gymInfo.price
  field5.value = gymInfo.openingHours
  field7.value = `${gymInfo.openingPeriod[0]}`
  field8.value = `${gymInfo.openingPeriod[1]}`
}
export default setInitialValue