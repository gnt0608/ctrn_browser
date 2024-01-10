<template>
  <v-container>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel key="Aws">
        <v-expansion-panel-title>
          <v-row>
            <v-col>Datadog</v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                  Apikey - 処理に使用するAPI Keyを指定します。
                </div>
              </div>
              <v-text-field
                v-model="dd_apikey"
                label="Apikey"
                @input="$emit('update:apikey', $event.target.value)"
                persistent-hint
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                  Application key - 処理に使用するApplication Keyを指定します。
                </div>
              </div>
              <v-text-field
                v-model="dd_applicationkey"
                label="Application key"
                @input="$emit('update:applicationkey', $event.target.value)"
                persistent-hint
              />
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
let panel = ref([0]);
let props = defineProps({
  apikey: { type: String, required: true },
  applicationkey: { type: String, required: true },
});

let emits = defineEmits(["update:apikey", "update:applicationkey"]);
let dd_apikey = ref(props.apikey);
let dd_applicationkey = ref(props.applicationkey);
</script>
