<template>
  <v-container>
    <v-card>
      <v-card-title> Match CSV - CSV間の突合をします</v-card-title>
      <v-card-subtitle>
        主にDBと期待値の結果確認に使用します。
        比較用CSVに存在するデータがすべて存在しているかをもって確認をします。
        <br />
        時間情報など、都度変化するデータについては比較用CSVの項目から除外することで対象外とすることができます。
      </v-card-subtitle>
      <v-container>
        <v-row>
          <v-col>
            <div class="fieldDesc">
              <div class="fieldTitle">
                Expect Path - 期待値を設定した比較用CSVデータのパスを指定します
              </div>
              <p class="hint">
                ファイル名、もしくはディレクトリ名を指定します。
              </p>
              <p class="hint">
                ディレクトリ名を指定した場合は、そのディレクトリ内にあるファイル名が一致するものを比較対象として判断をします。
              </p>
            </div>
            <v-text-field
              v-model="component.args.expect_path"
              label="Table"
              persistent-hint
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="fieldDesc">
              <div class="fieldTitle">
                Actual Path - 実績値を設定したCSVデータのパスを指定します
              </div>
              <p class="hint">
                ファイル名、もしくはディレクトリ名を指定します。
              </p>
              <p class="hint">
                ディレクトリ名を指定した場合は、そのディレクトリ内にあるファイル名が一致するものを比較対象として判断をします。
              </p>
            </div>
            <v-text-field
              v-model="component.args.actual_path"
              label="Table"
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
              <p class="hint">
                ファイル名、もしくはディレクトリ名を指定します。
              </p>
              <p class="hint">
                ディレクトリ名を指定した場合は、比較に使用したファイル名を出力ファイル名として結果ファイルを作成します。
              </p>
            </div>
            <v-text-field
              v-model="component.args.out_path"
              label="Output Path"
              persistent-hint
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="fieldDesc">
              <div class="fieldTitle">Check Type - 比較方式を指定します。</div>
              <p class="hint">
                complete: 完全一致のみを許容します / contain:
                部分一致を許容します
              </p>
            </div>
            <v-radio-group v-model="component.args.check_type" inline>
              <v-radio label="complete" value="complete"></v-radio>
              <v-radio label="contain" value="contain"></v-radio>
            </v-radio-group>
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
initialSetup("expect_path", "./expect/")
initialSetup("actual_path", "./output/dump/")
initialSetup("out_path", "./output/match_result/")
initialSetup("check_type", "complete")
</script>
