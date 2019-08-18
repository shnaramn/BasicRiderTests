import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Helper } from './common.helper';
import { QuestionModel } from './questionModel.component';

@Component({
  selector: 'Question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class Question {
  highlightedAnswer: any;
  @Input() isEnabled: boolean = true;
  @Input() shouldShowExplanation: boolean = false;
  @Input() questionModel: QuestionModel
  @Output() onAnswerChanged = new EventEmitter<boolean>();

  highlightAnswer(chosenAnswer: any) {
    if (!this.isEnabled) {
      return;
    }

    this.highlightedAnswer = chosenAnswer;
  }

  clearHighlightAnswer(chosenAnswer: any) {
    if (!this.isEnabled) {
      return;
    }

    if (this.highlightedAnswer == chosenAnswer) {
      this.highlightedAnswer = '';
    }
  }

  constructor() {
    this.questionModel = new QuestionModel();
  }

  answerSelected(chosenAnswer: string) {
    if (!this.isEnabled) {
      return;
    }

    this.onAnswerChanged.emit(chosenAnswer === this.questionModel.answer);
    this.questionModel.usersAnswer = chosenAnswer;
  }
}