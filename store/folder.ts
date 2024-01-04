import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore(
  'folder',
  () => {
    let folder = ref("");
    function setFolder(f: string) {
      console.log(f)
      folder.value = f;
    }
    function clear() {
      folder.value = "";
    }
    function getFolder() {
      return folder.value;
    }
    return {setFolder, clear, getFolder}
  },
  {
    persist: {
      storage: localStorage
    },
  }
);
