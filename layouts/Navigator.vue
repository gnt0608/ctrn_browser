<template>
  <v-navigation-drawer app>
    <v-list dense nav>
        <v-list-item v-for="menu in menus" :key="menu.name" link :prepend-icon="menu.icon" :title="menu.name" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  folder: {
    type: String,
    required: true,
  }
});

// data
const menus = ref([]);

watch(() => props.folder, async () => {
  await loadTree();
});


onMounted(async () =>{
  if(props.folder){
    await loadTree()
  }
})

async function loadTree(){
  let folderTree = await window.electronAPI.walkTree(props.folder);
  // fixme
  menus.value = folderTree
}
</script>
