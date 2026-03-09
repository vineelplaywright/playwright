import test, { Page } from "@playwright/test";
import UIActions from "../framework/playwright actions/UIActions";
import HomePageConstants from "../Constants/HomePageConstants";
import HomePage from "../Pages/HomePage";
import Assert from "../framework/playwright actions/assert";

export default class HomeSteps {   
     private ui: UIActions;

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }

    /**
     * Launch the Application
     */
    public async launchApplication() {
        await test.step(`Launching the application`, async () => {
            await this.ui.goto(process.env.BASE_URL!, HomePageConstants.HOME_PAGE);
        });
    }

     /**
     * Log into the application
     * @param userName 
     * @param password 
     */
    public async login(userName: string, password: string) {
        await test.step(`Login to application credentials as ${userName} & ${password}`, async () => {
            await this.enterLoginDetails(userName, password);
        });        
    }
    

     /**
     * Log into the application
     * @param userName 
     * @param email 
     * @returns
     */
    public async checkifaccountexist(userName: string, email: string) {
      return  await test.step(`Login to application credentials as ${userName} & ${email}`, async () => {
           return  await this.enterinitialRegisterDetails(userName, email);
        });        
    }
    
    /**
     * Enter login details
     * @param userName 
     * @param email 
     * @returns boolean -> true if the message is visible, else false
     */
    public async enterinitialRegisterDetails(userName: string, email: string) {
       return await test.step(`Enter login credentials as ${userName} & ${email}`, async () => {
           await this.ui.editBox(HomePage.USERNAME_NAME_TEXTBOX, HomePageConstants.USER_NAME).fill(userName);
           await this.ui.editBox(HomePage.EMAIL_NAME_TEXTBOX, HomePageConstants.EMAIL_NAME).fill(email);            
           await this.ui.element(HomePage.SIGN_UP_BUTTON, HomePageConstants.SIGN_UP_BUTTON).click();
           const shown = await this.ui.waitForPTextVisible(HomePage.EMAIL_ALREADY_EXISTS_TEXT, 5);
           return shown;
     });
}

    

     /**
     * Enter login details
     * @param userName 
     * @param password 
     */
    public async enterLoginDetails(userName: string, password: string) {
        await test.step(`Enter login credentials as ${userName} & ${password}`, async () => {
            await this.ui.editBox(HomePage.LOGIN_EMAIL_NAME_TEXTBOX, HomePageConstants.USER_NAME).fill(userName);
            await this.ui.editBox(HomePage.PASSWORD_TEXTBOX, HomePageConstants.PASSWORD).fill(password);
            await this.ui.element(HomePage.SIGN_IN_BUTTON, HomePageConstants.SIGN_IN_BUTTON).click();
            
        });
    }

    /**
     * Enter login details
     * @param userName 
     * @param password 
     */
    public async deleteaccount(userName: string, password: string) {
        await test.step(`Enter login credentials as ${userName} & ${password}`, async () => {
            await this.ui.editBox(HomePage.LOGIN_EMAIL_NAME_TEXTBOX, HomePageConstants.USER_NAME).fill(userName);
            await this.ui.editBox(HomePage.PASSWORD_TEXTBOX, HomePageConstants.PASSWORD).fill(password);
            await this.ui.element(HomePage.SIGN_IN_BUTTON, HomePageConstants.SIGN_IN_BUTTON).click();
            await this.ui.element(HomePage.DELETE_ACCOUNT, HomePageConstants.DELETE_ACCOUNT).click();
            await this.ui.waitForPTextVisible(HomePage.DELETE_ACCOUNT_CONFIRMATION, 5);
            await this.ui.element(HomePage.LOGIN_ACCOUNT, HomePageConstants.LOGIN_ACCOUNT).click();
        });
    }

    public async continueregistration(password:string,userName: string, email: string, day:string,month:string,year:string,firstname:string,lastname:string,company:string,address1:string,country:string,state:string,city:string,zipcode:string,mobile:string)
    {
         await test.step(`Creating the Account for ${userName} & ${email}`, async () => {
           await this.ui.checkbox(HomePage.SELECT_TITLE, HomePageConstants.SELECT_TITLE).check();
           await this.ui.editBox(HomePage.PASSWORD_TEXTBOX, HomePageConstants.PASSWORD).fill(password);
           await this.ui.element(HomePage.SELECT_DAY, HomePageConstants.SELECT_DAY).selectByVisibleText(day);
           await this.ui.element(HomePage.SELECT_MONTH, HomePageConstants.SELECT_MONTH).selectByVisibleText(month);
           await this.ui.element(HomePage.SELECT_YEARS, HomePageConstants.SELECT_YEARS).selectByVisibleText(year);
           await this.ui.editBox(HomePage.FIRST_NAME_TEXTBOX, HomePageConstants.FIRST_NAME_TEXTBOX).fill(firstname);
           await this.ui.editBox(HomePage.LAST_NAME_TEXTBOX, HomePageConstants.LAST_NAME_TEXTBOX).fill(lastname);
           await this.ui.editBox(HomePage.COMPANY_TEXTBOX, HomePageConstants.COMPANY_TEXTBOX).fill(company);
           await this.ui.editBox(HomePage.ADDRESS1__TEXTBOX, HomePageConstants.ADDRESS1__TEXTBOX).fill(address1);
           await this.ui.editBox(HomePage.SELECT_COUNTRY, HomePageConstants.SELECT_COUNTRY).selectByVisibleText(country);
           await this.ui.editBox(HomePage.STATE_TEXTBOX, HomePageConstants.STATE_TEXTBOX).fill(state);
           await this.ui.editBox(HomePage.CITY_TEXTBOX, HomePageConstants.CITY_TEXTBOX).fill(city);
           await this.ui.editBox(HomePage.ZIPCODE_TEXTBOX, HomePageConstants.ZIPCODE_TEXTBOX).fill(zipcode);
           await this.ui.editBox(HomePage.MOBILE_TEXTBOX, HomePageConstants.MOBILE_TEXTBOX).fill(mobile);
           await this.ui.element(HomePage.CREATE_ACCOUNT_BUTTON, HomePageConstants.CREATE_ACCOUNT_BUTTON).click();
           //await this.ui.element(HomePage.LOGIN_ACCOUNT, HomePageConstants.LOGIN_ACCOUNT).click();
           
         });
    }


    /**
     * Validate logged in user
     * @param userName 
     */
    public async validateAccountCreation() {
        await test.step(`Verify that account is successfully created`, async () => {
            const user = await this.ui.element(HomePage.ACCOUNT_CREATED_TEXT, HomePageConstants.ACCOUNT_CREATED_TEXT).getTextContent();
            await Assert.assertEquals(user,  HomePageConstants.ACCOUNT_CREATED_TEXT,HomePageConstants.ACCOUNT_CREATED_TEXT);
           await this.ui.element(HomePage.LOGIN_ACCOUNT, HomePageConstants.LOGIN_ACCOUNT).isVisible(5);
        });        
    }

    public async addproductstocart()
    {
        await test.step('Adding products to cart', async()=>{
            const deleteaccounttext = await this.ui.element(HomePage.DELETE_ACCOUNT, HomePageConstants.DELETE_ACCOUNT).getTextContent();
            await Assert.assertEquals(deleteaccounttext,  "Delete Account","Delete Account");
        await this.ui.element(HomePage.ProductID_7_CLICK, HomePageConstants.ProductID_7_CLICK).click();
        await this.ui.element(HomePage.CONTINUE_SHOPPING, HomePageConstants.CONTINUE_SHOPPING).click();
        await this.ui.element(HomePage.ProductID_BLUETOP_CLICK, HomePageConstants.ProductID_BLUETOP_CLICK).click();
        });
    }

}
