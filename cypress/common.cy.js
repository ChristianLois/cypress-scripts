import { faker } from '@faker-js/faker';

// For the Create Center
export function generateCenterDetails (){
  const centerName = faker.name.lastName();
  return centerName;
}


export function generateClientDetails (hasMiddle, {minDate = 1900, maxDate = 2000, mode='year', activate=2}={}){
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  var middleName = ' ';
  var fullName = firstName+' '+lastName;
  if(hasMiddle) {
    middleName = faker.name.lastName();
    fullName = firstName+' '+middleName+' '+lastName;
  }
  
  const clientDetails = {
    firstName : firstName,
    middleName : middleName,
    lastName : lastName,
    fullName : fullName,
    birthDate : String(faker.date.birthdate({min: minDate, max: maxDate, mode: mode})),
    mobileNo : faker.phone.number('09#########'),
    randInteger : faker.random.numeric(5),
    maxWords: faker.lorem.sentence(257),
    edittedFirstName: faker.name.firstName(),
    edittedLastName: faker.name.lastName(),
    pastActivationDate : String(faker.date.past(activate)),
    centerName : faker.company.catchPhraseAdjective(),
    groupName: faker.commerce.department()
  }
  return clientDetails;
}