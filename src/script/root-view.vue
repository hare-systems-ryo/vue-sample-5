<script setup lang="ts">
import dayjs from 'dayjs';

import { reactive, ref, computed, Ref } from 'vue';
import VcDialog from './vc-dialog.vue';
import { useStoreDialog } from './store-dialog';
import Prism from 'prismjs';
//-----------------------------
const storeDialog = useStoreDialog();
const Dialog = storeDialog.useDialog();
//-----------------------------
interface State {
  theme: keyof typeof Dialog['Theme'];
  title: string;
  message: string;
  btnLeft: {
    isShow: boolean;
    label: string;
    btnTheme: keyof typeof Dialog['BtnTheme'];
  };
  btnRight: {
    isShow: true;
    label: string;
    btnTheme: keyof typeof Dialog['BtnTheme'];
  };
  btnCancel: {
    isShow: true;
    label: string;
    btnTheme: keyof typeof Dialog['BtnTheme'];
  };
}
const state = reactive<State>({
  theme: 'success',
  title: 'title',
  message: 'message',
  btnLeft: {
    isShow: true,
    label: 'No',
    btnTheme: 'secondary',
  },
  btnRight: {
    isShow: true,
    label: 'Yes',
    btnTheme: 'success',
  },
  btnCancel: {
    isShow: true,
    label: 'cancel',
    btnTheme: 'light',
  },
});
//-----------------------------
const dialogResultA = ref<string[]>([]);
const dialogResultB = ref<string[]>([]);
const showDialogA = async () => {
  const ret = await Dialog.Show(`めっせーじA`, `たいとるA`);
  dialogResultA.value.push(ret);
  if (ret === Dialog.Result.Cancel) {
    console.log('Cancel Btn が押されました。');
  } else if (ret === Dialog.Result.Left) {
    console.log('Left Btn が押されました。');
  } else if (ret === Dialog.Result.Right) {
    console.log('Rigth Btn が押されました。');
  }
};

