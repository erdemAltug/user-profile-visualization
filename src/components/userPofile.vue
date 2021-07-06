<template>
  <div>
    <v-footer>
      <h1 class="author"> Altug Erdem</h1>
      <v-col style="position: absolute; right: 0;">
        <v-btn @click="darkMode">
          <v-icon class="mr-2">
            mdi-brightness-4
          </v-icon>
        </v-btn>
      </v-col>
    </v-footer>
    <div class="wrapper">
      <v-row>
        <v-col cols="6">
          <h2>User List</h2>
        </v-col>
        <v-divider style="visibility: hidden;" />
        <v-col cols="3">
          <input
            v-if="moreData == false &&  this.$vuetify.theme.dark == false"
            class="input"
            type="text"
            v-model="search"
            placeholder="Search User Profiles"
          >
          <input
            v-if="moreData == false && this.$vuetify.theme.dark == true"
            class="inputDark"
            type="text"
            v-model="search"
            placeholder="Search User Profiles"
          >
          <input
            v-if="moreData && this.$vuetify.theme.dark == false"
            class="input"
            type="text"
            v-model="searchAll"
            placeholder="Search User Profiles"
          >
          <input
            v-if="moreData && $vuetify.theme.dark == true"
            class="inputDark"
            type="text"
            v-model="searchAll"
            placeholder="Search User Profiles"
          >
        </v-col>
      </v-row>

      <v-row>
        <v-template v-if="moreData == false">
          <v-col
            class="container"
            cols="12"
          >
            <v-card
              class="cards"
              v-for="item in filteredUsers.slice(0,sliceNumber)"
              :key="item.id"
            >
              <v-img
                height="70%"
                width="100%"
                :src="`${item.picture}`"
              >
              </v-img>
              <v-card-text>
                <div style="text-transform:capitalize;"> {{item.title}}.{{item.firstName}} {{item.lastName}} </div>
                <div>
                  {{item.email}}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-template>
      </v-row>

 
      <v-row>
        <v-col style="display:flex; justify-content: center;">
          <!-- <v-template v-if="moreData == false"> -->
            <v-btn
              class="fetchButton"
              @click="fetchMoreData"
              small
              color="info"
            > {{sliceNumber >=50   ? 'Get Back' : 'Fetch More Profile'}} </v-btn>
          <!-- </v-template> -->
          <!-- <v-template v-if="moreData == true">
            <v-btn
              style="margin-left: 50%"
              @click="fetchMoreData"
              small
              color="info"
            >Get Back </v-btn>
          </v-template> -->
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
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
      searchAll: "",
      sliceNumber: 10,
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
      return this.users.slice(0, this.sliceNumber).filter(obj => Object.values(obj).some(val => val.includes(this.search)))
    },
    filteredUsersAll() {
      console.log("filtered", this.users)
      return this.users.filter(obj => Object.values(obj).some(val => val.includes(this.searchAll)))
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
      console.log(this.sliceNumber);
      if(this.sliceNumber >= this.users.length && !this.moreData){
        this.sliceNumber = 0
        this.moreData = false;
      }
      this.sliceNumber+=10
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.cards {
  height: 300px;
  width: 230px;
  margin: 2%
}

.input {
  border-style: solid;
  border-color: black;
}

.wrapper {
  margin: 1%;
  padding: 1%;
}

.fetchButton {
  justify-content: center;
}
.inputDark{
  background-color: white;
}
.container::after {
  display: flex;
  flex-wrap: wrap;
}
.author{
  font-weight: bold; 
  margin: 0px auto;
  display: block;  
}
.row {
    display: block !important;
}
</style>
