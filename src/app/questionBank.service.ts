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

  getNextQuestion(excludeMask: number[]): QuestionModel {
    let nextQuestionId = Helper.getRandomIntFromInterval(1, this.totalNumberOfQuestions);

    while (excludeMask.includes(nextQuestionId)) {
      nextQuestionId = Helper.getRandomIntFromInterval(1, this.totalNumberOfQuestions);
    }

    return this.getQuestionById(nextQuestionId);
  }

  getQuestionById(questionId: number): QuestionModel {
    // TODO: Remove
    const correctedQuestionId = questionId % this.totalNumberOfQuestions;
    return this.questions[correctedQuestionId];
  }
}