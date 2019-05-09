<template>
  <div id="app">
    <div class="application-wrapper">
      <div class="timeline">
        <div class="timeline-inner" v-bind:style="{width: startTest() + '%'}"></div>
      </div>
      <div v-if="questionIndex < allQuestionsLength()">
        <span class="to-end">{{questionIndex +1 }} / {{allQuestionsLength()}}</span>
      </div>
      <div class="question-list" v-if="questionIndex < allQuestionsLength()">
        <div
          v-for="(question, index) in RandomSortedQuestionList"
          v-bind:key="index"
          class="question-body"
          v-if="index == questionIndex">
          <h3 class="question" ref="question">{{question.question}}</h3>
          <ul>
            <li
              v-for="(choise, choiseIndex) in question.choise"
              v-bind:key="choiseIndex"
              @click="checkAnswer($event)"
              :data="choise.index">
              {{choiseIndex +1}} : {{choise.option}}</li>
          </ul>
          <div class="need-answers">You need to select {{needAnswers()}} answer.</div>
          <div class="control-buttons">
            <button class="prev" @click="previousQuestion">Previous</button>
            <button @click="nextQuestion">Next</button>
          </div>
        </div>
      </div>
      <div v-else class="result-information">
        <div class="result-wrapper" v-if="testResult() > 60">
          <div class="result">your result {{testResult().toFixed()}} %</div>
          <div class="success">
            <div class="five-stars stars" v-if="testResult() > 90">
              <img v-for="(item, index) in 5" :key="index" src="~@/assets/favorite.svg">
            </div>
            <div class="four-stars stars" v-else-if="testResult() > 75">
              <img v-for="(item, index) in 4" :key="index" src="~@/assets/favorite.svg">
            </div>
            <div class="three-stars stars" v-else-if="testResult() > 60">
              <img v-for="(item, index) in 3" :key="index" src="~@/assets/favorite.svg">
            </div>
          </div>
        </div>
        <div class="result-wrapper" v-else>
          <div class="result">your result {{testResult().toFixed(0)}} %</div>
          <div class="fail">
            <div class="five-stars stars" v-if="testResult() < 60">
              <h1>Failure. Please try more!</h1>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button class="open-results" @click="watchResults()">Watch results</button>
        </div>
        <div class="see-results" v-show="seenResults">
          <div v-for="(question, index) in RandomSortedQuestionList" v-bind:key="index">
            {{question.question}}
            <ul>
              <li
                v-for="(choise, choiseIndex) in question.choise"
                v-bind:key="choiseIndex"
                v-bind:class="paintResultList(choise.isTrue, choise.myAnswer)"
              >{{choiseIndex +1}} : {{choise.option}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import allQuestions from "@/assets/allQuestions.js";
import { setInterval, clearInterval } from "timers";
import Header from '@/components/Header';

export default {
  name: "sertification",
  components: {
    Header
  },
  data: function() {
    return {
      allQuestionsList: allQuestions,
      RandomSortedQuestionList: [],
      questionIndex: 0,
      isTestDisplay: false,
      timeRange: 0,
      inputPassword: [],
      randomQCheckbox: true,
      randomOptCheckbox: true,
      seenResults: false,
      name: ''
    };
  },
  methods: {
    //methods for start page
    getTime() {
    },
    startTest() {
          this.$nextTick(function () {
          this.$refs.question[0].innerHTML = this.$refs.question[0].innerHTML.replace(/&lt;/g,"<").replace(/&gt;/g,">");
    });
      this.isTestDisplay = true;
      if (this.questionIndex < this.allQuestionsLength()) {
        return ((this.questionIndex + 1) / this.allQuestionsLength()) * 100; //!!!!!!!!!
      }
    },
    resetPassword() {
      this.inputPassword = [];
    },
    setPassword(number) {
      this.inputPassword.push(number);
    },
    getPassword() {
      this.sortRandomQuestions();
      const _password = [8, 8, 8, 8].sort().join();
      let customerInputPassword = this.inputPassword.sort().join();
      if (customerInputPassword == _password) {
        this.startTest();
      } else {
      }
    },
    consoleMessage() {
      console.log('%c Hello, if you find a mistake in the text, please inform me in Skype.', 'background: #f6c2d8; color: #7babed; font-size: 35px;');
    },
    // methods for tests
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
      this.RandomSortedQuestionList[this.questionIndex].choise.forEach((option)=>{
        if (option.isTrue === true) {
          needOption.push(1);
        }
      });
      return needOption.length;
    },
    sortRandomQuestions: function() {
      // можно отключить рандомную сортировку вопросов
      let _array = [];
      for (const _key in this.allQuestionsList) {
        if (this.allQuestionsList.hasOwnProperty(_key)) {
          if (this.randomOptCheckbox === true) {
            this.allQuestionsList[_key].choise.sort(
              (a, b) => Math.random() - 0.5
            ); // можно поставить опцию сортировки вариантов ответов
          }
          _array.push(this.allQuestionsList[_key]);
        }
      }
      if (this.randomQCheckbox === true) {
        this.RandomSortedQuestionList = _array.sort(
          (a, b) => Math.random() - 0.5
        );
      } else {
        this.RandomSortedQuestionList = this.allQuestionsList;
      }
    },
    nextQuestion() {
      if (this.questionIndex <= this.allQuestionsLength()) {
        this.questionIndex++;
      }
    },
    previousQuestion() {
      if (this.questionIndex > 0) {
        this.questionIndex--;
        this.RandomSortedQuestionList[this.questionIndex].choise.forEach((item)=>{
          item.myAnswer = false;
        });
      }
    },

    allQuestionsLength() {
      return Object.keys(this.allQuestionsList).length;
    },
    testResult() {
      let _trueAnswers = [];
      let _myAnswer = [];
      let _myTrueAnswers = [];
      this.RandomSortedQuestionList.forEach((element, index) => {
        element.choise.forEach((choiseInfo, choiseIndex) => {
          if (choiseInfo.isTrue == true) {
            _trueAnswers.push(choiseInfo.isTrue);
          }
          if (choiseInfo.myAnswer == true) {
            _myAnswer.push(choiseInfo.myAnswer);
            if (choiseInfo.myAnswer == true && choiseInfo.isTrue == true) {
              _myTrueAnswers.push(1);
            }
          }
        });
      });
      return (_myTrueAnswers.length / _trueAnswers.length) * 100;
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
  mounted() {
    this.inputPassword = [];
    this.consoleMessage();
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700");
@import url('https://fonts.googleapis.com/css?family=Inconsolata:400,700');
$blue: #7babed;
$rouse: #f6c2d8;
$yellow: #fcebbf;
$grey: #ced6e3;

body {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
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
    background: $blue;
    min-height: 90px;
    font-weight: 400;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0 3px 3px $grey;
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
  background: $rouse;
  box-shadow: 0 4px 10px #999;
}
.red {
  background: $rouse;
  border: 1px solid red;
}
.green {
  background: greenyellow;
  border: 1px solid green;
}
.yellow {
  background: $yellow;
  border: 1px solid orangered;
}
.timeline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 15px;
  &-inner {
    height: 15px;
    background: $rouse;
  }
}
.your-password {
  display: flex;
  justify-content: center;
  min-height: 60px;
  border: 3px solid $rouse;
  border-radius: 10px;
  width: 40%;
  margin: 0 auto;
  padding: 15px 0 0;
  cursor: not-allowed;
  &-item {
    width: 40px;
    height: 40px;
  }
}
label {
  cursor: pointer;
}
.list-tests {
  font-weight: bold;
  padding: 15px 0 20px;
}
.set-password {
  display: flex;
  width: 40%;
  justify-content: center;
  margin: 10px auto;
  flex-wrap: wrap;
  > div {
    flex-basis: 33%;
    button {
      width: 97%;
      height: 70px;
      background: $yellow;
      border: none;
      border-radius: 10px;
      margin: 3px;
      cursor: pointer;
    }
  }
}
.start-test {
  width: 120px;
  height: 70px;
  background: $rouse;
  border: none;
  border-radius: 10px;
  margin: 3px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 100%;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 5px 10px $grey;
  }
}
.reset-password {
  width: 100px;
  height: 50px;
  background: $grey;
  border: none;
  border-radius: 10px;
  margin: 3px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 90%;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 5px 10px $grey;
  }
}
.application-wrapper {
  margin: 20px auto;
  width: 80%;
}
ul {
  list-style: none;
}
.to-end {
  font-size: 120%;
  font-weight: 700;
  color: grey;
  padding: 20px 0;
  margin-top: 10px;
  display: block;
  &::first-letter {
    font-size: 140%;
  }
}
button {
  box-shadow: 0 1px 1px #aaa;       
}
.question {
  border-bottom: 3px solid $yellow;
  margin: 5px 0 10px;
  padding: 20px;
  line-height: 22px;
  white-space: pre-wrap;
  font-size: 16px;
}

.question-body {
  ul {
    margin-bottom: 40px;
  }

  ul li {
    cursor: pointer;
    margin: 12px 0;
    padding: 0 15px 15px;
    border-radius: 10px;
    font-weight: 500;
    transition: 0.2s;
    white-space: pre-wrap;
    &::first-letter {
      font-size: 130%;
      font-weight: 700;
      color: $blue;
      line-height: 20px;
    }
    &:hover {
      box-shadow: 0 3px 10px $blue;
      background: $blue;
      &::first-letter {
        color: #fff;
      }
    }
  }
  button {
    width: 200px;
    height: 50px;
    background: $blue;
    border: none;
    border-radius: 10px;
    margin: 3px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 90%;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      box-shadow: 0 5px 10px $grey;
    }
  }
  .prev {
    height: 50px;
    width: 90px;
    background: $grey;
  }
}
.result-information {
  margin: 120px auto 25px;
  width: 80%;
  min-height: 50vh;
}
.result-wrapper {
  display: flex;
  justify-content: space-between;
  min-height: 200px;
  text-align: center;
  .success {
    width: 100%;
    height: 60px;
    flex-basis: 60%;
  }
  .result {
    font-size: 300%;
    font-weight: 900;
  }
}
.stars {
  display: flex;
  justify-content: space-around;
}
.open-results {
  width: 200px;
  height: 50px;
  background: $blue;
  border: none;
  border-radius: 10px;
  margin: 3px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 90%;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 5px 10px $grey;
  }
}
.see-results {
  margin: 30px auto;
  font-weight: 600;
  font-size: 20px;
  & > div {
    border: 2px solid $blue;
    margin: 20px 0;
    padding: 15px;
    border-radius: 10px;
    li {
      margin: 10px;
      font-size: 16px;
      font-weight: 400;
      padding: 15px 10px;
      border-radius: 10px;
      white-space: pre-wrap;
    }
  }
}
.restart {
  width: 100px;
  height: 50px;
  background: $rouse;
  border: none;
  border-radius: 10px;
  margin: 3px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 90%;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 5px 10px $grey;
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
.need-answers {
  background: $yellow;
  display: inline-block;
  margin: 5px;
  line-height: 20px;
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0 1px 4px #aaa;
}

code {
  background: #383736;
  color: #ffa;
  padding: 5px 8px;
  margin: 5px;
  font-size: 16px;
  font-family: 'Inconsolata', monospace;
  border-radius: 3px;
  font-weight: 500;
}

@media screen and (max-width: 600px) {
  .set-password,
  .your-password {
    width: 90%;
  }
}
</style>