<template>
  <v-snackbar v-model="successAlert" color="success">
    <div>
      <v-icon icon="mdi-check-circle"></v-icon>
      <span class=""> Done!</span>
    </div>
  </v-snackbar>
  <div class="d-flex justify-end">
    <h1>ENV</h1>
    <v-spacer />
    <v-btn color="brand" class="mr-2" @click="saveJSON"> Save </v-btn>
  </div>
  <template v-if="view">
    <EnvAPI v-model:type="env.api.type" />
    <EnvDB
      v-model:type="env.db.type"
      v-model:server="env.db.server"
      v-model:database="env.db.database"
      v-model:user="env.db.user"
      v-model:password="env.db.password"
      v-model:port="env.db.port"
    />
    <EnvLog v-model:type="env.log.type" />
    <EnvAWS
      v-model:region="env.aws.region"
      v-model:accesskey="env.aws.access_key_id"
      v-model:secretkey="env.aws.secret_access_key"
    />
    <EnvAzure />
    <EnvDatadog
      v-model:apikey="env.dd.apikey"
      v-model:applicationkey="env.dd.applicationkey"
    />
  </template>
</template>

<script setup>
let successAlert = ref(false);
let view = ref(false);
let env = ref({});

onMounted(async () => {
  await loadJSON();
  view.value = true;
});

async function loadJSON() {
  let foldername = await window.electronAPI.getFolder();
  env.value = await window.electronAPI.loadEnvJSON(foldername);
  if (!env.value.hasOwnProperty("db"))
    env.value.db = { type: "Postgres", server: "localhost" };
  if (!env.value.hasOwnProperty("log")) env.value.log = { type: "AWS" };
  if (!env.value.hasOwnProperty("aws")) env.value.aws = {};
  if (!env.value.hasOwnProperty("azure")) env.value.azure = {};
  if (!env.value.hasOwnProperty("dd")) env.value.dd = {};
  if (!env.value.hasOwnProperty("api")) env.value.api = { type: "Newman" };
}

async function saveJSON() {
  let foldername = await window.electronAPI.getFolder();
  await window.electronAPI.saveEnvJSON(foldername, JSON.stringify(env.value));
  successAlert.value = true;
  setTimeout(() => {
    successAlert.value = false;
  }, 1000);
}
</script>
