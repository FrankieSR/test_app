<template>
  <div class="test-page">
    <Navigation visible="false"/>
    <div class="test-page-wrapper">
      <div class="timeline">
        <div
          class="timeline-inner"
          v-bind:style="{ width: testInfo() + '%' }"
        ></div>
      </div>
      <div v-if="questionIndex < allQuestionsLength()">
        <span class="to-end">
          {{ questionIndex + 1 }} / {{ allQuestionsLength() }}
          <i class="fas fa-ruler-horizontal"></i>
        </span>
      </div>
      <div class="test-questions-list" v-if="questionIndex < allQuestionsLength()">
        <div
          v-for="(question, index) in RandomSortedQuestionList"
          v-bind:key="index"
          class="question-list-body"
          v-if="index == questionIndex"
        >
          <h3 class="question" ref="question">{{ question.question }}</h3>
          <ul>
            <li
              v-for="(choise, choiseIndex) in question.choise"
              v-bind:key="choiseIndex"
              @click="checkAnswer($event)"
              :data="choise.index"
            >
              {{ choiseIndex + 1 }} : {{ choise.option }}
            </li>
          </ul>
          <div class="quantity-answers">
            You need to select {{ needAnswers() }} answer.
          </div>
          <div class="control-buttons">
            <button class="prev" @click="previousQuestion">
              <i class="fas fa-caret-left"></i> Prev
            </button>
            <button @click="nextQuestion">
              Next
              <i class="fas fa-caret-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="result-information">
        <div class="result-information-wrapper">
          <div class="result-wrapper" v-if="testResult() > 60">
            <div class="result">
              Hey! You are cool!
              <i class="far fa-grin-stars"></i>
              <br />Your result <span>{{ testResult().toFixed(0) }}</span
              >%
              <img src="../assets/giphy.gif" alt="image" />
            </div>
          </div>
          <div class="result-wrapper" v-else>
            <div class="result fail">
              Oh
              <i class="far fa-frown"></i> You must study more! <br />Your
              result <span>{{ testResult().toFixed() }}</span
              >%
            </div>
            <!-- <img src="../assets/expert-developers.gif" alt="image"> -->
          </div>
          <div class="retest-block">
            <div class="retest-button">
              <button @click="restart">
                New test
                <i class="fas fa-retweet"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button class="watch-results" @click="watchResults()">
            Watch results
            <i class="fas fa-eye"></i>
          </button>
        </div>
        <div class="results-infornation" v-show="seenResults">
          <div
            v-for="(question, index) in RandomSortedQuestionList"
            v-bind:key="index"
          >
            {{ question.question }}
            <ul>
              <li
                v-for="(choise, choiseIndex) in question.choise"
                v-bind:key="choiseIndex"
                v-bind:class="paintResultList(choise.isTrue, choise.myAnswer)"
              >
                {{ choiseIndex + 1 }} : {{ choise.option }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setInterval, clearInterval } from "timers";
import store from "../store";
import { mapGetters, mapState } from "vuex";
import Navigation from "../components/Navigation.vue";
// import * as firebase from "firebase/app";
import "firebase/database";

