import { test, Page, Locator } from "@playwright/test";

export default class UIElementActions {
  private _locator!: Locator;
  private _selector!: string;
  private _description!: string;

  constructor(private page: Page) {}

  /**
   * Bind by CSS/XPath selector
   */
  public setElement(selector: string, description: string) {
    this._selector = selector;
    this._locator = this.page.locator(selector);
    this._description = description;
    return this;
  }

  /**
   * Bind by an existing Locator
   */
  public setLocator(locator: Locator, description: string) {
    this._locator = locator;
    this._selector = "<locator>";
    this._description = description;
    return this;
  }

  public getLocator(): Locator {
    return this._locator;
  }

  public get description(): string {
    return this._description;
  }

  /**
   * Waits until the bound locator is visible (up to sec seconds) and returns true/false.
   */
  public async isVisible(sec: number): Promise<boolean> {
    let visibility = false;

    await test.step(`Checking if ${this._description} is visible`, async () => {
      try {
        await this._locator.waitFor({
          state: "visible",
          timeout: sec * 1000,
        });
        // If waitFor succeeds, we can safely assume it is visible.
        visibility = await this._locator.isVisible();
        // Optional: console.log for debugging
        // console.log(`Visibility for "${this._description}": ${visibility}`);
      } catch (error) {
        visibility = false;
      }
    });

    return visibility;
  }

  /**
   * Click helper (optional)
   */
  public async click(timeoutSecs: number = 10) {
    await test.step(`Click ${this._description}`, async () => {
      await this._locator.click({ timeout: timeoutSecs * 1000 });
    });
  }

  public async check(timeoutSecs: number = 10) {
    await test.step(`checking ${this._description}`, async () => {
      await this._locator.check({ timeout: timeoutSecs * 1000 });
    });
  }

   /**
   * Select the dropdown by Label
   * @param text
   * @returns
   */
  public async selectByVisibleText(text: string) {
    await test.step(`Selecting text ${text} from ${this.description}`, async () => {
      await this._locator.selectOption({ label: text });
    });
    return this;
  }

   /**
   * Gets the text content
   * @returns
   */
  public async getTextContent(): Promise<string> {
    let content!: string;
    await test.step(`Getting text content of ${this.description}`, async () => {
      const element = this.getLocator();
      await element.waitFor();
      //content = (await element.textContent()).trim();
      content = (await element.textContent() || '').trim();
    });
    return content;
  }
}