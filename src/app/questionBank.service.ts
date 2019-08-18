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