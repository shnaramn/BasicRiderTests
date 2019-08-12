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

  @Input() questionModel: QuestionModel
  @Output() onAnswerChanged = new EventEmitter<boolean>();

  highlightAnswer(chosenAnswer: any) {
    this.highlightedAnswer = chosenAnswer;
  }

  clearHighlightAnswer(chosenAnswer: any) {
    if (this.highlightedAnswer == chosenAnswer) {
      this.highlightedAnswer = '';
    }
  }

  constructor() {
    this.questionModel = new QuestionModel();
    this.randomizeAnswers();
  }

  private randomizeAnswers(): void {
    const numberOfOptions = this.questionModel.options.length - 1;

    for (let i = 0; i < 10; ++i) {
      let startIndex = Helper.getRandomIntFromInterval(0, numberOfOptions);
      let endIndex = Helper.getRandomIntFromInterval(0, numberOfOptions);

      while (startIndex == endIndex) {
        endIndex = Helper.getRandomIntFromInterval(0, numberOfOptions);
      }

      // Swap
      const temp = this.questionModel.options[startIndex];
      this.questionModel.options[startIndex] = this.questionModel.options[endIndex];
      this.questionModel.options[endIndex] = temp;
    }
  }

  answerSelected(chosenAnswer: string) {
    this.onAnswerChanged.emit(chosenAnswer === this.questionModel.answer);
    this.questionModel.usersAnswer = chosenAnswer;
  }
}