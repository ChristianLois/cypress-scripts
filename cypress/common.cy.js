import { faker } from '@faker-js/faker';

// For the Create Center
export const centerName = faker.name.lastName();

export function generateClientDetails (hasMiddle){
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
    birthDate : String(faker.date.birthdate()),
    mobileNo : faker.phone.number('09#########'),
    randInteger : faker.random.numeric(5),
    maxWords: faker.lorem.sentence(257),
    edittedFirstName: faker.name.firstName(),
    edittedLastName: faker.name.lastName(),
    pastActivationDate : String(faker.date.past()),
    centerName : faker.company.catchPhraseAdjective(),
    groupName: faker.commerce.department()
  }
  return clientDetails;
}