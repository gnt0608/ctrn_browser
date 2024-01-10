<template>
  <v-container>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel key="Aws">
        <v-expansion-panel-title>
          <v-row>
            <v-col>AWS</v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                  Region - 対象となるAWS リージョンを指定します。
                </div>
              </div>
              <v-text-field
                v-model="aws_region"
                label="Region"
                @input="$emit('update:region', $event.target.value)"
                persistent-hint
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                  Apikey - 使用するIAMのAPIキーを指定します
                </div>
              </div>
              <v-text-field
                v-model="aws_apikey"
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
                  Secretkey - 使用するIAMのシークレットキーを指定します
                </div>
              </div>
              <v-text-field
                v-model="aws_apikey"
                label="Secretkey"
                @input="$emit('update:secretkey', $event.target.value)"
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
  region: { type: String, required: true },
  apikey: { type: String, required: true },
  secretkey: { type: String, required: true },
});

let emits = defineEmits(["update:region", "update:apikey", "update:secretkey"]);
let aws_region = ref(props.region);
let aws_apikey = ref(props.apikey);
let aws_secretkey = ref(props.secretkey);
</script>
