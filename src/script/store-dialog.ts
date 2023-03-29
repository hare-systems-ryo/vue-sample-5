import dayjs from 'dayjs';

import { defineStore } from 'pinia';
import { Dialog, DialogItem } from './dialog';

export interface StoreState {
  penndingList: {
    ts: string;
    data: DialogItem;
  }[];
}
export const useStoreDialog = defineStore('storeDialog', {
  state: (): StoreState => {
    return {
      penndingList: [],
    };
  },
  actions: {
    useDialog(): Dialog {
      return {
        Show: async (message: string, title: string, option: Dialog.Option = Dialog.InitOption()) => {
          const daialogItem = new DialogItem(message, title, option);
          if (!option.btnLeft.isShow && !option.btnRight.isShow && !option.btnCancel.isShow) {
            console.error('閉じれるボタンが一つもありませんっ！！');
            return Dialog.Result.Cancel;
          }
          this.penndingList.push({ ts: dayjs().format('x') + '_' + Math.random(), data: daialogItem });
          return await daialogItem.show();
        },
        InitOption: Dialog.InitOption,
        Result: Dialog.Result,
        BtnTheme: Dialog.BtnTheme,
        Theme: Dialog.Theme,
      };
    },
    remove(ts: string) {
      this.penndingList = this.penndingList.filter((row) => row.ts !== ts);
    },
  },
});
