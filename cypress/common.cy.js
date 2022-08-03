import { faker } from '@faker-js/faker';

export const firstName = faker.name.firstName();
export const lastName = faker.name.lastName();

export const edittedFirstName = faker.name.firstName();
export const edittedLastName = faker.name.lastName();

// For the Create Client
let randFirstName = faker.name.firstName();
let randLastName = faker.name.lastName();
let fullname = randFirstName.concat(" ", randLastName);

// For the Create Center
export const centerName = faker.name.lastName();

export var clientDetails = {
  firstName : randFirstName,
  middleName : faker.name.lastName(),
  lastName : randLastName,
  fullName: fullname,
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