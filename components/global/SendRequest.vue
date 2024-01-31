<template>
  <v-container>
    <v-card>
      <v-card-title> Send Request - リクエスト送信 </v-card-title>
      <v-card-subtitle>
        Newmanを用いたリクエストを送信することができます
      </v-card-subtitle>
      <v-container>
        <!-- <v-row>
          <v-col>
            <div class="fieldDesc">
              <div class="fieldTitle">
                Request Type - リクエスト送信に使用するツールを選択します。
              </div>
              <p class="hint"></p>
            </div>
            <v-radio-group v-model="component.api_type" inline>
              <v-radio label="Newman" value="Newman"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col>
            <div class="fieldDesc">
              <div class="fieldTitle">
                Request Json - リクエスト送信用JSONファイルを指定します
              </div>
              <p class="hint"></p>
            </div>
            <v-text-field
              v-model="component.args.request_json"
              label="Request Json"
              persistent-hint
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="fieldDesc">
              <div class="fieldTitle">
                Output Path - 出力するディレクトリ名を指定します。
              </div>
              <p class="hint"></p>
            </div>
            <v-text-field
              v-model="component.args.out_path"
              label="Output Path"
              persistent-hint
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>
let props = defineProps({
  component: { type: Object, required: true },
});

function initialSetup(arg, initParam) {
  if (!props.component.args[arg] || props.component.args[arg] == "") {
    props.component.args[arg] = initParam;
  }
}

// initalSetup
// if (!props.component.api_type || props.component.api_type == "") {
//     props.component.api_type = "Newman";
//   }
initialSetup("request_json", "./request/MyCollection.postman_collection.json");
initialSetup("out_path", "./output/request/");
</script>
