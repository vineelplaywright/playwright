export default class HomePage {
   static readonly HOME_PAGE = "Automation Exercise - Signup / Login";
   static readonly EMAIL_NAME_TEXTBOX = "form:has-text('Signup') input[name='email']";
   static readonly LOGIN_EMAIL_NAME_TEXTBOX = "[data-qa='login-email']";
   static readonly USERNAME_NAME_TEXTBOX = "[name='name']";
   static readonly PASSWORD_TEXTBOX = "[name='password']";
   static readonly SIGN_IN_BUTTON="[data-qa='login-button']"
   static readonly SIGN_UP_BUTTON="[data-qa='signup-button']"
   static readonly DELETE_ACCOUNT="a[href='/delete_account']";
   static readonly LOGIN_ACCOUNT="a[href='/login']";
   static readonly DELETE_ACCOUNT_CONFIRMATION="[data-qa='account-deleted']";

   static readonly SELECT_TITLE="[id='id_gender1']";
   static readonly SELECT_DAY="[id='days']";
   static readonly SELECT_MONTH="[id='months']";
   static readonly SELECT_YEARS="[id='years']";
   static readonly FIRST_NAME_TEXTBOX="[id='first_name']";
   static readonly LAST_NAME_TEXTBOX="[id='last_name']";
   static readonly COMPANY_TEXTBOX="[id='company']";
   static readonly ADDRESS1__TEXTBOX="[id='address1']";
   static readonly SELECT_COUNTRY="[id='country']";
   static readonly STATE_TEXTBOX="[id='state']";
   static readonly CITY_TEXTBOX="[id='city']";
   static readonly ZIPCODE_TEXTBOX="[id='zipcode']";
   static readonly MOBILE_TEXTBOX="[id='mobile_number']";
   static readonly CREATE_ACCOUNT_BUTTON="[data-qa='create-account']";
   static readonly ACCOUNT_CREATED_TEXT="[data-qa='account-created']";
   //static readonly EMAIL_ALREADY_EXISTS="//*[@id='form']/div/div/div[3]/div/form/p"
    static readonly EMAIL_ALREADY_EXISTS_TEXT = "Email Address already exist!";
    static readonly ProductID_7_CLICK="//a[@data-product-id='7']";
    static readonly ProductID_BLUETOP_CLICK="//p[normalize-space()='Blue Top']/following-sibling::a[contains(@class,'add-to-cart')]";
    static readonly CONTINUE_SHOPPING="//button[normalize-space(text())='Continue Shopping'";
}
