import { defineStore } from 'pinia';

export namespace Dialog {
  export const Result = {
    Right: 'right',
    Left: 'left',
    Cancel: 'cancel',
  } as const;
  export type Result = typeof Result[keyof typeof Result];

  export const Theme = {
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    danger: 'danger',
    warning: 'warning',
    light: 'light',
    dark: 'dark',
    info: 'info',
  } as const;
  export type Theme = typeof Theme[keyof typeof Theme];

  export const BtnTheme = {
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    danger: 'danger',
    warning: 'warning',
    light: 'light',
    dark: 'dark',
    info: 'info',
  } as const;
  export type BtnTheme = typeof BtnTheme[keyof typeof BtnTheme];

  /**
   * Option interface
   */
  export interface Option {
    theme: Theme;
    btnLeft: {
      isShow: boolean;
      label: string;
      btnTheme: BtnTheme;
    };
    btnRight: {
      isShow: boolean;
      label: string;
      btnTheme: BtnTheme;
    };
    btnCancel: {
      isShow: boolean;
      label: string;
      btnTheme: BtnTheme;
    };
  }
  /**
   * Option 初期化
   * Store経由で利用する
   */
  export const InitOption = (): Dialog.Option => {
    return {
      theme: Dialog.BtnTheme.primary,
      btnLeft: {
        isShow: true,
        label: 'No',
        btnTheme: 'primary',
      },
      btnRight: {
        isShow: true,
        label: 'Yes',
        btnTheme: 'primary',
      },
      btnCancel: {
        isShow: true,
        label: 'cancel',
        btnTheme: 'light',
      },
    };
  };
}
/**
 * Dialogを使用する際に使用するオブジェクト
 *
 */
export interface Dialog {
  Show: (message: string, title: string, option?: Dialog.Option) => Promise<Dialog.Result>;
  InitOption: typeof Dialog.InitOption;
  Result: typeof Dialog.Result;
  BtnTheme: typeof Dialog.BtnTheme;
  Theme: typeof Dialog.Theme;
}

export class DialogItem {
  public message: string;
  public title: string;
  public option: Dialog.Option;

  constructor(message: string, title: string, option: Dialog.Option = Dialog.InitOption()) {
    this.message = message;
    this.title = title;
    this.option = option;
  }

  public show = () => {
    return new Promise<Dialog.Result>((resolve, reject) => {
      this.leftClick = () => resolve(Dialog.Result.Left);
      this.rightClick = () => resolve(Dialog.Result.Right);
      this.cancelClick = () => resolve(Dialog.Result.Cancel);
    });
  };

  public leftClick = () => console.log();
  public rightClick = () => console.log();
  public cancelClick = () => console.log();
}



