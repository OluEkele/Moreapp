

const mhoa = document.querySelector('#m_hoa');
const mtotal = document.getElementById('m_total');
const mMortage = document.querySelector('#m_mortage');
const mproperty = document.querySelector('#m_property');
const minsurance = document.getElementById('m_insurance');

const ahoa = document.getElementById('a_hoa');
const atotal = document.getElementById('a_total');
const aMortage = document.getElementById('a_mortage');
const aproperty = document.getElementById('a_property');
const ainsurance = document.getElementById('a_insurance');

const total = document.getElementById('totalInterest');
console.log(total.textContent)
const amount = document.getElementById('amount');          
const interest = document.getElementById('interest_rate');          
const duration = document.getElementById('duration');          
const cal = document.getElementById('calculate');            
const form = document.getElementById('form');            

const display = document.getElementById('display');

const  moreageApp = async(amount, interest_rate, duration_year) =>{
  try{
    const res = await fetch(`https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${amount}&interest_rate=${interest_rate}&duration_years=${duration_year}`,{
      
      headers: { 'X-Api-Key': 'BHpAqekanDwQvwvyJUfTvQ==Dh8KTUAQq3Y7yrNO'},
      contentType: 'application/json',
    
    })
    const data = await res.json();
    
    return data
    
  }catch (error) {
    console.log(error);
  }
}

moreageApp(5000000, 3.5, 30);


cal.addEventListener('click', async(e) =>{
  cal.textContent = 'Loading.....'
  e.preventDefault();
   if(amount.value == '') {
    cal.textContent = 'Calculate'
    return alert('Please enter all input completely');
   }
   else if(duration.value == '') {
    cal.textContent = 'Calculate'
    return alert('Please enter all input completely');
    
   }
   else if(interest.value == ''){
     cal.textContent = 'Calculate';
     return alert('Please enter all input completely');
   }
   else{
    const data = await moreageApp(amount.value, interest.value, duration.value)
     console.log(data)
     cal.innerText = 'Calculate';
     form.reset();
     display.setAttribute("id", '');
     if(data){
      const {annual_payment, monthly_payment, total_interest_paid} = data;
      
      
      
      // monthly payment
      
      mhoa.textContent = `$${monthly_payment.hoa}`;
      mMortage.textContent = `$${monthly_payment.mortgage}`;
      minsurance.textContent = `$${monthly_payment.annual_home_ins}`;
      mproperty.textContent = `$${monthly_payment.property_tax}`;
      mtotal.textContent = `$${monthly_payment.total}`;
      
      // Annual payment
      ahoa.textContent = `$${annual_payment.hoa}`;
      aMortage.textContent = `$${annual_payment.mortgage}`;
      ainsurance.textContent = `$${annual_payment.home_insurance}`;
      aproperty.textContent = `$${annual_payment.property_tax}`;
      atotal.textContent = `$${annual_payment.total}`;
  
      // Total Amount
      total.textContent = `$${total_interest_paid}`;
  
     }else{
      console.log('Something went wrong')
     }
     
     cal.textContent = 'Calculate'
   }
   
   
})



