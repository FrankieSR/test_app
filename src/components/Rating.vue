<template>
  <div class="pos-absolute-information" ref="rating" @click="openTopUsers" v-if="isAuthenticated">
    <div class="open-icon">
      <i class="fas fa-angle-double-right" v-if="openIcon"></i>
      <i class="fas fa-angle-double-left" v-else></i>
    </div>
    <div class="info">
      <div class="top-results">
        <h3>Top users:</h3>
        <table>
          <tr v-for="(user, i) in allUsers" :key="user.id">
            <td class="index">{{i+1}}</td>
            <td class="username">{{user.user}}</td>
            <td class="score">{{user.score}}%</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "Rating",
  props: {},
  data: function() {
    return {
      openIcon: false,
      allUsers: []
    };
  },
  methods: {
    openTopUsers: function() {
      this.$refs.rating.classList.toggle("open");
      this.openIcon = !this.openIcon;
    },
    getUsers: function() {
      return new Promise((resolve, reject) => {
        const self = this;

        this.$store.dispatch("GET_ALL_USERS").then(data => {
          resolve(data.users);
        });
      });
    },

    sortUsers: function() {
      const self = this;
      let _users;

      this.getUsers().then(users => {
        let _nameAndResult = [];
        // self.allUsers = users;
        _users = { ...users };

        for (const key in _users) {
          if (_users.hasOwnProperty(key)) {
            const user = _users[key];
            // console.log(user.email);

            _nameAndResult.push({
              user: user.username,
              score: user.bestResultTest
            });
          }
        }

        let _sorted = _nameAndResult.sort((a, b) => {
          if (a.score > b.score) {
            return -1;
          }
          if (a.score < b.score) {
            return 1;
          }
          return 0;
        });

        self.allUsers = _sorted;
      });
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: state => state.authStatus === "loading"
    })
  },
  mounted() {
    this.sortUsers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.pos-absolute-information {
  position: absolute;
  bottom: 20px;
  right: -335px;
  background: #fff;
  border-top-left-radius: 40px;
  padding: 20px 25px 20px 20px;
  min-height: 60vh;
  cursor: pointer;
  border: 3px solid black;
  border-left: 5px solid black;
  border-top: 3px solid black;
  border-right: 1px solid #fdc730;
  border-bottom: 10px solid #20a8f9;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 7px 2px,
    rgba(0, 0, 0, 0.3) 0px 1px 20px 3px;
  transition: 0.4s cubic-bezier(0.25, 0.45, 0.52, 0.95);

  .open-icon {
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 40px;
    border-radius: 50%;
    display: block;
    color: red;
  }

  td {
    text-align: left;
    font-family: "Share Tech Mono", monospace;
    border-bottom: 2px solid red;
  }

  tr {
    &:first-child {
      font-size: 22px;
      font-weight: 700;
      color: #005fd1;
    }
  }

  .index {
    color: #00bd85;
    font-size: 20px;
    font-weight: 700;
    padding: 5px;
    margin-right: 15px;
    display: block;
    width: 20px;
    text-align: center;
    border: 1px solid #fec82f;
    border-radius: 50%;
  }

  .score {
    font-size: 18px;
  }

  .name {
    font-size: 18px;
  }
}

  .open {
    right: 20px !important;
  }
</style>