export default {
  name: "Test",
  data: function() {
    return {
      allQuestionsList: store.getters.getQuestionList,
      RandomSortedQuestionList: [],
      questionIndex: 0,
      timeRange: 0,
      seenResults: false,
      name: ""
    };
  },
  components: {
    Navigation
  },
  computed: {
    ...mapGetters(["getQuestionSort", "getOptionsSort"]),
    ...mapState({
      randomQCheckbox: state => state.randomQuestions,
      randomOptCheckbox: state => state.randomOptions
    })
  },
  methods: {
    logout: function() {
      this.$store.dispatch("AUTH_LOGOUT").then(() => this.$router.push("/"));
    },

    restart: function() {
      this.$router.push("/choise-certification");
    },

    testInfo() {
      // this.$nextTick(function() {
      //   if (
      //     this.$refs.question ||
      //     this.$refs.question[0].innerHTML != undefined
      //   ) {
      //     this.$refs.question[0].innerHTML = this.$refs.question[0].innerHTML
      //       .replace(/&lt;/g, "<")
      //       .replace(/&gt;/g, ">");
      //   }
      // });
      if (this.questionIndex < this.allQuestionsLength()) {
        return ((this.questionIndex + 1) / this.allQuestionsLength()) * 100; //!!!!!!!!!
      }
    },
    consoleMessage() {
      console.log(
        "%c Hello, if you find a mistake in the text, please inform me in Skype.",
        "background: #f6c2d8; color: #7babed; font-size: 35px;"
      );
    },

    checkAnswer(event) {
      let optionIndex = parseInt(event.target.getAttribute("data"));
      // debugger;
      let activeListElement = this.RandomSortedQuestionList[this.questionIndex];
      let activeChoiseOptions;
      activeListElement.choise.forEach(item => {
        if (item.index == optionIndex) {
          activeChoiseOptions = item;
        }
      });
      event.target.classList.toggle("active");
      activeChoiseOptions.myAnswer
        ? (activeChoiseOptions.myAnswer = false)
        : (activeChoiseOptions.myAnswer = true); // отслеживает мой ответ
    },
    needAnswers() {
      let needOption = [];
      this.RandomSortedQuestionList[this.questionIndex].choise.forEach(
        option => {
          if (option.isTrue === true) {
            needOption.push(1);
          }
        }
      );
      return needOption.length;
    },
    sortRandomQuestions: function() {
      return new Promise((resolve) => {
        let _list = this.allQuestionsList;

        // можно отключить рандомную сортировку вопросов
        let _array = [];
        for (const _key in _list) {
          if (_list.hasOwnProperty(_key)) {
            _list[_key].choise.forEach(option => {
              option.myAnswer = false;
            });
            if (this.randomOptCheckbox === true) {
              _list[_key].choise.sort((a, b) => Math.random() - 0.5); // можно поставить опцию сортировки вариантов ответов
            }
            _array.push(_list[_key]);
          }
        }

        if (this.randomQCheckbox === true) {
          this.RandomSortedQuestionList = _array.sort(
            (a, b) => Math.random() - 0.5
          );
        } else {
          this.RandomSortedQuestionList = _list;
        }

        resolve();
      });
    },
    nextQuestion() {
      if (this.questionIndex <= this.allQuestionsLength()) {
        this.questionIndex++;
      } else {
        this.$router.push("/");
      }
    },
    previousQuestion() {
      if (this.questionIndex > 0) {
        this.questionIndex--;
        this.RandomSortedQuestionList[this.questionIndex].choise.forEach(
          item => {
            item.myAnswer = false;
          }
        );
      }
    },

    resetArray() {
      return new Promise((resolve) => {
        this.RandomSortedQuestionList.forEach(item => {
          item.choise.forEach(option => {
            option.myAnswer = false;
          });
        });

        resolve();
      });
    },

    allQuestionsLength() {
      return Object.keys(this.allQuestionsList).length;
    },
    testResult() {
      let _trueAnswers = [];
      let _myAnswer = [];
      let _myTrueAnswers = [];
      this.RandomSortedQuestionList.forEach((element) => {
        element.choise.forEach((choiseInfo) => {
          if (choiseInfo.isTrue == true) {
            _trueAnswers.push(choiseInfo.isTrue);
          }
          if (choiseInfo.myAnswer == true) {
            _myAnswer.push(choiseInfo.myAnswer);
            if (
              choiseInfo.myAnswer == true &&
              choiseInfo.isTrue == true &&
              _trueAnswers.length == _myAnswer.length
            ) {
              _myTrueAnswers.push(1);
            }
          }
        });
      });

      let result = (_myTrueAnswers.length / _trueAnswers.length) * 100;

      let userInfo = {
        userID: localStorage.getItem("id"),
        result: result
      };

      localStorage.setItem("last-result", result);

      this.$store.dispatch("GET_DATABASE", userInfo.userID).then(userData => {
        if (userData.lastResult < result) {
          this.$store
            .dispatch("UPDATE_BEST_RESULT_DATABASE", userInfo);
        }
        this.$store
          .dispatch("UPDATE_RESULT_DATABASE", userInfo);
      });

      return result;
    },

    paintResultList(isTrue, isMyAnsw) {
      if (isTrue == true && isMyAnsw == true) {
        return "green";
      }
      if (isTrue == true) {
        return "red";
      }
      if (isMyAnsw == true) {
        return "yellow";
      }
    },
    watchResults() {
      this.seenResults = !this.seenResults;
    }
  },
  beforeMount() {
    this.consoleMessage();
  },
  mounted() {
    this.resetArray().then(() => this.sortRandomQuestions());
  }
};
</script>

