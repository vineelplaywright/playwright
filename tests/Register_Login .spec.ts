import HomeSteps from '../steps/HomeSteps';
import { test, expect,} from '@playwright/test';
import users from '../test-data/users.json';
import registrationdata from '../test-data/registration_data.json'

const SHEET = "Login2";

let home: HomeSteps;
test.beforeEach(async ({ page }) => {
    home = new HomeSteps(page);
});

test('Register and Login into Account(Deleted if already account exist )', async({page})=>{
  await home.launchApplication();
  const check = await home.checkifaccountexist(users.validUser.username,users.validUser.email);
  if(check)  
    { 
      await home.deleteaccount(users.validUser.email,users.validUser.password);
      await home.checkifaccountexist(users.validUser.username,users.validUser.email);
      await home.continueregistration(registrationdata.registration_data.password,registrationdata.registration_data.userName, registrationdata.registration_data.email, registrationdata.registration_data.day, registrationdata.registration_data.month, registrationdata.registration_data.year, registrationdata.registration_data.firstname, registrationdata.registration_data.lastname, registrationdata.registration_data.company, registrationdata.registration_data.address1, registrationdata.registration_data.country, registrationdata.registration_data.state, registrationdata.registration_data.city, registrationdata.registration_data.zipcode, registrationdata.registration_data.mobile);
      await home.validateAccountCreation();
      
    }
  else
    {
      await home.continueregistration(registrationdata.registration_data.password,registrationdata.registration_data.userName, registrationdata.registration_data.email, registrationdata.registration_data.day, registrationdata.registration_data.month, registrationdata.registration_data.year, registrationdata.registration_data.firstname, registrationdata.registration_data.lastname, registrationdata.registration_data.company, registrationdata.registration_data.address1, registrationdata.registration_data.country, registrationdata.registration_data.state, registrationdata.registration_data.city, registrationdata.registration_data.zipcode, registrationdata.registration_data.mobile);
      await home.validateAccountCreation();
      
    }  
}) 

/*test('Adding Product to Cart', async ({page}) => {
    await home.launchApplication();
    await home.login(users.validUser.email,users.validUser.password);
    await home.addproductstocart();
});*/

