import { QuestionImageModel } from './questionImageModel.component';

export class QuestionModel {
  constructor(
    public id: number = 0,
    public question: string = 'Do you want to learn to ride a bike?',
    public answer: string = 'Yes',
    public options: string[] = ['Yes', 'No', 'May be'],
    public explanation: string = 'Obviously!',
    public image: QuestionImageModel = null,
    public usersAnswer: string = '') {
  }
}
