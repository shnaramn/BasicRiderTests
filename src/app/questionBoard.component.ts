import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Question } from './question.component';
import { QuestionBankService } from './questionBank.service';

@Component({
  selector: 'QuestionBoard',
  templateUrl: './questionBoard.component.html',
  styleUrls: ['./questionBoard.component.css']
})

export class QuestionBoard {
  result: string
  isCurrentQuestionAnswered: boolean = false;
  totalQuestionsAnswered: number = 0;
  countOfCorrectAnswers: number = 0;
  questionBankService: QuestionBankService;

  @ViewChild('liveQuestion', { static: false }) currentQuestion: Question;

  constructor(private cdRef: ChangeDetectorRef) {
    this.result = 'Waiting for answer...';
    this.questionBankService = new QuestionBankService();
  }

  ngAfterViewInit() {
    this.getNextQuestion();
    this.cdRef.detectChanges();
  }

  answerChanged(isCorrectAnswer: boolean) {
    this.isCurrentQuestionAnswered = true;
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
    const nextQuestionModel = this.questionBankService.getQuestionById(this.totalQuestionsAnswered);
    this.isCurrentQuestionAnswered = false;
    this.currentQuestion.refresh(nextQuestionModel);
  }
}