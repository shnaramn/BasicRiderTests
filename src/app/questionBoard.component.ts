import { Component } from '@angular/core';
import { QuestionBankService } from './questionBank.service';
import { QuestionModel } from './questionModel.component';

@Component({
  selector: 'QuestionBoard',
  templateUrl: './questionBoard.component.html',
  styleUrls: ['./questionBoard.component.css']
})

export class QuestionBoard {
  countOfCorrectAnswers: number = 0;
  questionsAsked: QuestionModel[];
  currentQuestionNumber: number = -1;
  currentQuestion: QuestionModel;
  showAnswers: boolean = false;
  readonly maxNumberOfQuestions: number = 2;
  questionBankService: QuestionBankService;
  secondButtonText: string = 'Next';

  constructor() {
    this.startTest();
  }

  private startTest() {
    this.questionBankService = new QuestionBankService();
    this.questionsAsked = new Array<QuestionModel>(this.maxNumberOfQuestions);
    this.questionBankService.refresh();
    this.countOfCorrectAnswers = 0;
    this.currentQuestionNumber = -1;
    this.showAnswers = false;

    this.getNextQuestion();
  }

  isCurrentQuestionAnswered(): boolean {
    return this.questionsAsked[this.currentQuestionNumber].usersAnswer != ''
  }

  getScore(): number {
    if (this.maxNumberOfQuestions == 0) {
      return 0;
    }

    return (this.countOfCorrectAnswers / this.maxNumberOfQuestions) * 100;
  }

  private calculateFinalScore() {
    this.countOfCorrectAnswers = 0;

    this.questionsAsked.forEach(currentQuestion => {
      if (currentQuestion.answer == currentQuestion.usersAnswer) {
        ++this.countOfCorrectAnswers;
      }
    });

    this.showAnswers = true;
  }

  getNextQuestion() {
    if (this.currentQuestionNumber >= (this.maxNumberOfQuestions - 1)) {
      this.calculateFinalScore();
      return;
    }

    if (this.questionsAsked[this.currentQuestionNumber + 1] == null) {
      const newQuestionModel = this.questionBankService.getQuestionById(this.currentQuestionNumber + 1);
      this.questionsAsked[this.currentQuestionNumber + 1] = newQuestionModel;
    }

    this.currentQuestion = this.questionsAsked[++this.currentQuestionNumber];
    this.secondButtonText = (this.currentQuestionNumber == this.maxNumberOfQuestions-1) ? 'Calculate Score' : 'Next';
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