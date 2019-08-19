import { Component } from '@angular/core';
import { QuestionBankService } from './questionBank.service';
import { QuestionModel } from './questionModel.component';

@Component({
  selector: 'QuestionBoard',
  templateUrl: './questionBoard.component.html',
  styleUrls: ['./questionBoard.component.css']
})

export class QuestionBoard {
  totalQuestionsAnswered: number = 0;
  countOfCorrectAnswers: number = 0;
  questionsAsked: QuestionModel[];
  currentQuestionNumber: number = -1;
  currentQuestion: QuestionModel;
  showAnswers:boolean = false;
  readonly maxNumberOfQuestions: number = 2;
  questionBankService: QuestionBankService;
  
  constructor() {
    this.startTest();
  }

  private startTest() {
    this.questionBankService = new QuestionBankService();
    this.questionsAsked = new Array<QuestionModel>(this.maxNumberOfQuestions);
    this.questionBankService.refresh();
    this.totalQuestionsAnswered = 0;
    this.countOfCorrectAnswers = 0;
    this.currentQuestionNumber = -1;
    this.showAnswers = false;

    this.getNextQuestion();
  }

  isCurrentQuestionAnswered(): boolean {
    return this.questionsAsked[this.currentQuestionNumber].usersAnswer != ''
  }

  answerChanged(isCorrectAnswer: boolean) {
    ++this.totalQuestionsAnswered;

    if (isCorrectAnswer) {
      ++this.countOfCorrectAnswers;
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
      this.showAnswers = true;
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

  restart() {
    this.startTest();
  }
}