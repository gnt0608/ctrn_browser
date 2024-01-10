<template>
  <v-container>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel key="API">
        <v-expansion-panel-title>
          <v-row>
            <v-col>API</v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                  Request Type - リクエスト送信に使用するツールを選択します。
                </div>
                <p class="hint"></p>
              </div>
              <v-radio-group v-model="api_type" inline @input="$emit('update:type', $event.target.value)">
                <v-radio label="Newman" value="Newman"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
let panel = ref([0]);
let proc = ref(false);
let props = defineProps({
  type: { type: String, required: true, default: "Newman" },
});

let api_type= ref(props.type)
let emits = defineEmits(["update:type"]);
</script>
