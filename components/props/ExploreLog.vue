<template>
    <v-container>
      <v-card>
        <v-card-title> Explore Log - ログ取得 </v-card-title>
        <v-card-subtitle>
          API、バッチ実行後のログを取得します。 <br/>
          現状、AWS / Azure/ DataDog のログ取得に対応をしています。
        </v-card-subtitle>
        <v-container>
            <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">Log Type - 対象となるサービスを指定します。</div>
                <p class="hint">
                  テーブルは,でつなぐことで複数選択することが可能です Ex) Table1,
                  Table2
                </p>
              </div>
              <v-radio-group v-model="component.log_type" inline>
              <v-radio label="AWS" value="AWS"></v-radio>
              <v-radio label="Datadog" value="Datadog"></v-radio>
            </v-radio-group>
            </v-col>
          </v-row>

            <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">Application  - アプリケーション名を指定します。</div>
                <p class="hint">
                  
                </p>
              </div>
              <v-text-field
                v-model="component.args.application"
                label="Application"
                persistent-hint
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                    query - 検索する条件を指定します。
                </div>
                <p class="hint">
                  実際のファイルはディレクトリ名の下に(テーブル名).csvの形式で出力されます
                </p>
              </div>
              <v-text-field
                v-model="component.args.query"
                label="Query"
                persistent-hint
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                    from - 検索時間(From) を指定します。
                </div>
                <p class="hint">
                  
                </p>
              </div>
              <v-text-field
                v-model="component.args.from"
                label="From"
                persistent-hint
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                    to - 検索時間(To) を指定します。
                </div>
                <p class="hint">
                </p>
              </div>
              <v-text-field
                v-model="component.args.to"
                label="Output Path"
                persistent-hint
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                    out_path - 出力するファイル名を指定します。
                </div>
                <p class="hint">
                  未指定の場合は、 (log_type)_(from)_(to).log という形式となります。
                </p>
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
  
  // initalSetup
  if (!props.component.log_type || props.component.log_type == "") {
    props.component.log_type = "AWS";
  }
  function initialSetup(arg, initParam) {
    if (!props.component.args[arg] || props.component.args[arg] == "") {
      props.component.args[arg] = initParam;
    }
  }
  
  initialSetup("from", "${start_time}");
  initialSetup("to", "${now}");
  initialSetup("out_path", "./output/logs/${application}_${from}_${to}.log");
  
    </script>
  