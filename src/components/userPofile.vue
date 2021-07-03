<template>
<div>
  <v-footer>
    <h1 style="font-weight: bold; margin-left: 45%"> Altug Erdem</h1>
  </v-footer>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h2>User List</h2>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="3">
        <input class="input" type="text" v-model="search" placeholder="Search User Profiles">
      </v-col>
    </v-row>

    <v-row>
      <v-col class="container" cols="12">
        <v-card class="cards" v-for="item in filteredUsers.slice(0,10)" :key="item.firstName">
          <v-img height="70%" width="100%" :src="`${item.picture}`">
          </v-img>
          <v-card-text>
            <div style="text-transform:capitalize;"> {{item.title}}.{{item.firstName}} {{item.lastName}} </div>
            <div>
              {{item.email}}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-template class="container" v-if="moreData">
          <v-card class="cards" v-for="item in filteredUsers.slice(10,20)" :key="item.firstName">
            <v-img height="70%" width="100%" :src="`${item.picture}`">
            </v-img>
            <v-card-text>
              <div style="text-transform:capitalize;"> {{item.title}}.{{item.firstName}} {{item.lastName}} </div>
              <div>
                {{item.email}}
              </div>
            </v-card-text>
          </v-card>
        </v-template>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-template v-if="moreData == false">
          <v-btn @click="fetchMoreData" small color="info">Fetch More Profile </v-btn>
        </v-template>
        <v-template v-if="moreData == true">
          <v-btn style="margin-left: 50%" @click="fetchMoreData" small color="info">Get Back </v-btn>
        </v-template>
      </v-col>
      <v-col cols="1">
        <v-btn @click="darkMode">
          <v-icon class="mr-2">
            mdi-brightness-4
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</div>
</template>

<script>
import {
  mapActions
} from "vuex";
export default {
  data() {
    return {
      users: [],
      darkmode: false,
      moreData: false,
      search: "",
    };
  },
  watch: {
    darkmode() {
      this.handledarkmode()
    }
  },
  created() {
    this.getRecruitmentData()
      .then((res) => {
        this.users = res.data.data;
        console.log("data", this.users)
      })
      .catch((err) => {
        console.log(err)
      });
    if (process.browser) {
      if (localStorage.getItem('DarkMode')) {
        const cookieValue = localStorage.getItem('DarkMode') === 'true'
        this.darkmode = cookieValue
      } else {
        this.handledarkmode()
      }
    }
  },
  computed: {
    filteredUsers() {
      console.log("filtered", this.users)
      return this.users.filter((item) => {
        return item.firstName.match(this.search);
      })
    }
  },
  methods: {
    ...mapActions(["getRecruitmentData"]),
    getData() {
      console.log("data", this.users)
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    fetchMoreData() {
      this.moreData = !this.moreData;
    },
  },
};
</script>

<style>
.container {
  margin-left: 5% !important;
  display: flex;
  margin: auto;
  padding: auto;
  flex-wrap: wrap;
}

.cards {
  height: 275px;
  width: 225px;
  margin: 2%
}

.input {
  border-style: solid;
  border-color: black;
}
</style>
