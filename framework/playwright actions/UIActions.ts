import { test, Page } from "@playwright/test";
import UIElementActions from "./UIElementActions";
import EditBoxActions from "./EditBoxActions";
import CheckBoxActions from "./CheckBoxActions";


export default class UIActions {

private elementAction: UIElementActions;
private editBoxAction: EditBoxActions;
private checkboxAction: CheckBoxActions;

 constructor(private page: Page) {
    this.elementAction = new UIElementActions(page);
    this.editBoxAction = new EditBoxActions(page);
    this.checkboxAction = new CheckBoxActions();
   
  }
     /**
   * Returns the instance of UIElements actions
   * @param selector
   * @param description
   * @returns
   */
  public element(selector: string, description: string) {
    return this.elementAction.setElement(selector, description);
  }

    /**
   * Returns the instance of UIElements actions
   * @param selector
   * @param description
   * @returns
   */

public pMessage(selector: string, description: string) {
    // Return a wrapper bound to that selector so caller can invoke .isVisible(sec)
    return this.elementAction.setElement(selector, description);
  }

  
/**
   * Convenience helper: Wait for a <p> that contains specific text to be visible.
   * Useful when the <p> is dynamic but the message text is known.
   * @param text The text inside <p>
   * @param timeoutSecs default 10s
   * @returns boolean
   */
  public async waitForPTextVisible(text: string, timeoutSecs: number = 10): Promise<boolean> {
    return await test.step(`Wait for <p> with text "${text}" to be visible`, async () => {
      try {
        const loc = this.page.locator(`p:has-text("${text}")`);
        await loc.waitFor({ state: "visible", timeout: timeoutSecs * 1000 });
        return true;
      } catch {
        return false;
      }
    });
  }



      /**
   * Returns the instance of UIElements actions
   * @param selector
   * @param description
   * @returns
   */
  
public getByText(selector: string, description: string) {
  // Text-based locator
  return this.elementAction.setLocator(
    this.page.getByText(selector),
    description
  );
}


   /**
   * Navigate to specified URL
   * @param URL
   * @param description
   */
  public async goto(URL: string, description: string) {
    await test.step(`Navigate to ${description}`, async () => {
      await this.page.goto(URL);
    });
  }

   /**
   * Returns the instance of editbox actions
   * @param selector
   * @param description
   * @returns
   */
  public editBox(selector: string, description: string) {
    return this.editBoxAction.setEditBox(selector, description);
  }

  /**
   * Returns when the required dom content is in loaded state.
   */
  public async waitForDomContentLoaded() {
    await test.step(`Waiting for load event`, async () => {
      await this.page.waitForLoadState("domcontentloaded", { timeout: 15000 });
    });
  }

   /**
   * Returns the instance of CheckBox actions
   * @param selector
   * @param description
   * @returns
   */
  public checkbox(selector: string, description: string) {
    return this.checkboxAction.setLocator(
      this.elementAction.setElement(selector, description).getLocator(),
      description,
    );
  }

}