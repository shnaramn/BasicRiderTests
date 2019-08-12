import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { QuestionBankService } from './questionBank.service';
import { QuestionModel } from './questionModel.component';

@Component({
  selector: 'QuestionBoard',
  templateUrl: './questionBoard.component.html',
  styleUrls: ['./questionBoard.component.css']
})

export class QuestionBoard {
  result: string
  totalQuestionsAnswered: number = 0;
  countOfCorrectAnswers: number = 0;
  questionBankService: QuestionBankService;
  questionsAsked: QuestionModel[];
  currentQuestionNumber: number = -1;
  currentQuestion: QuestionModel;

  readonly maxNumberOfQuestions: number = 5;

  constructor() {
    this.result = 'Waiting for answer...';
    this.questionBankService = new QuestionBankService();
    this.questionsAsked = new Array<QuestionModel>(5);
    this.getNextQuestion();
  }

  isCurrentQuestionAnswered(): boolean {
    return this.questionsAsked[this.currentQuestionNumber].usersAnswer != ''
  }

  answerChanged(isCorrectAnswer: boolean) {
    ++this.totalQuestionsAnswered;

    if (isCorrectAnswer) {
      this.result = "Correct!";
      ++this.countOfCorrectAnswers;
    }
    else {
      this.result = "Wrong!!";
    }
  }

  getScoreSoFar(): number {
    if (this.totalQuestionsAnswered == 0) {
      return 0;
    }

    return (this.countOfCorrectAnswers / this.totalQuestionsAnswered) * 100;
  }

  getNextQuestion() {
    if (this.currentQuestionNumber >= (this.maxNumberOfQuestions - 1)) {
      return;
    }

    if (this.questionsAsked[this.currentQuestionNumber + 1] == null) {
      const newQuestionModel = this.questionBankService.getQuestionById(this.currentQuestionNumber + 1);
      this.questionsAsked[this.currentQuestionNumber + 1] = newQuestionModel;
    }

    this.currentQuestion = this.questionsAsked[++this.currentQuestionNumber];
  }

  goToPreviousQuestion() {
    if (this.currentQuestionNumber <= 0) {
      return;
    }

    this.currentQuestion = this.questionsAsked[--this.currentQuestionNumber];
  }
}