<style lang="less">
body {
  -webkit-font-smoothing: antialiased;
  h1 {
    padding: 0;
    margin: 0;
  }
}

.exit {
  width: 35px;
  height: 35px;
  cursor: pointer;
  position: absolute;
  top: 28px;
  right: 3%;
}
.start-page {
  text-align: center;
  .title {
    background: #7babed;
    min-height: 90px;
    font-weight: 400;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0 3px 3px #ced6e3;
    font-size: 70%;
    margin-bottom: 20px;
    h1 {
      font-weight: 500;
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
}
.active {
  background: #00bd85;
  box-shadow: 0 3px 5px #999;
}
.red {
  background: #f8606b;
  border: 1px solid red;
}
.green {
  background: #66cfb3;
  border: 1px solid green;
}
.yellow {
  background: #fec82f;
  border: 1px solid orangered;
}
.timeline {
  position: absolute;
  top: -15px;
  left: 0;
  width: 100%;
  height: 10px;
  &-inner {
    height: 10px;
    background: #3bb3fb;
  }
}

label {
  cursor: pointer;
}
.list-tests {
  font-weight: bold;
  padding: 15px 0 20px;
}

.test-page-wrapper {
  position: relative;
  margin: 15px auto;
  width: 80%;
  text-align: left;
}
ul {
  list-style: none;
}
.to-end {
  font-size: 115%;
  font-weight: 700;
  color: grey;
  padding: 15px 0;
  margin-top: 8px;
  display: block;
  &::first-letter {
    font-size: 130%;
  }
}
button {
  box-shadow: 0 1px 1px #aaa;
}
.question {
  border-bottom: 3px solid #fec82f;
  margin: 5px 0 10px;
  padding: 10px 20px;
  line-height: 19px;
  white-space: pre-wrap;
  font-size: 18px;
}

.question-list-body {
  ul {
    margin-bottom: 40px;
  }

  ul li {
    cursor: pointer;
    margin: 10px 0;
    padding: 9px 15px 9px;
    border-radius: 3px;
    font-weight: 500;
    transition: 0.2s;
    white-space: pre-wrap;
    &::first-letter {
      font-size: 130%;
      font-weight: 700;
      color: #3bb3fb;
      line-height: 15px;
    }
    &:hover {
      background: #3bb3fb;
      &::first-letter {
        color: #fff;
      }
    }
  }

  .control-buttons {
    max-width: 305px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  button {
    width: 170px;
    height: 50px;
    border: none;
    cursor: pointer;
    background: #d9d9d9;
    border-right: 7px solid #fdc730;
    border-bottom: 1px solid #fdc730;
    font-weight: 700;
    font-size: 20px;
    font-family: "Share Tech Mono", monospace;
    transition: 0.3s;
    border-radius: 1px;

    &:hover {
      border-bottom: 5px solid #20a8f9;
      border-right: 5px solid #fdc730;
    }
  }
  .prev {
    height: 45px;
    width: 120px;
    background: #ced6e3;
  }
}

.result-information-wrapper {
  display: flex;
  justify-content: space-between;

  button {
    width: 180px;
    height: 50px;
    border: none;
    cursor: pointer;
    background: #d9d9d9;
    border-right: 7px solid #fdc730;
    border-bottom: 1px solid #fdc730;
    font-weight: 700;
    font-size: 20px;
    font-family: "Share Tech Mono", monospace;
    transition: 0.3s;
    border-radius: 1px;
    margin: 5px auto;
    display: block;

    &:hover {
      border-bottom: 5px solid #20a8f9;
      border-right: 5px solid #fdc730;
    }
  }
}

.retest-block {
  max-width: 200px;
  background: #00a263;
  height: 130px;
  padding: 0 5px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;

  img {
    width: 100%;
  }
}

.result-information {
  margin: 0 auto 25px;
  width: 100%;
  min-height: 95vh;
  background: url("../assets/feature-list-1.png") no-repeat;
  background-position: 100% 0%;
  background-size: content;
}
.result-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  margin: 0px 0 30px;
  text-align: center;
  border: 3px solid black;
  max-width: 500px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 4px 0px,
    rgba(0, 0, 0, 0.2) 0px 2px 15px 0px;
  border-left: 3px solid black;
  border-top: 10px solid #00a263;
  border-right: 1px solid #fdc730;
  border-bottom: 10px solid #20a8f9;
  color: #000;
  line-height: 60px;

  img {
    width: 85%;
  }

  .success {
    width: 100%;
    height: 60px;
    flex-basis: 60%;
  }
  .result {
    font-size: 60px;

    span {
      font-family: "Share Tech Mono", monospace;
      font-size: 90px;
      font-weight: 700;
      color: #00a263;
    }
  }

  .fail {
    span {
      color: red;
      text-decoration: underline;
    }
  }
}
.stars {
  display: flex;
  justify-content: space-around;
}
.watch-results {
  width: 70%;
  margin: 0 auto;
  height: 40px;
  border: none;
  cursor: pointer;
  background: #d9d9d9;
  border-right: 7px solid #fdc730;
  border-bottom: 3px solid red;
  font-weight: 700;
  font-size: 20px;
  font-family: "Share Tech Mono", monospace;
  transition: 0.3s;
  font-size: 30px;

  &:hover {
    border-bottom: 15px solid #20a8f9;
    border-right: 15px solid #fdc730;
    height: 50px;
  }
}
.results-infornation {
  margin: 30px auto;
  font-weight: 600;
  font-size: 20px;
  & > div {
    box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 4px 0px,
      rgba(0, 0, 0, 0.2) 0px 2px 15px 0px;
    border-left: 2px solid #20a8f9;
    border-top: 3px solid red;
    margin: 20px 0;
    padding: 15px;
    border-radius: 3px;
    background: #fff;
    li {
      margin: 10px;
      font-size: 16px;
      font-weight: 400;
      padding: 15px 10px;
      border-radius: 3px;
      white-space: pre-wrap;
    }
  }
}

.buttons {
  display: flex;
  align-items: center;
}

.message-bottom {
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  top: 5px;
  margin: 0;
  right: 10px;
  z-index: 2;
}
.quantity-answers {
  display: inline-block;
  border: 2px solid red;
  margin: 5px 0;
  font-weight: 500;
  line-height: 20px;
  padding: 5px 10px;
  border-radius: 2px;
}

code {
  background: #5f5f5e;
  color: #fec82f;
  padding: 5px 8px;
  margin: 5px;
  font-size: 16px;
  font-family: "Share Tech Mono", monospace;
  border-radius: 2px;
  font-weight: 500;
}

@media screen and (max-width: 600px) {
  .set-password,
  .your-password {
    width: 90%;
  }
}
</style>
