<template>
  <v-navigation-drawer permanent>
    <v-list dense nav>
      <v-list-item
        v-for="(menu, index) in menus"
        :key="menu.name"
        link
        :title="menu.name"
        @click="to_link(index)"
        :active="menu.active"
      />
      <v-list-item @click="add_project_dialog">
        <template v-slot:prepend>
          <v-icon icon="mdi-plus"></v-icon>
        </template>
        <v-list-item-title>Add Project</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-dialog v-model="addProject" width="">
      <AddProjectDialog @cancel="cancel" @add="add" />
    </v-dialog>
    <template v-slot:append>
          <div class="pa-2">
            <v-btn block color="brand" @click="to_env">
              Env
            </v-btn>
          </div>
        </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted } from "vue";
let addProject = ref(false);
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

function to_env(){
  menus.value.forEach((menu) => {
    menu.active = false;
  });
  navigateTo('/env')
}
function add_project_dialog() {
  addProject.value = true;
}

function cancel() {
  addProject.value = false;
}

async function add(project_name) {
  console.log(project_name);
  await window.electronAPI.addProject(props.folder,project_name);
  addProject.value = false;
  await loadTree();
}
</script>
