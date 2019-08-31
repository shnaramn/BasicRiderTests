import { Helper } from './common.helper';
import { QuestionModel } from './questionModel.component';
import { Injectable } from '@angular/core';

// Load the questions.
import questionsRaw from "../assets/questions.json";

@Injectable()
export class QuestionBankService {
  totalNumberOfQuestions: number;
  questions: QuestionModel[];

  constructor() {
    this.questions = questionsRaw;
    this.totalNumberOfQuestions = this.questions.length;

    this.questions.forEach(question => {
      this.randomizeAnswers(question);
    });
  }

  private randomizeAnswers(questionModel: QuestionModel): void {
    const numberOfOptions = questionModel.options.length - 1;

    for (let i = 0; i < 10; ++i) {
      let startIndex = Helper.getRandomIntFromInterval(0, numberOfOptions);
      let endIndex = Helper.getRandomIntFromInterval(0, numberOfOptions);

      while (startIndex == endIndex) {
        endIndex = Helper.getRandomIntFromInterval(0, numberOfOptions);
      }

      // Swap
      const temp = questionModel.options[startIndex];
      questionModel.options[startIndex] = questionModel.options[endIndex];
      questionModel.options[endIndex] = temp;
    }
  }

  getNextQuestionExcludingMasks(excludeMask: number[]): QuestionModel {
    const lowerBound = 0;
    const upperBound = this.totalNumberOfQuestions - 1;

    let nextQuestionId = Helper.getRandomIntFromInterval(lowerBound, upperBound);

    if (excludeMask != null) {
      while (excludeMask.includes(nextQuestionId)) {
        nextQuestionId = Helper.getRandomIntFromInterval(lowerBound, upperBound);
      }
    }

    return this.getQuestionAtIndex(nextQuestionId);
  }

  private getQuestionAtIndex(questionIndex: number): QuestionModel {
    const correctedQuestionIndex = questionIndex % this.totalNumberOfQuestions;
    return this.questions[correctedQuestionIndex];
  }

  refresh() {
    // TODO: Randomize?
    this.questions.forEach(question => {
      question.usersAnswer = '';
    });
  }
}