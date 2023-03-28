<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { ref, watch, computed, nextTick } from 'vue';
import { Dialog } from './dialog';
import { useStoreDialog } from './store-dialog';
//-----------------------------
const storeDialog = useStoreDialog();
//-----------------------------
//表示中のダイアログを取得
const activeItem = computed(() => {
  if (storeDialog.penndingList.length !== 0) {
    return storeDialog.penndingList[0];
  } else {
    return null;
  }
});

//ダイアログが表示中かどうか
const hasPenndingList = computed(() => {
  return storeDialog.penndingList.length !== 0;
});

//-----------------------------
//クリックイベント
const clickLeft = () => {
  const item = activeItem.value;
  if (item === null) return;
  if (item.data.option.btnLeft.isShow === false) return;
  item.data.leftClick();
  storeDialog.remove(item.ts);
};
const clickRight = () => {
  const item = activeItem.value;
  if (item === null) return;
  if (item.data.option.btnRight.isShow === false) return;
  item.data.rightClick();
  storeDialog.remove(item.ts);
};

const clickCancel = () => {
  console.log('clickCancel');
  const item = activeItem.value;
  if (item === null) return;
  if (item.data.option.btnCancel.isShow === false) return;
  item.data.cancelClick();
  storeDialog.remove(item.ts);
};

//-----------------------------
const TitleColor = computed(() => {
  if (activeItem.value === null) return '';
  switch (activeItem.value.data.option.theme) {
    case Dialog.Theme.primary:
    case Dialog.Theme.secondary:
    case Dialog.Theme.success:
    case Dialog.Theme.danger:
    case Dialog.Theme.dark:
      return 'text-white';
    case Dialog.Theme.light:
    case Dialog.Theme.info:
    case Dialog.Theme.warning:
      return 'text-dark';
    default:
      return '';
  }
});

//-----------------------------
//[focusTrapElm]
const focusTrapElm = ref();
const { activate, deactivate } = useFocusTrap(focusTrapElm, {
  allowOutsideClick: true,
});
watch(hasPenndingList, async (value) => {
  console.log('hasPenndingList', value);
  await nextTick();
  if (value) {
    activate();
  } else {
    deactivate();
  }
});
//--------------------
</script>
<template>
  <div
    class="window-cover"
    :class="{ isShow: hasPenndingList, hasCancelBtn: activeItem?.data.option.btnCancel.isShow }"
    @click="clickCancel()"
  >
    <div class="card" @click.stop ref="focusTrapElm">
      <div class="card-header" :class="[`bg-${activeItem?.data.option.theme}`, TitleColor]">
        <div class="dialog-title me-2">{{ activeItem?.data.title }}</div>
        <div class="ms-auto" v-if="activeItem?.data.option.btnCancel.isShow">
          <button
            class="btn me-1"
            :class="[`btn-outline-${activeItem.data.option.btnCancel.btnTheme}`]"
            @click="clickCancel()"
          >
            {{ activeItem.data.option.btnCancel.label }}
          </button>
        </div>
      </div>
      <div class="card-body py-1">
        <div class="dialog-message">{{ activeItem?.data.message }}</div>
        <div class="d-flex mt-2 mb-2">
          <div class="me-auto" v-if="activeItem?.data.option.btnLeft.isShow">
            <button
              class="btn btn-primary me-1"
              :class="[`btn-${activeItem.data.option.btnLeft.btnTheme}`]"
              @click="clickLeft()"
            >
              {{ activeItem.data.option.btnLeft.label }}
            </button>
          </div>
          <div class="ms-auto" v-if="activeItem?.data.option.btnRight.isShow">
            <button class="btn me-1" :class="[`btn-${activeItem.data.option.btnRight.btnTheme}`]" @click="clickRight()">
              {{ activeItem.data.option.btnRight.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.window-cover {
  position: fixed;
  inset: 0;
  background-color: rgba(16, 36, 97, 0.494);
  opacity: 0;
  transition: opacity 100ms;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &.isShow {
    pointer-events: all;
    opacity: 1;
  }
  &.hasCancelBtn {
    cursor: pointer;
  }
}

.dialog-title {
  white-space: pre-line;
}

.dialog-message {
  white-space: pre-line;
}

.card {
  min-width: 200px;
  max-width: 600px;
  width: calc(100% - 20px);

  > .card-body {
    overflow: auto;
  }
}
</style>
