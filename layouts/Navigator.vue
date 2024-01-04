<template>
  <v-navigation-drawer app>
    <v-list dense nav>
        <v-list-item v-for="menu in menus" :key="menu.name" link :title="menu.name" @click="to_link(menu.path)" />
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
  console.log(props.folder)
  let folderTree = await window.electronAPI.findProject(props.folder);
  // fixme
  menus.value = folderTree
}

function to_link(path){
  navigateTo("/?path=" + path)
}
</script>