const showDialogAB = () => {
  showDialogA();
  showDialogB();
};
const showDialogB = async () => {
  const option = Dialog.InitOption();
  option.theme = state.theme;
  option.btnLeft = state.btnLeft;
  option.btnRight = state.btnRight;
  option.btnCancel = state.btnCancel;
  const ret = await Dialog.Show(state.message, state.title, option);
  dialogResultB.value.push(ret);
  console.log('ret', ret);
};
const stateString = computed(() => {
  return Prism.highlight(
    `interface State {
  theme: keyof typeof Dialog['Theme'];
  title: string;
  message: string;
  btnLeft: {
    isShow: boolean;
    label: string;
    btnTheme: keyof typeof Dialog['BtnTheme'];
  };
  btnRight: {
    isShow: true;
    label: string;
    btnTheme: keyof typeof Dialog['BtnTheme'];
  };
  btnCancel: {
    isShow: true;
    label: string;
    btnTheme: keyof typeof Dialog['BtnTheme'];
  };
}
const state = reactive<State>({
  ` +
      JSON.stringify(state, null, 3).replace(/"(.*)":/g, '$1:') +
      ');',
    Prism.languages.javascript,
    'javascript'
  );
});
// class Test {
//   public text: string;
//   constructor(text: string) {
//     this.text = text;
//   }
//   public setText = (text: string) => {
//     this.text = text;
//     console.log(this.text);
//   };
// }
// class Test {
//   public text: Ref<string>;
//   constructor(text: string) {
//     this.text = ref(text);
//   }
//   public setText = (text: string) => {
//     this.text.value = text;
//     console.log(this.text);
//   };
// }
// const testData = ref(new Test('aaa'));
</script>
<template>
  <div class="container-fluid">
    <!-- <div class="" @click="testData.setText(dayjs().format('x'))">{{ testData.text }}</div> -->
    <!-- <div class="" @click="testData.text = dayjs().format('x')">{{ testData.text }}</div> -->
    <!-- Dialog Sample -->
    <div class="card mt-2 border-primary">
      <div class="card-header bg-primary text-light">Dialog Sample</div>
      <div class="card-body">
        <div class="">
          <div class="btn btn-primary me-1" @click="showDialogA">showDialogA</div>
          <div class="">ResultA:{{ dialogResultA }}</div>
          <div
            class="code mt-1"
            v-html="
              Prism.highlight(
                `
const showDialogA = async () => {
  const ret = await Dialog.Show(\`めっせーじA\`, \`たいとるA\`);
  dialogResult.value.push(ret);
  if (ret === Dialog.Result.Cancel) {
    console.log('Cancel Btn が押されました。');
  } else if (ret === Dialog.Result.Left) {
    console.log('Left Btn が押されました。');
  } else if (ret === Dialog.Result.Right) {
    console.log('Rigth Btn が押されました。');
  }
};
`.replace(/(^\n|\n$)/g, ''),
                Prism.languages.javascript,
                'javascript'
              )
            "
          ></div>
        </div>
      </div>
    </div>
    <!-- Dialog 各種Option -->
    <div class="card mt-2 border-primary">
      <div class="card-header bg-primary text-light">Dialog 各種Option</div>
      <div class="card-body">
        <div class="">
          <div class="">Theme</div>
          <select class="form-select" v-model="state.theme">
            <template v-for="(key, index) in Object.keys(Dialog.Theme)" :key="index">
              <option id="key">{{ key }}</option>
            </template>
          </select>
          <div class="row">
            <div class="col-12 col-md-4">
              <div class="">Left</div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="btnLeftisShow" v-model="state.btnLeft.isShow" />
                <label class="form-check-label" for="btnLeftisShow">isShow {{ state.btnLeft.isShow }}</label>
              </div>
              <select class="form-select" v-model="state.btnLeft.btnTheme">
                <template v-for="(key, index) in Object.keys(Dialog.BtnTheme)" :key="index">
                  <option id="key">{{ key }}</option>
                </template>
              </select>
              <div class="mb-1">
                <label class="form-label">Label</label>
                <input type="text" class="form-control" v-model="state.btnLeft.label" />
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="">Right</div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="btnRightisShow" v-model="state.btnRight.isShow" />
                <label class="form-check-label" for="btnRightisShow">isShow {{ state.btnRight.isShow }}</label>
              </div>
              <select class="form-select" v-model="state.btnRight.btnTheme">
                <template v-for="(key, index) in Object.keys(Dialog.BtnTheme)" :key="index">
                  <option id="key">{{ key }}</option>
                </template>
              </select>
              <div class="mb-1">
                <label class="form-label">Label</label>
                <input type="text" class="form-control" v-model="state.btnRight.label" />
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="">Cancel</div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="btnCancelisShow" v-model="state.btnCancel.isShow" />
                <label class="form-check-label" for="btnCancelisShow">isShow {{ state.btnCancel.isShow }}</label>
              </div>
              <select class="form-select" v-model="state.btnCancel.btnTheme">
                <template v-for="(key, index) in Object.keys(Dialog.BtnTheme)" :key="index">
                  <option id="key">{{ key }}</option>
                </template>
              </select>
              <div class="mb-1">
                <label class="form-label">Label</label>
                <input type="text" class="form-control" v-model="state.btnCancel.label" />
              </div>
            </div>
          </div>
          <div class="mb-1">
            <label class="form-label">Title</label>
            <textarea class="form-control" rows="3" v-model="state.title"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">Message</label>
            <textarea class="form-control" rows="3" v-model="state.message"></textarea>
          </div>

          <div class="btn btn-primary me-1" @click="showDialogAB">showDialogAB</div>
          <div class="btn btn-primary me-1" @click="showDialogB">showDialogB</div>
          <div class="">ResultA:{{ dialogResultA }}</div>
          <div class="">ResultB:{{ dialogResultB }}</div>

          <div class="row">
            <div class="col-12 col-md-6">
              <div
                class="code mt-1"
                v-html="
                  Prism.highlight(
                    `
const showDialogAB = () => {
  showDialogA();
  showDialogB();
};
const showDialogB = async () => {
  const option = Dialog.InitOption();
  option.theme = state.theme;
  option.btnLeft = state.btnLeft;
  option.btnRight = state.btnRight;
  option.btnCancel = state.btnCancel;
  const ret = await Dialog.Show(state.message, state.title, option);
  dialogResult.value.push(ret);
  console.log('ret', ret);
};
`.replace(/(^\n|\n$)/g, ''),
                    Prism.languages.javascript,
                    'javascript'
                  )
                "
              ></div>
            </div>
            <div class="col-12 col-md-6">
              <div class="code" v-html="stateString"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-2 border-primary">
      <div class="card-header bg-primary text-light">penndingList</div>
      <div class="card-body">
        {{ storeDialog.penndingList }}
      </div>
    </div>
  </div>
  <teleport to="#teleport">
    <VcDialog></VcDialog>
  </teleport>
</template>

<style lang="scss" scoped>
.code {
  background: #2a2727;
  border: solid 1px gray;
  border-radius: 4px;
  padding: 3px;
  white-space: pre;
  color: white;
  max-height: 400px;
  overflow: auto;
}
</style>
