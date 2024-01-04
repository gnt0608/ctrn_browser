<template>
  <v-navigation-drawer app>
    <v-list dense nav>
      <v-list-item
        v-for="(menu, index) in menus"
        :key="menu.name"
        link
        :title="menu.name"
        @click="to_link(index)"
        :active="menu.active"
      />
      <v-list-item @click="add_project()">
        <template v-slot:prepend>
          <v-icon icon="mdi-plus"></v-icon>
        </template>
        <v-list-item-title>Add Project</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  folder: {
    type: String,
    required: true,
  },
});

// data
const menus = ref([]);

watch(
  () => props.folder,
  async () => {
    await loadTree();
  }
);

onMounted(async () => {
  if (props.folder) {
    await loadTree();
  }
});

async function loadTree() {
  console.log(props.folder);
  let folderTree = await window.electronAPI.findProject(props.folder);
  menus.value = folderTree;
  menus.value.forEach((menu) => {
    menu.active = false;
  });
}

function to_link(index) {
  let path = menus.value[index].path;
  navigateTo("/?name=" + menus.value[index].name + "&path=" + path);
  menus.value.forEach((menu) => {
    menu.active = false;
  });
  menus.value[index].active = true;
}

function add_project(){
  // TODO: 
}
</script>
